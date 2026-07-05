import React, {
  useEffect,
  useState
} from "react";
import { API_URL } from "./config";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import PortfolioPublico from "./components/portfolio-publico/portfoliopublico";
import Inicio from "./components/inicio/inicio";
import QuemSomos from "./components/inicio/quemsomos";
import Pacotes from "./components/inicio/pacotes";
import Login from "./components/inicio/login";
import Portfolio from "./components/portfolio/portfolio";
import Termos from "./components/termos/termos";
import Painel from "./components/verifica/painel";
import PainelVerificado from "./components/painel/painel";
import Empresas from "./components/empresas/empresa";


function VerificarTermos() {

  const [carregando, setCarregando] =
    useState(true);

  const [redirecionar, setRedirecionar] =
    useState(false);

  useEffect(() => {

    verificar();

  }, []);

  async function verificar() {

    const token =
      localStorage.getItem("token");

    if (!token) {

      setCarregando(false);

      return;
    }

    try {

      const resposta =
        await fetch(
          `${API_URL}/me`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      if (!resposta.ok) {

        setCarregando(false);

        return;
      }

      const dados =
        await resposta.json();

      if (dados.termos === "0") {

        setRedirecionar(true);

      }

    } catch (erro) {

      console.log(erro);

    }

    setCarregando(false);

  }

  if (carregando) {

    return null;
  }

  if (redirecionar) {

    return (
      <Navigate
        to="/termos"
        replace
      />
    );
  }

  return null;
}
function ControleFundo() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/portfolio")) {
      document.body.style.backgroundColor = "rgb(207, 209, 211)";
    } else {
      document.body.style.backgroundColor = "#ffffff";
    }

    return () => {
      document.body.style.backgroundColor = "#ffffff";
    };
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>

      <ControleFundo />

      <VerificarTermos />
      <Routes>

        <Route
          path="/"
          element={<Inicio />}
        />

        <Route
          path="/sobre"
          element={<QuemSomos />}
        />

        <Route
          path="/pacotes"
          element={<Pacotes />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/painel-verificado"
          element={<PainelVerificado />}
        />

        <Route
          path="/portfolio"
          element={<Portfolio />}
        />

        {/* aceita qualquer coisa depois de /portfolio */}
        <Route
          path="/portfolio/*"
          element={<Portfolio />}
        />
        <Route
          path="/portfolio-publico/:id"
          element={<PortfolioPublico />}
        />
        <Route
          path="/termos"
          element={<Termos />}
        />
        <Route
          path="/painel"
          element={<Painel />}
        />
        <Route
          path="/empresa/e/:id"
          element={<Empresas />}
        />




      </Routes>

    </BrowserRouter>
  );
}