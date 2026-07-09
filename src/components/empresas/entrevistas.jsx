import React from "react";

import "./empresa.css";
import Rodape from "../inicio/componentes/rodape"

export default function Entrevistas(
    {
        entrevistas
    }
) {
    const meses = [

        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro"

    ];

    function formatarData(
        data
    ) {

        if (!data) {

            return "";

        }

        const [
            ano,
            mes,
            dia
        ] = data.split("-");

        return `${parseInt(dia, 10)} de ${meses[parseInt(mes, 10) - 1]} de ${ano}`;

    }
    return (

        <div
            className="empresaEntrevistasContainer"
        >

            {
                entrevistas.map(
                    entrevista => (

                        <div
                            key={
                                entrevista.id
                            }
                            className="empresaEntrevistaCard"
                        >

                            <img
                                src={
                                    entrevista.foto
                                }
                                alt=""
                                className="empresaListaFoto"
                            />

                            <h2>

                                {
                                    entrevista.nome
                                }

                                {" "}

                                {
                                    entrevista.sobrenome
                                }

                            </h2>

                            <p>

                                <strong>
                                    Cargo:
                                </strong>

                                {" "}

                                {
                                    entrevista.cargo
                                }

                            </p>

                            <p>

                                <strong>
                                    Data:
                                </strong>

                                {" "}

                                {
                                    formatarData(
                                        entrevista.dia
                                    )
                                }

                            </p>

                            <p>

                                <strong>
                                    Hora:
                                </strong>

                                {" "}

                                {
                                    entrevista.hora
                                        ?.split(":")
                                        .slice(0, 2)
                                        .join(":")
                                }

                            </p>

                            <p>
                                <span className="empresaEntrevistaStatusspan">
                                    Descriçaõ do trabalho: <span> </span>
                                </span>
                                {
                                    entrevista.descricao
                                }

                            </p>

                            <div
                                className={
                                    entrevista.aprovado === 1
                                        ? "empresaEntrevistaStatus"
                                        : "empresaEntrevistaStatus empresaEntrevistaStatusPendente"
                                }
                            >

                                {
                                    entrevista.aprovado === 1
                                        ? "Entrevista aceita"
                                        : "Pendente"
                                }

                            </div>

                            {
                                entrevista.aprovado === 1 && (

                                    <div
                                    >

                                        <br />

                                        <a
                                            href={
                                                `/portfolio-publico/${entrevista.candidato_id}`
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            className="empresaEntrevistaPortfolio"
                                        >

                                            Ver Portfólio Público

                                        </a>

                                    </div>

                                )
                            }

                        </div>

                    )
                )
            }
            <br />
        </div>

    );

}