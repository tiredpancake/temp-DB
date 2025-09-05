import { Link } from "react-router-dom";

const Home = () => {
  const sections = [
    "Agencies", "Customers", "Cars", "Companies", "SellingPlans",
    "SpotSales", "OverbookSales", "InstallmentSales", "Loans",
    "Contracts", "Participates", "Have"
  ];

  return (
    <div className="container mx-auto mt-16 px-4">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-800">
        Welcome to SellingCar Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sections.map(section => (
          <Link 
            key={section} 
            to={`/${section.toLowerCase()}`} 
            className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 
                       hover:scale-105 transform transition-all duration-300 
                       text-white font-semibold py-10 rounded-xl shadow-lg border border-blue-300"
          >
            <span className="text-xl sm:text-2xl md:text-3xl">{section}</span>
          </Link>
        ))}
      </div>

      <p className="text-center mt-16 text-gray-500">
        Click any section to manage data.
      </p>
    </div>
  );
};

export default Home;
