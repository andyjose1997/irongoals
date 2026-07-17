import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./corpo.css";
import { API_URL } from "../../../config";
export default function Corpo() {

    const navigate = useNavigate();

    const [logado, setLogado] = useState(false);
    const [candidatosLanding, setCandidatosLanding] = useState([]);


    useEffect(() => {

        setLogado(
            !!localStorage.getItem("token")
        );

        buscarCandidatosLanding();

        const intervalo = setInterval(() => {

            buscarCandidatosLanding();

        }, 5000);

        return () => clearInterval(intervalo);

    }, []);

    const FRASES = [

        "Perfil profissional disponível para empresas.",

        "Em busca de novas oportunidades profissionais.",

        "Disponível para ser encontrado por recrutadores.",

        "Compartilhando seu perfil com empresas compatíveis.",

        "Preparado para novas oportunidades de carreira.",

        "Perfil atualizado na plataforma.",

        "Conectando competências às empresas certas.",

        "Aumentando sua visibilidade profissional.",

        "Expandindo suas oportunidades de trabalho.",

        "Fazendo parte da comunidade IronGoals."

    ];
    async function buscarCandidatosLanding() {

        try {

            const resposta = await fetch(
                `${API_URL}/landing/candidatos`
            );

            if (!resposta.ok) {
                return;
            }

            const dados = await resposta.json();

            const frasesDisponiveis = [...FRASES];

            const candidatos = dados.map((candidato) => {

                if (frasesDisponiveis.length === 0) {

                    frasesDisponiveis.push(...FRASES);

                }

                const indice = Math.floor(
                    Math.random() * frasesDisponiveis.length
                );

                const frase = frasesDisponiveis.splice(indice, 1)[0];

                return {

                    ...candidato,

                    frase

                };

            });

            setCandidatosLanding(candidatos);

        }

        catch (erro) {

            console.log(erro);

        }

    }
    return (
        <main className="igCorpoPrincipalContainer">

            <section className="igCorpoHeroSection">

                <h1 className="igCorpoHeroTitulo">
                    Conectamos profissionais e empresas
                    através de compatibilidade inteligente.
                </h1>
                <div className="igCorpoComunidadeContainer">

                    <p className="igCorpoComunidadeTitulo">
                        Alguns profissionais que utilizam a IronGoals
                    </p>

                    <div className="igCorpoComunidadeLista">

                        {

                            candidatosLanding.map((pessoa) => (

                                <div
                                    key={pessoa.nome + pessoa.sobrenome}
                                    className="igCorpoComunidadeCard"
                                >

                                    <img
                                        src={pessoa.foto}
                                        alt={pessoa.nome}
                                        className="igCorpoComunidadeFoto"
                                    />

                                    <div className="igCorpoComunidadeInfo">

                                        <strong>

                                            {pessoa.nome} {pessoa.sobrenome}

                                        </strong>

                                        <span>
                                            {pessoa.frase}
                                        </span>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                    <p className="igCorpoComunidadeTexto">

                        Cadastre seu perfil gratuitamente e aumente suas oportunidades de ser encontrado por empresas compatíveis.

                    </p>

                </div>


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