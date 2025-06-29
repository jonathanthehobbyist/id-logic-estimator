// src/index.js - Clean, modular main file
// This file now only handles API routing - all logic is in separate modules

import { SessionManager } from './core/session-manager.js';
import { StepEngine } from './core/step-engine.js';
import { PricingEngine } from './core/pricing-engine.js';
import { ResponseBuilder } from './utils/response-builder.js';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    try {
      // Route to appropriate handler
      if (url.pathname === '/' || url.pathname === '') {
        return this.handleRoot(corsHeaders);
      }
      
      if (url.pathname === '/test') {
        return this.handleTest(corsHeaders);
      }
      
      if (url.pathname === '/api/session' && request.method === 'POST') {
        return this.handleSessionCreate(corsHeaders);
      }
      
      if (url.pathname === '/api/chat' && request.method === 'POST') {
        return this.handleChat(request, corsHeaders);
      }
      
      if (url.pathname === '/api/trace' && request.method === 'GET') {
        return this.handleTrace(url, corsHeaders);
      }
      
      return this.handleNotFound(corsHeaders);
      
    } catch (error) {
      return this.handleError(error, corsHeaders);
    }
  },
  
  handleRoot(corsHeaders) {
    return new Response(JSON.stringify({ 
      message: 'Interior Design Pricing API',
      status: 'running',
      availableEndpoints: ['/test', '/api/session', '/api/chat', '/api/trace'],
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  },
  
  handleTest(corsHeaders) {
    return new Response(JSON.stringify({ 
      message: 'Enhanced Interior Design Pricing System API is running!',
      features: ['Modular architecture', 'Component-based pricing', 'Room-specific questions', 'Detailed line items'],
      endpoints: ['/api/session', '/api/chat', '/api/trace'],
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  },
  
  async handleSessionCreate(corsHeaders) {
    // Create new session
    const session = SessionManager.create();
    
    // Calculate initial pricing (empty)
    const pricing = PricingEngine.calculate(session);
    
    // Build response
    const response = ResponseBuilder.buildSessionResponse(session, pricing);
    
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  },
  
  async handleChat(request, corsHeaders) {
    const { sessionId, input } = await request.json();
    
    // Validate session exists
    if (!SessionManager.exists(sessionId)) {
      const errorResponse = ResponseBuilder.buildErrorResponse('Session not found', 404);
      return new Response(JSON.stringify(errorResponse), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Get session
    const session = SessionManager.get(sessionId);
    
    // Process the conversation step
    const updatedSession = StepEngine.processInput(session, input);
    
    // Update session in storage
    SessionManager.update(updatedSession);
    
    // Calculate pricing
    const pricing = PricingEngine.calculate(updatedSession);
    
    // Build response
    const response = ResponseBuilder.buildChatResponse(updatedSession, pricing);
    
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  },
  
  async handleTrace(url, corsHeaders) {
    const sessionId = url.searchParams.get('sessionId');
    
    if (!SessionManager.exists(sessionId)) {
      const errorResponse = ResponseBuilder.buildErrorResponse('Session not found', 404);
      return new Response(JSON.stringify(errorResponse), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const session = SessionManager.get(sessionId);
    const pricing = PricingEngine.calculate(session);
    const response = ResponseBuilder.buildTraceResponse(session, pricing);
    
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  },
  
  handleNotFound(corsHeaders) {
    const errorResponse = ResponseBuilder.buildErrorResponse('Not Found', 404);
    return new Response(JSON.stringify(errorResponse), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  },
  
  handleError(error, corsHeaders) {
    console.error('API Error:', error);
    const errorResponse = ResponseBuilder.buildErrorResponse(error.message, 500);
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};
