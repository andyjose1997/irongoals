import React, {
    useEffect,
    useState
} from "react";

import {
    API_URL
} from "../../../config";

import "./card.css";

export default function Card() {

    const [
        estatisticas,
        setEstatisticas
    ] = useState(null);

    useEffect(() => {

        carregarEstatisticas();

    }, []);
    const carregando =
        estatisticas === null;
    async function carregarEstatisticas() {

        try {

            const resposta =
                await fetch(
                    `${API_URL}/estatisticas`
                );

            const dados =
                await resposta.json();

            setEstatisticas(
                dados
            );

        }

        catch {

            setEstatisticas(
                {}
            );

        }

    }



    const itens = carregando

        ? [

            {
                valor: "...",
                texto: "Empresas que podem receber seu perfil"
            },

            {
                valor: "...",
                texto: "Usuários cadastrados"
            },

            {
                valor: "...",
                texto: "Perfis visualizados por empresas"
            },

            {
                valor: "...",
                texto: "Entrevistas realizadas pela plataforma"
            }

        ]

        : [

            {

                valor:
                    estatisticas.empresas,

                texto:
                    "Empresas que podem receber seu perfil"

            },

            {

                valor:
                    estatisticas.usuarios,

                texto:
                    "Usuários cadastrados"

            },

            {

                valor:
                    estatisticas.visualizacoes,

                texto:
                    "Perfis visualizados por empresas"

            },

            {

                valor:
                    estatisticas.entrevistas,

                texto:
                    "Entrevistas realizadas pela plataforma"

            }

        ].filter(

            item => item.valor > 0

        );

    return (

        <section
            className="igLoginCardInformacoes"
        >

            <h2
                className="igLoginNumerosTitulo"
            >

                Aumente sua visibilidade profissional

            </h2>

            {

                itens.map(

                    item => (

                        <div
                            key={
                                item.texto
                            }
                            className="igLoginNumeroBox"
                        >

                            <strong>

                                {

                                    carregando

                                        ? "..."

                                        : Number(
                                            item.valor
                                        ).toLocaleString(
                                            "pt-BR"
                                        )

                                }

                            </strong>

                            <span>

                                {
                                    item.texto
                                }

                            </span>

                        </div>

                    )

                )

            }
            <p
                className="igLoginTextoInfo"
            >
                <span className="igLoginTextoInfoEstrelas"></span>

                {

                    estatisticas?.usuarios < 150

                        ? "Você pode fazer parte dos primeiros 150 candidatos fundadores da IronGoals e receber 300 créditos gratuitos para divulgar seu perfil profissional."

                        : "Crie gratuitamente seu perfil profissional e permita que empresas compatíveis encontrem você."

                }

            </p>

        </section>

    );

}