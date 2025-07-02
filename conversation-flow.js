// config/conversation-flow.js
// Converted from your current decision-tree.js and step-engine.js

export const CONVERSATION_FLOW = {
  
  // ==================== INITIAL QUESTIONS ====================
  initial: {
    question: "Hi, this app will walk you through getting an estimate for an interior design project. Which room would you like to work on?",
    inputType: "choice",
    options: ["Kitchen", "Living Room", "Bedroom", "Bathroom"],
    lineItems: [], // Just sets room context
    next: "square_footage"
  },

  square_footage: {
    question: "What's the approximate square footage?",
    inputType: "number",
    validation: { min: 50, max: 2000, digitsOnly: true },
    lineItems: [], // Used for calculations
    next: "project_type"
  },

  project_type: {
    question: "What type of project is this?",
    inputType: "choice",
    options: ["Update (cosmetic changes)", "Partial Renovation", "Full Renovation"],
    lineItems: [
      {
        condition: "Full Renovation",
        items: [
          { name: "Demolition", calculation: "perSqFt", category: "labor" }
        ]
      }
    ],
    next: "roomSpecific" // Special keyword to branch by room
  },

  // ==================== KITCHEN FLOW ====================
  kitchen_flooring: {
    question: "What type of flooring do you want?",
    inputType: "choice",
    options: ["Laminate", "Vinyl", "Hardwood", "Tile", "Natural Stone"],
    lineItems: [
      { name: "Flooring Materials", calculation: "perSqFt", category: "materials" },
      { name: "Flooring Installation", calculation: "perSqFt", category: "labor" }
    ],
    next: "kitchen_cabinets"
  },

  kitchen_cabinets: {
    question: "What type of cabinets do you want?",
    inputType: "choice",
    options: ["Stock cabinets", "Semi-custom cabinets", "Full custom cabinets", "Cabinet refacing"],
    lineItems: [
      { name: "Cabinets", calculation: "flat", category: "materials" }
    ],
    next: "kitchen_countertops"
  },

  kitchen_countertops: {
    question: "Choose your countertop material:",
    inputType: "gallery", // Image selection
    options: [
      { 
        name: "Laminate", 
        image: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400&h=300&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=200&h=150&fit=crop",
        description: "Affordable laminate countertops"
      },
      { 
        name: "Quartz", 
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=150&fit=crop",
        description: "Durable engineered quartz"
      },
      { 
        name: "Granite", 
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop",
        description: "Natural granite stone"
      },
      { 
        name: "Butcher Block", 
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&sat=-100",
        thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop&sat=-100",
        description: "Warm wood countertops"
      }
    ],
    lineItems: [
      { name: "Countertops", calculation: "perSqFt", category: "materials" },
      { name: "Countertop Installation", calculation: "perSqFt", category: "labor", autoInclude: true }
    ],
    next: "kitchen_appliances"
  },

  kitchen_appliances: {
    question: "Choose your appliance package:",
    inputType: "choice",
    options: ["Basic package", "Mid-range package", "High-end package", "Premium package", "No appliances"],
    lineItems: [
      {
        condition: "not No appliances",
        items: [{ name: "Appliances", calculation: "flat", category: "materials" }]
      }
    ],
    next: "kitchen_features"
  },

  kitchen_features: {
    question: "Any additional features?",
    inputType: "choice",
    options: ["Standard kitchen", "Kitchen island", "Pantry upgrade", "Wine storage"],
    lineItems: [
      {
        condition: "not Standard kitchen",
        items: [{ name: "Additional Features", calculation: "flat", category: "materials" }]
      }
    ],
    next: "complete"
  },

  // ==================== BATHROOM FLOW ====================
  bathroom_flooring: {
    question: "What type of flooring do you want?",
    inputType: "choice",
    options: ["Tile", "Vinyl", "Natural Stone", "Heated floors"],
    lineItems: [
      { name: "Flooring Materials", calculation: "perSqFt", category: "materials" },
      { name: "Flooring Installation", calculation: "perSqFt", category: "labor" }
    ],
    next: "bathroom_fixtures"
  },

  bathroom_fixtures: {
    question: "Choose your fixture package:",
    inputType: "choice",
    options: ["Basic", "Standard", "Premium", "Luxury"],
    lineItems: [
      { name: "Fixtures", calculation: "flat", category: "materials" }
    ],
    next: "bathroom_vanity"
  },

  bathroom_vanity: {
    question: "What type of vanity?",
    inputType: "choice",
    options: ["Stock vanity", "Custom vanity", "Double vanity", "Floating vanity"],
    lineItems: [
      { name: "Vanity", calculation: "flat", category: "materials" }
    ],
    next: "complete"
  },

  // ==================== LIVING ROOM FLOW ====================
  living_room_flooring: {
    question: "What type of flooring do you want?",
    inputType: "choice",
    options: ["Carpet", "Hardwood", "Laminate", "Tile"],
    lineItems: [
      { name: "Flooring Materials", calculation: "perSqFt", category: "materials" },
      { name: "Flooring Installation", calculation: "perSqFt", category: "labor" }
    ],
    next: "living_room_features"
  },

  living_room_features: {
    question: "Any additional features?",
    inputType: "choice",
    options: ["Standard living room", "Built-in shelving", "Fireplace upgrade", "Entertainment center"],
    lineItems: [
      {
        condition: "not Standard living room",
        items: [{ name: "Additional Features", calculation: "flat", category: "materials" }]
      }
    ],
    next: "complete"
  },

  // ==================== BEDROOM FLOW ====================
  bedroom_flooring: {
    question: "What type of flooring do you want?",
    inputType: "choice",
    options: ["Carpet", "Hardwood", "Laminate", "Vinyl"],
    lineItems: [
      { name: "Flooring Materials", calculation: "perSqFt", category: "materials" },
      { name: "Flooring Installation", calculation: "perSqFt", category: "labor" }
    ],
    next: "bedroom_features"
  },

  bedroom_features: {
    question: "Any additional features?",
    inputType: "choice",
    options: ["Standard bedroom", "Walk-in closet", "Built-in wardrobes", "Reading nook"],
    lineItems: [
      {
        condition: "not Standard bedroom",
        items: [{ name: "Additional Features", calculation: "flat", category: "materials" }]
      }
    ],
    next: "complete"
  }
};

