// core/simple-conversation-engine.js
// Fresh, minimal engine that only uses conversation-flow.js

import { CONVERSATION_FLOW, ROOM_FLOWS, ALWAYS_INCLUDED } from '../config/conversation-flow.js';

export class SimpleConversationEngine {
  
  static createSession() {
    return {
      id: this.generateId(),
      step: 'initial',
      data: {},
      lineItems: [...ALWAYS_INCLUDED], // Start with always included items
      history: []
    };
  }
  
  static processInput(session, userInput) {
    const currentStep = CONVERSATION_FLOW[session.step];
    
    if (!currentStep) {
      throw new Error(`Unknown step: ${session.step}`);
    }
    
    // Store the input
    session.data[session.step] = userInput;
    session.history.push({ step: session.step, input: userInput });
    
    // Add any line items for this step
    this.addLineItems(session, currentStep, userInput);
    
    // Move to next step
    session.step = this.getNextStep(currentStep, userInput, session.data);
    
    return session;
  }
  
  static addLineItems(session, stepConfig, userInput) {
    if (!stepConfig.lineItems) return;
    
    stepConfig.lineItems.forEach(lineItemDef => {
      if (this.shouldAddLineItem(lineItemDef, userInput)) {
        
        if (lineItemDef.items) {
          // Multiple items with conditions
          lineItemDef.items.forEach(item => {
            session.lineItems.push({
              name: `${item.name}: ${userInput}`,
              calculation: item.calculation,
              category: item.category,
              stepName: session.step,
              userChoice: userInput
            });
          });
        } else {
          // Single item
          session.lineItems.push({
            name: `${lineItemDef.name}: ${userInput}`,
            calculation: lineItemDef.calculation,
            category: lineItemDef.category,
            stepName: session.step,
            userChoice: userInput,
            autoInclude: lineItemDef.autoInclude || false
          });
        }
      }
    });
  }
  
  static shouldAddLineItem(lineItemDef, userInput) {
    if (!lineItemDef.condition) return true;
    
    if (lineItemDef.condition === userInput) return true;
    if (lineItemDef.condition === `not ${userInput}`) return false;
    if (lineItemDef.condition.startsWith('not ') && 
        !userInput.includes(lineItemDef.condition.substring(4))) return true;
    
    return false;
  }
  
  static getNextStep(currentStepConfig, userInput, sessionData) {
    if (currentStepConfig.next === 'roomSpecific') {
      const room = sessionData.initial; // Room selection from first step
      return ROOM_FLOWS[room] || 'complete';
    }
    
    return currentStepConfig.next || 'complete';
  }
  
  static getCurrentStepConfig(stepName) {
    return CONVERSATION_FLOW[stepName];
  }
  
  static isComplete(stepName) {
    return stepName === 'complete';
  }
  
  static validateInput(stepName, userInput) {
    const stepConfig = CONVERSATION_FLOW[stepName];
    
    if (!stepConfig) {
      return { valid: false, error: `Unknown step: ${stepName}` };
    }
    
    // Number validation
    if (stepConfig.inputType === 'number') {
      const num = parseInt(userInput);
      if (isNaN(num)) {
        return { valid: false, error: "Please enter a valid number" };
      }
      if (stepConfig.validation?.min && num < stepConfig.validation.min) {
        return { valid: false, error: `Please enter at least ${stepConfig.validation.min}` };
      }
      if (stepConfig.validation?.max && num > stepConfig.validation.max) {
        return { valid: false, error: `Please enter no more than ${stepConfig.validation.max}` };
      }
      return { valid: true, value: num };
    }
    
    // Choice validation (handles both strings and gallery objects)
    if (stepConfig.options) {
      const validOptions = stepConfig.options.map(opt => opt.name || opt);
      if (!validOptions.includes(userInput)) {
        return { valid: false, error: `Please select one of: ${validOptions.join(', ')}` };
      }
      return { valid: true, value: userInput };
    }
    
    // Default: accept any string
    return { valid: true, value: userInput };
  }
  
  static generateId() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}

// Simple in-memory session storage
const sessions = new Map();

export class SimpleSessionManager {
  
  static create() {
    const session = SimpleConversationEngine.createSession();
    sessions.set(session.id, session);
    return session;
  }
  
  static get(sessionId) {
    return sessions.get(sessionId);
  }
  
  static exists(sessionId) {
    return sessions.has(sessionId);
  }
  
  static update(session) {
    sessions.set(session.id, session);
    return session;
  }
  
  static delete(sessionId) {
    sessions.delete(sessionId);
  }
}
