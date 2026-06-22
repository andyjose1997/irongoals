import { useEffect, useState } from "react";
import { API_URL } from "../../../../../../config";
import "./infos.css";
import Input from "./input";
const CAMPOS = [
    { chave: "data_nascimento", titulo: "Data de Nascimento" },

    { chave: "telefone", titulo: "Telefone" },
    { chave: "whatsapp", titulo: "WhatsApp" },
    { chave: "linkedin", titulo: "LinkedIn" },
    { chave: "site", titulo: "Site" },
    { chave: "cep", titulo: "CEP" },
    { chave: "sexo", titulo: "Sexo" },
    { chave: "estado_civil", titulo: "Estado Civil" },
    { chave: "nacionalidade", titulo: "Nacionalidade" },
    { chave: "possui_cnh", titulo: "Possui CNH" },
    { chave: "possui_veiculo", titulo: "Possui Veículo" },
    { chave: "disponibilidade", titulo: "Disponibilidade" }
];

export default function Infos() {
    const [confirmandoApagar, setConfirmandoApagar] = useState(null);
    const [dados, setDados] = useState({});
    const [editando, setEditando] = useState(null);
    const [valor, setValor] = useState("");

    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {

        try {

            const token = localStorage.getItem("token");

            const resposta = await fetch(
                `${API_URL}/infos`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const json = await resposta.json();

            setDados(json);

        } catch (erro) {

            console.error(erro);

        }
    }

    async function salvarCampo(campo) {

        try {

            const token = localStorage.getItem("token");

            await fetch(
                `${API_URL}/infos/campo`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        campo,
                        valor
                    })
                }
            );

            setDados({
                ...dados,
                [campo]: valor
            });

            setEditando(null);
            setValor("");

        } catch (erro) {

            console.error(erro);

        }
    }

    async function apagarCampo(campo) {

        try {

            const token = localStorage.getItem("token");

            await fetch(
                `${API_URL}/infos/campo/${campo}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDados({
                ...dados,
                [campo]: null
            });

        } catch (erro) {

            console.error(erro);

        }
    }
    function formatarValor(campo, valor) {

        if (!valor) {
            return "";
        }

        if (
            campo === "telefone" ||
            campo === "whatsapp"
        ) {

            const n = valor
                .replace(/\D/g, "")
                .slice(0, 11);

            if (n.length <= 2) {
                return n;
            }

            if (n.length <= 7) {
                return `(${n.slice(0, 2)}) ${n.slice(2)}`;
            }

            return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
        }

        if (campo === "cep") {

            const n = valor
                .replace(/\D/g, "")
                .slice(0, 8);

            if (n.length <= 5) {
                return n;
            }

            return `${n.slice(0, 5)}-${n.slice(5)}`;
        }

        return valor;
    }
    return (
        <div className="infosContainer">

            <div className="infosTituloArea">

                <h2 className="infosTituloPrincipal">
                    Informações pessoais
                </h2>

                <p className="infosSubtituloPrincipal">
                    Complete seus dados para aumentar a compatibilidade com empresas.
                </p>

            </div>

            <div className="infosContainerPrincipal">

                {CAMPOS
                    .filter((campo) => {

                        if (campo.chave !== "possui_veiculo") {
                            return true;
                        }

                        const cnh =
                            dados.possui_cnh?.trim();

                        return (
                            cnh &&
                            cnh !== "Não possuo CNH"
                        );
                    })
                    .map((campo) => (
                        <div
                            key={campo.chave}
                            className="infosCardCampo"
                        >

                            <div className="infosCardCabecalho">

                                <span className="infosTituloCampo">
                                    {campo.titulo}
                                </span>

                            </div>

                            {editando === campo.chave ? (

                                <div className="infosEdicaoContainer">

                                    <Input
                                        campo={campo.chave}
                                        valor={valor}
                                        onChange={setValor}
                                    />

                                    <div className="infosAcoes">

                                        <button
                                            className="infosBotaoSalvar"
                                            onClick={() =>
                                                salvarCampo(
                                                    campo.chave
                                                )
                                            }
                                        >
                                            Salvar
                                        </button>

                                        <button
                                            className="infosBotaoCancelar"
                                            onClick={() => {
                                                setEditando(null);
                                                setValor("");
                                            }}
                                        >
                                            Cancelar
                                        </button>

                                    </div>

                                </div>

                            ) : (

                                dados[campo.chave] ? (

                                    <>

                                        <div className="infosValorCampo">

                                            {campo.chave === "linkedin" &&
                                                dados[campo.chave] ? (

                                                <a
                                                    href={
                                                        dados[campo.chave].startsWith("http")
                                                            ? dados[campo.chave]
                                                            : `https://${dados[campo.chave]}`
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="infosLinkExterno"
                                                >
                                                    Clique aqui para ver
                                                </a>

                                            ) : (

                                                campo.chave === "site" &&
                                                    dados[campo.chave] ? (

                                                    <a
                                                        href={
                                                            dados[campo.chave].startsWith("http")
                                                                ? dados[campo.chave]
                                                                : `https://${dados[campo.chave]}`
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="infosLinkExterno"
                                                    >
                                                        Clique aqui para ver
                                                    </a>

                                                ) : (

                                                    formatarValor(
                                                        campo.chave,
                                                        dados[campo.chave]
                                                    )

                                                )

                                            )}

                                        </div>

                                        <div className="infosAcoes">

                                            <button
                                                className="infosBotaoEditar"
                                                onClick={() => {

                                                    setEditando(
                                                        campo.chave
                                                    );

                                                    setValor(
                                                        dados[campo.chave] || ""
                                                    );

                                                }}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="infosBotaoApagar"
                                                onClick={() => {

                                                    if (
                                                        confirmandoApagar ===
                                                        campo.chave
                                                    ) {

                                                        apagarCampo(
                                                            campo.chave
                                                        );

                                                        setConfirmandoApagar(
                                                            null
                                                        );

                                                        return;
                                                    }

                                                    setConfirmandoApagar(
                                                        campo.chave
                                                    );

                                                    setTimeout(() => {

                                                        setConfirmandoApagar(
                                                            (atual) =>
                                                                atual === campo.chave
                                                                    ? null
                                                                    : atual
                                                        );

                                                    }, 3000);

                                                }}
                                            >
                                                {
                                                    confirmandoApagar ===
                                                        campo.chave
                                                        ? "Confirmar"
                                                        : "Apagar"
                                                }
                                            </button>

                                        </div>

                                    </>

                                ) : (

                                    <button
                                        className="infosBotaoAdicionar"
                                        onClick={() => {

                                            setEditando(
                                                campo.chave
                                            );

                                            setValor("");

                                        }}
                                    >

                                        <span className="infosAdicionarMais">
                                            +
                                        </span>

                                        <span className="infosAdicionarTexto">
                                            Adicionar informação
                                        </span>

                                    </button>

                                )

                            )}

                        </div>

                    ))}

            </div>

        </div>
    );
}