// ==================== ALWAYS INCLUDED ITEMS ====================
export const ALWAYS_INCLUDED = [
  { 
    name: "Design Consultation", 
    price: 0, // Changed from 500 to make it free
    category: "design", 
    description: "Complimentary design consultation" 
  }
];

// ==================== ROOM ROUTING ====================
export const ROOM_FLOWS = {
  "Kitchen": "kitchen_flooring",
  "Living Room": "living_room_flooring", 
  "Bedroom": "bedroom_flooring",
  "Bathroom": "bathroom_flooring"
};

// ==================== SIMPLIFIED ENGINE HELPER ====================
export class ConversationFlowHelper {
  
  static getCurrentStepConfig(stepName) {
    return CONVERSATION_FLOW[stepName];
  }
  
  static getNextStep(currentStepName, userInput, sessionData) {
    const currentStep = CONVERSATION_FLOW[currentStepName];
    
    if (currentStep.next === 'roomSpecific') {
      // Branch to room-specific flow
      const room = sessionData.room || sessionData.initial;
      return ROOM_FLOWS[room];
    }
    
    return currentStep.next;
  }
  
  static getLineItemsForStep(stepName, userInput) {
    const stepConfig = CONVERSATION_FLOW[stepName];
    const lineItems = [];
    
    stepConfig.lineItems?.forEach(lineItemDef => {
      if (this.shouldAddLineItem(lineItemDef, userInput)) {
        if (lineItemDef.items) {
          // Multiple items with conditions
          lineItemDef.items.forEach(item => {
            lineItems.push({
              name: `${item.name}: ${userInput}`,
              calculation: item.calculation,
              category: item.category,
              userChoice: userInput,
              stepName: stepName
            });
          });
        } else {
          // Single item
          lineItems.push({
            name: `${lineItemDef.name}: ${userInput}`,
            calculation: lineItemDef.calculation,
            category: lineItemDef.category,
            userChoice: userInput,
            stepName: stepName,
            autoInclude: lineItemDef.autoInclude || false
          });
        }
      }
    });
    
    return lineItems;
  }
  
  static shouldAddLineItem(lineItemDef, userInput) {
    if (!lineItemDef.condition) return true;
    
    // Simple condition checking
    if (lineItemDef.condition === userInput) return true;
    if (lineItemDef.condition === `not ${userInput}`) return false;
    if (lineItemDef.condition.startsWith('not ') && 
        !userInput.includes(lineItemDef.condition.substring(4))) return true;
    
    return false;
  }
}

// ==================== USAGE EXAMPLE ====================
/*
// Get current step config:
const stepConfig = ConversationFlowHelper.getCurrentStepConfig('kitchen_cabinets');
console.log(stepConfig.question); // "What type of cabinets do you want?"

// Get next step:
const nextStep = ConversationFlowHelper.getNextStep('project_type', 'Full Renovation', { room: 'Kitchen' });
console.log(nextStep); // "kitchen_flooring"

// Get line items for a selection:
const lineItems = ConversationFlowHelper.getLineItemsForStep('kitchen_cabinets', 'Full custom cabinets');
console.log(lineItems); 
// [{ name: "Cabinets: Full custom cabinets", calculation: "flat", category: "materials", ... }]
*/

// ==================== USAGE EXAMPLES ====================

// Get current step configuration:
// const stepConfig = CONVERSATION_FLOW['kitchen_cabinets'];
// console.log(stepConfig.question); // "What type of cabinets do you want?"

// Get line items for a selection:
// const lineItems = stepConfig.lineItems; // Array of items to add to pricing

// Get next step:
// const nextStep = stepConfig.next; // "kitchen_countertops"

// Check if input should be validated:
// const needsValidation = stepConfig.validation; // { min: 50, max: 2000, digitsOnly: true }

// ==================== HOW TO MAKE CHANGES ====================

/* 
EASY CHANGES (just edit this file):

1. Change a question:
   kitchen_cabinets.question = "What cabinet style do you prefer?";

2. Add/remove options:
   kitchen_cabinets.options.push("European style cabinets");

3. Change step order:
   kitchen_cabinets.next = "kitchen_appliances"; // Skip countertops

4. Make design consultation cost money:
   ALWAYS_INCLUDED[0].price = 500;

5. Add new step:
   kitchen_backsplash: {
     question: "Choose your backsplash:",
     inputType: "choice",
     options: ["Subway tile", "Natural stone", "Glass tile"],
     lineItems: [
       { name: "Backsplash", calculation: "perSqFt", category: "materials" }
     ],
     next: "kitchen_appliances"
   }

MEDIUM CHANGES (edit this file + simple code changes):

1. Add new input type (like multi-select)
2. Add conditional line items based on multiple factors
3. Add new room type (copy existing room structure)

COMPLEX CHANGES (requires more code):

1. Change calculation logic (edit pricing engine)
2. Add complex validation rules
3. Add dynamic pricing based on location
*/

