import React, {
    useEffect,
    useState
} from "react";
import Entrevistas from "./entrevistas";
import {
    useParams
} from "react-router-dom";

import {
    API_URL
} from "../../config";

import EmpresaPortfolio
    from "./portfolio";

import "./empresa.css";

export default function Empresas() {
    const [
        aba,
        setAba
    ] = useState(
        "candidatos"
    );

    const [
        entrevistas,
        setEntrevistas
    ] = useState([]);
    const {
        id
    } = useParams();

    const [
        empresa,
        setEmpresa
    ] = useState("");

    const [
        candidatos,
        setCandidatos
    ] = useState([]);

    const [
        indiceAtual,
        setIndiceAtual
    ] = useState(0);

    const [
        candidatoAberto,
        setCandidatoAberto
    ] = useState(false);

    useEffect(() => {

        carregar();

    }, []);

    const candidatoAtual =
        candidatos[indiceAtual];

    useEffect(() => {

        if (
            candidatoAtual
        ) {

            registrarVisto();

        }

    }, [
        indiceAtual,
        candidatos
    ]);

    useEffect(() => {

        if (
            candidatoAberto &&
            candidatoAtual
        ) {

            registrarEntrada();

        }

    }, [
        candidatoAberto
    ]);

    async function carregar() {

        try {

            const resposta =
                await fetch(
                    `${API_URL}/empresa/${id}`
                );

            const dados =
                await resposta.json();

            setEmpresa(
                dados.empresa
            );

            const embaralhados =
                [...(
                    dados.candidatos || []
                )].sort(
                    () =>
                        Math.random() - 0.5
                );

            setCandidatos(
                embaralhados
            );
            const respostaEntrevistas =
                await fetch(
                    `${API_URL}/empresa-entrevistas/${id}`
                );

            const dadosEntrevistas =
                await respostaEntrevistas.json();

            setEntrevistas(
                dadosEntrevistas
            );
        } catch (erro) {

            console.log(
                erro
            );

        }

    }

    async function registrarVisto() {

        try {

            await fetch(
                `${API_URL}/empresa/visto`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({

                        empresa_publica:
                            id,

                        candidato_id:
                            candidatoAtual.id

                    })
                }
            );

        } catch { }

    }

    async function registrarEntrada() {

        try {

            await fetch(
                `${API_URL}/empresa/entrou`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({

                        empresa_publica:
                            id,

                        candidato_id:
                            candidatoAtual.id

                    })
                }
            );

        } catch { }

    }

    return (

        <div
            className="empresaListaContainer"
        >
            <div
                className="empresaAbasContainer"
            >

                <button
                    className={
                        aba === "candidatos"
                            ? "empresaAbaAtiva"
                            : ""
                    }
                    onClick={() =>
                        setAba(
                            "candidatos"
                        )
                    }
                >
                    Candidatos
                </button>

                <button
                    className={
                        aba === "entrevistas"
                            ? "empresaAbaAtiva"
                            : ""
                    }
                    onClick={() =>
                        setAba(
                            "entrevistas"
                        )
                    }
                >
                    Entrevistas
                </button>

            </div>
            <h1
                className="empresaListaTitulo"
            >

                {empresa}

            </h1>
            {
                aba === "candidatos"
                &&
                candidatoAtual && (

                    <div
                        className="empresaListaCard"
                    >

                        <div
                            className="empresaListaCabecalho"
                        >

                            <img
                                src={
                                    candidatoAtual.foto
                                }
                                alt=""
                                className="empresaListaFoto"
                            />

                            <div>

                                <h2>

                                    {
                                        candidatoAtual.nome
                                    }{" "}

                                    {
                                        candidatoAtual.sobrenome
                                    }

                                </h2>

                                {
                                    candidatoAtual.cargo_atual && (

                                        <p>

                                            {
                                                candidatoAtual.cargo_atual
                                            }

                                        </p>

                                    )
                                }

                            </div>

                        </div>

                        <div
                            className="empresaListaHabilidades"
                        >

                            {
                                candidatoAtual.habilidades?.map(
                                    habilidade => (

                                        <div
                                            key={
                                                habilidade.id
                                            }
                                        >

                                            <strong>

                                                {
                                                    habilidade.habilidade
                                                }

                                            </strong>

                                            {" - "}

                                            {
                                                habilidade.nivel_habilidade
                                            }

                                        </div>

                                    )
                                )
                            }

                        </div>

                        <div
                            className="empresaListaNavegacao"
                        >

                            <button
                                className="empresaListaSeta"
                                disabled={
                                    indiceAtual === 0
                                }
                                onClick={() => {

                                    if (
                                        indiceAtual > 0
                                    ) {

                                        setCandidatoAberto(
                                            false
                                        );

                                        setIndiceAtual(
                                            indiceAtual - 1
                                        );

                                    }

                                }}
                            >
                                ←
                            </button>

                            <button
                                className="empresaListaAbrir"
                                onClick={() =>
                                    setCandidatoAberto(
                                        !candidatoAberto
                                    )
                                }
                            >

                                {
                                    candidatoAberto
                                        ? "Ocultar Perfil"
                                        : "Ver Perfil"
                                }

                            </button>

                            <button
                                className="empresaListaSeta"
                                disabled={
                                    indiceAtual >=
                                    candidatos.length - 1
                                }
                                onClick={() => {

                                    if (
                                        indiceAtual <
                                        candidatos.length - 1
                                    ) {

                                        setCandidatoAberto(
                                            false
                                        );

                                        setIndiceAtual(
                                            indiceAtual + 1
                                        );

                                    }

                                }}
                            >
                                →
                            </button>

                        </div>

                        {
                            candidatoAberto && (

                                <EmpresaPortfolio
                                    candidato={
                                        candidatoAtual
                                    }
                                />

                            )
                        }

                    </div>

                )
            }
            {
                aba === "entrevistas" && (

                    <Entrevistas
                        entrevistas={
                            entrevistas
                        }
                    />

                )
            }
        </div>

    );

}