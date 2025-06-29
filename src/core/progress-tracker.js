// core/progress-tracker.js
// Calculates progress percentage based on current step

export class ProgressTracker {
  
  static getProgress(step) {
    const progressMap = {
      'initial': 10,
      'room_selected': 20,
      'square_footage': 40,
      'budget_selected': 60,
      
      // Room-specific steps
      'kitchen_flooring': 75,
      'kitchen_cabinets': 80,
      'kitchen_countertops': 85,
      'kitchen_appliances': 90,
      'kitchen_features': 95,
      
      'bathroom_flooring': 75,
      'bathroom_fixtures': 80,
      'bathroom_features': 90,
      'bathroom_tile': 95,
      
      'living_room_flooring': 75,
      'living_room_furniture': 80,
      'living_room_features': 90,
      'living_room_lighting': 95,
      
      'bedroom_flooring': 75,
      'bedroom_furniture': 80,
      'bedroom_closet': 90,
      'bedroom_features': 95,
      
      'complete': 100
    };
    
    const progress = progressMap[step] || 0;
    const text = progress === 100 ? 'Complete!' : `${progress}% complete`;
    
    return { progress, text };
  }
  
  // Helper to add new room types
  static addRoomProgress(roomName, steps) {
    // This would be used when adding new room types
    // Example: ProgressTracker.addRoomProgress('office', ['office_flooring', 'office_furniture'])
  }
}
