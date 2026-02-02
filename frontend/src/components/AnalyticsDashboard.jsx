import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const AnalyticsDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [realtimeData, setRealtimeData] = useState(null);
  const [timeRange, setTimeRange] = useState(7); // days
  const [userFilter, setUserFilter] = useState('all'); // all, registered, guest, signup
  const [loading, setLoading] = useState(true);

  // Fetch overview data
  const fetchOverview = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/analytics/overview?days=${timeRange}`, {
        withCredentials: true
      });
      setOverview(response.data);
    } catch (error) {
      console.error('Error fetching analytics overview:', error);
    }
  };

  // Fetch location data
  const fetchLocationData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/analytics/users-by-location?user_type=${userFilter}`,
        { withCredentials: true }
      );
      setLocationData(response.data.locations);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  // Fetch real-time data
  const fetchRealtimeData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/analytics/realtime`, {
        withCredentials: true
      });
      setRealtimeData(response.data);
    } catch (error) {
      console.error('Error fetching real-time data:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchOverview(), fetchLocationData(), fetchRealtimeData()]);
      setLoading(false);
    };
    loadData();

    // Refresh real-time data every 30 seconds
    const interval = setInterval(fetchRealtimeData, 30000);
    return () => clearInterval(interval);
  }, [timeRange, userFilter]);

  if (loading || !overview) {
    return (
      <div className="analytics-dashboard loading">
        <div className="loading-spinner">Loading analytics...</div>
      </div>
    );
  }

  const COLORS = ['#00d9ff', '#ff006e', '#8338ec', '#fb5607', '#ffbe0b'];

  // Prepare country data for chart
  const countryChartData = overview.top_countries.slice(0, 5);

  // Prepare traffic source data for pie chart
  const trafficSourceData = overview.traffic_sources.map((source, index) => ({
    name: source.source === 'direct' ? 'Direct' : source.source,
    value: source.visitors,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="analytics-dashboard">
      <style>{`
        .analytics-dashboard {
          padding: 20px;
          background: #0a0a0a;
          min-height: 100vh;
          color: #fff;
        }

        .analytics-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .analytics-header h2 {
          font-size: 28px;
          color: #00d9ff;
          margin: 0;
        }

        .analytics-controls {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .control-group label {
          font-size: 12px;
          color: #888;
          text-transform: uppercase;
        }

        .analytics-select, .analytics-button {
          padding: 8px 16px;
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 6px;
          color: #fff;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
        }

        .analytics-select:hover, .analytics-button:hover {
          border-color: #00d9ff;
          background: #222;
        }

        .analytics-select:focus {
          outline: none;
          border-color: #00d9ff;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
          border: 1px solid #222;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s;
        }

        .stat-card:hover {
          border-color: #00d9ff;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 217, 255, 0.1);
        }

        .stat-card h3 {
          font-size: 14px;
          color: #888;
          margin: 0 0 10px 0;
          text-transform: uppercase;
          font-weight: 500;
        }

        .stat-value {
          font-size: 36px;
          font-weight: 700;
          color: #00d9ff;
          margin: 0;
        }

        .stat-subtitle {
          font-size: 12px;
          color: #666;
          margin-top: 5px;
        }

        .realtime-indicator {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(0, 217, 255, 0.1);
          border: 1px solid #00d9ff;
          border-radius: 20px;
          font-size: 12px;
          color: #00d9ff;
        }

        .realtime-dot {
          width: 8px;
          height: 8px;
          background: #00d9ff;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .charts-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .chart-card {
          background: #1a1a1a;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 20px;
        }

        .chart-card h3 {
          font-size: 18px;
          color: #fff;
          margin: 0 0 20px 0;
        }

        .location-table {
          background: #1a1a1a;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 20px;
          overflow-x: auto;
        }

        .location-table h3 {
          font-size: 18px;
          color: #fff;
          margin: 0 0 20px 0;
        }

        .location-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .location-table th {
          text-align: left;
          padding: 12px;
          background: #0f0f0f;
          color: #888;
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 500;
        }

        .location-table td {
          padding: 12px;
          border-top: 1px solid #222;
          color: #fff;
        }

        .location-table tr:hover {
          background: #222;
        }

        .country-flag {
          font-size: 20px;
          margin-right: 8px;
        }

        .conversion-funnel {
          background: #1a1a1a;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 20px;
        }

        .funnel-step {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          padding: 15px;
          background: #0f0f0f;
          border-radius: 8px;
          border-left: 4px solid #00d9ff;
        }

        .funnel-step-info {
          flex: 1;
        }

        .funnel-step-label {
          font-size: 14px;
          color: #888;
          margin-bottom: 5px;
        }

        .funnel-step-value {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
        }

        .funnel-bar {
          width: 200px;
          height: 8px;
          background: #222;
          border-radius: 4px;
          overflow: hidden;
          margin-left: 20px;
        }

        .funnel-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00d9ff 0%, #0095ff 100%);
          transition: width 0.5s;
        }

        @media (max-width: 768px) {
          .charts-section {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .funnel-bar {
            width: 100px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="analytics-header">
        <div>
          <h2>📊 Analytics Dashboard</h2>
          <div className="realtime-indicator">
            <span className="realtime-dot"></span>
            <span>{realtimeData?.active_count || 0} visitors online</span>
          </div>
        </div>
        
        <div className="analytics-controls">
          <div className="control-group">
            <label>Time Range</label>
            <select 
              className="analytics-select" 
              value={timeRange} 
              onChange={(e) => setTimeRange(Number(e.target.value))}
            >
              <option value={1}>Last 24 hours</option>
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </div>

          <div className="control-group">
            <label>User Type</label>
            <select 
              className="analytics-select" 
              value={userFilter} 
              onChange={(e) => setUserFilter(e.target.value)}
            >
              <option value="all">All Visitors</option>
              <option value="signup">Signed Up Users</option>
              <option value="registered">Registered Users</option>
              <option value="guest">Guest Visitors</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Visitors</h3>
          <div className="stat-value">{overview.total_visitors.toLocaleString()}</div>
          <div className="stat-subtitle">Last {timeRange} days</div>
        </div>

        <div className="stat-card">
          <h3>Registered Users</h3>
          <div className="stat-value">{overview.registered_users.toLocaleString()}</div>
          <div className="stat-subtitle">{((overview.registered_users / overview.total_visitors) * 100).toFixed(1)}% of visitors</div>
        </div>

        <div className="stat-card">
          <h3>Page Views</h3>
          <div className="stat-value">{overview.total_page_views.toLocaleString()}</div>
          <div className="stat-subtitle">{(overview.total_page_views / overview.total_visitors).toFixed(1)} per visitor</div>
        </div>

        <div className="stat-card">
          <h3>Avg Session Duration</h3>
          <div className="stat-value">{Math.floor(overview.avg_session_duration / 60)}m {Math.floor(overview.avg_session_duration % 60)}s</div>
          <div className="stat-subtitle">Time on site</div>
        </div>

        <div className="stat-card">
          <h3>Conversion Rate</h3>
          <div className="stat-value">{overview.conversion_funnel.conversion_rate}%</div>
          <div className="stat-subtitle">{overview.conversion_funnel.purchases} purchases</div>
        </div>

        <div className="stat-card">
          <h3>Active Now</h3>
          <div className="stat-value">{overview.active_sessions}</div>
          <div className="stat-subtitle">Live visitors</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-section">
        {/* Top Countries Chart */}
        <div className="chart-card">
          <h3>🌍 Top Countries</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={countryChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="country" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ background: '#1a1a1a', border: '1px solid #333' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="visitors" fill="#00d9ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources Pie Chart */}
        <div className="chart-card">
          <h3>📈 Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficSourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {trafficSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: '#1a1a1a', border: '1px solid #333' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="conversion-funnel">
        <h3>🎯 Conversion Funnel</h3>
        <div className="funnel-step">
          <div className="funnel-step-info">
            <div className="funnel-step-label">Visitors</div>
            <div className="funnel-step-value">{overview.conversion_funnel.visitor_count}</div>
          </div>
          <div className="funnel-bar">
            <div className="funnel-bar-fill" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="funnel-step">
          <div className="funnel-step-info">
            <div className="funnel-step-label">Added to Cart</div>
            <div className="funnel-step-value">{overview.conversion_funnel.cart_additions}</div>
          </div>
          <div className="funnel-bar">
            <div 
              className="funnel-bar-fill" 
              style={{ 
                width: `${(overview.conversion_funnel.cart_additions / overview.conversion_funnel.visitor_count * 100)}%` 
              }}
            ></div>
          </div>
        </div>

        <div className="funnel-step">
          <div className="funnel-step-info">
            <div className="funnel-step-label">Started Checkout</div>
            <div className="funnel-step-value">{overview.conversion_funnel.checkout_started}</div>
          </div>
          <div className="funnel-bar">
            <div 
              className="funnel-bar-fill" 
              style={{ 
                width: `${(overview.conversion_funnel.checkout_started / overview.conversion_funnel.visitor_count * 100)}%` 
              }}
            ></div>
          </div>
        </div>

        <div className="funnel-step">
          <div className="funnel-step-info">
            <div className="funnel-step-label">Completed Purchase</div>
            <div className="funnel-step-value">{overview.conversion_funnel.purchases}</div>
          </div>
          <div className="funnel-bar">
            <div 
              className="funnel-bar-fill" 
              style={{ 
                width: `${overview.conversion_funnel.conversion_rate}%` 
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Location Table */}
      <div className="location-table">
        <h3>📍 Visitor Locations ({userFilter === 'all' ? 'All Visitors' : userFilter === 'signup' ? 'Signed Up Users' : userFilter === 'registered' ? 'Registered Users' : 'Guest Visitors'})</h3>
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>City</th>
              <th>Visitors</th>
            </tr>
          </thead>
          <tbody>
            {locationData.slice(0, 20).map((location, index) => (
              <tr key={index}>
                <td>
                  <span className="country-flag">
                    {location.country_code ? String.fromCodePoint(...location.country_code.split('').map(c => 0x1F1E6 - 65 + c.charCodeAt())) : '🌍'}
                  </span>
                  {location.country || 'Unknown'}
                </td>
                <td>{location.city || 'Unknown'}</td>
                <td>{location.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Pages */}
      <div className="location-table">
        <h3>📄 Top Pages</h3>
        <table>
          <thead>
            <tr>
              <th>Page</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {overview.top_pages.map((page, index) => (
              <tr key={index}>
                <td>{page.page}</td>
                <td>{page.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
