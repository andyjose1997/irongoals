import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import "./header.css";
import logoIronGoals from "./logo/ig.png";

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();

    const [usuario, setUsuario] = useState(null);

    const [mostrarHeader, setMostrarHeader] = useState(true);

    useEffect(() => {
        carregarUsuario();
    }, []);

    useEffect(() => {

        let ultimoScroll = window.scrollY;

        function controlarScroll() {

            const scrollAtual = window.scrollY;

            if (scrollAtual <= 20) {

                setMostrarHeader(true);

            } else if (scrollAtual > ultimoScroll) {

                setMostrarHeader(false);

            } else {

                setMostrarHeader(true);

            }

            ultimoScroll = scrollAtual;

        }

        window.addEventListener(
            "scroll",
            controlarScroll,
            { passive: true }
        );

        return () => {

            window.removeEventListener(
                "scroll",
                controlarScroll
            );

        };

    }, []);

    async function carregarUsuario() {

        try {

            const token = localStorage.getItem("token");

            if (!token) {

                setUsuario(null);
                return;

            }

            const resposta = await fetch(
                `${API_URL}/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!resposta.ok) {

                setUsuario(null);
                return;

            }

            const dados = await resposta.json();

            setUsuario(dados);

        } catch (erro) {

            console.error(erro);

            setUsuario(null);

        }

    }

    return (

        <header
            className={`igHeaderPrincipalContainer ${mostrarHeader ? "" : "igHeaderOculto"}`}
        >

            <div
                className="igHeaderMarcaArea"
                onClick={() => navigate("/")}
            >

                <img
                    src={logoIronGoals}
                    alt="IronGoals"
                    className="igHeaderLogoImagem"
                />

                <h1 className="igHeaderTituloSistema">

                    IronGoals

                </h1>

            </div>

            <nav className="igHeaderMenuNavegacao">

                {location.pathname !== "/" && (

                    <button
                        className="igHeaderBotaoMenu"
                        onClick={() => navigate("/")}
                    >

                        Home

                    </button>

                )}

                {location.pathname !== "/sobre" && (

                    <button
                        className="igHeaderBotaoMenu"
                        onClick={() => navigate("/sobre")}
                    >

                        Sobre

                    </button>

                )}

                {location.pathname !== "/pacotes" && (

                    <button
                        className="igHeaderBotaoMenu"
                        onClick={() => navigate("/pacotes")}
                    >

                        Ver Pacotes

                    </button>

                )}

                {!usuario ? (

                    location.pathname !== "/login" && (

                        <button
                            className="igHeaderBotaoLoginDestaque"
                            onClick={() => navigate("/login")}
                        >

                            Fazer Login

                        </button>

                    )

                ) : (

                    <div
                        style={{ background: "#2563eb" }}
                        className="igHeaderPerfilUsuarioArea"
                        onClick={() => navigate("/portfolio/desempenho")}
                    >

                        <img
                            src={
                                usuario?.foto ||
                                "https://placehold.co/100x100"
                            }
                            alt={usuario?.nome}
                            className="igHeaderFotoUsuario"
                        />

                        <span
                            style={{ color: "white" }}
                            className="igHeaderNomeUsuario"
                        >

                            {usuario?.nome}

                        </span>

                    </div>

                )}

            </nav>

        </header>

    );

}