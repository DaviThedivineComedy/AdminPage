import { useState } from "react";
import "./CrudClientes.css";

function ClientID() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

const ClientType = ["pessoa fisica", "pessoa juridica"];

export default function ClientCrud() {
  const [clientList, setClientList] = useState([]);
  const [clientForm, setClientForm] = useState({
    id: null,
    name: "",
    type: "",
    document: "",
    email: "",
    phone: "",
  });

  const isEditing = clientForm.id !== null;

  function handleChange(e) {
    const { name, value } = e.target;
    setClientForm((prev) => ({ ...prev, [name]: value }));
  }

  function clearForm() {
    setClientForm({
      id: null,
      name: "",
      type: "",
      document: "",
      email: "",
      phone: "",
    });
  }

  function addClient() {
    const newClient = { id: ClientID(), ...clientForm };
    setClientList([newClient, ...clientList]);
    clearForm();
  }

  function startEdit(client) {
    setClientForm(client);
  }

  function updateClient() {
    const updatedList = clientList.map((c) =>
      c.id === clientForm.id ? { ...clientForm } : c
    );
    setClientList(updatedList);
    clearForm();
  }

  function removeClient(id) {
    const confirmDelete = window.confirm(
      "Você tem certeza que quer remover esse cliente?"
    );
    if (confirmDelete) {
      setClientList(clientList.filter((c) => c.id !== id));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) updateClient();
    else addClient();
  }

  return (
    <div className="Card crud">
      <h2 className="crud__title">Gestão de CLientes</h2>
      <p className="crud__subtitle">Crud simples para criação de Clientes</p>

      <form onSubmit={handleSubmit} className="crud__form">
        <div className="form-row">
          <div className="form-field">
            <label className="label">Nome Completo</label>
            <input
              className="input"
              type="text"
              name="name"
              value={clientForm.name}
              onChange={handleChange}
              placeholder="Felipe Sousa"
            />
          </div>

          <div className="form-field">
            <label className="label">Tipo de cliente</label>
            <select
              className="select"
              name="type"
              value={clientForm.type}
              onChange={handleChange}
            >
              <option value="">Escolha o tipo</option>
              {ClientType.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label className="label">Documentos</label>
            <input
              className="input"
              type="text"
              name="document"
              value={clientForm.document}
              onChange={handleChange}
              placeholder="Cpf ou Cnpj"
            />
          </div>
          <div className="form-field">
            <label className="label">E-mail</label>
            <input
              className="input"
              type="email"
              name="email"
              value={clientForm.email}
              onChange={handleChange}
              placeholder="Email@email.com"
            />
          </div>
        </div>
        <div className="form row">
          <div className="form-field">
            <label className="label">Telefone</label>
            <input
              className="input"
              type="text"
              name="phone"
              value={clientForm.phone}
              onChange={handleChange}
              placeholder="+55(24)98868-2708"
            />
          </div>
        </div>
        <div className="actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Atualizar Cliente" : "Adcionar Cliente"}
          </button>
          <button type="button" onClick={clearForm} className="btn btn-ghost">
            Cancelar
          </button>
        </div>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th className="th">nome</th>
            <th className="th">Tipo</th>
            <th className="th">Documentos</th>
            <th className="th">E-mail</th>
            <th className="th">Telefone</th>
            <th className="th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientList.length === 0 ? (
            <tr>
              <td className="td" colSpan={6}>
                — Sem Clientes registrador—
              </td>
            </tr>
          ) : (
            clientList.map((cliente) => (
              <tr>
                <th className="th">{cliente.name}</th>
                <th className="th">{cliente.type}</th>
                <th className="th">{cliente.documento}</th>
                <th className="th">{cliente.Email}</th>
                <th className="th">{cliente.phone}</th>
                <th className="th">
                  <div className="row-actions">
                    <button
                      className="btn btn-small"
                      onClick={() => startEdit(cliente)}
                    >
                      {" "}
                      Editar{" "}
                    </button>
                    <button
                      className="btn btn-small"
                      onClick={() => removeClient(cliente.id)}
                    >
                      {" "}
                      Remover{" "}
                    </button>
                  </div>
                </th>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
