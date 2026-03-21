import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css';

function Admin() {
  const [destinations, setDestinations] = useState([]);
  const [form, setForm] = useState({
    city: '',
    country: '',
    price: '',
    image: '',
    rating: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    const res = await axios.get('http://localhost:5000/api/auth/destinations');
    setDestinations(res.data);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("city", form.city);
  formData.append("country", form.country);
  formData.append("price", form.price);
  formData.append("rating", form.rating);
  formData.append("image", form.image);

  if (editId) {
    await axios.put(
      `http://localhost:5000/api/auth/${editId}`,
      formData
    );
    setEditId(null);
  } else {
    await axios.post(
  "http://localhost:5000/api/auth/",formData
);
  }

  setForm({ city: '', country: '', price: '', image: '', rating: '' });
  fetchDestinations();
};

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/auth/destinations/${id}`);
    fetchDestinations();
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Manage Destinations</h2>

      {/* FORM */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
          <input placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
          <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
<input 
  type="file" 
  onChange={e => setForm({ ...form, image: e.target.files[0] })}
/>          <input placeholder="Rating" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} />
        </div>

        <button className="submit-btn" type="submit">
          {editId ? 'Update Destination' : 'Add Destination'}
        </button>
      </form>

      <hr className="divider" />

      {/* LIST */}
      <div className="destination-list">
        {destinations.map(item => (
          <div className="card" key={item._id}>
            <div className="card-info">
              <h3>{item.city}</h3>
              <p>{item.country}</p>
              <img src={item.image} alt={item.city} width="100" />
              <span className="price">₹{item.price}</span>
            </div>

            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;