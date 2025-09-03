import { useState } from "react";
import "./CrudFornecedor.css";

function supplierId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

const supplierCategory = [
  "materials",
  "services",
  "logistics",
  "IT",
  "others",
];

export default function SupplierCrud() {
  const [supplierList, setSupplierList] = useState([]);
  const [supplierForm, setSupplierForm] = useState({
    id: null,
    name: "",
    social: "",
    category: "",
    cnpj: "",
    email: "",
    phone: "",
  });

  const isEditing = supplierForm.id !== null;

  function handleChange(e) {
    const { name, value } = e.target;
    setSupplierForm((prev) => ({ ...prev, [name]: value }));
  }

  function clearForm() {
    setSupplierForm({
      id: null,
      name: "",
      social: "",
      category: "",
      cnpj: "",
      email: "",
      phone: "",
    });
  }

  function addSupplier() {
    const newSupplier = { id: supplierId(), ...supplierForm };
    setSupplierList([newSupplier, ...supplierList]);
    clearForm();
  }

  function startEdit(supplier) {
    setSupplierForm(supplier);
  }

  function updateSupplier() {
    const updatedList = supplierList.map((s) =>
      s.id === supplierForm.id ? { ...supplierForm } : s
    );
    setSupplierList(updatedList);
    clearForm();
  }

  function removeSupplier(id) {
    const confirmDelete = window.confirm("Are you sure you want to remove this supplier?");
    if (confirmDelete) {
      setSupplierList(supplierList.filter((s) => s.id !== id));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) updateSupplier();
    else addSupplier();
  }

  return (
    <div className="card crud">
      <h2 className="crud__title">Supplier Management</h2>
      <p className="crud__subtitle">Simple CRUD for supplier data</p>

      <form onSubmit={handleSubmit} className="crud__form">
        <div className="form-row">
          <div className="form-field">
            <label className="label">Trade Name</label>
            <input
              className="input"
              type="text"
              name="name"
              value={supplierForm.name}
              onChange={handleChange}
              placeholder="e.g. Global Supplies Ltd."
            />
          </div>

          <div className="form-field">
            <label className="label">Corporate Name</label>
            <input
              className="input"
              type="text"
              name="social"
              value={supplierForm.social}
              onChange={handleChange}
              placeholder="e.g. Global Supplies Corporation"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="label">Category</label>
            <select
              className="select"
              name="category"
              value={supplierForm.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {supplierCategory.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label className="label">CNPJ</label>
            <input
              className="input"
              type="text"
              name="cnpj"
              value={supplierForm.cnpj}
              onChange={handleChange}
              placeholder="e.g. 12.345.678/0001-90"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              name="email"
              value={supplierForm.email}
              onChange={handleChange}
              placeholder="e.g. contact@supplier.com"
            />
          </div>

          <div className="form-field">
            <label className="label">Phone</label>
            <input
              className="input"
              type="text"
              name="phone"
              value={supplierForm.phone}
              onChange={handleChange}
              placeholder="e.g. (11) 91234-5678"
            />
          </div>
        </div>

        <div className="actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Supplier" : "Add Supplier"}
          </button>
          <button type="button" onClick={clearForm} className="btn btn-ghost">
            Clear
          </button>
        </div>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th className="th">Trade Name</th>
            <th className="th">Corporate Name</th>
            <th className="th">Category</th>
            <th className="th">CNPJ</th>
            <th className="th">Email</th>
            <th className="th">Phone</th>
            <th className="th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {supplierList.length === 0 ? (
            <tr>
              <td className="td" colSpan={7}>
                — No suppliers registered —
              </td>
            </tr>
          ) : (
            supplierList.map((s) => (
              <tr key={s.id}>
                <td className="td">{s.name}</td>
                <td className="td">{s.social}</td>
                <td className="td">{s.category}</td>
                <td className="td">{s.cnpj}</td>
                <td className="td">{s.email}</td>
                <td className="td">{s.phone}</td>
                <td className="td">
                  <div className="row-actions">
                    <button
                      className="btn btn-small"
                      onClick={() => startEdit(s)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-small"
                      onClick={() => removeSupplier(s.id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
