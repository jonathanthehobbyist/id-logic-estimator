// utils/response-builder.js
// Formats API responses consistently

import { StepEngine } from '../core/step-engine.js';
import { ProgressTracker } from '../core/progress-tracker.js';

export class ResponseBuilder {
  
  static buildChatResponse(session, pricing) {
    const nextStepConfig = StepEngine.getCurrentStepConfig(session.step);
    const progress = ProgressTracker.getProgress(session.step);
    const isComplete = StepEngine.isComplete(session.step);

    let messages = [];
    if (session.step === 'room_selected') {
      messages = [
        `Great, we'll estimate a ${session.data.room.toLowerCase()} project!`,
        nextStepConfig?.question || "Let's continue..."
      ];
    } else {
      messages = [nextStepConfig?.question || `Your detailed ${session.data.room.toLowerCase() || 'project'} estimate is complete!`];
    }
    
    return {
      sessionId: session.id,
      step: session.step,
      nextStep: nextStepConfig,
      data: session.data,
      pricing: pricing,
      progress: progress,
      messages: messages,
      message: nextStepConfig?.question || `Your detailed ${session.data.room.toLowerCase() || 'project'} estimate is complete!`,
      complete: isComplete
    };
  }
  
  static buildSessionResponse(session, pricing) {
    const initialStepConfig = StepEngine.getCurrentStepConfig('initial');
    const progress = ProgressTracker.getProgress('initial');
    
    return {
      sessionId: session.id,
      step: 'initial',
      nextStep: initialStepConfig,
      data: {},
      pricing: pricing,
      progress: progress,
      message: initialStepConfig.question
    };
  }
  
  static buildTraceResponse(session, pricing) {
    return {
      sessionId: session.id,
      history: session.history,
      data: session.data,
      pricing: pricing,
      traceLog: pricing.traceLog
    };
  }
  
  static buildErrorResponse(message, statusCode = 400) {
    return {
      error: message,
      statusCode
    };
  }
}
