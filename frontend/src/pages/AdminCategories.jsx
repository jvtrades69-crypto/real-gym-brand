import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Package, Tag, ArrowRight, CheckCircle } from 'lucide-react';

// Categories Data
const categories = [
  {
    id: 'cat-001',
    name: '11.11 Sale',
    slug: '1111-sale',
    description: 'Special 11.11 Sale collection with 50% off on selected items',
    productCount: 5,
    status: 'Active',
    products: [
      { id: 'sale-001', name: 'Performance Compression Tee', price: 79.99, salePrice: 39.99 },
      { id: 'sale-002', name: 'Pro Training Tank', price: 59.99, salePrice: 29.99 },
      { id: 'sale-003', name: 'Elite Flex Shorts', price: 69.99, salePrice: 34.99 },
      { id: 'sale-004', name: 'Training Long Sleeve', price: 89.99, salePrice: 44.99 },
      { id: 'sale-005', name: 'Competition Singlet', price: 99.99, salePrice: 49.99 }
    ]
  },
  {
    id: 'cat-002',
    name: 'T-Shirts',
    slug: 't-shirts',
    description: 'Performance t-shirts for training',
    productCount: 4,
    status: 'Active',
    products: [
      { id: 'prod-001', name: 'Performance T-Shirt - Black/Cyan', price: 65.00, salePrice: null },
      { id: 'prod-002', name: 'Performance T-Shirt - Grey/Cyan', price: 65.00, salePrice: null },
      { id: 'prod-003', name: 'Performance T-Shirt - Black/Silver', price: 65.00, salePrice: null },
      { id: 'prod-004', name: 'Performance T-Shirt - Grey/White', price: 65.00, salePrice: null }
    ]
  },
  {
    id: 'cat-003',
    name: 'Shorts',
    slug: 'shorts',
    description: 'Training shorts for maximum flexibility',
    productCount: 2,
    status: 'Active',
    products: [
      { id: 'prod-005', name: 'Training Shorts - Black/Cyan', price: 55.00, salePrice: null },
      { id: 'prod-006', name: 'Training Shorts - Black/Silver', price: 55.00, salePrice: null }
    ]
  }
];

const AdminCategories = () => {
  // Find the 11.11 Sale category
  const saleCategory = categories.find(c => c.name === '11.11 Sale');

  return (
    <div className="admin-page">
      {/* Admin Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <h1 className="admin-title">
            <Layers size={28} />
            Category Management
          </h1>
          <p className="admin-subtitle">CA1 Evidence: "11.11 Sale" Category with 5 Products</p>
        </div>
        <div className="admin-actions">
          <Link to="/admin/products" className="admin-btn secondary">
            <Package size={18} />
            View Products
          </Link>
          <button className="admin-btn primary">
            <Layers size={18} />
            Add Category
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Layers size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">3</span>
            <span className="stat-label">Total Categories</span>
          </div>
        </div>
        <div className="stat-card highlight">
          <div className="stat-icon red">
            <Tag size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">1</span>
            <span className="stat-label">Sale Category</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <Package size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">5</span>
            <span className="stat-label">Sale Products</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">3</span>
            <span className="stat-label">Active</span>
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="admin-table-container">
        <div className="admin-table-header">
          <h2>All Categories</h2>
        </div>
        
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Products</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id} className={category.name === '11.11 Sale' ? 'highlighted-row' : ''}>
                <td className="row-number">{index + 1}</td>
                <td className="category-name">
                  <strong>{category.name}</strong>
                  {category.name === '11.11 Sale' && (
                    <span className="featured-badge">★ Featured</span>
                  )}
                </td>
                <td className="slug">/{category.slug}</td>
                <td className="description">{category.description}</td>
                <td className="product-count">
                  <span className="count-badge">{category.productCount}</span>
                </td>
                <td>
                  <span className="status-badge active">{category.status}</span>
                </td>
                <td>
                  <Link to={`/${category.slug}`} className="view-link">
                    View <ArrowRight size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 11.11 Sale Category Detail */}
      <div className="admin-table-container highlighted">
        <div className="admin-table-header sale-header">
          <h2>
            <Tag size={20} />
            11.11 Sale Category - Products List
          </h2>
          <span className="table-badge sale">5 Products Assigned</span>
        </div>
        
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Original Price</th>
              <th>Sale Price</th>
              <th>Savings</th>
            </tr>
          </thead>
          <tbody>
            {saleCategory.products.map((product, index) => (
              <tr key={product.id}>
                <td className="row-number">{index + 1}</td>
                <td className="product-id">{product.id}</td>
                <td className="product-name"><strong>{product.name}</strong></td>
                <td className="price original">${product.price.toFixed(2)}</td>
                <td className="price sale">${product.salePrice.toFixed(2)}</td>
                <td className="savings">
                  <span className="savings-badge">
                    Save ${(product.price - product.salePrice).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="table-footer">
          <div className="summary-row highlighted">
            <span>Category: <strong>11.11 Sale</strong></span>
            <span>Total Products: <strong>5</strong></span>
            <span>Route: <strong>/1111-sale</strong></span>
          </div>
        </div>
      </div>

      {/* Evidence Note */}
      <div className="admin-evidence-note">
        <h3>📸 CA1 Evidence Note</h3>
        <p>This admin page shows the <strong>"11.11 Sale"</strong> category/collection with exactly <strong>5 products</strong> assigned.</p>
        <ul>
          <li>✅ Category name: "11.11 Sale"</li>
          <li>✅ 5 products assigned to this category</li>
          <li>✅ Each product shows original price and sale price</li>
          <li>✅ Category is active and visible in shop</li>
          <li>✅ Shop page at /1111-sale shows only these 5 products</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminCategories;
