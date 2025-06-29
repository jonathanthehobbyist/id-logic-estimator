// core/pricing-engine.js
// Pure pricing calculation logic - no session management or step logic

import { PRICING_COMPONENTS } from '../config/pricing-components.js';
import { MULTIPLIERS, ROOM_COMPONENT_MAPPING } from '../config/multipliers.js';

export class PricingEngine {
  
  static calculate(session) {
    const { data } = session;
    const room = data.room;
    const sqft = data.sqft || 0;
    
    if (!room || !PRICING_COMPONENTS[room]) {
      return this.emptyResult();
    }
    
    const components = PRICING_COMPONENTS[room];
    let total = 0;
    let items = [];
    let traceLog = [];
    
    // Calculate each pricing component
    total += this.calculateDesignFee(components, items, traceLog);
    total += this.calculateLabor(components, data, room, sqft, items, traceLog);
    total += this.calculateMaterials(components, data, room, sqft, items, traceLog);
    
    // Apply business rule multipliers
    const { finalTotal, finalItems } = this.applyMultipliers(total, items, data, traceLog);
    
    // Sort items by category
    const sortedItems = this.sortItems(finalItems);
    
    return {
      total: finalTotal,
      items: sortedItems,
      traceLog
    };
  }
  
  static calculateDesignFee(components, items, traceLog) {
    if (!components.design) return 0;
    
    const fee = components.design.base;
    items.push({ 
      name: 'Design Consultation', 
      price: fee, 
      category: 'design' 
    });
    traceLog.push(`Design fee: $${fee}`);
    
    return fee;
  }
  
  static calculateLabor(components, data, room, sqft, items, traceLog) {
    if (!components.labor) return 0;
    
    let laborTotal = 0;
    
    // Special flooring handling (since it was problematic)
    laborTotal += this.calculateFlooringLabor(components, data, room, sqft, items, traceLog);
    
    // Other labor components
    Object.entries(components.labor).forEach(([laborType, laborConfig]) => {
      if (laborType === 'description' || laborType === 'flooring_install') return;
      
      const cost = this.calculateLaborComponent(laborType, laborConfig, data, room, sqft, traceLog);
      if (cost > 0) {
        laborTotal += cost;
        items.push({
          name: this.formatLaborName(laborType, laborConfig, data, room, sqft),
          price: cost,
          category: 'labor'
        });
      }
    });
    
    return laborTotal;
  }
  
  static calculateFlooringLabor(components, data, room, sqft, items, traceLog) {
    const flooringChoice = data[`${room.toLowerCase().replace(' ', '_')}_flooring`];
    
    if (!flooringChoice || !components.labor?.flooring_install?.[flooringChoice]) {
      return 0;
    }
    
    // Labor cost
    const laborCost = components.labor.flooring_install[flooringChoice].perSqFt * sqft;
    items.push({
      name: `Flooring Installation: ${flooringChoice} (${sqft} sq ft)`,
      price: laborCost,
      category: 'labor'
    });
    traceLog.push(`Flooring Installation (${flooringChoice}): $${components.labor.flooring_install[flooringChoice].perSqFt} × ${sqft} = $${laborCost}`);
    
    // Material cost
    if (components.flooring?.[flooringChoice]) {
      const materialCost = components.flooring[flooringChoice].perSqFt * sqft;
      items.push({
        name: `Flooring Materials: ${flooringChoice}`,
        price: materialCost,
        category: 'materials'
      });
      traceLog.push(`Flooring Materials (${flooringChoice}): $${components.flooring[flooringChoice].perSqFt} × ${sqft} = $${materialCost}`);
      return laborCost + materialCost;
    }
    
    return laborCost;
  }
  
  static calculateLaborComponent(laborType, laborConfig, data, room, sqft, traceLog) {
    // Fixed base cost
    if (laborConfig.base !== undefined) {
      traceLog.push(`${this.formatName(laborType)}: $${laborConfig.base}`);
      return laborConfig.base;
    }
    
    // Per square foot
    if (laborConfig.perSqFt !== undefined) {
      const cost = laborConfig.perSqFt * sqft;
      traceLog.push(`${this.formatName(laborType)}: ${laborConfig.perSqFt} × ${sqft} = ${cost}`);
      return cost;
    }
    
    // Choice-based
    if (typeof laborConfig === 'object') {
      const choiceKey = `${room.toLowerCase().replace(' ', '_')}_${laborType.replace('_install', '').replace('_labor', '')}`;
      const userChoice = data[choiceKey];
      
      if (userChoice && laborConfig[userChoice] !== undefined) {
        const cost = laborConfig[userChoice];
        traceLog.push(`${this.formatName(laborType)} (${userChoice}): $${cost}`);
        return cost;
      }
    }
    
    return 0;
  }
  
