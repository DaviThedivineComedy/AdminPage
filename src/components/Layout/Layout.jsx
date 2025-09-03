import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h1 className="brand">Admin</h1>

        <nav className="nav">
          <NavLink to="/" end className={({isActive}) => `link ${isActive ? "active": ""}`}>
            Início
          </NavLink>
          <NavLink to="/funcionarios" className={({isActive}) => `link ${isActive ? "active": ""}`}>
            Funcionários
          </NavLink>
          <NavLink to="/clientes" className={({isActive}) => `link ${isActive ? "active": ""}`}>
            Clientes
          </NavLink>
          <NavLink to="/fornecedor" className={({isActive}) => `link ${isActive ? "active": ""}`}>
            Fornecedores
          </NavLink>
        </nav>
      </aside>

      <main className="content">
        <header className="header">
          <span>Painel Administrativo — Demo de Navegação</span>
        </header>

        <section className="page">
          <Outlet />
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} Sua Empresa
        </footer>
      </main>
    </div>
  );
}
