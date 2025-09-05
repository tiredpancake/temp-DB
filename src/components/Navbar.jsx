import { Link } from "react-router-dom";
import { useState } from "react";
import logoImage from "../assets/logo-image.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Quick access navigation for header
  const quickAccessLinks = [
    { to: "/", label: "Dashboard", icon: "📊", color: "from-blue-500 to-blue-600" },
    { to: "/cars", label: "Cars", icon: "🚗", color: "from-green-500 to-green-600" },
    { to: "/customers", label: "Customers", icon: "👥", color: "from-purple-500 to-purple-600" },
    { to: "/agencies", label: "Agencies", icon: "🏢", color: "from-orange-500 to-orange-600" },
  ];

  // Full navigation for hamburger menu
  const fullNavigationLinks = [
    { to: "/", label: "Home", icon: "🏠", description: "Main dashboard overview" },
    { to: "/agencies", label: "Agencies", icon: "🏢", description: "Manage car agencies" },
    { to: "/customers", label: "Customers", icon: "👥", description: "Customer management" },
    { to: "/cars", label: "Cars", icon: "🚗", description: "Vehicle inventory" },
    { to: "/companies", label: "Companies", icon: "🏭", description: "Company partnerships" },
    { to: "/sellingplans", label: "Selling Plans", icon: "📋", description: "Sales strategies" },
    { to: "/spotsales", label: "Spot Sales", icon: "💰", description: "Immediate sales" },
    { to: "/overbooksales", label: "Overbook Sales", icon: "📊", description: "Advanced bookings" },
    { to: "/installmentsales", label: "Installment Sales", icon: "💳", description: "Payment plans" },
    { to: "/loans", label: "Loans", icon: "🏦", description: "Financial services" },
    { to: "/contracts", label: "Contracts", icon: "📄", description: "Legal documents" },
    { to: "/participates", label: "Participates", icon: "🤝", description: "Partnerships" },
    { to: "/have", label: "Inventory", icon: "✅", description: "Stock management" },
  ];

  // Stats for header
  const stats = [
    { label: "Total Cars", value: "1,234", icon: "🚗" },
    { label: "Active Sales", value: "89", icon: "📊" },
    { label: "Customers", value: "456", icon: "👥" },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white shadow-2xl backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4 group">
            <div className="relative">
              <img 
                src={logoImage} 
                alt="SellingCar Logo" 
                className="h-14 w-14 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-lg"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent">
                SellingCar
              </h1>
              <span className="text-sm text-blue-300 font-medium tracking-wider">
                PREMIUM DASHBOARD
              </span>
            </div>
          </div>

          {/* Stats Section - Hidden on mobile */}
          <div className="hidden xl:flex items-center space-x-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-2xl font-bold text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xs text-blue-300 flex items-center justify-center space-x-1">
                  <span>{stat.icon}</span>
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Access Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-2">
            {quickAccessLinks.map((link) => (
              <Link
                key={link.to}
                className={`group relative px-4 py-2 rounded-xl bg-gradient-to-r ${link.color} hover:shadow-lg transition-all duration-300 hover:scale-105`}
                to={link.to}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                  <span className="font-semibold text-white">
                    {link.label}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="group relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 hover:scale-105 shadow-lg"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
            
            {/* Menu indicator */}
            {/* <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              {/* <span className="text-xs font-bold text-white"></span> */}
            {/* </div> */}
          </button>
        </div>

        {/* Mobile Stats - Only visible on mobile */}
        <div className="lg:hidden mt-4 flex justify-center space-x-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold text-yellow-400">{stat.value}</div>
              <div className="text-xs text-blue-300 flex items-center space-x-1">
                <span>{stat.icon}</span>
                <span>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Dropdown Menu */}
        <div
          className={`transition-all duration-700 ease-in-out ${
            isMenuOpen
              ? "max-h-screen opacity-100 mt-8 transform translate-y-0"
              : "max-h-0 opacity-0 overflow-hidden transform -translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-br from-slate-800/90 via-blue-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
            {/* Menu Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                Navigation Center
              </h2>
              <p className="text-blue-300">Access all features and manage your car business</p>
            </div>

            {/* Navigation Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {fullNavigationLinks.map((link, index) => (
                <Link
                  key={link.to}
                  className="group relative flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-white/5 to-white/10 hover:from-white/20 hover:to-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/10 hover:border-yellow-400/50"
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <h3 className="font-bold text-sm text-center group-hover:text-yellow-300 transition-colors duration-300 mb-1">
                    {link.label}
                  </h3>
                  <p className="text-xs text-blue-300 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight">
                    {link.description}
                  </p>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Arrow indicator */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Menu Footer */}

            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;