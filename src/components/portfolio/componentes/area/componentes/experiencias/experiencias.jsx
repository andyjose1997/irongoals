import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../../../../../config";
import "./experiencias.css";

const CAMPOS_EXPERIENCIA = [
    { chave: "empresa", titulo: "Empresa", tipo: "text" },
    { chave: "cargo", titulo: "Cargo", tipo: "text" },
    { chave: "cidade", titulo: "Cidade", tipo: "text" },
    { chave: "estado", titulo: "Estado", tipo: "text" },
    { chave: "pais", titulo: "País", tipo: "text" },
    { chave: "tipo_trabalho", titulo: "Tipo de Trabalho", tipo: "datalist" },
    { chave: "data_inicio", titulo: "Data de Início", tipo: "date" },
    { chave: "atual", titulo: "Trabalho Atual", tipo: "datalist" },
    { chave: "data_fim", titulo: "Data de Fim", tipo: "date" },
    { chave: "area_profissional", titulo: "Área Profissional", tipo: "datalist" },
    { chave: "tipo_contratacao", titulo: "Tipo de Contratação", tipo: "datalist" },
    { chave: "descricao", titulo: "Descrição", tipo: "textarea" }
];

const VALORES_INICIAIS = {
    empresa: "",
    cargo: "",
    cidade: "",
    estado: "",
    pais: "",
    tipo_trabalho: "",
    data_inicio: "",
    data_fim: "",
    atual: "",
    area_profissional: "",
    descricao: "",
    tipo_contratacao: ""
};

