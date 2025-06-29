// config/multipliers.js
// Style, budget, and project type multipliers

export const MULTIPLIERS = {
  budget: {
    "$5,000 - $15,000": 1.0,
    "$15,000 - $35,000": 1.0,
    "$35,000 - $75,000": 1.0,
    "$75,000+": 1.0
  },
  style: {
    "Modern": 1.0,
    "Traditional": 1.0,
    "Transitional": 1.0,
    "Industrial": 1.0,
    "Scandinavian": 1.0
  },
  project: {
    "Update (cosmetic changes)": 0.6,
    "Partial Renovation": 0.8,
    "Full Renovation": 1.0
  }
};

// Room-specific component mapping for easier processing
export const ROOM_COMPONENT_MAPPING = {
  'Kitchen': ['flooring', 'cabinets', 'countertops', 'appliances', 'plumbing', 'electrical', 'features'],
  'Bathroom': ['flooring', 'fixtures', 'tile', 'plumbing', 'electrical', 'ventilation', 'features'],
  'Living Room': ['flooring', 'furniture', 'lighting', 'electrical', 'features'],
  'Bedroom': ['flooring', 'furniture', 'lighting', 'electrical', 'closet', 'features']
};
