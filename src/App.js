import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Agencies from "./pages/Agencies.jsx";
import Customers from "./pages/Customers.jsx";
import Cars from "./pages/Cars.jsx";
import Companies from "./pages/Companies.jsx";
import SellingPlans from "./pages/Sellingplans.jsx";
import SpotSales from "./pages/SpotSales.jsx";
import OverbookSales from "./pages/OverbookSales.jsx";
import InstallmentSales from "./pages/InstallmentSales.jsx";
import Loans from "./pages/Loans.jsx";
import Contracts from "./pages/Contracts.jsx";
import Participates from "./pages/Participates.jsx";
import Have from "./pages/Have.jsx";
import Login from "./Login.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agencies" element={<Agencies />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/sellingplans" element={<SellingPlans />}/>
       
        <Route path="/spotsales" element={<SpotSales />} />
         
        <Route path="/overbooksales" element={<OverbookSales />} />
        <Route path="/installmentsales" element={<InstallmentSales />} />
        <Route path="/participates" element={<Participates />} />
        <Route path="/have" element={<Have />} />
       
        <Route path="/loans" element={<Loans />} />
         <Route path="/login" element={<Login />} />
        
        
        
      </Routes>
    </Router>
  );
}

export default App;
