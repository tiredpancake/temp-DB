import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <h1 className="text-2xl font-bold">SellingCar Dashboard</h1>
        <div className="flex flex-wrap gap-3 mt-2 md:mt-0">
          <Link className="hover:text-yellow-300" to="/">Home</Link>
          <Link className="hover:text-yellow-300" to="/agencies">Agencies</Link>
          <Link className="hover:text-yellow-300" to="/customers">Customers</Link>
          <Link className="hover:text-yellow-300" to="/cars">Cars</Link>
          <Link className="hover:text-yellow-300" to="/companies">Companies</Link>
          <Link className="hover:text-yellow-300" to="/sellingplans">SellingPlans</Link>
          <Link className="hover:text-yellow-300" to="/spotsales">SpotSales</Link>
          <Link className="hover:text-yellow-300" to="/overbooksales">OverbookSales</Link>
          <Link className="hover:text-yellow-300" to="/installmentsales">InstallmentSales</Link>
          <Link className="hover:text-yellow-300" to="/loans">Loans</Link>
          <Link className="hover:text-yellow-300" to="/contracts">Contracts</Link>
          <Link className="hover:text-yellow-300" to="/participates">Participates</Link>
          <Link className="hover:text-yellow-300" to="/have">Have</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
