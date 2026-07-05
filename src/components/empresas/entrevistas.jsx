import React from "react";

import "./empresa.css";

export default function Entrevistas(
    {
        entrevistas
    }
) {

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
                                    entrevista.dia
                                }

                            </p>

                            <p>

                                <strong>
                                    Hora:
                                </strong>

                                {" "}

                                {
                                    entrevista.hora
                                }

                            </p>

                            <p>

                                {
                                    entrevista.descricao
                                }

                            </p>

                            <div
                                className="empresaEntrevistaStatus"
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
                                        className="empresaEntrevistaAceita"
                                    >

                                        <p>

                                            Candidato aceitou entrevista

                                        </p>

                                        <a
                                            href={
                                                `/portfolio-publico/${entrevista.candidato_id}`
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            className="empresaEntrevistaPortfolio"
                                        >

                                            Ver Portfólio

                                        </a>

                                    </div>

                                )
                            }

                        </div>

                    )
                )
            }

        </div>

    );

}