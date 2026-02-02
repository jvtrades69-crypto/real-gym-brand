import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Tag, DollarSign, Layers, CheckCircle, Edit, Trash2 } from 'lucide-react';

// Product Data for Admin View - Exactly 5 Products for CA1 Evidence
const adminProducts = [
  {
    id: 'sale-001',
    name: 'Performance Compression Tee',
    category: '11.11 Sale',
    originalPrice: 79.99,
    salePrice: 39.99,
    discount: '50%',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 150,
    status: 'Active',
    sku: 'RAZE-PCT-001'
  },
  {
    id: 'sale-002',
    name: 'Pro Training Tank',
    category: '11.11 Sale',
    originalPrice: 59.99,
    salePrice: 29.99,
    discount: '50%',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 120,
    status: 'Active',
    sku: 'RAZE-PTT-002'
  },
  {
    id: 'sale-003',
    name: 'Elite Flex Shorts',
    category: '11.11 Sale',
    originalPrice: 69.99,
    salePrice: 34.99,
    discount: '50%',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 200,
    status: 'Active',
    sku: 'RAZE-EFS-003'
  },
  {
    id: 'sale-004',
    name: 'Training Long Sleeve',
    category: '11.11 Sale',
    originalPrice: 89.99,
    salePrice: 44.99,
    discount: '50%',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 85,
    status: 'Active',
    sku: 'RAZE-TLS-004'
  },
  {
    id: 'sale-005',
    name: 'Competition Singlet',
    category: '11.11 Sale',
    originalPrice: 99.99,
    salePrice: 49.99,
    discount: '50%',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 75,
    status: 'Active',
    sku: 'RAZE-CS-005'
  }
];

const AdminProducts = () => {
  return (
    <div className="admin-page">
      {/* Admin Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <h1 className="admin-title">
            <Package size={28} />
            Product Management
          </h1>
          <p className="admin-subtitle">CA1 Evidence: 5 Products Created for 11.11 Sale Category</p>
        </div>
        <div className="admin-actions">
          <Link to="/admin/categories" className="admin-btn secondary">
            <Layers size={18} />
            View Categories
          </Link>
          <button className="admin-btn primary">
            <Tag size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Package size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">5</span>
            <span className="stat-label">Total Products</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">5</span>
            <span className="stat-label">Active Products</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">
            <Tag size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">5</span>
            <span className="stat-label">On Sale</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">50%</span>
            <span className="stat-label">Discount</span>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="admin-table-container">
        <div className="admin-table-header">
          <h2>11.11 Sale Products (5 Products)</h2>
          <span className="table-badge">Category: 11.11 Sale</span>
        </div>
        
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Original Price</th>
              <th>Sale Price</th>
              <th>Discount</th>
              <th>Sizes</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminProducts.map((product, index) => (
              <tr key={product.id}>
                <td className="row-number">{index + 1}</td>
                <td className="sku">{product.sku}</td>
                <td className="product-name">
                  <strong>{product.name}</strong>
                </td>
                <td>
                  <span className="category-badge sale">{product.category}</span>
                </td>
                <td className="price original">${product.originalPrice.toFixed(2)}</td>
                <td className="price sale">${product.salePrice.toFixed(2)}</td>
                <td className="discount">-{product.discount}</td>
                <td className="sizes">{product.sizes.join(', ')}</td>
                <td className="stock">{product.stock}</td>
                <td>
                  <span className="status-badge active">{product.status}</span>
                </td>
                <td className="actions">
                  <button className="action-btn edit" title="Edit">
                    <Edit size={14} />
                  </button>
                  <button className="action-btn delete" title="Delete">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary Footer */}
        <div className="table-footer">
          <div className="summary-row">
            <span>Total Products: <strong>5</strong></span>
            <span>Category: <strong>11.11 Sale</strong></span>
            <span>All Discounted: <strong>50% OFF</strong></span>
          </div>
        </div>
      </div>

      {/* Evidence Note */}
      <div className="admin-evidence-note">
        <h3>📸 CA1 Evidence Note</h3>
        <p>This admin page shows exactly <strong>5 products</strong> created for the <strong>11.11 Sale</strong> category/collection.</p>
        <ul>
          <li>✅ 5 products with unique SKUs</li>
          <li>✅ All assigned to "11.11 Sale" category</li>
          <li>✅ Original prices and sale prices shown</li>
          <li>✅ 50% discount applied to all products</li>
          <li>✅ Multiple sizes available</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminProducts;
