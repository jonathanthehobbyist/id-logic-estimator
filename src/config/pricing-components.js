// config/pricing-components.js
// All pricing data organized by room type

export const PRICING_COMPONENTS = {
  Kitchen: {
    labor: {
      demolition: { 
        "Update (cosmetic changes)": { perSqFt: 0 },  // no demo needed
        "Partial Renovation": { perSqFt: 2 },  // Light demo
        "Full Renovation": { perSqFt: 4 },  // Full demo
        description: "Demolition work"
      },
      flooring_install: { 
        "Ceramic tile": { perSqFt: 8 },
        "Luxury vinyl plank": { perSqFt: 6 },
        "Hardwood": { perSqFt: 12 },
        "Natural stone": { perSqFt: 15 },
        "Laminate": { perSqFt: 4 },
        description: "Flooring installation" 
      },
      cabinet_install: { 
        "Keep existing cabinets": 0,
        "Reface existing cabinets": 1500,
        "Semi-custom cabinets": 3500,
        "Full custom cabinets": 5500,
        description: "Cabinet installation" 
      },
      countertop_install: { base: 800, description: "Countertop installation" },
      appliance_install: { 
        "Keep existing appliances": 0,
        "Economy package": 400,
        "Mid-range package": 600,
        "High-end package": 800,
        "Luxury package": 1200,
        description: "Appliance installation" 
      },
      plumbing_labor: { perSqFt: 6, description: "Plumbing work" },
      electrical_labor: { perSqFt: 4, description: "Electrical work" },
      tile_install: { perSqFt: 15, conditional: "backsplash", description: "Backsplash tile installation" },
      painting_labor: { perSqFt: 3, description: "Interior painting" },
      feature_install: {
        "Standard kitchen": 0,
        "Add kitchen island (+$3,000)": 800,
        "Add wine fridge (+$2,500)": 300,
        "Add both island and wine fridge (+$5,000)": 1100,
        description: "Feature installation"
      }
    },
    design: { base: 0 },
    flooring: {
      "Ceramic tile": { perSqFt: 12 },
      "Luxury vinyl plank": { perSqFt: 8 },
      "Hardwood": { perSqFt: 18 },
      "Natural stone": { perSqFt: 25 },
      "Laminate": { perSqFt: 6 }
    },
    cabinets: {
      "Keep existing cabinets": 0,
      "Reface existing cabinets": 2000,
      "Semi-custom cabinets": 4500,
      "Full custom cabinets": 9500
    },
    countertops: {
      "Laminate": 800,
      "Quartz": 2500,
      "Granite": 3200,
      "Marble": 4500,
      "Butcher Block": 1200
    },
    appliances: {
      "Keep existing appliances": 0,
      "Economy package": 2600,
      "Mid-range package": 7400,
      "High-end package": 14200,
      "Luxury package": 23800
    },
    plumbing: { base: 800, description: "Plumbing materials" },
    electrical: { base: 900, description: "Electrical materials" },
    features: {
      "Standard kitchen": 0,
      "Add kitchen island (+$3,000)": 2200,
      "Add wine fridge (+$2,500)": 2200,
      "Add both island and wine fridge (+$5,000)": 3900
    }
  },
  
  Bathroom: {
    labor: {
      demolition: { perSqFt: 18, description: "Demo existing bathroom" },
      flooring_install: { 
        "Ceramic tile": { perSqFt: 12 },
        "Porcelain tile": { perSqFt: 15 },
        "Natural stone": { perSqFt: 18 },
        "Luxury vinyl": { perSqFt: 8 },
        "Heated tile floors": { perSqFt: 25 },
        description: "Flooring installation" 
      },
      fixture_install: { 
        "Standard fixtures": 800,
        "Designer fixtures": 1200,
        "Luxury fixtures": 1800,
        description: "Fixture installation" 
      },
      tile_install: { 
        "Ceramic tile": { perSqFt: 12 },
        "Porcelain tile": { perSqFt: 15 },
        "Natural stone": { perSqFt: 18 },
        "Luxury marble": { perSqFt: 25 },
        "Glass tile": { perSqFt: 20 },
        description: "Wall tile installation"
      },
      plumbing_labor: { perSqFt: 15, description: "Plumbing work" },
      electrical_labor: { perSqFt: 6, description: "Electrical work" },
      ventilation_install: { base: 400, description: "Ventilation installation" },
      painting_labor: { perSqFt: 4, description: "Interior painting" },
      feature_install: {
        "Standard bathroom": 0,
        "Add steam shower (+$4,000)": 1200,
        "Add soaking tub (+$2,500)": 800,
        "Add both steam shower and soaking tub (+$6,000)": 2000,
        description: "Feature installation"
      }
    },
    design: { base: 1000 },
    flooring: {
      "Ceramic tile": { perSqFt: 8 },
      "Porcelain tile": { perSqFt: 12 },
      "Natural stone": { perSqFt: 18 },
      "Luxury vinyl": { perSqFt: 6 },
      "Heated tile floors": { perSqFt: 35 }
    },
    fixtures: {
      "Standard fixtures": 700,
      "Designer fixtures": 2300,
      "Luxury fixtures": 4200
    },
    tile: {
      "Ceramic tile": { perSqFt: 6 },
      "Porcelain tile": { perSqFt: 9 },
      "Natural stone": { perSqFt: 12 },
      "Luxury marble": { perSqFt: 18 },
      "Glass tile": { perSqFt: 15 }
    },
    plumbing: { base: 500, description: "Plumbing materials" },
    electrical: { base: 200, description: "Electrical materials" },
    ventilation: { base: 200, description: "Ventilation materials" },
    features: {
      "Standard bathroom": 0,
      "Add steam shower (+$4,000)": 2800,
      "Add soaking tub (+$2,500)": 1700,
      "Add both steam shower and soaking tub (+$6,000)": 4000
    }
  },

  "Living Room": {
    labor: {
      demolition: { perSqFt: 4, description: "Demo and prep work" },
      flooring_install: { 
        "Carpet": { perSqFt: 4 },
        "Hardwood": { perSqFt: 10 },
        "Luxury vinyl plank": { perSqFt: 5 },
        "Laminate": { perSqFt: 3 },
        "Area rugs over existing": { perSqFt: 0 },
        description: "Flooring installation" 
      },
      furniture_delivery: { 
        "Basic furniture package": 200,
        "Designer furniture package": 400,
        "Luxury furniture package": 600,
        description: "Furniture delivery & setup" 
      },
      electrical_labor: { perSqFt: 3, description: "Electrical work" },
      painting_labor: { perSqFt: 2.5, description: "Interior painting" },
      feature_install: {
        "No built-ins": 0,
        "Built-in shelving (+$2,000)": 600,
        "Entertainment center (+$3,500)": 800,
        "Both shelving and entertainment center (+$5,000)": 1400,
        description: "Built-in installation"
      }
    },
    design: { base: 1200 },
    flooring: {
      "Carpet": { perSqFt: 8 },
      "Hardwood": { perSqFt: 18 },
      "Luxury vinyl plank": { perSqFt: 10 },
      "Laminate": { perSqFt: 6 },
      "Area rugs over existing": { perSqFt: 4 }
    },
    furniture: {
      "Basic furniture package": 1800,
      "Designer furniture package": 5600,
      "Luxury furniture package": 11400
    },
    lighting: {
      "Basic lighting": 800,
      "Designer lighting": 2000,
      "Smart home lighting": 3500
    },
    electrical: { base: 200, description: "Electrical materials" },
    features: {
      "No built-ins": 0,
      "Built-in shelving (+$2,000)": 1400,
      "Entertainment center (+$3,500)": 2700,
      "Both shelving and entertainment center (+$5,000)": 3600
    }
  },

  Bedroom: {
    labor: {
      demolition: { perSqFt: 3, description: "Demo and prep work" },
      flooring_install: { 
        "Carpet": { perSqFt: 4 },
        "Hardwood": { perSqFt: 10 },
        "Luxury vinyl plank": { perSqFt: 5 },
        "Laminate": { perSqFt: 3 },
        "Keep existing flooring": { perSqFt: 0 },
        description: "Flooring installation" 
      },
      furniture_delivery: { 
        "Essential package": 150,
        "Comfort package": 300,
        "Luxury suite": 500,
        description: "Furniture delivery & setup" 
      },
      closet_install: {
        "Keep existing closet": 0,
        "Basic closet organization (+$800)": 200,
        "Custom closet system (+$2,500)": 600,
        "Walk-in closet design (+$5,000)": 1200,
        description: "Closet installation"
      },
      electrical_labor: { perSqFt: 2, description: "Electrical work" },
      painting_labor: { perSqFt: 2.5, description: "Interior painting" },
      feature_install: {
        "Standard bedroom": 0,
        "Add reading nook (+$1,500)": 400,
        "Add desk area (+$1,200)": 300,
        "Add both nook and desk (+$2,500)": 700,
        description: "Feature installation"
      }
    },
    design: { base: 800 },
    flooring: {
      "Carpet": { perSqFt: 8 },
      "Hardwood": { perSqFt: 18 },
      "Luxury vinyl plank": { perSqFt: 10 },
      "Laminate": { perSqFt: 6 },
      "Keep existing flooring": { perSqFt: 0 }
    },
    furniture: {
      "Essential package": 1350,
      "Comfort package": 3700,
      "Luxury suite": 7500
    },
    lighting: { base: 600 },
    electrical: { base: 100, description: "Electrical materials" },
    closet: {
      "Keep existing closet": 0,
      "Basic closet organization (+$800)": 600,
      "Custom closet system (+$2,500)": 1900,
      "Walk-in closet design (+$5,000)": 3800
    },
    features: {
      "Standard bedroom": 0,
      "Add reading nook (+$1,500)": 1100,
      "Add desk area (+$1,200)": 900,
      "Add both nook and desk (+$2,500)": 1800
    }
  }
};
