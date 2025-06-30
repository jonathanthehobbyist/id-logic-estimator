// config/image-config.js
// Centralized image management for selection steps

export const IMAGE_CONFIG = {
  flooring: {
    kitchen: {
      'Hardwood': {
        url: 'https://www.jonsimmons.co/wp-content/uploads/2025/06/Hardwood.jpg',
        thumbnail: 'https://www.jonsimmons.co/wp-content/uploads/2025/06/Hardwood.jpg',
        description: 'Classic oak hardwood flooring',
        emoji: '🪵' // Fallback for now
      },
      'Tile': {
        url: 'https://example.com/images/kitchen-tile.jpg', 
        thumbnail: 'https://example.com/images/kitchen-tile-thumb.jpg',
        description: 'Ceramic tile with modern pattern',
        emoji: '🧱'
      },
      'Laminate': {
        url: 'https://www.jonsimmons.co/wp-content/uploads/2025/06/laminate.webp',
        thumbnail: 'https://www.jonsimmons.co/wp-content/uploads/2025/06/laminate.webp', 
        description: 'Wood-look laminate flooring',
        emoji: '📋'
      },
      'Luxury Vinyl': {
        url: 'https://example.com/images/kitchen-vinyl.jpg',
        thumbnail: 'https://example.com/images/kitchen-vinyl-thumb.jpg',
        description: 'Waterproof luxury vinyl plank',
        emoji: '💎'
      }
    },
    bathroom: {
      'Tile': {
        url: 'https://example.com/images/bathroom-tile.jpg',
        thumbnail: 'https://example.com/images/bathroom-tile-thumb.jpg',
        description: 'Porcelain floor tile',
        emoji: '🧱'
      },
      'Luxury Vinyl': {
        url: 'https://example.com/images/bathroom-vinyl.jpg',
        thumbnail: 'https://example.com/images/bathroom-vinyl-thumb.jpg',
        description: 'Waterproof luxury vinyl',
        emoji: '💎'
      },
      'Natural Stone': {
        url: 'https://example.com/images/bathroom-stone.jpg',
        thumbnail: 'https://example.com/images/bathroom-stone-thumb.jpg',
        description: 'Marble or travertine',
        emoji: '🗿'
      }
    },
    living_room: {
      'Hardwood': {
        url: 'https://example.com/images/living-hardwood.jpg',
        thumbnail: 'https://example.com/images/living-hardwood-thumb.jpg',
        description: 'Premium hardwood flooring',
        emoji: '🪵'
      },
      'Carpet': {
        url: 'https://example.com/images/living-carpet.jpg',
        thumbnail: 'https://example.com/images/living-carpet-thumb.jpg',
        description: 'Plush area carpet',
        emoji: '🧶'
      },
      'Laminate': {
        url: 'https://example.com/images/living-laminate.jpg',
        thumbnail: 'https://example.com/images/living-laminate-thumb.jpg',
        description: 'Durable laminate flooring',
        emoji: '📋'
      }
    },
    bedroom: {
      'Hardwood': {
        url: 'https://example.com/images/bedroom-hardwood.jpg',
        thumbnail: 'https://example.com/images/bedroom-hardwood-thumb.jpg',
        description: 'Warm hardwood flooring',
        emoji: '🪵'
      },
      'Carpet': {
        url: 'https://example.com/images/bedroom-carpet.jpg',
        thumbnail: 'https://example.com/images/bedroom-carpet-thumb.jpg',
        description: 'Soft bedroom carpet',
        emoji: '🧶'
      },
      'Laminate': {
        url: 'https://example.com/images/bedroom-laminate.jpg',
        thumbnail: 'https://example.com/images/bedroom-laminate-thumb.jpg',
        description: 'Easy-care laminate',
        emoji: '📋'
      }
    }
  }
};

// Helper function to get images for a specific room's flooring
export function getFlooringImages(room) {
  const roomKey = room.toLowerCase().replace(' ', '_');
  return IMAGE_CONFIG.flooring[roomKey] || {};
}

// Helper function to format images for frontend gallery
export function formatForGallery(images, pricingData = {}) {
  return Object.entries(images).map(([name, imageData]) => ({
    name: name,
    image: imageData.url || imageData.emoji, // Use URL or fallback to emoji
    thumbnail: imageData.thumbnail,
    price: pricingData[name] || 0,
    description: imageData.description
  }));
}

// Future: Add more categories
// export const IMAGE_CONFIG = {
//   flooring: { ... },
//   countertops: { ... },
//   cabinets: { ... },
//   fixtures: { ... }
// };
