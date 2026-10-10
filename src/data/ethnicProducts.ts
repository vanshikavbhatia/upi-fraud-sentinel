import type { EthnicProduct } from '../types';

export const ETHNIC_PRODUCTS: EthnicProduct[] = [
  // 1. SAREES
  {
    id: 'SAR-001',
    title: 'Varanasi Gold Zari Katan Silk Saree',
    subtitle: 'Pure Banarasi Handloom with Antique Kadwa Weave',
    category: 'Sarees',
    priceINR: 12999,
    mrpINR: 18999,
    discountPercent: 31,
    rating: 4.9,
    reviewsCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Banarasi Silk',
    craft: 'Zari Weave',
    occasion: 'Bridal',
    color: 'Crimson Vermilion & Gold',
    colorHex: '#991b1b',
    availableSizes: ['Free Size (6.3m with blouse)'],
    description: 'An heirloom piece handwoven in Varanasi using pure Mulberry Katan silk. Featuring intricate gold and silver zari floral motifs (Jangal jaal) on a regal crimson canvas with a heavy pallu.',
    artisanStory: 'Handcrafted by Master Weaver Rameshwar Ansari and his family in the Madanpura weaver cluster of Varanasi over 28 working days.',
    careInstructions: 'Dry clean only. Store wrapped in pure muslin cloth with neem leaves.',
    inStock: true,
    isBestseller: true,
    isHandcrafted: true,
    reviews: [
      {
        id: 'rev-1',
        userName: 'Aanya Singhania',
        rating: 5,
        date: '2 days ago',
        comment: 'Wore this for my brother’s wedding. The zari luster is breathtaking in natural light. Pure silk texture!',
        verifiedBuyer: true,
        location: 'New Delhi'
      },
      {
        id: 'rev-2',
        userName: 'Pooja Kulkarni',
        rating: 5,
        date: '1 week ago',
        comment: 'Authentic Banarasi quality. The fall and drape are regal. Loved the muslin storage bag provided.',
        verifiedBuyer: true,
        location: 'Pune'
      }
    ]
  },
  {
    id: 'SAR-002',
    title: 'Kanjeevaram Royal Temple Border Silk Saree',
    subtitle: 'Korvai Weaved Pure Mulberry Silk with Contrast Pallu',
    category: 'Sarees',
    priceINR: 17499,
    mrpINR: 24999,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 98,
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Kanjeevaram Silk',
    craft: 'Zari Weave',
    occasion: 'Wedding Guest',
    color: 'Peacock Teal & Magenta',
    colorHex: '#0f766e',
    availableSizes: ['Free Size (6.3m with blouse)'],
    description: 'Traditional Tamil Korvai technique connecting a rich peacock green-blue body with a bold magenta zari temple border and heavy gold chariot motifs.',
    artisanStory: 'Crafted on traditional pit looms in Kanchipuram, Tamil Nadu with Silk Mark certified purity.',
    careInstructions: 'Strictly dry clean only. Avoid spraying perfumes directly on the zari border.',
    inStock: true,
    isBestseller: true,
    isHandcrafted: true,
    reviews: [
      {
        id: 'rev-3',
        userName: 'Meenakshi Sundaram',
        rating: 5,
        date: '3 days ago',
        comment: 'Pure silk touch. The contrast between teal and magenta is breathtaking. Truly luxury ethnic wear.',
        verifiedBuyer: true,
        location: 'Chennai'
      }
    ]
  },
  {
    id: 'SAR-003',
    title: 'Chanderi Handblock Floral Saree',
    subtitle: 'Feather-Light Zari Pattu Border with Natural Dyes',
    category: 'Sarees',
    priceINR: 3899,
    mrpINR: 5499,
    discountPercent: 29,
    rating: 4.7,
    reviewsCount: 64,
    imageUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Chanderi Silk',
    craft: 'Zari Weave',
    occasion: 'Casual Elegance',
    color: 'Sage Mint & Rose Gold',
    colorHex: '#059669',
    availableSizes: ['Free Size (6.3m with blouse)'],
    description: 'Breezy Chanderi cotton-silk blend with delicate hand-carved teak block prints, trimmed with a shimmering micro gold zari pattu edge.',
    artisanStory: 'Hand-dyed with plant-derived pigments by artisans in Pranpur village, Madhya Pradesh.',
    careInstructions: 'Gentle hand wash in cold water using mild eco-detergent or dry clean.',
    inStock: true,
    isNewArrival: true,
    reviews: []
  },
  {
    id: 'SAR-004',
    title: 'Midnight Organza Cutwork Embroidered Saree',
    subtitle: 'Sheer Silk Organza with Scalloped Resham Border',
    category: 'Sarees',
    priceINR: 6490,
    mrpINR: 9200,
    discountPercent: 29,
    rating: 4.9,
    reviewsCount: 88,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Organza',
    craft: 'Aari Embroidery',
    occasion: 'Festive',
    color: 'Midnight Obsidian',
    colorHex: '#1e1b4b',
    availableSizes: ['Free Size (6.3m with blouse)'],
    description: 'Contemporary cocktail ethnic statement. Translucent silk organza adorned with delicate pearl floral scatter and scalloped embroidered borders.',
    artisanStory: 'Embroidered by Kashmiri Aari artisans in Srinagar using high-grade silk threads.',
    careInstructions: 'Dry clean only. Iron on low heat using a protective cotton layer.',
    inStock: true,
    isNewArrival: true,
    reviews: []
  },

  // 2. KURTAS & SETS
  {
    id: 'KUR-001',
    title: 'Noor Hand-Embroidered Chanderi Kurta Set',
    subtitle: '3-Piece Set: Silk Kurta, Straight Pants & Organza Dupatta',
    category: 'Kurtas',
    priceINR: 4499,
    mrpINR: 6999,
    discountPercent: 35,
    rating: 4.8,
    reviewsCount: 110,
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Chanderi Silk',
    craft: 'Gota Patti',
    occasion: 'Festive',
    color: 'Haldi Mustard & Ivory',
    colorHex: '#d97706',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Radiant festive ensemble. The straight-cut Chanderi kurta features marodi neckline detailing, paired with tailored cotton-silk trousers and a scalloped dupatta.',
    artisanStory: 'Designed in Jaipur using heritage Gota work techniques passed down across three generations.',
    careInstructions: 'Dry clean recommended for first two washes.',
    inStock: true,
    isBestseller: true,
    reviews: [
      {
        id: 'rev-4',
        userName: 'Rhea Kapoor',
        rating: 5,
        date: '5 days ago',
        comment: 'Fits true to size! The mustard shade is so regal for Haldi ceremonies.',
        verifiedBuyer: true,
        location: 'Mumbai'
      }
    ]
  },
  {
    id: 'KUR-002',
    title: 'Kashmiri Tilla Aari Work Straight Kurta Set',
    subtitle: 'Pure Velvet Kurta with Culottes & Zari Stole',
    category: 'Kurtas',
    priceINR: 5999,
    mrpINR: 8499,
    discountPercent: 29,
    rating: 4.9,
    reviewsCount: 76,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Velvet',
    craft: 'Aari Embroidery',
    occasion: 'Wedding Guest',
    color: 'Emerald Firdaus',
    colorHex: '#064e3b',
    availableSizes: ['S', 'M', 'L', 'XL'],
    description: 'Plush micro-velvet tailored into an elegant winter ethnic silhouette, enriched with authentic gold metallic Tilla needlecraft around the yoke and cuffs.',
    artisanStory: 'Hand-needled by traditional artisans in Anantnag, Jammu & Kashmir.',
    careInstructions: 'Dry clean only. Steam gently.',
    inStock: true,
    isBestseller: true,
    isHandcrafted: true,
    reviews: []
  },
  {
    id: 'KUR-003',
    title: 'Angrakha Pure Mulmul Cotton Kurta Set',
    subtitle: 'Flared Overlap Kurta with Churidars & Crushed Dupatta',
    category: 'Kurtas',
    priceINR: 2899,
    mrpINR: 4200,
    discountPercent: 31,
    rating: 4.6,
    reviewsCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Mulmul Cotton',
    craft: 'Bandhani',
    occasion: 'Casual Elegance',
    color: 'Indigo Blue & Crimson Tie-Dye',
    colorHex: '#1e3a8a',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Breathable 100% fine mulmul cotton styled in a royal Angrakha overlap tie-up cut with handmade cloth latkans and hand-knotted Bandhani accents.',
    artisanStory: 'Crafted by women weavers collective in Bhuj, Kutch.',
    careInstructions: 'Gentle hand wash inside out with cold water.',
    inStock: true,
    reviews: []
  },
  {
    id: 'KUR-004',
    title: 'Lucknowi Chikankari Pure Georgette Kurta Set',
    subtitle: 'Hand-done Bakhiya & Phanda stitches with Mukaish shimmer',
    category: 'Kurtas',
    priceINR: 3799,
    mrpINR: 5500,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 130,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Pure Georgette',
    craft: 'Chikankari',
    occasion: 'Festive',
    color: 'Blush Powder Pink',
    colorHex: '#f472b6',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Authentic Nawabi craftsmanship from Chowk, Lucknow. Intricate 32-stitch hand embroidery sprinkled with hand-hammered silver mukaish badla dots.',
    artisanStory: 'Artisan craft preserved by the SEWA Lucknow craft cooperative.',
    careInstructions: 'Dry clean or gentle hand wash with liquid detergent.',
    inStock: true,
    isBestseller: true,
    isHandcrafted: true,
    reviews: []
  },

  // 3. LEHENGAS
  {
    id: 'LEH-001',
    title: 'Maharani Velvet Embroidered Bridal Lehenga',
    subtitle: 'Heavy Zardozi, Dori & Sequin Work with Double Dupatta',
    category: 'Lehengas',
    priceINR: 34999,
    mrpINR: 49999,
    discountPercent: 30,
    rating: 5.0,
    reviewsCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Velvet',
    craft: 'Zari Weave',
    occasion: 'Bridal',
    color: 'Deep Royal Crimson & Antique Gold',
    colorHex: '#7f1d1d',
    availableSizes: ['Custom Stitch', 'Semi-Stitched (Up to 44 Bust)'],
    description: 'A showstopper bridal masterpiece with 16 panels (kalis) in plush velvet. Hand-embellished with French bullion wires, dabka, zardozi and champagne micro-crystals.',
    artisanStory: 'Took 180 artisan hours to embroider by zardozi karigars in Old Delhi.',
    careInstructions: 'Professional wedding couture preservation only.',
    inStock: true,
    isBestseller: true,
    isHandcrafted: true,
    reviews: [
      {
        id: 'rev-5',
        userName: 'Tanvi Agarwal',
        rating: 5,
        date: '2 weeks ago',
        comment: 'This lehenga made my wedding day magical! Looked like a bespoke Sabya couture at a fraction of the cost.',
        verifiedBuyer: true,
        location: 'Bengaluru'
      }
    ]
  },
  {
    id: 'LEH-002',
    title: 'Gulabi Mirror-Work Georgette Festive Lehenga',
    subtitle: 'Authentic Glass Mirror Embroidery with Cancan Flare',
    category: 'Lehengas',
    priceINR: 14499,
    mrpINR: 20999,
    discountPercent: 31,
    rating: 4.8,
    reviewsCount: 67,
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Pure Georgette',
    craft: 'Mirror Work',
    occasion: 'Sangeet & Mehendi',
    color: 'Dusty Rose & Silver',
    colorHex: '#be185d',
    availableSizes: ['S', 'M', 'L', 'XL'],
    description: 'Glittering under the lights, this festive lehenga sparkles with hundreds of genuine hand-set mirrors framed by resham threadwork. Complete with pre-attached voluminous cancan.',
    artisanStory: 'Crafted in the desert craft villages of Kutch, Gujarat.',
    careInstructions: 'Dry clean only to maintain mirror setting integrity.',
    inStock: true,
    isNewArrival: true,
    reviews: []
  },
  {
    id: 'LEH-003',
    title: 'Chandni Ivory Lucknowi Chikan & Mukaish Lehenga',
    subtitle: 'Pastel Wedding Collection with Organza Ruffle Dupatta',
    category: 'Lehengas',
    priceINR: 21999,
    mrpINR: 29999,
    discountPercent: 26,
    rating: 4.9,
    reviewsCount: 38,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Pure Georgette',
    craft: 'Chikankari',
    occasion: 'Wedding Guest',
    color: 'Ivory Pearl & Champagne Gold',
    colorHex: '#fef3c7',
    availableSizes: ['S', 'M', 'L', 'XL'],
    description: 'Understated royal elegance. Pure ivory georgette lehenga detailed with intricate white-on-white chikankari and hand-beaten gold mukaish badla work.',
    artisanStory: 'Collaboratively created by master craftswomen across Awadh.',
    careInstructions: 'Dry clean only.',
    inStock: true,
    isHandcrafted: true,
    reviews: []
  },

  // 4. DUPATTAS
  {
    id: 'DUP-001',
    title: 'Handwoven Banarasi Katan Silk Dupatta',
    subtitle: 'Classic Shikargah Floral Jaal with Meenakari Accents',
    category: 'Dupattas',
    priceINR: 3499,
    mrpINR: 4999,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 84,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Banarasi Silk',
    craft: 'Zari Weave',
    occasion: 'Festive',
    color: 'Royal Scarlet & Gold',
    colorHex: '#b91c1c',
    availableSizes: ['Length: 2.5m · Width: 36 inches'],
    description: 'Transform any plain kurta or lehenga into a couture statement with this pure Banarasi silk dupatta featuring antique zari and colored resham meenakari details.',
    artisanStory: 'Woven on handlooms in Varanasi.',
    careInstructions: 'Dry clean only. Store wrapped in cotton cloth.',
    inStock: true,
    isBestseller: true,
    isHandcrafted: true,
    reviews: []
  },
  {
    id: 'DUP-002',
    title: 'Kalamkari Hand-Painted Pure Tussar Silk Dupatta',
    subtitle: 'Tree of Life Motif Painted with Bamboo Kalam',
    category: 'Dupattas',
    priceINR: 4200,
    mrpINR: 6000,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 52,
    imageUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Tussar Silk',
    craft: 'Aari Embroidery',
    occasion: 'Casual Elegance',
    color: 'Ochre Sand & Madder Red',
    colorHex: '#d97706',
    availableSizes: ['Length: 2.5m · Width: 38 inches'],
    description: 'Authentic Srikalahasti Kalamkari. Hand-drawn freehand narrative paintings using fermented organic jaggery ink and vegetable dyes on raw textured Tussar silk.',
    artisanStory: 'Hand-painted by National Award winning artisans in Andhra Pradesh.',
    careInstructions: 'Dry clean only. Natural vegetable colors require gentle care.',
    inStock: true,
    isHandcrafted: true,
    reviews: []
  },
  {
    id: 'DUP-003',
    title: 'Phulkari Heavy Thread Geometric Silk Dupatta',
    subtitle: 'Heritage Pat Silk Floss Embroidery from Punjab',
    category: 'Dupattas',
    priceINR: 1999,
    mrpINR: 2899,
    discountPercent: 31,
    rating: 4.7,
    reviewsCount: 41,
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Pure Georgette',
    craft: 'Aari Embroidery',
    occasion: 'Festive',
    color: 'Multi-Color Fiesta on Black Base',
    colorHex: '#000000',
    availableSizes: ['Length: 2.4m · Width: 36 inches'],
    description: 'Celebratory Punjabi Phulkari adorned with dense geometric darn stitches using untwisted silk floss (pat) threads in vivid shades of marigold, fuchsia, and teal.',
    artisanStory: 'Crafted by rural women embroiderers in Patiala, Punjab.',
    careInstructions: 'Gentle dry clean only.',
    inStock: true,
    reviews: []
  },

  // 5. ANARKALIS
  {
    id: 'ANA-001',
    title: 'Zeenat Floor-Length Gota Patti Anarkali Suit',
    subtitle: '32-Kali Pure Georgette Anarkali with Churidar & Dupatta',
    category: 'Anarkalis',
    priceINR: 8499,
    mrpINR: 11999,
    discountPercent: 29,
    rating: 4.9,
    reviewsCount: 77,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Pure Georgette',
    craft: 'Gota Patti',
    occasion: 'Wedding Guest',
    color: 'Deep Wine Plum',
    colorHex: '#581c87',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Dramatic 5-meter sweeping flare with 32 kalis. Intricately adorned with authentic Rajasthani gota patti ribbons, badla work and scalloped border trimming.',
    artisanStory: 'Handcrafted in Jodhpur ateliers keeping royal Marwari silhouettes alive.',
    careInstructions: 'Dry clean only.',
    inStock: true,
    isBestseller: true,
    reviews: []
  },
  {
    id: 'ANA-002',
    title: 'Aafreen Silk Organza Tiered Anarkali Gown',
    subtitle: 'Pastel Handpainted Botanicals with Sequin Trim',
    category: 'Anarkalis',
    priceINR: 6999,
    mrpINR: 9800,
    discountPercent: 28,
    rating: 4.8,
    reviewsCount: 59,
    imageUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80'
    ],
    fabric: 'Organza',
    craft: 'Zari Weave',
    occasion: 'Sangeet & Mehendi',
    color: 'Pastel Lavender Glow',
    colorHex: '#a855f7',
    availableSizes: ['S', 'M', 'L', 'XL'],
    description: 'Modern fairytale ethnic aesthetic. Light-as-air tiered silk organza with handpainted peonies, finished with fine gold thread cord work and pearl drops.',
    artisanStory: 'Designed by modern Indian D2C couturiers in New Delhi.',
    careInstructions: 'Dry clean only.',
    inStock: true,
    isNewArrival: true,
    reviews: []
  }
];

export const CATEGORIES_LIST = ['ALL', 'Sarees', 'Kurtas', 'Lehengas', 'Dupattas', 'Anarkalis'];
export const FABRICS_LIST = ['ALL', 'Banarasi Silk', 'Kanjeevaram Silk', 'Chanderi Silk', 'Pure Georgette', 'Organza', 'Velvet', 'Mulmul Cotton', 'Tussar Silk'];
export const CRAFTS_LIST = ['ALL', 'Zari Weave', 'Chikankari', 'Bandhani', 'Gota Patti', 'Mirror Work', 'Aari Embroidery'];
export const OCCASIONS_LIST = ['ALL', 'Bridal', 'Festive', 'Wedding Guest', 'Casual Elegance', 'Sangeet & Mehendi'];
