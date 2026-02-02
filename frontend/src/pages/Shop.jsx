import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Filter, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// All Products Data with Category field
const allProducts = [
  // Regular Products
  {
    id: 'prod-001',
    name: 'Performance T-Shirt',
    category: 'T-Shirts',
    price: 65.00,
    salePrice: null,
    image: '/images/products/front_shirt_black_cyan.png',
    variant: 'Black / Cyan',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 127,
    inStock: true
  },
  {
    id: 'prod-002',
    name: 'Performance T-Shirt',
    category: 'T-Shirts',
    price: 65.00,
    salePrice: null,
    image: '/images/products/front_shirt_grey_cyan.png',
    variant: 'Grey / Cyan',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 98,
    inStock: true
  },
  {
    id: 'prod-003',
    name: 'Performance T-Shirt',
    category: 'T-Shirts',
    price: 65.00,
    salePrice: null,
    image: '/images/products/front_shirt_black_silver.png',
    variant: 'Black / Silver',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 85,
    inStock: true
  },
  {
    id: 'prod-004',
    name: 'Performance T-Shirt',
    category: 'T-Shirts',
    price: 65.00,
    salePrice: null,
    image: '/images/products/front_shirt_grey_white.png',
    variant: 'Grey / White',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 72,
    inStock: true
  },
  // 11.11 Sale Products (5 products)
  {
    id: 'sale-001',
    name: 'Performance Compression Tee',
    category: '11.11 Sale',
    price: 79.99,
    salePrice: 39.99,
    image: '/images/products/front_shirt_black_cyan.png',
    variant: 'Black / Cyan',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 89,
    inStock: true
  },
  {
    id: 'sale-002',
    name: 'Pro Training Tank',
    category: '11.11 Sale',
    price: 59.99,
    salePrice: 29.99,
    image: '/images/products/front_shirt_grey_cyan.png',
    variant: 'Grey / Cyan',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 64,
    inStock: true
  },
  {
    id: 'sale-003',
    name: 'Elite Flex Shorts',
    category: '11.11 Sale',
    price: 69.99,
    salePrice: 34.99,
    image: '/images/products/front_shorts_black_cyan.png',
    variant: 'Black / Cyan',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 112,
    inStock: true
  },
  {
    id: 'sale-004',
    name: 'Training Long Sleeve',
    category: '11.11 Sale',
    price: 89.99,
    salePrice: 44.99,
    image: '/images/products/front_shirt_grey_white.png',
    variant: 'Grey / White',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 45,
    inStock: true
  },
  {
    id: 'sale-005',
    name: 'Competition Singlet',
    category: '11.11 Sale',
    price: 99.99,
    salePrice: 49.99,
    image: '/images/products/front_shirt_black_silver.png',
    variant: 'Black / Silver',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 5.0,
    reviews: 78,
    inStock: true
  },
  // Shorts
  {
    id: 'prod-005',
    name: 'Training Shorts',
    category: 'Shorts',
    price: 55.00,
    salePrice: null,
    image: '/images/products/front_shorts_black_cyan.png',
    variant: 'Black / Cyan',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 56,
    inStock: true
  },
  {
    id: 'prod-006',
    name: 'Training Shorts',
    category: 'Shorts',
    price: 55.00,
    salePrice: null,
    image: '/images/products/front_shorts_black_silver.png',
    variant: 'Black / Silver',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 43,
    inStock: true
  }
];

// Get unique categories
const categories = ['All', ...new Set(allProducts.map(p => p.category))];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  // Filter products by category
  const filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case 'price-high':
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="shop-page">
      {/* Shop Header */}
      <section className="shop-header">
        <div className="container">
          <h1 className="shop-title">SHOP ALL</h1>
          <p className="shop-subtitle">{sortedProducts.length} Products</p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="shop-filters-bar">
        <div className="container">
          <div className="filters-row">
            {/* Category Filter */}
            <div className="filter-group">
              <button 
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                Filter by Category
                <ChevronDown size={16} className={showFilters ? 'rotated' : ''} />
              </button>
              
              {showFilters && (
                <div className="filter-dropdown">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      className={`filter-option ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowFilters(false);
                      }}
                    >
                      {cat}
                      {cat !== 'All' && (
                        <span className="filter-count">
                          ({allProducts.filter(p => p.category === cat).length})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort */}
            <div className="sort-group">
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tag */}
          {selectedCategory !== 'All' && (
            <div className="active-filters">
              <span className="active-filter-tag">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All')}>×</button>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="shop-products">
        <div className="container">
          <div className="shop-grid">
            {sortedProducts.map(product => (
              <div key={product.id} className="shop-product-card">
                {/* Sale Badge */}
                {product.salePrice && (
                  <div className="shop-sale-badge">SALE</div>
                )}

                {/* Category Badge */}
                {product.category === '11.11 Sale' && (
                  <div className="shop-category-badge">11.11 SALE</div>
                )}

                {/* Wishlist Button */}
                <button 
                  className={`shop-wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                  onClick={() => addToWishlist(product)}
                >
                  <Heart size={18} fill={isInWishlist(product.id) ? '#FF4444' : 'none'} />
                </button>

                {/* Product Image */}
                <Link to={`/products/${product.id}`} className="shop-product-image">
                  <img src={product.image} alt={product.name} />
                </Link>

                {/* Product Info */}
                <div className="shop-product-info">
                  <span className="shop-product-category">{product.category}</span>
                  <h3 className="shop-product-name">{product.name}</h3>
                  <p className="shop-product-variant">{product.variant}</p>
                  
                  {/* Rating */}
                  <div className="shop-product-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        fill={i < Math.floor(product.rating) ? '#F59E0B' : 'none'}
                        color="#F59E0B"
                      />
                    ))}
                    <span>({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="shop-product-price">
                    {product.salePrice ? (
                      <>
                        <span className="original-price">${product.price.toFixed(2)}</span>
                        <span className="sale-price">${product.salePrice.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="regular-price">${product.price.toFixed(2)}</span>
                    )}
                  </div>

                  {/* Quick Add */}
                  <button 
                    className="shop-add-btn"
                    onClick={() => addToCart({...product, selectedSize: product.sizes[1] || product.sizes[0]})}
                  >
                    <ShoppingCart size={16} />
                    Quick Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
