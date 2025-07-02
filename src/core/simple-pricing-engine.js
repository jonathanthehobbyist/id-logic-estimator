// core/simple-pricing-engine.js
// Simple pricing that reads line items from session and calculates costs

// Basic pricing rates - you can move this to a separate config file later
const PRICING_RATES = {
  // Design
  design: {
    "Design Consultation": 0 // Free!
  },
  
  // Materials
  materials: {
    // Flooring (per sq ft)
    "Laminate": { perSqFt: 3.50 },
    "Vinyl": { perSqFt: 4.00 },
    "Hardwood": { perSqFt: 8.00 },
    "Tile": { perSqFt: 6.00 },
    "Natural Stone": { perSqFt: 12.00 },
    "Carpet": { perSqFt: 2.50 },
    "Heated floors": { perSqFt: 15.00 },
    
    // Countertops (per sq ft)
    "Quartz": { perSqFt: 65.00 },
    "Granite": { perSqFt: 55.00 },
    "Butcher Block": { perSqFt: 25.00 },
    
    // Cabinets (flat rate)
    "Stock cabinets": { flat: 8000 },
    "Semi-custom cabinets": { flat: 15000 },
    "Full custom cabinets": { flat: 25000 },
    "Cabinet refacing": { flat: 5000 },
    
    // Appliances (flat rate)
    "Basic package": { flat: 3000 },
    "Mid-range package": { flat: 8000 },
    "High-end package": { flat: 15000 },
    "Premium package": { flat: 25000 },
    
    // Fixtures (flat rate)
    "Basic": { flat: 2000 },
    "Standard": { flat: 4000 },
    "Premium": { flat: 8000 },
    "Luxury": { flat: 15000 },
    
    // Additional Features (flat rate)
    "Kitchen island": { flat: 5000 },
    "Pantry upgrade": { flat: 3000 },
    "Wine storage": { flat: 2000 },
    "Built-in shelving": { flat: 2500 },
    "Fireplace upgrade": { flat: 4000 },
    "Entertainment center": { flat: 3500 },
    "Walk-in closet": { flat: 4000 },
    "Built-in wardrobes": { flat: 3000 },
    "Reading nook": { flat: 1500 }
  },
  
  // Labor
  labor: {
    // Demolition (per sq ft)
    "Full Renovation": { perSqFt: 8.00 },
    "Partial Renovation": { perSqFt: 4.00 },
    
    // Flooring Installation (per sq ft)
    "Laminate": { perSqFt: 2.00 },
    "Vinyl": { perSqFt: 2.50 },
    "Hardwood": { perSqFt: 4.00 },
    "Tile": { perSqFt: 5.00 },
    "Natural Stone": { perSqFt: 8.00 },
    "Carpet": { perSqFt: 1.50 },
    "Heated floors": { perSqFt: 6.00 },
    
    // Countertop Installation (per sq ft)
    "Countertop Installation": { perSqFt: 15.00 }
  }
};

export class SimplePricingEngine {
  
  static calculate(session) {
    const sqft = session.data.square_footage || 0;
    let total = 0;
    const items = [];
    const traceLog = [];
    
    // Calculate each line item
    session.lineItems.forEach(lineItem => {
      const cost = this.calculateLineItemCost(lineItem, sqft, traceLog);
      
      if (cost > 0) {
        items.push({
          name: lineItem.name,
          price: cost,
          category: lineItem.category || 'misc'
        });
        total += cost;
      }
    });
    
    // Sort by category
    const sortedItems = this.sortItemsByCategory(items);
    
    return {
      total: Math.round(total),
      items: sortedItems,
      traceLog
    };
  }
  
  static calculateLineItemCost(lineItem, sqft, traceLog) {
    const { name, calculation, category, userChoice } = lineItem;
    
    // Handle always included items (like free design consultation)
    if (lineItem.price !== undefined) {
      traceLog.push(`${name}: $${lineItem.price}`);
      return lineItem.price;
    }
    
    // Get pricing rate
    const rates = PRICING_RATES[category];
    if (!rates) {
      traceLog.push(`No rates found for category: ${category}`);
      return 0;
    }
    
    // Find the rate for this specific choice
    let rate = null;
    
    // Try exact match first
    if (rates[userChoice]) {
      rate = rates[userChoice];
    }
    // Try finding by item name (for things like "Countertop Installation")
    else if (rates[name.split(':')[0]]) {
      rate = rates[name.split(':')[0]];
    }
    // Try generic name match
    else {
      const baseName = name.replace(/[:\-].*/, '').trim();
      rate = rates[baseName];
    }
    
    if (!rate) {
      traceLog.push(`No rate found for: ${name} (${userChoice})`);
      return 0;
    }
    
    // Calculate based on calculation type
    let cost = 0;
    
    if (calculation === 'perSqFt' && rate.perSqFt) {
      cost = rate.perSqFt * sqft;
      traceLog.push(`${name}: $${rate.perSqFt} × ${sqft} sq ft = $${cost}`);
    } else if (calculation === 'flat' && rate.flat) {
      cost = rate.flat;
      traceLog.push(`${name}: $${rate.flat}`);
    } else if (rate.perSqFt && sqft > 0) {
      // Default to per sq ft if available
      cost = rate.perSqFt * sqft;
      traceLog.push(`${name}: $${rate.perSqFt} × ${sqft} sq ft = $${cost}`);
    } else if (rate.flat) {
      // Default to flat rate
      cost = rate.flat;
      traceLog.push(`${name}: $${rate.flat}`);
    }
    
    return cost;
  }
  
  static sortItemsByCategory(items) {
    const categoryOrder = { 'design': 1, 'labor': 2, 'materials': 3 };
    
    return items.sort((a, b) => {
      const orderA = categoryOrder[a.category] || 4;
      const orderB = categoryOrder[b.category] || 4;
      return orderA - orderB;
    });
  }
}