  static calculateMaterials(components, data, room, sqft, items, traceLog) {
    const roomComponents = ROOM_COMPONENT_MAPPING[room]?.filter(comp => comp !== 'flooring') || [];
    let materialTotal = 0;
    
    roomComponents.forEach(componentType => {
      const component = components[componentType];
      if (!component) return;
      
      const userChoice = data[`${room.toLowerCase().replace(' ', '_')}_${componentType}`];
      if (!userChoice) return;
      
      const cost = this.calculateMaterialComponent(componentType, component, userChoice, sqft, traceLog);
      if (cost > 0) {
        materialTotal += cost;
        items.push({
          name: `${this.formatName(componentType)}: ${userChoice}`,
          price: cost,
          category: 'materials'
        });
      }
    });
    
    return materialTotal;
  }
  
  static calculateMaterialComponent(componentType, component, userChoice, sqft, traceLog) {
    if (typeof component[userChoice] === 'number') {
      traceLog.push(`${this.formatName(componentType)}: ${userChoice} = $${component[userChoice]}`);
      return component[userChoice];
    }
    
    if (component[userChoice]?.perSqFt) {
      const cost = component[userChoice].perSqFt * sqft;
      traceLog.push(`${this.formatName(componentType)}: ${userChoice} = $${component[userChoice].perSqFt} × ${sqft} = $${cost}`);
      return cost;
    }
    
    if (component.base) {
      traceLog.push(`${this.formatName(componentType)}: $${component.base}`);
      return component.base;
    }
    
    return 0;
  }
  
  static applyMultipliers(total, items, data, traceLog) {
    let multiplier = 1;
    
    // Budget multiplier (currently 1.0 for all)
    if (data.budget && MULTIPLIERS.budget[data.budget]) {
      multiplier *= MULTIPLIERS.budget[data.budget];
      traceLog.push(`Budget multiplier (${data.budget}): ×${MULTIPLIERS.budget[data.budget]}`);
    }
    
    // Project type multiplier
    if (data.projectType && MULTIPLIERS.project[data.projectType]) {
      multiplier *= MULTIPLIERS.project[data.projectType];
      traceLog.push(`Project type multiplier (${data.projectType}): ×${MULTIPLIERS.project[data.projectType]}`);
    }
    
    if (multiplier !== 1) {
      const finalTotal = Math.round(total * multiplier);
      traceLog.push(`Final calculation: $${total} × ${multiplier.toFixed(2)} = $${finalTotal}`);
      
      const finalItems = items.map(item => ({
        ...item,
        price: Math.round(item.price * multiplier),
        originalPrice: item.price
      }));
      
      return { finalTotal, finalItems };
    }
    
    return { finalTotal: total, finalItems: items };
  }
  
  static sortItems(items) {
    const categoryOrder = { 'design': 1, 'labor': 2, 'materials': 3 };
    return items.sort((a, b) => {
      const categoryA = categoryOrder[a.category] || 4;
      const categoryB = categoryOrder[b.category] || 4;
      return categoryA - categoryB;
    });
  }
  
  static formatName(name) {
    return name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  
  static formatLaborName(laborType, laborConfig, data, room, sqft) {
    const baseName = this.formatName(laborType);
    
    if (laborConfig.perSqFt !== undefined) {
      return `${baseName} (${sqft} sq ft)`;
    }
    
    if (typeof laborConfig === 'object') {
      const choiceKey = `${room.toLowerCase().replace(' ', '_')}_${laborType.replace('_install', '').replace('_labor', '')}`;
      const userChoice = data[choiceKey];
      if (userChoice) {
        return `${baseName}: ${userChoice}`;
      }
    }
    
    return baseName;
  }
  
  static emptyResult() {
    return {
      total: 0,
      items: [],
      traceLog: []
    };
  }
}
