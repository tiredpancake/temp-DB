import { useEffect, useState } from "react";
import api from "../api/api.js";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ color: "", model: "", engineType: "", productYear: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => { fetchCars(); }, []);

  const fetchCars = async () => {
    try {
      const res = await api.get("/cars");
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/cars", { 
        ...form, 
        productYear: form.productYear ? parseInt(form.productYear) : null 
      });
      setForm({ color: "", model: "", engineType: "", productYear: "" });
      fetchCars();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/cars/${id}`);
      fetchCars();
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = car => {
    setEditingId(car.id);
    setEditForm({ ...car });
  };

  const cancelEditing = () => setEditingId(null);

  const handleUpdate = async id => {
    try {
      await api.put(`/cars/${id}`, { 
        ...editForm, 
        productYear: editForm.productYear ? parseInt(editForm.productYear) : null 
      });
      setEditingId(null);
      fetchCars();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4 mb-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Cars</h2>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">
        <input name="color" placeholder="Color" value={form.color} onChange={handleChange} className="border p-2 rounded"/>
        <input name="model" placeholder="Model" value={form.model} onChange={handleChange} className="border p-2 rounded"/>
        <input name="engineType" placeholder="Engine Type" value={form.engineType} onChange={handleChange} className="border p-2 rounded"/>
        <input name="productYear" placeholder="Year" value={form.productYear} onChange={handleChange} className="border p-2 rounded"/>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded">Add</button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Color</th>
              <th className="py-2 px-4 border">Model</th>
              <th className="py-2 px-4 border">Engine Type</th>
              <th className="py-2 px-4 border">Year</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car.id}>
                <td className="py-2 px-4 border">{car.id}</td>

                {editingId === car.id ? (
                  <>
                    <td className="py-2 px-4 border"><input name="color" value={editForm.color} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="model" value={editForm.model} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="engineType" value={editForm.engineType} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border"><input name="productYear" value={editForm.productYear} onChange={handleEditChange} className="border p-1 rounded w-full"/></td>
                    <td className="py-2 px-4 border flex gap-2">
                      <button onClick={() => handleUpdate(car.id)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Save</button>
                      <button onClick={cancelEditing} className="bg-gray-400 hover:bg-gray-600 text-white py-1 px-2 rounded">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border">{car.color}</td>
                    <td className="py-2 px-4 border">{car.model}</td>
                    <td className="py-2 px-4 border">{car.engineType}</td>
                    <td className="py-2 px-4 border">{car.productYear}</td>
                    <td className="py-2 px-4 border flex gap-2">
                      <button onClick={() => startEditing(car)} className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded">Edit</button>
                      <button onClick={() => handleDelete(car.id)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cars;
