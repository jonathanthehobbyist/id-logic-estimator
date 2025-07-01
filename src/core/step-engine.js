// core/step-engine.js
// Handles conversation flow and step transitions

import { DECISION_TREE } from '../config/decision-tree.js';
import { Validator } from './validator.js';
import { SessionManager } from './session-manager.js';

export class StepEngine {
  
  static processInput(session, input) {
    // Validate the input
    const validation = Validator.validate(input, session.step);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    
    // Add to history
    SessionManager.addToHistory(session, session.step, validation.value);
    
    // Store the input and advance step
    const updatedSession = this.advanceStep(session, validation.value);
    
    return updatedSession;
  }
  
  static advanceStep(session, input) {
    // Store the input in the appropriate data field
    this.storeInput(session, input);
    
    // Move to the next step
    session.step = this.getNextStep(session);
    
    return session;
  }
  
  static storeInput(session, input) {
    switch(session.step) {
      case 'initial':
        session.data.room = input;
        break;
      case 'square_footage':
        session.data.squareFootage = input;
        break;
      default:
        // Room-specific steps
        session.data[session.step] = input;
        break;
    }
  }
  
  static getNextStep(session) {
    switch(session.step) {
      case 'initial':
        //return 'room_selected';
      //case 'room_selected':
        return 'square_footage';
      case 'square_footage':
        return 'project_type';
      case 'project_type':
        // Skip to room-specific questions
        return this.getRoomSpecificFirstStep(session.data.room);
      default:
        // Use decision tree for room-specific steps
        const currentStepConfig = DECISION_TREE[session.step];
        if (currentStepConfig?.next === 'complete') {
          return 'complete';
        }
        return currentStepConfig?.next || 'complete';
    }
  }
  
  static getRoomSpecificFirstStep(room) {
    const roomKey = room.toLowerCase().replace(' ', '_');
    switch(roomKey) {
      case 'kitchen': return 'kitchen_flooring';
      case 'bathroom': return 'bathroom_flooring';
      case 'living_room': return 'living_room_flooring';
      case 'bedroom': return 'bedroom_flooring';
      default: return 'complete';
    }
  }
  
  static getCurrentStepConfig(step) {
    return DECISION_TREE[step];
  }
  
  static isComplete(step) {
    return step === 'complete';
  }
}
