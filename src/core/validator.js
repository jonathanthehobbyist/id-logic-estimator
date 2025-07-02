// core/validator.js
// Handles all input validation logic

// KEEPING: import { DECISION_TREE } from '../config/decision-tree.js';
import { CONVERSATION_FLOW, ROOM_FLOWS, ConversationFlowHelper } from '../config/conversation-flow.js';

export class Validator {
  
  static validate(input, step) {
    // KEEPING: const stepConfig = DECISION_TREE[step];
    const stepConfig = ConversationFlowHelper.getCurrentStepConfig(step);
    
    if (!stepConfig) {
      return { 
        valid: false, 
        error: `Unknown step: ${step}` 
      };
    }
    
    // Handle number inputs
    if (stepConfig.inputType === 'number') {
      return this.validateNumber(input, stepConfig.validation);
    }
    
    // Handle multiple choice
    if (stepConfig.options) {
      return this.validateChoice(input, stepConfig.options);
    }
    
    // Default: accept any string
    return { 
      valid: true, 
      value: input 
    };
  }
  
  static validateNumber(input, validation = {}) {
    const num = parseInt(input);
    
    if (isNaN(num)) {
      return { 
        valid: false, 
        error: "Please enter a valid number" 
      };
    }
    
    if (validation.min && num < validation.min) {
      return { 
        valid: false, 
        error: `Please enter a number of at least ${validation.min}` 
      };
    }
    
    if (validation.max && num > validation.max) {
      return { 
        valid: false, 
        error: `Please enter a number no more than ${validation.max}` 
      };
    }
    
    return { 
      valid: true, 
      value: num 
    };
  }
  
  static validateChoice(input, options) {
    // Handle Gallery options (objects with name property)
    const validOptions = options.map(opt => opt.name || opt);

    console.log('Input:', input);
    console.log('Valid options:', validOptions);

    if (!validOptions.includes(input)) {
      return { 
        valid: false, 
        error: `Please select one of: ${validOptions.join(', ')}` 
      };
    }
    
    return { 
      valid: true, 
      value: input 
    };
  }
}
