import { useState } from "react";
import "./CrudFuncionarios.css";

function gerarId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

const cargos = [
  "Estagiário",
  "Assistente",
  "Analista",
  "Técnico",
  "Coordenador",
  "Gerente",
  "Diretor",
];

export default function CrudFuncionarios() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nome: "",
    matricula: "",
    cargo: "",
    email: "",
    telefone: "",
    admissao: "",
  });

  const emEdicao = form.id !== null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function limparForm() {
    setForm({
      id: null,
      nome: "",
      matricula: "",
      cargo: "",
      email: "",
      telefone: "",
      admissao: "",
    });
  }

  function adicionarFuncionario() {
    const novo = { id: gerarId(), ...form, id: gerarId() };
    setLista([novo, ...lista]);
    limparForm();
  }

  function iniciarEdicao(func) {
    setForm(func);
  }

  function atualizarFuncionario() {
    const atualizada = lista.map((f) => (f.id === form.id ? { ...form } : f));
    setLista(atualizada);
    limparForm();
  }

  function removerFuncionario(id) {
  const confirmar = window.confirm("Tem certeza que deseja remover este funcionário?");
  if (confirmar) {
    setLista(lista.filter((f) => f.id !== id));
  }
}

  function onSubmit(e) {
    e.preventDefault();
    if (emEdicao) atualizarFuncionario();
    else adicionarFuncionario();
  }

  return (
    <div className="card crud">
      <h2 className="crud__title">Gestão de Funcionários</h2>
      <p className="crud__subtitle">CRUD simples (sem validação) com dados básicos.</p>

      <form onSubmit={onSubmit} className="crud__form">
        <div className="form-row">
          <div className="form-field">
            <label className="label">Nome completo</label>
            <input
              className="input"
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex.: Ana Beatriz Souza"
            />
          </div>

          <div className="form-field">
            <label className="label">Matrícula</label>
            <input
              className="input"
              type="text"
              name="matricula"
              value={form.matricula}
              onChange={handleChange}
              placeholder="Ex.: 2025-0342"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="label">Cargo</label>
            <select
              className="select"
              name="cargo"
              value={form.cargo}
              onChange={handleChange}
            >
              <option value="">Selecione um cargo</option>
              {cargos.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label className="label">E-mail corporativo</label>
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ex.: ana.souza@empresa.com.br"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="label">Telefone</label>
            <input
              className="input"
              type="text"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="Ex.: (21) 98888-7777"
            />
          </div>

          <div className="form-field">
            <label className="label">Data de admissão</label>
            <input
              className="input"
              type="date"
              name="admissao"
              value={form.admissao}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="actions">
          <button type="submit" className="btn btn-primary">
            {emEdicao ? "Atualizar" : "Adicionar"}
          </button>
          <button type="button" onClick={limparForm} className="btn btn-ghost">
            Limpar
          </button>
        </div>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th className="th">Nome</th>
            <th className="th">Matrícula</th>
            <th className="th">Cargo</th>
            <th className="th">E-mail</th>
            <th className="th">Telefone</th>
            <th className="th">Admissão</th>
            <th className="th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.length === 0 ? (
            <tr>
              <td className="td" colSpan={7}>
                — Nenhum funcionário cadastrado —
              </td>
            </tr>
          ) : (
            lista.map((f) => (
              <tr key={f.id}>
                <td className="td">{f.nome}</td>
                <td className="td">{f.matricula}</td>
                <td className="td">{f.cargo}</td>
                <td className="td">{f.email}</td>
                <td className="td">{f.telefone}</td>
                <td className="td">
                  {f.admissao ? new Date(f.admissao).toLocaleDateString() : ""}
                </td>
                <td className="td">
                  <div className="row-actions">
                    <button className="btn btn-small" onClick={() => iniciarEdicao(f)}>
                      Editar
                    </button>
                    <button className="btn btn-small" onClick={() => removerFuncionario(f.id)}>
                      Remover
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
