import { useEffect, useState } from "react";
import { API_URL } from "../../../../../../config";
import "./idiomas.css";

const VALORES_INICIAIS = {
    idioma: "",
    nivel: ""
};

export default function Idiomas() {

    const [idiomas, setIdiomas] =
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

        carregarIdiomas();

    }, []);

    async function carregarIdiomas() {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const resposta =
                await fetch(
                    `${API_URL}/idiomas`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const json =
                await resposta.json();

            setIdiomas(
                json
            );

        } catch (erro) {

            console.error(
                erro
            );
        }
    }

    function novoIdioma() {

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

    function editarIdioma(
        idioma
    ) {

        setFormulario({

            idioma:
                idioma.idioma,

            nivel:
                idioma.nivel

        });

        setEditandoId(
            idioma.id
        );

        setMostrarFormulario(
            true
        );
    }

    async function salvarIdioma() {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const metodo =
                editandoId
                    ? "PUT"
                    : "POST";

            const url =
                editandoId
                    ? `${API_URL}/idiomas/${editandoId}`
                    : `${API_URL}/idiomas`;

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

            carregarIdiomas();

        } catch (erro) {

            console.error(
                erro
            );
        }
    }

    async function apagarIdioma(
        id
    ) {

        const token =
            localStorage.getItem(
                "token"
            );

        await fetch(
            `${API_URL}/idiomas/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        carregarIdiomas();
    }

    return (

        <div className="idiomasContainer">

            <div className="idiomasTituloArea">

                <h2 className="idiomasTituloPrincipal">
                    Idiomas
                </h2>

                <p className="idiomasSubtituloPrincipal">
                    Adicione os idiomas que você domina.
                </p>

            </div>

            {!mostrarFormulario && (

                <button
                    className="idiomasBotaoAdicionar"
                    onClick={novoIdioma}
                >
                    + Adicionar idioma
                </button>

            )}

            {mostrarFormulario && (

                <div className="idiomasFormularioContainer">

                    <input
                        className="idiomasInputCampo"
                        placeholder="Idioma"
                        list="idiomas"
                        value={formulario.idioma}
                        onChange={(e) =>
                            setFormulario({
                                ...formulario,
                                idioma:
                                    e.target.value
                            })
                        }
                    />
                    <datalist id="idiomas">
                        <option value="Africâner" />
                        <option value="Albanês" />
                        <option value="Alemão" />
                        <option value="Amárico" />
                        <option value="Árabe" />
                        <option value="Armênio" />
                        <option value="Azerbaijano" />
                        <option value="Basco" />
                        <option value="Bengali" />
                        <option value="Bielorrusso" />
                        <option value="Birmanês" />
                        <option value="Bósnio" />
                        <option value="Búlgaro" />
                        <option value="Catalão" />
                        <option value="Cazaque" />
                        <option value="Chinês (Mandarim)" />
                        <option value="Chinês (Cantonês)" />
                        <option value="Coreano" />
                        <option value="Croata" />
                        <option value="Dinamarquês" />
                        <option value="Eslovaco" />
                        <option value="Esloveno" />
                        <option value="Espanhol" />
                        <option value="Esperanto" />
                        <option value="Estoniano" />
                        <option value="Filipino" />
                        <option value="Finlandês" />
                        <option value="Francês" />
                        <option value="Galês" />
                        <option value="Georgiano" />
                        <option value="Grego" />
                        <option value="Gujarati" />
                        <option value="Hebraico" />
                        <option value="Hindi" />
                        <option value="Holandês" />
                        <option value="Húngaro" />
                        <option value="Indonésio" />
                        <option value="Inglês" />
                        <option value="Irlandês" />
                        <option value="Islandês" />
                        <option value="Italiano" />
                        <option value="Japonês" />
                        <option value="Javanês" />
                        <option value="Khmer" />
                        <option value="Laosiano" />
                        <option value="Latim" />
                        <option value="Letão" />
                        <option value="Lituano" />
                        <option value="Malaio" />
                        <option value="Malaiala" />
                        <option value="Maltês" />
                        <option value="Marata" />
                        <option value="Mongol" />
                        <option value="Nepalês" />
                        <option value="Norueguês" />
                        <option value="Persa" />
                        <option value="Polonês" />
                        <option value="Português" />
                        <option value="Punjabi" />
                        <option value="Romeno" />
                        <option value="Russo" />
                        <option value="Sérvio" />
                        <option value="Suaíli" />
                        <option value="Sueco" />
                        <option value="Tailandês" />
                        <option value="Tâmil" />
                        <option value="Tcheco" />
                        <option value="Telugo" />
                        <option value="Turco" />
                        <option value="Ucraniano" />
                        <option value="Urdu" />
                        <option value="Uzbeque" />
                        <option value="Vietnamita" />
                        <option value="Zulu" />
                    </datalist>
                    <select
                        className="idiomasInputCampo"
                        value={formulario.nivel}
                        onChange={(e) =>
                            setFormulario({
                                ...formulario,
                                nivel: e.target.value
                            })
                        }
                    >
                        <option value="">
                            Selecione o nível
                        </option>

                        <option value="Básico">
                            Básico
                        </option>

                        <option value="Intermediário">
                            Intermediário
                        </option>

                        <option value="Avançado">
                            Avançado
                        </option>

                        <option value="Fluente">
                            Fluente
                        </option>

                        <option value="Nativo">
                            Nativo
                        </option>
                    </select>

                    <div className="idiomasFormularioAcoes">

                        <button
                            className="idiomasBotaoSalvar"
                            onClick={salvarIdioma}
                        >
                            {
                                editandoId
                                    ? "Atualizar"
                                    : "Salvar"
                            }
                        </button>

                        <button
                            className="idiomasBotaoCancelar"
                            onClick={() => {

                                setMostrarFormulario(
                                    false
                                );

                                setEditandoId(
                                    null
                                );

                            }}
                        >
                            Cancelar
                        </button>

                    </div>

                </div>

            )}

            <div className="idiomasListaContainer">

                {idiomas.map(
                    (idioma) => (

                        <div
                            key={idioma.id}
                            className="idiomasCardItem"
                        >

                            <div className="idiomasCardTopo">

                                <h3 className="idiomasNomeIdioma">
                                    {idioma.idioma}
                                </h3>

                                <span className="idiomasNivelBadge">
                                    {idioma.nivel}
                                </span>

                            </div>

                            <div className="idiomasAcoes">

                                <button
                                    className="idiomasBotaoEditar"
                                    onClick={() =>
                                        editarIdioma(
                                            idioma
                                        )
                                    }
                                >
                                    Editar
                                </button>

                                <button
                                    className={
                                        confirmandoApagar === idioma.id
                                            ? "idiomasBotaoExcluirConfirmar"
                                            : "idiomasBotaoExcluir"
                                    }
                                    onClick={() => {

                                        if (
                                            confirmandoApagar === idioma.id
                                        ) {

                                            apagarIdioma(
                                                idioma.id
                                            );

                                            return;
                                        }

                                        setConfirmandoApagar(
                                            idioma.id
                                        );

                                    }}
                                >
                                    {
                                        confirmandoApagar === idioma.id
                                            ? "Confirmar"
                                            : "Excluir"
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