export default function Experiencias() {
    const inputRefs = useRef([]);
    const formularioRef = useRef(null);
    const [experiencias, setExperiencias] = useState([]);
    const [formulario, setFormulario] = useState(VALORES_INICIAIS);
    const [editandoId, setEditandoId] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [confirmandoApagar, setConfirmandoApagar] = useState(null);
    function cancelarFormulario() {
        setMostrarFormulario(false);
        setEditandoId(null);
        setFormulario(VALORES_INICIAIS);
    }

    function obterCamposVisiveis() {
        return CAMPOS_EXPERIENCIA.filter((campo) => {

            if (campo.chave !== "data_fim") {
                return true;
            }

            const atual =
                (formulario.atual || "")
                    .toLowerCase()
                    .trim();

            return atual === "não";
        });
    }

    function lidarTeclaCampo(evento, index) {

        if (evento.key === "Escape") {
            evento.preventDefault();
            cancelarFormulario();
            return;
        }

        if (evento.key === "Enter") {
            evento.preventDefault();

            const proximoInput =
                inputRefs.current[index + 1];

            if (proximoInput) {
                proximoInput.focus();
                return;
            }

            salvarExperiencia();
        }
    }
    useEffect(() => {
        carregarExperiencias();
    }, []);

    async function carregarExperiencias() {

        try {

            const token = localStorage.getItem("token");

            const resposta = await fetch(
                `${API_URL}/experiencias`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const json = await resposta.json();

            setExperiencias(json);

        } catch (erro) {

            console.error(erro);

        }
    }

    function alterarCampo(campo, valor) {

        if (campo === "cargo") {

            valor =
                valor.charAt(0).toUpperCase() +
                valor.slice(1);
        }

        setFormulario({
            ...formulario,
            [campo]: valor
        });
    }
    function novaExperiencia() {

        setFormulario(VALORES_INICIAIS);
        setEditandoId(null);
        setMostrarFormulario(true);
    }

    function editarExperiencia(experiencia) {

        setFormulario({
            empresa: experiencia.empresa || "",
            cargo: experiencia.cargo || "",
            cidade: experiencia.cidade || "",
            estado: experiencia.estado || "",
            pais: experiencia.pais || "",
            tipo_trabalho: experiencia.tipo_trabalho || "",
            data_inicio: experiencia.data_inicio || "",
            data_fim: experiencia.data_fim || "",
            atual: experiencia.atual || "",
            area_profissional: experiencia.area_profissional || "",
            descricao: experiencia.descricao || "",
            tipo_contratacao: experiencia.tipo_contratacao || ""
        });

        setEditandoId(experiencia.id);
        setMostrarFormulario(true);
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

    async function salvarExperiencia() {

        try {

            const token = localStorage.getItem("token");

            const url = editandoId
                ? `${API_URL}/experiencias/${editandoId}`
                : `${API_URL}/experiencias`;

            const metodo = editandoId
                ? "PUT"
                : "POST";

            await fetch(
                url,
                {
                    method: metodo,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(formulario)
                }
            );

            setFormulario(VALORES_INICIAIS);
            setEditandoId(null);
            setMostrarFormulario(false);

            carregarExperiencias();

        } catch (erro) {

            console.error(erro);

        }
    }

    async function apagarExperiencia(id) {

        try {

            const token = localStorage.getItem("token");

            await fetch(
                `${API_URL}/experiencias/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setExperiencias(
                experiencias.filter(
                    (item) => item.id !== id
                )
            );

        } catch (erro) {

            console.error(erro);

        }
    }

    function renderizarCampo(campo, index) {

        if (campo.tipo === "textarea") {
            return (
                <textarea
                    ref={(elemento) =>
                        inputRefs.current[index] = elemento
                    }
                    className="experienciasInputCampo experienciasTextareaCampo"
                    value={formulario[campo.chave] || ""}
                    onKeyDown={(evento) =>
                        lidarTeclaCampo(evento, index)
                    }
                    onChange={(e) =>
                        alterarCampo(
                            campo.chave,
                            e.target.value
                        )
                    }
                    placeholder={campo.titulo}
                />
            );
        }

        if (campo.tipo === "date") {
            return (
                <input
                    ref={(elemento) =>
                        inputRefs.current[index] = elemento
                    }
                    type="date"
                    className="experienciasInputCampo"
                    value={formulario[campo.chave] || ""}
                    onKeyDown={(evento) =>
                        lidarTeclaCampo(evento, index)
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
                        inputRefs.current[index] = elemento
                    }
                    type="text"
                    className="experienciasInputCampo"
                    value={formulario[campo.chave] || ""}
                    onKeyDown={(evento) =>
                        lidarTeclaCampo(evento, index)
                    }
                    onChange={(e) =>
                        alterarCampo(
                            campo.chave,
                            e.target.value
                        )
                    }
                    placeholder={campo.titulo}
                    list={`${campo.chave}Lista`}
                />

                {campo.chave === "tipo_trabalho" && (
                    <datalist id="tipo_trabalhoLista">
                        <option value="Presencial" />
                        <option value="Híbrido" />
                        <option value="Remoto" />
                    </datalist>
                )}

                {campo.chave === "atual" && (
                    <datalist id="atualLista">
                        <option value="Sim" />
                        <option value="Não" />
                    </datalist>
                )}

                {campo.chave === "area_profissional" && (
                    <datalist id="area_profissionalLista">
                        <option value="Administrativo" />
                        <option value="Atendimento" />
                        <option value="Comercial" />
                        <option value="Tecnologia" />
                        <option value="Logística" />
                        <option value="Produção" />
                        <option value="Recursos Humanos" />
                        <option value="Financeiro" />
                        <option value="Marketing" />
                        <option value="Saúde" />
                        <option value="Educação" />
                        <option value="Operacional" />
                    </datalist>
                )}

                {campo.chave === "tipo_contratacao" && (
                    <datalist id="tipo_contratacaoLista">
                        <option value="CLT" />
                        <option value="PJ" />
                        <option value="Estágio" />
                        <option value="Jovem Aprendiz" />
                        <option value="Temporário" />
                        <option value="Freelancer" />
                        <option value="Voluntário" />

                        <option value="Empresário" />
                        <option value="Proprietário" />
                        <option value="Sócio" />
                        <option value="Sócio Proprietário" />
                        <option value="Fundador" />
                        <option value="Co-Fundador" />
                        <option value="Autônomo" />
                        <option value="Microempreendedor (MEI)" />
                        <option value="Profissional Liberal" />
                        <option value="Trabalhador Independente" />
                    </datalist>
                )}
            </>
        );
    }

    return (
        <div className="experienciasContainer">

            <div className="experienciasTituloArea">

                <h2 className="experienciasTituloPrincipal">
                    Experiências profissionais
                </h2>

                <p className="experienciasSubtituloPrincipal">
                    Adicione suas experiências para melhorar sua compatibilidade com empresas.
                </p>

            </div>

            {!mostrarFormulario && (
                <button
                    className="experienciasBotaoAdicionar"
                    onClick={novaExperiencia}
                >
                    + Adicionar experiência
                </button>
            )}

            {mostrarFormulario && (
                <div
                    ref={formularioRef}
                    className="experienciasFormularioCard"
                >
                    <h3 className="experienciasFormularioTitulo">
                        {
                            editandoId
                                ? "Editar experiência"
                                : "Nova experiência"
                        }
                    </h3>

                    <div className="experienciasFormularioGrid">

                        {obterCamposVisiveis().map((campo, index) => (<div
                            key={campo.chave}
                            className="experienciasCampoGrupo"
                        >
                            <label className="experienciasLabelCampo">
                                {campo.titulo}
                            </label>

                            {renderizarCampo(campo, index)}                        </div>
                        ))}

                    </div>

                    <div className="experienciasAcoesFormulario">

                        <button
                            className="experienciasBotaoSalvar"
                            onClick={salvarExperiencia}
                        >
                            Salvar
                        </button>

                        <button
                            className="experienciasBotaoCancelar"
                            onClick={cancelarFormulario}
                        >
                            Cancelar
                        </button>

                    </div>

                </div>
            )}

            <div className="experienciasListaContainer">

                {experiencias.length === 0 && !mostrarFormulario && (
                    <div className="experienciasVazioCard">



                        <h3 className="experienciasVazioTitulo">
                            Nenhuma experiência adicionada
                        </h3>

                        <p className="experienciasVazioTexto">
                            Adicione suas experiências profissionais para deixar seu perfil mais completo.
                        </p>

                    </div>
                )}

                {experiencias.map((experiencia) => (

                    <div
                        key={experiencia.id}
                        className="experienciasCardItem"
                    >

                        <div className="experienciasCardLinhaDecorativa"></div>

                        <div className="experienciasCardTopo">

                            <div className="experienciasCardInfoPrincipal">

                                <h3 className="experienciasCargoTexto">
                                    {experiencia.cargo || "Cargo não informado"}
                                </h3>

                                <p className="experienciasEmpresaTexto">
                                    {experiencia.empresa || "Empresa não informada"}
                                </p>

                            </div>

                            {experiencia.area_profissional && (
                                <span className="experienciasAreaBadge">
                                    {experiencia.area_profissional}
                                </span>
                            )}

                        </div>

                        <div className="experienciasResumoGrid">

                            {(experiencia.cidade ||
                                experiencia.estado ||
                                experiencia.pais) && (

                                    <div className="experienciasResumoItem">
                                        <span className="experienciasResumoLabel">
                                            Local
                                        </span>

                                        <strong>
                                            {[experiencia.cidade, experiencia.estado, experiencia.pais]
                                                .filter(Boolean)
                                                .join(" • ")}
                                        </strong>
                                    </div>
                                )}

                            {(experiencia.data_inicio ||
                                experiencia.data_fim ||
                                experiencia.atual === "Sim") && (

                                    <div className="experienciasResumoItem">
                                        <span className="experienciasResumoLabel">
                                            Período
                                        </span>

                                        <strong>
                                            {experiencia.data_inicio || "Início não informado"} até {
                                                experiencia.atual === "Sim"
                                                    ? "Atualmente"
                                                    : experiencia.data_fim || "Fim não informado"
                                            }
                                        </strong>
                                    </div>
                                )}

                        </div>

                        {experiencia.descricao && (
                            <div className="experienciasDescricaoBox">
                                <span className="experienciasDescricaoLabel">
                                    Descrição
                                </span>

                                <p className="experienciasDescricaoTexto">
                                    {experiencia.descricao}
                                </p>
                            </div>
                        )}

                        <div className="experienciasDetalhesLinha">

                            {experiencia.tipo_trabalho && (
                                <span>
                                    {experiencia.tipo_trabalho}
                                </span>
                            )}

                            {experiencia.tipo_contratacao && (
                                <span>
                                    {experiencia.tipo_contratacao}
                                </span>
                            )}

                        </div>

                        <div className="experienciasAcoesCard">

                            <button
                                className="experienciasBotaoEditar"
                                onClick={() =>
                                    editarExperiencia(experiencia)
                                }
                            >
                                Editar
                            </button>

                            <button
                                className="experienciasBotaoApagar"
                                onClick={() => {

                                    if (
                                        confirmandoApagar ===
                                        experiencia.id
                                    ) {

                                        apagarExperiencia(
                                            experiencia.id
                                        );

                                        setConfirmandoApagar(null);
                                        return;
                                    }

                                    setConfirmandoApagar(
                                        experiencia.id
                                    );

                                    setTimeout(() => {

                                        setConfirmandoApagar(
                                            (atual) =>
                                                atual === experiencia.id
                                                    ? null
                                                    : atual
                                        );

                                    }, 3000);

                                }}
                            >
                                {
                                    confirmandoApagar === experiencia.id
                                        ? "Confirmar"
                                        : "Apagar"
                                }
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}