// src/index.js - Fresh, simple Worker
import { SimpleConversationEngine, SimpleSessionManager } from './core/simple-conversation-engine.js';
import { SimplePricingEngine } from './core/simple-pricing-engine.js';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    try {
      // Routes
      if (url.pathname === '/api/session' && request.method === 'POST') {
        return this.handleCreateSession(corsHeaders);
      }
      
      if (url.pathname === '/api/chat' && request.method === 'POST') {
        return this.handleChat(request, corsHeaders);
      }
      
      if (url.pathname === '/test') {
        return new Response(JSON.stringify({ 
          message: 'Fresh Simple API Working!',
          timestamp: new Date().toISOString()
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },
  
  async handleCreateSession(corsHeaders) {
    const session = SimpleSessionManager.create();
    const pricing = SimplePricingEngine.calculate(session);
    const stepConfig = SimpleConversationEngine.getCurrentStepConfig(session.step);
    
    const response = {
      sessionId: session.id,
      step: session.step,
      message: stepConfig.question,
      nextStep: stepConfig,
      data: session.data,
      pricing: pricing,
      progress: { progress: 0, text: 'Getting started...' },
      complete: false
    };
    
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  },
  
  async handleChat(request, corsHeaders) {
    const { sessionId, input } = await request.json();
    
    // Get session
    if (!SimpleSessionManager.exists(sessionId)) {
      return new Response(JSON.stringify({ error: 'Session not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const session = SimpleSessionManager.get(sessionId);
    
    // Validate input
    const validation = SimpleConversationEngine.validateInput(session.step, input);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Process input
    const updatedSession = SimpleConversationEngine.processInput(session, input);
    SimpleSessionManager.update(updatedSession);
    
    // Calculate pricing
    const pricing = SimplePricingEngine.calculate(updatedSession);
    
    // Build response
    const isComplete = SimpleConversationEngine.isComplete(updatedSession.step);
    const stepConfig = isComplete ? null : SimpleConversationEngine.getCurrentStepConfig(updatedSession.step);
    
    // Calculate progress (rough estimate)
    const totalSteps = Object.keys(updatedSession.data).length;
    const progress = Math.min(90, totalSteps * 15); // Rough progress
    
    const response = {
      sessionId: updatedSession.id,
      step: updatedSession.step,
      message: isComplete ? 'Your estimate is complete!' : stepConfig.question,
      nextStep: stepConfig,
      data: updatedSession.data,
      pricing: pricing,
      progress: { 
        progress: isComplete ? 100 : progress, 
        text: isComplete ? 'Complete!' : `${progress}% complete` 
      },
      complete: isComplete,
      // Add packages for gallery steps
      packages: this.getPackagesForStep(stepConfig)
    };
    
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  },
  
  getPackagesForStep(stepConfig) {
    // Return packages for gallery input types
    if (stepConfig?.inputType === 'gallery') {
      return stepConfig.options;
    }
    return null;
  }
};
