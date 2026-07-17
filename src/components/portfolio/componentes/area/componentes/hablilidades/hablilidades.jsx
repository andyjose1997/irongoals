import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../../../../../config";
import "./habilidades.css";

const CAMPOS_HABILIDADE = [
    {
        chave: "habilidade",
        titulo: "Habilidade",
        tipo: "text"
    },
    {
        chave: "nivel_habilidade",
        titulo: "Nível da Habilidade",
        tipo: "datalist"
    },
    {
        chave: "tempo_experiencia",
        titulo: "Tempo de Experiência",
        tipo: "datalist"
    },
    {
        chave: "adquirido_em",
        titulo: "Onde adquiriu",
        tipo: "text"
    },
    {
        chave: "sucesso",
        titulo: "Resultados e Conquistas",
        tipo: "textarea"
    }
];

const VALORES_INICIAIS = {
    habilidade: "",
    nivel_habilidade: "",
    tempo_experiencia: "",
    adquirido_em: "",
    sucesso: ""
};

export default function Habilidades() {
    const formularioRef = useRef(null);
    const inputRefs = useRef([]);

    const [habilidades, setHabilidades] =
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

        carregarHabilidades();

    }, []);

    function cancelarFormulario() {

        setMostrarFormulario(false);

        setEditandoId(null);

        setFormulario(
            VALORES_INICIAIS
        );
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

            salvarHabilidade();
        }
    }

    async function carregarHabilidades() {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const resposta =
                await fetch(
                    `${API_URL}/habilidades`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const json =
                await resposta.json();

            setHabilidades(
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

        if (
            campo ===
            "habilidade"
        ) {

            valor =
                valor.charAt(0)
                    .toUpperCase()
                +
                valor.slice(1);
        }

        setFormulario({
            ...formulario,
            [campo]: valor
        });
    }

    function novaHabilidade() {

        setFormulario(
            VALORES_INICIAIS
        );

        setEditandoId(
            null
        );

        setMostrarFormulario(
            true
        );
        setTimeout(() => {

            const topo =
                formularioRef.current.getBoundingClientRect().top +
                window.pageYOffset -
                200;

            window.scrollTo({
                top: topo,
                behavior: "smooth"
            });

        }, 50);
    }

    function editarHabilidade(
        habilidade
    ) {

        setFormulario({

            habilidade:
                habilidade.habilidade
                || "",

            nivel_habilidade:
                habilidade.nivel_habilidade
                || "",

            tempo_experiencia:
                habilidade.tempo_experiencia
                || "",

            adquirido_em:
                habilidade.adquirido_em
                || "",

            sucesso:
                habilidade.sucesso
                || ""

        });

        setEditandoId(
            habilidade.id
        );

        setMostrarFormulario(
            true
        );
        setTimeout(() => {

            const topo =
                formularioRef.current.getBoundingClientRect().top +
                window.pageYOffset -
                200;

            window.scrollTo({
                top: topo,
                behavior: "smooth"
            });

        }, 50);

    }

    async function salvarHabilidade() {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const url =
                editandoId
                    ? `${API_URL}/habilidades/${editandoId}`
                    : `${API_URL}/habilidades`;

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

            carregarHabilidades();

        } catch (erro) {

            console.error(
                erro
            );
        }
    }

    async function apagarHabilidade(
        id
    ) {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            await fetch(
                `${API_URL}/habilidades/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setHabilidades(

                habilidades.filter(
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
                    className="habilidadesInputCampo habilidadesTextareaCampo"
                    value={
                        formulario[campo.chave]
                        || ""
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

        return (
            <>
                <input
                    ref={(elemento) =>
                        inputRefs.current[index] =
                        elemento
                    }
                    type="text"
                    className="habilidadesInputCampo"
                    value={
                        formulario[campo.chave]
                        || ""
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

                {campo.chave ===
                    "nivel_habilidade" && (

                        <datalist id="nivel_habilidadeLista">

                            <option value="Básico" />

                            <option value="Intermediário" />

                            <option value="Avançado" />

                            <option value="Especialista" />

                        </datalist>

                    )}

                {campo.chave ===
                    "tempo_experiencia" && (

                        <datalist id="tempo_experienciaLista">

                            <option value="Menos de 6 meses" />
                            <option value="6 meses a 1 ano" />
                            <option value="1 ano" />
                            <option value="2 anos" />
                            <option value="3 anos" />
                            <option value="5 anos" />
                            <option value="10 anos ou mais" />

                        </datalist>

                    )}
            </>
        );
    }



    return (

        <div className="habilidadesContainer">

            <div className="habilidadesTituloArea">

                <h2 className="habilidadesTituloPrincipal">
                    Habilidades
                </h2>

                <p className="habilidadesSubtituloPrincipal">
                    Adicione suas habilidades para aumentar sua compatibilidade com empresas.
                </p>

            </div>

            {!mostrarFormulario && (

                <button
                    className="habilidadesBotaoAdicionar"
                    onClick={novaHabilidade}
                >
                    + Adicionar habilidade
                </button>

            )}

            {mostrarFormulario && (

                <div
                    ref={formularioRef}
                    className="habilidadesFormularioContainer"
                >
                    <div className="habilidadesFormularioGrid">

                        {CAMPOS_HABILIDADE.map(
                            (
                                campo,
                                index
                            ) => (

                                <div
                                    key={campo.chave}
                                    className="habilidadesCampoGrupo"
                                >

                                    <label className="habilidadesLabelCampo">
                                        {campo.titulo}
                                    </label>

                                    {renderizarCampo(
                                        campo,
                                        index
                                    )}

                                </div>

                            )
                        )}

                    </div>

                    <div className="habilidadesAcoesFormulario">

                        <button
                            className="habilidadesBotaoSalvar"
                            onClick={salvarHabilidade}
                        >
                            {editandoId
                                ? "Atualizar"
                                : "Salvar"}
                        </button>

                        <button
                            className="habilidadesBotaoCancelar"
                            onClick={cancelarFormulario}
                        >
                            Cancelar
                        </button>

                    </div>

                </div>

            )}

            <div className="habilidadesListaContainer">

                {habilidades.length === 0 &&
                    !mostrarFormulario && (

                        <div className="habilidadesVazioCard">

                            Nenhuma habilidade cadastrada.

                        </div>

                    )}

                {habilidades.map(
                    (
                        habilidade
                    ) => (

                        <div
                            key={habilidade.id}
                            className="habilidadesCardItem"
                        >

                            <div className="habilidadesCardLinhaDecorativa"></div>

                            <div className="habilidadesCardTopo">

                                <div className="habilidadesCabecalhoInfo">

                                    <h3 className="habilidadesTitulo">
                                        {habilidade.habilidade}
                                    </h3>

                                    <span className="habilidadesNivelBadge">
                                        {habilidade.nivel_habilidade}
                                    </span>

                                </div>

                            </div>

                            <div className="habilidadesInformacoesGrid">

                                <div className="habilidadesInfoBox">

                                    <span className="habilidadesInfoLabel">
                                        Experiência
                                    </span>

                                    <span className="habilidadesInfoValor">
                                        {habilidade.tempo_experiencia}
                                    </span>

                                </div>

                                <div className="habilidadesInfoBox">

                                    <span className="habilidadesInfoLabel">
                                        Adquirido em
                                    </span>

                                    <span className="habilidadesInfoValor">
                                        {habilidade.adquirido_em}
                                    </span>

                                </div>

                            </div>

                            {habilidade.sucesso && (

                                <div className="habilidadesDescricaoBox">

                                    <div className="habilidadesDescricaoTitulo">
                                        Resultados e conquistas
                                    </div>

                                    <div className="habilidadesDescricaoTexto">
                                        {habilidade.sucesso}
                                    </div>

                                </div>

                            )}

                            <div className="habilidadesCardAcoes">

                                <button
                                    className="habilidadesBotaoEditar"
                                    onClick={() =>
                                        editarHabilidade(
                                            habilidade
                                        )
                                    }
                                >
                                    ✏️ Editar
                                </button>

                                <button
                                    className={
                                        confirmandoApagar === habilidade.id
                                            ? "habilidadesBotaoExcluirConfirmar"
                                            : "habilidadesBotaoExcluir"
                                    }
                                    onClick={() => {

                                        if (
                                            confirmandoApagar ===
                                            habilidade.id
                                        ) {

                                            apagarHabilidade(
                                                habilidade.id
                                            );

                                            return;
                                        }

                                        setConfirmandoApagar(
                                            habilidade.id
                                        );

                                        setTimeout(() => {

                                            setConfirmandoApagar(
                                                (atual) =>
                                                    atual === habilidade.id
                                                        ? null
                                                        : atual
                                            );

                                        }, 3000);

                                    }}
                                >
                                    {
                                        confirmandoApagar === habilidade.id
                                            ? "⚠️ Confirmar"
                                            : "🗑️ Excluir"
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