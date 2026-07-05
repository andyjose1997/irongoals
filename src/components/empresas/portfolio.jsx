import React from "react";
import "./empresa.css";
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
                    Marcar Entrevista
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
            <h2>
                Habilidades
            </h2>

            {
                candidato.habilidades_completas?.map(
                    item => (

                        <div
                            key={item.id}
                        >

                            <strong>
                                {
                                    item.habilidade
                                }
                            </strong>

                            {" - "}

                            {
                                item.nivel_habilidade
                            }

                            {
                                item.tempo_experiencia && (
                                    <>
                                        {" • "}
                                        {
                                            item.tempo_experiencia
                                        }
                                    </>
                                )
                            }

                        </div>

                    )
                )
            }

            <h2>
                Experiências
            </h2>

            {
                candidato.experiencias?.map(
                    item => (

                        <div
                            key={item.id}
                        >

                            <strong>
                                {
                                    item.cargo
                                }
                            </strong>

                            <br />

                            {
                                item.empresa
                            }

                            <br />

                            {
                                item.area_profissional
                            }

                        </div>

                    )
                )
            }

            <h2>
                Formação
            </h2>

            {
                candidato.formacoes?.map(
                    item => (

                        <div
                            key={item.id}
                        >

                            <strong>
                                {
                                    item.curso
                                }
                            </strong>

                            <br />

                            {
                                item.instituicao
                            }

                            <br />

                            {
                                item.nivel_formacao
                            }

                        </div>

                    )
                )
            }

            <h2>
                Idiomas
            </h2>

            {
                candidato.idiomas?.map(
                    item => (

                        <div
                            key={item.id}
                        >

                            {
                                item.idioma
                            }

                            {" - "}

                            {
                                item.nivel
                            }

                        </div>

                    )
                )
            }

        </div>

    );

}