// core/progress-tracker.js
// Calculates progress percentage based on current step

export class ProgressTracker {
  
  static getProgress(step) {
    const progressMap = {
      'initial': 0,
      'square_footage': 20,
      'project_type': 40,
      
      // Room-specific steps
      'kitchen_flooring': 60,
      'kitchen_cabinets': 70,
      'kitchen_countertops': 80,
      'kitchen_appliances': 90,
      'kitchen_features': 95,
      
      'bathroom_flooring': 60,
      'bathroom_fixtures': 70,
      'bathroom_features': 80,
      'bathroom_tile': 90,
      
      'living_room_flooring': 70,
      'living_room_furniture': 80,
      'living_room_features': 90,
      'living_room_lighting': 95,
      
      'bedroom_flooring': 70,
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
