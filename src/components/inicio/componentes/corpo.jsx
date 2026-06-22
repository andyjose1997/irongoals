import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Corpo.css";

export default function Corpo() {

    const navigate = useNavigate();

    const [logado, setLogado] = useState(false);

    useEffect(() => {

        setLogado(
            !!localStorage.getItem("token")
        );

    }, []);

    return (
        <main className="igCorpoPrincipalContainer">

            <section className="igCorpoHeroSection">

                <h1 className="igCorpoHeroTitulo">
                    Conectamos profissionais e empresas
                    através de compatibilidade inteligente.
                </h1>

                <p className="igCorpoHeroDescricao">
                    Crie seu perfil profissional, aumente sua visibilidade
                    e receba oportunidades de empresas compatíveis com
                    seus objetivos.
                </p>

                <div className="igCorpoHeroBotoesArea">

                    <button
                        className="igCorpoBotaoPrincipal"
                        onClick={() =>
                            navigate(
                                logado
                                    ? "/portfolio/desempenho"
                                    : "/login"
                            )
                        }
                    >
                        {
                            logado
                                ? "Entrar no Meu Perfil"
                                : "Criar Perfil Gratuitamente"
                        }
                    </button>

                    <button
                        className="igCorpoBotaoSecundario"
                        onClick={() => {
                            document
                                .getElementById("como-funciona")
                                ?.scrollIntoView({
                                    behavior: "smooth"
                                });
                        }}
                    >
                        Ver Como Funciona
                    </button>

                </div>

            </section>

            <section
                id="como-funciona"
                className="igCorpoComoFuncionaSection"
            >

                <h2 className="igCorpoTituloSecao">
                    Como Funciona
                </h2>

                <div className="igCorpoCardsGrid">

                    <div className="igCorpoCardInfo">

                        <div className="igCorpoCardIcone">
                            📄
                        </div>

                        <h3>
                            Crie seu Perfil
                        </h3>

                        <p>
                            Adicione experiências,
                            cursos, habilidades
                            e objetivos profissionais.
                        </p>

                    </div>

                    <div className="igCorpoCardInfo">

                        <div className="igCorpoCardIcone">
                            🎯
                        </div>

                        <h3>
                            Receba Compatibilidade
                        </h3>

                        <p>
                            O sistema identifica
                            empresas compatíveis
                            com seu perfil.
                        </p>

                    </div>

                    <div className="igCorpoCardInfo">

                        <div className="igCorpoCardIcone">
                            🤝
                        </div>

                        <h3>
                            Empresas Demonstram Interesse
                        </h3>

                        <p>
                            Empresas podem solicitar
                            entrevistas diretamente
                            pela plataforma.
                        </p>

                    </div>

                    <div className="igCorpoCardInfo">

                        <div className="igCorpoCardIcone">
                            🔒
                        </div>

                        <h3>
                            Você Decide
                        </h3>

                        <p>
                            Seus dados de contato
                            só são compartilhados
                            após sua aprovação.
                        </p>

                    </div>

                </div>

            </section>

        </main>
    );
}