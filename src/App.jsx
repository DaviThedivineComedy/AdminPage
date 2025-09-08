import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Funcionarios from "./pages/Funcionarios.jsx";
import Fornecedores from "./pages/Fornecedor.jsx";
import Clientes from "./pages/Clientes.jsx";
import Alunos from "./pages/Alunos.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="funcionarios" element={<Funcionarios />} />
        <Route path="clientes" element={<Clientes/>} />
        <Route path="fornecedor" element={<Fornecedores />} />
        <Route path="Alunos" element={<Alunos />}/>
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
