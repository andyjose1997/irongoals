import React from "react";
import "./portfolio.css";
import {
    useState
} from "react";

import Marcou from "./marcou";

export default function EmpresaPortfolio(
    {
        candidato
    }
) {

    const [
        abrirEntrevista,
        setAbrirEntrevista
    ] = useState(false);

    return (

        <div
            className="empresaPortfolioContainer"
        >

            <div
                className="empresaPortfolioAcoes"
            >

                <button
                    className="empresaPortfolioBotaoEntrevista"
                    onClick={() =>
                        setAbrirEntrevista(
                            true
                        )
                    }
                >
                    Marcar Entrevista com o candidato
                </button>

            </div>

            {

                abrirEntrevista && (

                    <Marcou
                        empresaPublica={
                            window.location.pathname
                                .split("/")
                                .pop()
                        }
                        candidatoId={
                            candidato.id
                        }
                        fechar={() =>
                            setAbrirEntrevista(
                                false
                            )
                        }
                    />

                )

            }

            <section
                className="empresaPortfolioSecao"
            >

                <h2
                    className="empresaPortfolioTitulo"
                >
                    Habilidades
                </h2>

                <div
                    className="empresaPortfolioLista"
                >

                    {

                        candidato.habilidades_completas?.map(
                            item => (

                                <div
                                    key={item.id}
                                    className="empresaPortfolioCard"
                                >

                                    <div
                                        className="empresaPortfolioCardTitulo"
                                    >

                                        {
                                            item.habilidade
                                        }

                                    </div>

                                    <div
                                        className="empresaPortfolioCardDescricao"
                                    >

                                        <span
                                            className="empresaPortfolioBadge"
                                        >

                                            {
                                                item.nivel_habilidade
                                            }

                                        </span>

                                        {

                                            item.tempo_experiencia && (

                                                <span
                                                    className="empresaPortfolioTempo"
                                                >

                                                    {

                                                        item.tempo_experiencia

                                                    }

                                                </span>

                                            )

                                        }

                                    </div>

                                </div>

                            )
                        )

                    }

                </div>

            </section>

            <section
                className="empresaPortfolioSecao"
            >

                <h2
                    className="empresaPortfolioTitulo"
                >
                    Experiências
                </h2>

                <div
                    className="empresaPortfolioLista"
                >

                    {

                        candidato.experiencias?.map(
                            item => (

                                <div
                                    key={item.id}
                                    className="empresaPortfolioCard"
                                >

                                    <div
                                        className="empresaPortfolioCardTitulo"
                                    >

                                        {
                                            item.cargo
                                        }

                                    </div>

                                    <div
                                        className="empresaPortfolioCardSubtitulo"
                                    >

                                        {
                                            item.empresa
                                        }

                                    </div>

                                    <div
                                        className="empresaPortfolioCardDescricao"
                                    >

                                        {
                                            item.area_profissional
                                        }

                                    </div>

                                </div>

                            )
                        )

                    }

                </div>

            </section>

            <section
                className="empresaPortfolioSecao"
            >

                <h2
                    className="empresaPortfolioTitulo"
                >
                    Formação
                </h2>

                <div
                    className="empresaPortfolioLista"
                >

                    {

                        candidato.formacoes?.map(
                            item => (

                                <div
                                    key={item.id}
                                    className="empresaPortfolioCard"
                                >

                                    <div
                                        className="empresaPortfolioCardTitulo"
                                    >

                                        {
                                            item.curso
                                        }

                                    </div>

                                    <div
                                        className="empresaPortfolioCardSubtitulo"
                                    >

                                        {
                                            item.instituicao
                                        }

                                    </div>

                                    <div
                                        className="empresaPortfolioCardDescricao"
                                    >

                                        {
                                            item.nivel_formacao
                                        }

                                    </div>

                                </div>

                            )
                        )

                    }

                </div>

            </section>

            <section
                className="empresaPortfolioSecao"
            >

                <h2
                    className="empresaPortfolioTitulo"
                >
                    Idiomas
                </h2>

                <div
                    className="empresaPortfolioLista"
                >

                    {

                        candidato.idiomas?.map(
                            item => (

                                <div
                                    key={item.id}
                                    className="empresaPortfolioIdiomaCard"
                                >

                                    <span
                                        className="empresaPortfolioIdiomaNome"
                                    >

                                        {
                                            item.idioma
                                        }

                                    </span>

                                    <span
                                        className="empresaPortfolioIdiomaNivel"
                                    >

                                        {
                                            item.nivel
                                        }

                                    </span>

                                </div>

                            )
                        )

                    }

                </div>

            </section>

        </div>

    );

}