import ReactGA from 'react-ga4';

// Initialize GA4
export const initGA = () => {
  ReactGA.initialize('G-8HHDN317M9', {
    gaOptions: {
      siteSpeedSampleRate: 100,
    },
    gtagOptions: {
      send_page_view: true,
    },
  });
};

// Track page views
export const trackPageView = (path, title) => {
  ReactGA.send({ 
    hitType: 'pageview', 
    page: path,
    title: title 
  });
};

// Track custom events
export const trackEvent = (category, action, label = '', value = 0) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
    value: value,
  });
};

// E-commerce tracking
export const trackAddToCart = (product) => {
  ReactGA.event('add_to_cart', {
    currency: 'USD',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category || 'Apparel',
      item_variant: product.color,
      price: product.price,
      quantity: product.quantity || 1,
    }],
  });
};

export const trackRemoveFromCart = (product) => {
  ReactGA.event('remove_from_cart', {
    currency: 'USD',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      quantity: product.quantity || 1,
    }],
  });
};

export const trackBeginCheckout = (cartItems, total) => {
  ReactGA.event('begin_checkout', {
    currency: 'USD',
    value: total,
    items: cartItems.map(item => ({
      item_id: item.product_id,
      item_name: item.product_name,
      item_variant: item.color,
      price: item.price,
      quantity: item.quantity,
    })),
  });
};

export const trackPurchase = (order) => {
  ReactGA.event('purchase', {
    transaction_id: order.order_number,
    value: order.total,
    currency: 'USD',
    tax: 0,
    shipping: order.shipping_cost,
    items: order.items.map(item => ({
      item_id: item.product_id,
      item_name: item.product_name,
      item_variant: item.color,
      price: item.price,
      quantity: item.quantity,
    })),
  });
};

// User tracking
export const trackSignup = (method) => {
  ReactGA.event('sign_up', {
    method: method, // 'email', 'google'
  });
};

export const trackLogin = (method) => {
  ReactGA.event('login', {
    method: method,
  });
};

// Search tracking
export const trackSearch = (searchTerm) => {
  ReactGA.event('search', {
    search_term: searchTerm,
  });
};

// Engagement tracking
export const trackViewItem = (product) => {
  ReactGA.event('view_item', {
    currency: 'USD',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category || 'Apparel',
      item_variant: product.color,
      price: product.price,
    }],
  });
};

export const trackWaitlistJoin = (productName) => {
  ReactGA.event('join_waitlist', {
    product_name: productName,
  });
};

export const trackEmailSubscribe = (source) => {
  ReactGA.event('newsletter_signup', {
    source: source, // 'giveaway_popup', 'footer', 'notify_me'
  });
};

// Get visitor location and device info
export const getVisitorInfo = () => {
  return new Promise((resolve) => {
    const info = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || 'direct',
      platform: navigator.platform,
    };

    // Try to get geolocation (requires user permission)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          info.latitude = position.coords.latitude;
          info.longitude = position.coords.longitude;
          resolve(info);
        },
        () => {
          // If permission denied, use IP-based geolocation via backend
          resolve(info);
        }
      );
    } else {
      resolve(info);
    }
  });
};

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackAddToCart,
  trackRemoveFromCart,
  trackBeginCheckout,
  trackPurchase,
  trackSignup,
  trackLogin,
  trackSearch,
  trackViewItem,
  trackWaitlistJoin,
  trackEmailSubscribe,
  getVisitorInfo,
};
