import React, { useState, lazy, Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import WaitlistBanner from "./components/WaitlistBanner";
import ProductCategories from "./components/ProductCategories";
import AboutSection from "./components/AboutSection";
import Features from "./components/Features";
import Reviews from "./components/Reviews";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import EmailPopup from "./components/EmailPopup";
import GiveawayPopup from "./components/GiveawayPopup";
import AnnouncementBar from "./components/AnnouncementBar";
import ScrollToTop from "./components/ScrollToTop";
import { PaymentMethods } from "./components/TrustBadges";
import { Toaster } from "./components/ui/sonner";
import AdminRoute from "./components/AdminRoute";
import LiveVisitorCounter from "./components/LiveVisitorCounter";
import { PageSEO } from "./components/SEO";
import { initGA, trackPageView, getVisitorInfo } from "./utils/analytics";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

// Lazy load pages for better performance
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const CompleteProfile = lazy(() => import("./pages/CompleteProfile"));
const SizeGuide = lazy(() => import("./pages/SizeGuide"));
const FAQ = lazy(() => import("./pages/FAQ"));
const About = lazy(() => import("./pages/About"));
const Returns = lazy(() => import("./pages/Returns"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const OrderTracking = lazy(() => import("./pages/OrderTracking"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const AnalyticsDashboard = lazy(() => import("./components/AnalyticsDashboard"));

// Loading fallback
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
  </div>
);

// Home component with unified popup system
const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Hero CTA and Newsletter button both trigger popup
  const handleEarlyAccessClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="landing-page">
      <PageSEO.home />
      <Header />
      <main className="landing-content">
        <Hero onEarlyAccessClick={handleEarlyAccessClick} />
        <WaitlistBanner onClick={handleEarlyAccessClick} />
        <ProductCategories />
        <AboutSection />
        <TrustBar />
        <AnnouncementBar />
        <Features />
        <Reviews />
        <PaymentMethods />
        <Newsletter onJoinClick={handleEarlyAccessClick} />
      </main>
      <Footer />
      {/* Giveaway popup (auto-trigger: 7 seconds / exit intent) */}
      <GiveawayPopup />
      {/* Manual popup triggered by CTA buttons */}
      {showPopup && (
        <EmailPopup isOpen={showPopup} onClose={handlePopupClose} />
      )}
    </div>
  );
};

// Visitor Tracking Component - Initializes GA4 and tracks visitors
const VisitorTracker = () => {
  const location = useLocation();
  const [sessionId, setSessionId] = useState(null);

  // Initialize GA4 on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track visitor session on first load
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get visitor info
        const visitorInfo = await getVisitorInfo();
        
        // Get URL parameters (utm_source, utm_medium, etc.)
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source');
        const utmMedium = urlParams.get('utm_medium');
        const utmCampaign = urlParams.get('utm_campaign');
        
        // Track visitor
        const response = await axios.post(
          `${BACKEND_URL}/api/visitors/track`,
          {
            ...visitorInfo,
            landing_page: window.location.pathname,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
          },
          { withCredentials: true }
        );
        
        if (response.data.success) {
          setSessionId(response.data.session_id);
          localStorage.setItem('visitor_session_id', response.data.session_id);
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    // Check if session already exists
    const existingSession = localStorage.getItem('visitor_session_id');
    if (existingSession) {
      setSessionId(existingSession);
    } else {
      trackVisitor();
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    const currentSessionId = sessionId || localStorage.getItem('visitor_session_id');
    
    if (currentSessionId) {
      // Track page view in GA4
      trackPageView(location.pathname, document.title);
      
      // Track page view in backend
      axios.post(
        `${BACKEND_URL}/api/analytics/pageview`,
        {
          session_id: currentSessionId,
          page_path: location.pathname,
          page_title: document.title,
          referrer: document.referrer,
        },
        { withCredentials: true }
      ).catch(err => console.error('Error tracking pageview:', err));
    }
  }, [location, sessionId]);

  // Send heartbeat every 30 seconds
  useEffect(() => {
    const currentSessionId = sessionId || localStorage.getItem('visitor_session_id');
    
    if (!currentSessionId) return;

    const heartbeatInterval = setInterval(() => {
      axios.post(
        `${BACKEND_URL}/api/visitors/heartbeat`,
        {
          session_id: currentSessionId,
          current_page: location.pathname,
        },
        { withCredentials: true }
      ).catch(err => console.error('Error sending heartbeat:', err));
    }, 30000); // Every 30 seconds

    return () => clearInterval(heartbeatInterval);
  }, [sessionId, location]);

  return null; // This component doesn't render anything
};


// Router wrapper to handle auth callback detection
const AppRouter = () => {
  const location = useLocation();
  
  // Check URL fragment for session_id (Google OAuth callback)
  // This must be synchronous during render, NOT in useEffect
  if (location.hash?.includes('session_id=')) {
    return <Suspense fallback={<PageLoader />}><AuthCallback /></Suspense>;
  }
  
  return (
    <>
      <VisitorTracker />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<><Header /><Products /><Footer /></>} />
        <Route path="/products/:id" element={<><Header /><ProductDetail /><Footer /></>} />
        <Route path="/cart" element={<><Header /><Cart /><Footer /></>} />
        <Route path="/checkout" element={<><Header /><Checkout /><Footer /></>} />
        <Route path="/checkout/success" element={<><Header /><CheckoutSuccess /><Footer /></>} />
        <Route path="/login" element={<><Header /><Login /><Footer /></>} />
        <Route path="/register" element={<><Header /><Register /><Footer /></>} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/complete-profile" element={<><Header /><CompleteProfile /><Footer /></>} />
        <Route path="/size-guide" element={<><Header /><SizeGuide /><Footer /></>} />
        <Route path="/faq" element={<><Header /><FAQ /><Footer /></>} />
        <Route path="/about" element={<><Header /><About /><Footer /></>} />
        <Route path="/returns" element={<><Header /><Returns /><Footer /></>} />
        <Route path="/dashboard" element={<><Header /><Dashboard /><Footer /></>} />
        <Route path="/account" element={<><Header /><Dashboard /><Footer /></>} />
        <Route path="/track" element={<><Header /><OrderTracking /><Footer /></>} />
        <Route path="/track-order" element={<><Header /><OrderTracking /><Footer /></>} />
        <Route path="/wishlist" element={<><Header /><Wishlist /><Footer /></>} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        <Route path="/admin" element={<AdminRoute><><Header /><AdminDashboard /><Footer /></></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><><Header /><AdminDashboard /><Footer /></></AdminRoute>} />
        <Route path="/admin/analytics" element={<AdminRoute><><Header /><AnalyticsDashboard /><Footer /></></AdminRoute>} />
      </Routes>
    </Suspense>
    </>
  );
};

// Wrapper component to provide auth context to LiveVisitorCounter
const LiveVisitorWrapper = () => {
  const { user } = useAuth();
  const isAdmin = user?.is_admin || false;
  return <LiveVisitorCounter isAdmin={isAdmin} />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="App">
            <BrowserRouter>
              <AppRouter />
              <LiveVisitorWrapper />
            </BrowserRouter>
            <Toaster />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
