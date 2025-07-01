// utils/response-builder.js
// Formats API responses consistently

import { StepEngine } from '../core/step-engine.js';
import { ProgressTracker } from '../core/progress-tracker.js';
import { getCountertopImages, formatForGallery } from '../config/image-config.js';
import { PRICING_COMPONENTS } from '../config/pricing-components.js'; 

export class ResponseBuilder {
  
  static buildChatResponse(session, pricing) {
    const nextStepConfig = StepEngine.getCurrentStepConfig(session.step);
    const progress = ProgressTracker.getProgress(session.step);
    const isComplete = StepEngine.isComplete(session.step);

    console.log('=== RESPONSE BUILDER DEBUG ===');
    console.log('Current step:', session.step);
    console.log('Step config:', nextStepConfig);
    console.log('Input type:', nextStepConfig?.inputType);
    console.log('Is image step?', nextStepConfig?.inputType === 'image');

     // Check if current step requires image selection
    if (nextStepConfig?.inputType === 'image') {
        console.log('CALLING buildImageSelectionResponse');
        return this.buildImageSelectionResponse(session, pricing, nextStepConfig, progress);
    }

    console.log('Using regular text response');

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

   // NEW: Handle image selection steps
  static buildImageSelectionResponse(session, pricing, nextStepConfig, progress) {
    const category = nextStepConfig?.category;
    const room = session.data.room;
    
    let images = {};
    let packages = [];
    
    if (category === 'countertops') {
      images = getCountertopImages(room);
      
      // Get pricing data for countertops
      const roomKey = room.replace(' ', '');
      const countertopPricing = PRICING_COMPONENTS[roomKey]?.countertops || {};
      
      // Format for gallery using the helper function
      packages = formatForGallery(images, countertopPricing);
    }
    // Add other categories here later (flooring, etc.)
    
    return {
      sessionId: session.id,
      step: session.step,
      nextStep: nextStepConfig,
      data: session.data,
      pricing: pricing,
      progress: progress,
      message: nextStepConfig?.question || `Choose your ${category}:`,
      packages: packages, // This triggers the image gallery in frontend
      complete: false
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
