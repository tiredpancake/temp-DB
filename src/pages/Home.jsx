import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Car,
  Building,
  Users,
  FileText,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  CreditCard,
  ScrollText,
  ClipboardList,
  Key,
} from "lucide-react";

const Home = () => {
  const sections = [
    { name: "Agencies", icon: Building },
    { name: "Customers", icon: Users },
    { name: "Cars", icon: Car },
    { name: "Companies", icon: Building },
    { name: "SellingPlans", icon: FileText },
    { name: "SpotSales", icon: DollarSign },
    { name: "OverbookSales", icon: ShoppingCart },
    { name: "InstallmentSales", icon: TrendingUp },
    { name: "Loans", icon: CreditCard },
    { name: "Contracts", icon: ScrollText },
    { name: "Participates", icon: ClipboardList },
    { name: "Have", icon: Key },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center px-6 relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Welcome to <span className="text-yellow-300">SellingCar</span>
          </h1>
          <p className="text-lg md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Manage agencies, customers, cars, and sales — all in one powerful
            dashboard.
          </p>
          <Link
            to="/login"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            Get Started
          </Link>
        </motion.div>

        {/* Background car image */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center z-0 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0 pointer-events-none"></div>
      </section>

      {/* Sections Grid */}
      <section id="sections" className="container mx-auto mt-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold mb-16 text-center text-gray-800 tracking-tight"
        >
          Explore Dashboard Sections
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
        >
          {sections.map(({ name, icon: Icon }) => (
            <motion.div
              key={name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                to={`/${name.toLowerCase()}`}
                className="group flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-12 rounded-2xl shadow-xl border border-blue-300 relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Background overlay animation */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="mb-4"
                >
                  <Icon size={50} />
                </motion.div>

                {/* Text */}
                <span className="text-xl sm:text-2xl md:text-3xl drop-shadow-md">
                  {name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-20 text-gray-500 text-lg"
        >
          🚗 Click any section to manage data efficiently.
        </motion.p>
      </section>

      {/* Footer */}
      <footer className="mt-32 py-8 bg-gray-800 text-gray-300 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} SellingCar. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
