// config/image-config.js
// Clean image configuration - Kitchen countertops only

export const IMAGE_CONFIG = {
  countertops: {
    kitchen: {
      'Laminate': {
        url: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400&h=300&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=200&h=150&fit=crop',
        description: 'Affordable laminate countertops',
        emoji: '📋'
      },
      'Quartz': {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=150&fit=crop',
        description: 'Durable engineered quartz',
        emoji: '💎'
      },
      'Granite': {
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop',
        description: 'Natural granite stone',
        emoji: '🗿'
      },
      'Butcher Block': {
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&sat=-100',
        thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop&sat=-100',
        description: 'Warm wood countertops',
        emoji: '🪵'
      }
    }
  }
};

// Helper function to get countertop images for kitchen
export function getCountertopImages(room) {
  const roomKey = room.toLowerCase().replace(' ', '_');
  return IMAGE_CONFIG.countertops[roomKey] || {};
}

// Format images for frontend gallery
export function formatForGallery(images, pricingData = {}) {
  return Object.entries(images).map(([name, imageData]) => {
    // Extract price - handle both number and object formats
    let price = pricingData[name] || 0;
    if (typeof price === 'object' && price.perSqFt) {
      price = price.perSqFt;
    }
    
    return {
      name: name,
      image: imageData.url || imageData.emoji, // Try URL first, fallback to emoji
      thumbnail: imageData.thumbnail,
      price: price,
      description: imageData.description
    };
  });
}