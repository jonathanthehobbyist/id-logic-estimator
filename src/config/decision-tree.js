// config/decision-tree.js
// All conversation flow logic

export const DECISION_TREE = {
  initial: {
    question: "Which room would you like to work on?",
    options: ["Kitchen", "Living Room", "Bedroom", "Bathroom"],
    next: "room_selected"
  },
  room_selected: {
    question: "What's the approximate square footage?",
    inputType: "number",
    validation: { min: 50, max: 2000 },
    next: "square_footage"
  },
  square_footage: {
    question: "What's your budget range?",
    options: ["$5,000 - $15,000", "$15,000 - $35,000", "$35,000 - $75,000", "$75,000+"],
    next: "budget_selected"
  },
  budget_selected: {
    question: "What type of project is this?",
    options: ["Update (cosmetic changes)", "Partial Renovation", "Full Renovation"],
    next: "project_type"
  },
  
  // Kitchen-specific flow
  kitchen_flooring: {
    question: "What type of flooring do you want?",
    options: ["Ceramic tile", "Luxury vinyl plank", "Hardwood", "Natural stone", "Laminate"],
    next: "kitchen_cabinets"
  },
  kitchen_cabinets: {
    question: "What type of cabinets do you want?",
    options: ["Keep existing cabinets", "Reface existing cabinets", "Semi-custom cabinets", "Full custom cabinets"],
    next: "kitchen_countertops"
  },
  kitchen_countertops: {
    question: "What countertop material do you prefer?",
    options: ["Laminate", "Quartz", "Granite", "Marble", "Butcher Block"],
    next: "kitchen_appliances"
  },
  kitchen_appliances: {
    question: "Choose your appliance package:",
    options: ["Keep existing appliances", "Economy package", "Mid-range package", "High-end package", "Luxury package"],
    next: "kitchen_features"
  },
  kitchen_features: {
    question: "Any additional features?",
    options: ["Standard kitchen", "Add kitchen island (+$3,000)", "Add wine fridge (+$2,500)", "Add both island and wine fridge (+$5,000)"],
    next: "complete"
  },

  // Bathroom-specific flow
  bathroom_flooring: {
    question: "What type of flooring do you want?",
    options: ["Ceramic tile", "Porcelain tile", "Natural stone", "Luxury vinyl", "Heated tile floors"],
    next: "bathroom_fixtures"
  },
  bathroom_fixtures: {
    question: "What fixtures do you want?",
    options: ["Standard fixtures", "Designer fixtures", "Luxury fixtures"],
    next: "bathroom_features"
  },
  bathroom_features: {
    question: "Any special features?",
    options: ["Standard bathroom", "Add steam shower (+$4,000)", "Add soaking tub (+$2,500)", "Add both steam shower and soaking tub (+$6,000)"],
    next: "bathroom_tile"
  },
  bathroom_tile: {
    question: "What type of wall tile/backsplash?",
    options: ["Ceramic tile", "Porcelain tile", "Natural stone", "Luxury marble", "Glass tile"],
    next: "complete"
  },

  // Living Room-specific flow
  living_room_flooring: {
    question: "What type of flooring do you want?",
    options: ["Carpet", "Hardwood", "Luxury vinyl plank", "Laminate", "Area rugs over existing"],
    next: "living_room_furniture"
  },
  living_room_furniture: {
    question: "What furniture package do you want?",
    options: ["Basic furniture package", "Designer furniture package", "Luxury furniture package"],
    next: "living_room_features"
  },
  living_room_features: {
    question: "Any built-in features?",
    options: ["No built-ins", "Built-in shelving (+$2,000)", "Entertainment center (+$3,500)", "Both shelving and entertainment center (+$5,000)"],
    next: "living_room_lighting"
  },
  living_room_lighting: {
    question: "What lighting package?",
    options: ["Basic lighting", "Designer lighting", "Smart home lighting"],
    next: "complete"
  },

  // Bedroom-specific flow
  bedroom_flooring: {
    question: "What type of flooring do you want?",
    options: ["Carpet", "Hardwood", "Luxury vinyl plank", "Laminate", "Keep existing flooring"],
    next: "bedroom_furniture"
  },
  bedroom_furniture: {
    question: "What furniture package do you want?",
    options: ["Essential package", "Comfort package", "Luxury suite"],
    next: "bedroom_closet"
  },
  bedroom_closet: {
    question: "What about closet organization?",
    options: ["Keep existing closet", "Basic closet organization (+$800)", "Custom closet system (+$2,500)", "Walk-in closet design (+$5,000)"],
    next: "bedroom_features"
  },
  bedroom_features: {
    question: "Any additional features?",
    options: ["Standard bedroom", "Add reading nook (+$1,500)", "Add desk area (+$1,200)", "Add both nook and desk (+$2,500)"],
    next: "complete"
  }
};
