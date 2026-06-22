import {
    useEffect,
    useRef,
    useState
} from "react";

import { API_URL } from "../../../../../../config";

import "./formacao.css";

const CAMPOS_FORMACAO = [
    {
        chave: "instituicao",
        titulo: "Instituição",
        tipo: "text"
    },
    {
        chave: "curso",
        titulo: "Curso",
        tipo: "text"
    },
    {
        chave: "nivel_formacao",
        titulo: "Nível da Formação",
        tipo: "datalist"
    },
    {
        chave: "area_estudo",
        titulo: "Área de Estudo",
        tipo: "text"
    },
    {
        chave: "status",
        titulo: "Status",
        tipo: "datalist"
    },
    {
        chave: "data_inicio",
        titulo: "Data de Início",
        tipo: "date"
    },
    {
        chave: "data_fim",
        titulo: "Data de Conclusão",
        tipo: "date"
    },
    {
        chave: "descricao",
        titulo: "Descrição",
        tipo: "textarea"
    }
];

const VALORES_INICIAIS = {

    instituicao: "",

    curso: "",

    nivel_formacao: "",

    area_estudo: "",

    status: "",

    data_inicio: "",

    data_fim: "",

    descricao: ""

};

export default function Formacao() {

    const inputRefs = useRef([]);

    const [formacoes, setFormacoes] =
        useState([]);

    const [formulario, setFormulario] =
        useState(VALORES_INICIAIS);

    const [editandoId, setEditandoId] =
        useState(null);

    const [mostrarFormulario, setMostrarFormulario] =
        useState(false);

    const [confirmandoApagar, setConfirmandoApagar] =
        useState(null);

    useEffect(() => {

        carregarFormacoes();

    }, []);

    async function carregarFormacoes() {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const resposta =
                await fetch(
                    `${API_URL}/formacao`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const json =
                await resposta.json();

            setFormacoes(
                json
            );

        } catch (erro) {

            console.error(
                erro
            );

        }

    }

    function alterarCampo(
        campo,
        valor
    ) {

        setFormulario({
            ...formulario,
            [campo]: valor
        });

    }

    function cancelarFormulario() {

        setMostrarFormulario(
            false
        );

        setEditandoId(
            null
        );

        setFormulario(
            VALORES_INICIAIS
        );

    }

    function novaFormacao() {

        setFormulario(
            VALORES_INICIAIS
        );

        setEditandoId(
            null
        );

        setMostrarFormulario(
            true
        );

    }

    function editarFormacao(
        formacao
    ) {

        setFormulario({

            instituicao:
                formacao.instituicao || "",

            curso:
                formacao.curso || "",

            nivel_formacao:
                formacao.nivel_formacao || "",

            area_estudo:
                formacao.area_estudo || "",

            status:
                formacao.status || "",

            data_inicio:
                formacao.data_inicio || "",

            data_fim:
                formacao.data_fim || "",

            descricao:
                formacao.descricao || ""

        });

        setEditandoId(
            formacao.id
        );

        setMostrarFormulario(
            true
        );

    }

    async function salvarFormacao() {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const url =
                editandoId
                    ? `${API_URL}/formacao/${editandoId}`
                    : `${API_URL}/formacao`;

            const metodo =
                editandoId
                    ? "PUT"
                    : "POST";

            await fetch(
                url,
                {
                    method: metodo,

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body:
                        JSON.stringify(
                            formulario
                        )

                }
            );

            setFormulario(
                VALORES_INICIAIS
            );

            setEditandoId(
                null
            );

            setMostrarFormulario(
                false
            );

            carregarFormacoes();

        } catch (erro) {

            console.error(
                erro
            );

        }

    }

    async function apagarFormacao(
        id
    ) {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            await fetch(
                `${API_URL}/formacao/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setFormacoes(

                formacoes.filter(
                    (item) =>
                        item.id !== id
                )

            );

        } catch (erro) {

            console.error(
                erro
            );

        }

    }

    function lidarTeclaCampo(
        evento,
        index
    ) {

        if (
            evento.key === "Escape"
        ) {

            evento.preventDefault();

            cancelarFormulario();

            return;
        }

        if (
            evento.key === "Enter"
        ) {

            evento.preventDefault();

            const proximoInput =
                inputRefs.current[
                index + 1
                ];

            if (proximoInput) {

                proximoInput.focus();

                return;
            }

            salvarFormacao();
        }

    }

    function renderizarCampo(
        campo,
        index
    ) {

        if (
            campo.tipo ===
            "textarea"
        ) {

            return (
                <textarea
                    ref={(elemento) =>
                        inputRefs.current[index] =
                        elemento
                    }
                    className="formacaoInputCampo formacaoTextareaCampo"
                    value={
                        formulario[campo.chave]
                    }
                    onKeyDown={(evento) =>
                        lidarTeclaCampo(
                            evento,
                            index
                        )
                    }
                    onChange={(e) =>
                        alterarCampo(
                            campo.chave,
                            e.target.value
                        )
                    }
                    placeholder={
                        campo.titulo
                    }
                />
            );

        }

        if (
            campo.tipo ===
            "date"
        ) {

            return (
                <input
                    ref={(elemento) =>
                        inputRefs.current[index] =
                        elemento
                    }
                    type="date"
                    className="formacaoInputCampo"
                    value={
                        formulario[campo.chave]
                    }
                    onKeyDown={(evento) =>
                        lidarTeclaCampo(
                            evento,
                            index
                        )
                    }
                    onChange={(e) =>
                        alterarCampo(
                            campo.chave,
                            e.target.value
                        )
                    }
                />
            );

        }

        return (
            <>
                <input
                    ref={(elemento) =>
                        inputRefs.current[index] =
                        elemento
                    }
                    type="text"
                    className="formacaoInputCampo"
                    value={
                        formulario[campo.chave]
                    }
                    onKeyDown={(evento) =>
                        lidarTeclaCampo(
                            evento,
                            index
                        )
                    }
                    onChange={(e) =>
                        alterarCampo(
                            campo.chave,
                            e.target.value
                        )
                    }
                    placeholder={
                        campo.titulo
                    }
                    list={`${campo.chave}Lista`}
                />

                {campo.chave === "nivel_formacao" && (
                    <datalist id="nivel_formacaoLista">
                        <option value="Ensino Fundamental" />
                        <option value="Ensino Médio" />
                        <option value="Curso Técnico" />
                        <option value="Tecnólogo" />
                        <option value="Graduação" />
                        <option value="Pós-graduação" />
                        <option value="MBA" />
                        <option value="Mestrado" />
                        <option value="Doutorado" />
                    </datalist>
                )}

                {campo.chave === "status" && (
                    <datalist id="statusLista">
                        <option value="Concluído" />
                        <option value="Em andamento" />
                        <option value="Trancado" />
                        <option value="Interrompido" />
                    </datalist>
                )}

            </>
        );

    }

    return (

        <div className="formacaoContainer">

            <div className="formacaoTituloArea">

                <h2 className="formacaoTituloPrincipal">
                    Formação acadêmica
                </h2>

                <p className="formacaoSubtituloPrincipal">
                    Adicione suas formações para aumentar sua compatibilidade com empresas e oportunidades profissionais.
                </p>

            </div>

            {!mostrarFormulario && (

                <button
                    className="formacaoBotaoAdicionar"
                    onClick={novaFormacao}
                >
                    + Adicionar formação
                </button>

            )}

            {mostrarFormulario && (

                <div className="formacaoFormularioCard">

                    <h3 className="formacaoFormularioTitulo">

                        {
                            editandoId
                                ? "Editar formação"
                                : "Nova formação"
                        }

                    </h3>

                    <div className="formacaoFormularioGrid">

                        {CAMPOS_FORMACAO.map(
                            (
                                campo,
                                index
                            ) => {

                                if (
                                    campo.chave === "data_fim" &&
                                    formulario.status !== "Concluído"
                                ) {
                                    return null;
                                }

                                return (

                                    <div
                                        key={campo.chave}
                                        className="formacaoCampoGrupo"
                                    >

                                        <label className="formacaoLabelCampo">
                                            {campo.titulo}
                                        </label>

                                        {renderizarCampo(
                                            campo,
                                            index
                                        )}

                                    </div>

                                );

                            }
                        )}

                    </div>

                    <div className="formacaoAcoesFormulario">

                        <button
                            className="formacaoBotaoSalvar"
                            onClick={salvarFormacao}
                        >
                            {
                                editandoId
                                    ? "Atualizar"
                                    : "Salvar"
                            }
                        </button>

                        <button
                            className="formacaoBotaoCancelar"
                            onClick={cancelarFormulario}
                        >
                            Cancelar
                        </button>

                    </div>

                </div>

            )}

            <div className="formacaoListaContainer">

                {formacoes.length === 0 &&
                    !mostrarFormulario && (

                        <div className="formacaoVazioCard">

                            <div className="formacaoVazioIcone">
                                🎓
                            </div>

                            <h3 className="formacaoVazioTitulo">
                                Nenhuma formação adicionada
                            </h3>

                            <p className="formacaoVazioTexto">
                                Adicione suas formações acadêmicas para fortalecer seu perfil profissional.
                            </p>

                        </div>

                    )}

                {formacoes.map(
                    (
                        formacao
                    ) => (

                        <div
                            key={formacao.id}
                            className="formacaoCardItem"
                        >

                            <div className="formacaoCardLinhaDecorativa"></div>

                            <div className="formacaoCardTopo">

                                <div className="formacaoCardInfoPrincipal">

                                    <h3 className="formacaoCursoTexto">
                                        {
                                            formacao.curso
                                            || "Curso não informado"
                                        }
                                    </h3>

                                    <p className="formacaoInstituicaoTexto">
                                        {
                                            formacao.instituicao
                                            || "Instituição não informada"
                                        }
                                    </p>

                                </div>

                                {formacao.nivel_formacao && (

                                    <span className="formacaoNivelBadge">

                                        {
                                            formacao.nivel_formacao
                                        }

                                    </span>

                                )}

                            </div>

                            <div className="formacaoResumoGrid">

                                {formacao.area_estudo && (

                                    <div className="formacaoResumoItem">

                                        <span className="formacaoResumoLabel">
                                            Área
                                        </span>

                                        <strong>
                                            {formacao.area_estudo}
                                        </strong>

                                    </div>

                                )}

                                {formacao.status && (

                                    <div className="formacaoResumoItem">

                                        <span className="formacaoResumoLabel">
                                            Status
                                        </span>

                                        <strong>
                                            {formacao.status}
                                        </strong>

                                    </div>

                                )}

                                {(formacao.data_inicio ||
                                    formacao.data_fim) && (

                                        <div className="formacaoResumoItem">

                                            <span className="formacaoResumoLabel">
                                                Período
                                            </span>

                                            <strong>

                                                {
                                                    formacao.data_inicio
                                                    || "Não informado"
                                                }

                                                {" até "}

                                                {
                                                    formacao.data_fim
                                                    || "Atual"
                                                }

                                            </strong>

                                        </div>

                                    )}

                            </div>

                            {formacao.descricao && (

                                <div className="formacaoDescricaoBox">

                                    <span className="formacaoDescricaoLabel">
                                        Descrição
                                    </span>

                                    <p className="formacaoDescricaoTexto">

                                        {formacao.descricao
                                            .split(" ")
                                            .map((palavra, index) => {

                                                const pareceLink =
                                                    /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(
                                                        palavra
                                                    );

                                                if (pareceLink) {

                                                    const url =
                                                        palavra.startsWith("http")
                                                            ? palavra
                                                            : `https://${palavra}`;

                                                    return (
                                                        <a
                                                            key={index}
                                                            href={url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="formacaoDescricaoLink"
                                                        >
                                                            {palavra}{" "}
                                                        </a>
                                                    );
                                                }

                                                return (
                                                    <span key={index}>
                                                        {palavra}{" "}
                                                    </span>
                                                );

                                            })}

                                    </p>

                                </div>

                            )}

                            <div className="formacaoAcoesCard">

                                <button
                                    className="formacaoBotaoEditar"
                                    onClick={() =>
                                        editarFormacao(
                                            formacao
                                        )
                                    }
                                >
                                    Editar
                                </button>

                                <button
                                    className="formacaoBotaoApagar"
                                    onClick={() => {

                                        if (
                                            confirmandoApagar ===
                                            formacao.id
                                        ) {

                                            apagarFormacao(
                                                formacao.id
                                            );

                                            setConfirmandoApagar(
                                                null
                                            );

                                            return;
                                        }

                                        setConfirmandoApagar(
                                            formacao.id
                                        );

                                        setTimeout(() => {

                                            setConfirmandoApagar(
                                                (
                                                    atual
                                                ) =>

                                                    atual ===
                                                        formacao.id
                                                        ? null
                                                        : atual

                                            );

                                        }, 3000);

                                    }}
                                >

                                    {
                                        confirmandoApagar ===
                                            formacao.id
                                            ? "Confirmar"
                                            : "Apagar"
                                    }

                                </button>

                            </div>

                        </div>

                    )
                )}

            </div>

        </div>

    );

}