#!/usr/bin/env python3
"""
RAZE Training E-commerce API Testing Suite
Tests all major backend functionality including auth, products, cart, admin, etc.
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any, Optional

class RazeAPITester:
    def __init__(self, base_url="https://project-recovery-25.preview.emergentagent.com"):
        self.base_url = base_url
        self.session_token = None
        self.admin_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name}")
        else:
            print(f"❌ {name} - {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })

    def make_request(self, method: str, endpoint: str, data: Dict = None, 
                    expected_status: int = 200, use_admin: bool = False) -> tuple[bool, Dict]:
        """Make API request and validate response"""
        url = f"{self.base_url}/api/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        # Add auth token if available
        token = self.admin_token if use_admin and self.admin_token else self.session_token
        if token:
            headers['Authorization'] = f'Bearer {token}'

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text}

            if not success:
                print(f"   Status: {response.status_code}, Expected: {expected_status}")
                print(f"   Response: {response_data}")

            return success, response_data

        except Exception as e:
            print(f"   Request failed: {str(e)}")
            return False, {"error": str(e)}

    def test_api_root(self):
        """Test API root endpoint"""
        success, data = self.make_request('GET', '')
        expected_message = data.get('message') == 'RAZE API'
        self.log_test("API Root Endpoint", success and expected_message, 
                     f"Got: {data.get('message', 'No message')}")

    def test_public_stats(self):
        """Test public stats endpoint"""
        success, data = self.make_request('GET', 'stats')
        has_required_fields = all(field in data for field in 
                                ['total_signups', 'total_waitlist', 'total_giveaway_entries'])
        self.log_test("Public Stats Endpoint", success and has_required_fields,
                     f"Missing fields" if not has_required_fields else "")

    def test_user_registration(self):
        """Test user registration"""
        test_user_data = {
            "email": f"test_{datetime.now().strftime('%H%M%S')}@example.com",
            "password": "TestPass123!",
            "name": "Test User",
            "gymnastics_type": "mag",
            "age": "18-24"
        }
        
        success, data = self.make_request('POST', 'auth/register', test_user_data, 200)
        
        if success and data.get('success'):
            self.session_token = data.get('token')
            self.test_user_email = test_user_data['email']
            
        self.log_test("User Registration", success and data.get('success'),
                     f"Token received: {bool(self.session_token)}")

    def test_user_login(self):
        """Test user login with registered user"""
        if not hasattr(self, 'test_user_email'):
            self.log_test("User Login", False, "No test user available")
            return
            
        login_data = {
            "email": self.test_user_email,
            "password": "TestPass123!"
        }
        
        success, data = self.make_request('POST', 'auth/login', login_data, 200)
        
        if success and data.get('success'):
            self.session_token = data.get('token')
            
        self.log_test("User Login", success and data.get('success'),
                     f"Token received: {bool(self.session_token)}")

    def test_session_validation(self):
        """Test session validation"""
        if not self.session_token:
            self.log_test("Session Validation", False, "No session token available")
            return
            
        success, data = self.make_request('POST', 'auth/session', {}, 200)
        valid_session = success and data.get('success')
        
        self.log_test("Session Validation", valid_session,
                     f"User: {data.get('user', {}).get('email', 'Unknown')}")

    def test_admin_login(self):
        """Test admin login"""
        admin_data = {"password": "RazeAdmin2024!"}
        success, data = self.make_request('POST', 'admin/login', admin_data, 200)
        
        if success and data.get('success'):
            self.admin_token = data.get('token')
            
        self.log_test("Admin Login", success and data.get('success'),
                     f"Admin token received: {bool(self.admin_token)}")

    def test_email_subscription(self):
        """Test email subscription"""
        subscription_data = {
            "email": f"subscriber_{datetime.now().strftime('%H%M%S')}@example.com",
            "source": "early_access"
        }
        
        success, data = self.make_request('POST', 'emails/subscribe', subscription_data, 200)
        subscription_success = success and data.get('success')
        
        self.log_test("Email Subscription", subscription_success,
                     data.get('message', ''))

    def test_waitlist_functionality(self):
        """Test waitlist join functionality"""
        waitlist_data = {
            "email": f"waitlist_{datetime.now().strftime('%H%M%S')}@example.com",
            "product_id": 1,
            "product_name": "RAZE Training Shirt",
            "variant": "Black / Cyan",
            "size": "M (Men's) x1",
            "image": "/images/products/shirt_black_cyan.png"
        }
        
        success, data = self.make_request('POST', 'waitlist/join', waitlist_data, 200)
        waitlist_success = success and data.get('success')
        
        self.log_test("Waitlist Join", waitlist_success,
                     f"Position: {data.get('position', 'Unknown')}")

    def test_promo_code_validation(self):
        """Test promo code validation"""
        promo_data = {
            "code": "WELCOME10",
            "subtotal": 50.00
        }
        
        success, data = self.make_request('POST', 'promo/validate', promo_data, 200)
        promo_valid = success and data.get('valid', False)
        
        self.log_test("Promo Code Validation", promo_valid,
                     f"Discount: ${data.get('discount_amount', 0)}")

    def test_shipping_rates(self):
        """Test shipping rate calculation"""
        shipping_data = {
            "address_to": {
                "first_name": "Test",
                "last_name": "User",
                "email": "test@example.com",
                "address_line1": "123 Test St",
                "city": "San Francisco",
                "state": "CA",
                "postal_code": "94103",
                "country": "US"
            },
            "weight": 0.5
        }
        
        success, data = self.make_request('POST', 'shipping/rates', shipping_data, 200)
        rates_available = success and data.get('success', False)
        
        self.log_test("Shipping Rates", rates_available,
                     f"Rates count: {len(data.get('rates', []))}")

    def test_admin_stats(self):
        """Test admin statistics endpoint"""
        if not self.admin_token:
            self.log_test("Admin Stats", False, "No admin token available")
            return
            
        success, data = self.make_request('GET', 'admin/stats', use_admin=True)
        has_stats = success and 'total_users' in data
        
        self.log_test("Admin Stats", has_stats,
                     f"Users: {data.get('total_users', 0)}, Orders: {data.get('total_orders', 0)}")

    def test_analytics_overview(self):
        """Test analytics overview (admin only)"""
        if not self.admin_token:
            self.log_test("Analytics Overview", False, "No admin token available")
            return
            
        success, data = self.make_request('GET', 'analytics/overview', use_admin=True)
        has_analytics = success and 'total_visitors' in data
        
        self.log_test("Analytics Overview", has_analytics,
                     f"Visitors: {data.get('total_visitors', 0)}")

    def test_image_proxy(self):
        """Test image proxy endpoint"""
        test_url = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
        success, _ = self.make_request('GET', f'proxy-image?url={test_url}', expected_status=200)
        
        self.log_test("Image Proxy", success, "CORS image proxy")

    def test_visitor_tracking(self):
        """Test visitor tracking"""
        visitor_data = {
            "session_id": f"test_session_{datetime.now().strftime('%H%M%S')}",
            "screen_resolution": "1920x1080",
            "language": "en-US",
            "landing_page": "/",
            "referrer": "direct"
        }
        
        success, data = self.make_request('POST', 'visitors/track', visitor_data, 200)
        tracking_success = success and data.get('success')
        
        self.log_test("Visitor Tracking", tracking_success,
                     f"Session ID: {data.get('session_id', 'Unknown')}")

    def run_all_tests(self):
        """Run comprehensive test suite"""
        print("🚀 Starting RAZE Training API Test Suite")
        print(f"📍 Testing: {self.base_url}")
        print("=" * 60)

        # Core API tests
        self.test_api_root()
        self.test_public_stats()
        self.test_image_proxy()
        
        # Authentication tests
        self.test_user_registration()
        self.test_user_login()
        self.test_session_validation()
        self.test_admin_login()
        
        # Feature tests
        self.test_email_subscription()
        self.test_waitlist_functionality()
        self.test_promo_code_validation()
        self.test_shipping_rates()
        self.test_visitor_tracking()
        
        # Admin tests
        self.test_admin_stats()
        self.test_analytics_overview()

        # Print summary
        print("=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"✨ Success Rate: {success_rate:.1f}%")
        
        if success_rate >= 80:
            print("🎉 Backend is functioning well!")
        elif success_rate >= 60:
            print("⚠️  Backend has some issues but core functionality works")
        else:
            print("🚨 Backend has significant issues")
            
        return success_rate >= 60  # Return True if backend is mostly functional

def main():
    """Main test execution"""
    tester = RazeAPITester()
    backend_healthy = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "total_tests": tester.tests_run,
            "passed_tests": tester.tests_passed,
            "success_rate": (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0,
            "backend_healthy": backend_healthy,
            "test_details": tester.test_results
        }, f, indent=2)
    
    return 0 if backend_healthy else 1

if __name__ == "__main__":
    sys.exit(main())