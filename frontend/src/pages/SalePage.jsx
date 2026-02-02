import React, { useState, useEffect } from 'react';
import { Star, Bell } from 'lucide-react';
import WaitlistModal from '../components/WaitlistModal';

// Custom Tag Icon to avoid lucide-react import issues
const TagIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
    <path d="M7 7h.01"/>
  </svg>
);

// 11.11 Sale Products Collection
const saleProducts = [
  {
    id: 'sale-001',
    name: 'Performance Compression Tee',
    category: '11.11 Sale',
    originalPrice: 79.99,
    salePrice: 39.99,
    discount: 50,
    image: '/images/products/front_shirt_black_cyan.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 89,
    description: 'High-performance compression fit for maximum support.',
    variant: 'Black / Cyan'
  },
  {
    id: 'sale-002',
    name: 'Pro Training Tank',
    category: '11.11 Sale',
    originalPrice: 59.99,
    salePrice: 29.99,
    discount: 50,
    image: '/images/products/front_shirt_grey_cyan.png',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 64,
    description: 'Lightweight tank for intense training sessions.',
    variant: 'Grey / Cyan'
  },
  {
    id: 'sale-003',
    name: 'Elite Flex Shorts',
    category: '11.11 Sale',
    originalPrice: 69.99,
    salePrice: 34.99,
    discount: 50,
    image: '/images/products/front_shorts_black_cyan.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 112,
    description: 'Maximum flexibility with secure fit.',
    variant: 'Black / Cyan'
  },
  {
    id: 'sale-004',
    name: 'Training Long Sleeve',
    category: '11.11 Sale',
    originalPrice: 89.99,
    salePrice: 44.99,
    discount: 50,
    image: '/images/products/front_shirt_grey_white.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 45,
    description: 'Full coverage for cooler training sessions.',
    variant: 'Grey / White'
  },
  {
    id: 'sale-005',
    name: 'Competition Singlet',
    category: '11.11 Sale',
    originalPrice: 99.99,
    salePrice: 49.99,
    discount: 50,
    image: '/images/products/front_shirt_black_silver.png',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 5.0,
    reviews: 78,
    description: 'Competition-grade singlet for peak performance.',
    variant: 'Black / Silver'
  }
];

const SalePage = () => {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [waitlistModal, setWaitlistModal] = useState({ isOpen: false, product: null });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleJoinWaitlist = (product) => {
    const selectedSize = selectedSizes[product.id] || product.sizes[0];
    setWaitlistModal({ 
      isOpen: true, 
      product: {
        ...product,
        price: product.salePrice,
        selectedSize: selectedSize
      }
    });
  };

  return (
    <div className="sale-page">
      {/* Sale Hero Banner */}
      <section className="sale-hero">
        <div className="sale-hero-content">
          <div className="sale-badge-large">
            <TagIcon size={32} />
            <span>11.11 SALE</span>
          </div>
          <h1 className="sale-title">11.11 SALE</h1>
          <p className="sale-subtitle">Biggest Sale of the Year</p>
          <p className="sale-description">Up to 50% off on selected performance wear</p>
          <div className="sale-countdown">
            <span className="countdown-label">Limited Time Only</span>
          </div>
        </div>
      </section>

      {/* Sale Products Grid */}
      <section className="sale-products-section">
        <div className="container">
          <div className="sale-products-header">
            <h2 className="sale-products-title">Sale Collection</h2>
            <p className="sale-products-count">{saleProducts.length} Products</p>
          </div>

          <div className="sale-products-grid">
            {saleProducts.map((product) => (
              <div key={product.id} className="sale-product-card" data-testid={`sale-product-${product.id}`}>
                {/* Sale Badge */}
                <div className="sale-product-badge">
                  <TagIcon size={12} />
                  <span>11.11 SALE</span>
                </div>

                {/* Discount Badge */}
                <div className="discount-badge">-{product.discount}%</div>

                {/* Product Image */}
                <div className="sale-product-image">
                  <img src={product.image} alt={product.name} />
                </div>

                {/* Product Info */}
                <div className="sale-product-info">
                  <h3 className="sale-product-name">{product.name}</h3>
                  <p className="sale-product-variant">{product.variant}</p>
                  
                  {/* Rating */}
                  <div className="sale-product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < Math.floor(product.rating) ? '#F59E0B' : 'none'}
                          color="#F59E0B"
                        />
                      ))}
                    </div>
                    <span className="rating-text">{product.rating} ({product.reviews})</span>
                  </div>

                  {/* Pricing */}
                  <div className="sale-product-pricing">
                    <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                    <span className="sale-price">${product.salePrice.toFixed(2)}</span>
                  </div>

                  {/* Size Selection */}
                  <div className="sale-product-sizes">
                    <span className="sizes-label">Size:</span>
                    <div className="sizes-row">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className={`size-btn ${selectedSizes[product.id] === size ? 'selected' : ''}`}
                          onClick={() => handleSizeSelect(product.id, size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Join Waitlist Button */}
                  <button 
                    className="sale-add-to-cart-btn"
                    onClick={() => handleJoinWaitlist(product)}
                    data-testid={`join-waitlist-${product.id}`}
                  >
                    <Bell size={18} />
                    Join Waitlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Terms */}
      <section className="sale-terms">
        <div className="container">
          <p className="terms-text">
            *Sale prices valid while stocks last. Cannot be combined with other offers.
          </p>
        </div>
      </section>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={waitlistModal.isOpen}
        onClose={() => setWaitlistModal({ isOpen: false, product: null })}
        product={waitlistModal.product}
        initialSize={waitlistModal.product?.selectedSize}
      />
    </div>
  );
};

export default SalePage;
