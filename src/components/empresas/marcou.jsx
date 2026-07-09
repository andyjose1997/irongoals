import React, {
    useState
} from "react";

import {
    GoogleLogin
} from "@react-oauth/google";

import {
    API_URL
} from "../../config";

import "./marcou.css";

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
        setContato(
            item.contato || ""
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
    const horaValida =
        /^\d{2}:\d{2}$/.test(
            String(hora || "")
        );

    const formularioCompleto =

        String(
            cargo || ""
        ).trim() !== ""

        &&

        String(
            dia || ""
        ).trim() !== ""

        &&

        horaValida

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
                        <div style={{ width: "50%", display: "flex", margin: "auto" }} >
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


                    </div>

                )
            }
            {
                cargosAnteriores.length > 0 && (

                    <div
                        className="empresaMarcouHistorico"
                    >

                        <h3>
                            Selecione um cargo já utilizado anteriormente para preencher os campos automaticamente.
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
                            Descrição <br />
                            <span className="desc" >
                                Descreva a oportunidade com o máximo de detalhes possível. Informe as principais atividades, requisitos, tipo de contratação (CLT, PJ, estágio, temporário ou freelancer), jornada e horário de trabalho, faixa salarial ou valor do serviço, benefícios, local de atuação (presencial, híbrido ou remoto) e qualquer outra informação importante para que os candidatos compreendam a vaga.
                            </span>                        </label>

                        <textarea
                            rows="29"
                            value={descricao}
                            onChange={e =>
                                setDescricao(
                                    e.target.value
                                )
                            }
                            placeholder={`Exemplo: Estamos contratando um Atendente de Loja para fazer parte da nossa equipe.

• Tipo de contratação: CLT
• Salário: R$ 2.100,00
• Horário: Segunda a sábado, das 09:00 às 18:00
• Modalidade: Presencial em Campinas/SP

Atividades:
• Atendimento aos clientes.
• Organização da loja e reposição de produtos.
• Operação do caixa quando necessário.
• Apoio na limpeza e organização do ambiente.

Requisitos:
• Ensino médio completo.
• Boa comunicação e atendimento ao público.
• Não é necessário experiência.

Benefícios:
• Vale transporte.
• Vale alimentação.
• Bonificação por desempenho.

Será um prazer conhecer seu perfil!`}
                        />
                        <label>
                            Contato
                            <br />
                            <span className="desc">
                                Informe o principal meio de contato que será utilizado antes e durante o processo seletivo. Você pode informar um telefone, WhatsApp, e-mail ou o link da reunião (Zoom, Google Meet, Microsoft Teams ou outra plataforma), caso a entrevista seja realizada online.
                            </span>
                        </label>

                        <input
                            value={contato}
                            onChange={e =>
                                setContato(
                                    e.target.value
                                )
                            }
                            placeholder="Telefone, WhatsApp, e-mail ou outra forma de contato"
                        /> <br /><br />
                        <span className="desc">
                            Após enviar a solicitação de entrevista, aguarde a confirmação do candidato. Somente depois que ele aceitar a entrevista, o perfil público completo será disponibilizado para sua empresa.
                        </span>
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