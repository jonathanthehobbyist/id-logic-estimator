// core/session-manager.js
// Handles all session storage and retrieval

const sessions = new Map();

export class SessionManager {
  
  static generateId() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  static create() {
    const sessionId = this.generateId();
    const session = {
      id: sessionId,
      step: 'initial',
      data: {},
      history: [],
      created: Date.now()
    };
    
    sessions.set(sessionId, session);
    return session;
  }

  static get(sessionId) {
    return sessions.get(sessionId);
  }

  static update(session) {
    sessions.set(session.id, session);
    return session;
  }

  static addToHistory(session, step, input) {
    session.history.push({ 
      step, 
      input, 
      timestamp: Date.now() 
    });
    return session;
  }

  static exists(sessionId) {
    return sessions.has(sessionId);
  }

  // Debug helper
  static getAllSessions() {
    return Array.from(sessions.values());
  }
}
