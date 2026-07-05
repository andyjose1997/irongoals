import React, {
    useState
} from "react";

import {
    GoogleLogin
} from "@react-oauth/google";

import {
    API_URL
} from "../../config";

import "./empresa.css";

export default function Marcou({ empresaPublica, candidatoId, fechar }) {
    const [
        cargosAnteriores,
        setCargosAnteriores
    ] = useState([]);
    const [
        verificado,
        setVerificado
    ] = useState(false);

    const [
        cargo,
        setCargo
    ] = useState("");

    const [
        dia,
        setDia
    ] = useState("");

    const [
        hora,
        setHora
    ] = useState("");

    const [
        descricao,
        setDescricao
    ] = useState("");

    const [
        carregando,
        setCarregando
    ] = useState(false);
    const [
        contato,
        setContato
    ] = useState("");
    async function carregarCargos() {

        try {

            const resposta =
                await fetch(
                    `${API_URL}/empresa/cargos/${empresaPublica}`
                );

            const dados =
                await resposta.json();

            setCargosAnteriores(
                dados
            );

        } catch { }

    }
    async function verificarEmpresa(
        credentialResponse
    ) {

        try {

            const resposta =
                await fetch(
                    `${API_URL}/empresa/verificar`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            empresa_publica:
                                empresaPublica,
                            credential:
                                credentialResponse.credential
                        })
                    }
                );

            const dados =
                await resposta.json();

            if (!resposta.ok) {

                alert(
                    dados.detail
                );

                return;

            }

            setVerificado(
                true
            );
            carregarCargos();
        } catch {

            alert(
                "Erro ao verificar empresa"
            );

        }

    }

    async function enviarEntrevista() {

        try {

            setCarregando(
                true
            );

            const resposta =
                await fetch(
                    `${API_URL}/empresa/marcar-entrevista`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({

                            empresa_publica:
                                empresaPublica,

                            candidato_id:
                                candidatoId,

                            cargo,

                            dia,

                            hora,

                            descricao,

                            contato

                        })
                    }
                );

            const dados =
                await resposta.json();

            if (!resposta.ok) {

                alert(
                    dados.detail
                );

                return;

            }

            alert(
                "Entrevista enviada com sucesso"
            );

            fechar();

        } catch {

            alert(
                "Erro ao enviar entrevista"
            );

        } finally {

            setCarregando(
                false
            );

        }

    }
    function aplicarCargo(
        item
    ) {

        setCargo(
            item.cargo || ""
        );

        setDescricao(
            item.descricao || ""
        );

        if (
            item.dia
        ) {

            const hoje =
                new Date();

            hoje.setHours(
                0,
                0,
                0,
                0
            );

            const dataCargo =
                new Date(
                    item.dia
                );

            dataCargo.setHours(
                0,
                0,
                0,
                0
            );

            if (
                dataCargo > hoje
            ) {

                setDia(
                    item.dia
                );

                setHora(
                    item.hora || ""
                );

            }

        }

    }
    const formularioCompleto =

        String(
            cargo || ""
        ).trim() !== ""

        &&

        String(
            dia || ""
        ).trim() !== ""

        &&

        String(
            hora || ""
        ).trim() !== ""

        &&

        String(
            descricao || ""
        ).trim() !== ""
        &&

        String(
            contato || ""
        ).trim() !== "";
    return (

        <div
            className="empresaMarcouContainer"
        >

            {
                !verificado && (

                    <div
                        className="empresaMarcouVerificacao"
                    >

                        <h2>
                            Verificar Empresa
                        </h2>

                        <p>

                            Entre com o Google
                            usando o mesmo email
                            cadastrado para a
                            empresa.

                        </p>

                        <GoogleLogin
                            onSuccess={
                                verificarEmpresa
                            }
                            onError={() => {

                                alert(
                                    "Erro Google"
                                );

                            }}
                        />

                    </div>

                )
            }
            {
                cargosAnteriores.length > 0 && (

                    <div
                        className="empresaMarcouHistorico"
                    >

                        <h3>
                            Cargos já utilizados
                        </h3>

                        {
                            cargosAnteriores.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <button
                                        key={index}
                                        className="empresaMarcouCargoAnterior"
                                        onClick={() =>
                                            aplicarCargo(
                                                item
                                            )
                                        }
                                    >

                                        {
                                            item.cargo
                                        }

                                    </button>

                                )
                            )
                        }

                    </div>

                )
            }
            {
                verificado && (

                    <div
                        className="empresaMarcouFormulario"
                    >

                        <h2>
                            Solicitar Entrevista
                        </h2>

                        <label>
                            Cargo
                        </label>

                        <input
                            value={cargo}
                            onChange={e =>
                                setCargo(
                                    e.target.value
                                )
                            }
                        />

                        <label>
                            Dia
                        </label>

                        <input
                            type="date"
                            min={
                                new Date(
                                    Date.now() +
                                    86400000
                                )
                                    .toISOString()
                                    .split("T")[0]
                            }
                            value={dia}
                            onChange={e =>
                                setDia(
                                    e.target.value
                                )
                            }
                        />

                        <label>
                            Hora
                        </label>

                        <input
                            type="time"
                            value={hora}
                            onChange={e =>
                                setHora(
                                    e.target.value
                                )
                            }
                        />

                        <label>
                            Descrição
                        </label>

                        <textarea
                            rows="6"
                            value={descricao}
                            onChange={e =>
                                setDescricao(
                                    e.target.value
                                )
                            }
                        />
                        <label>
                            Contato
                        </label>

                        <input
                            value={contato}
                            onChange={e =>
                                setContato(
                                    e.target.value
                                )
                            }
                            placeholder="Telefone, WhatsApp, e-mail ou outra forma de contato"
                        />
                        <button
                            className="empresaMarcouBotaoEnviar"
                            disabled={
                                carregando
                                ||
                                !formularioCompleto
                            }
                            onClick={
                                enviarEntrevista
                            }
                        >
                            {
                                carregando
                                    ? "Enviando..."
                                    : "Solicitar Entrevista"
                            }

                        </button>

                    </div>

                )
            }

        </div>

    );

}