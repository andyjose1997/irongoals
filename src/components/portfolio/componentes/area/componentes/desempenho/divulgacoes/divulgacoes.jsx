import React, {
    useEffect,
    useState
} from "react";

import {
    API_URL
} from "../../../../../../../config";
import "./divulgacoes.css"
export default function Divulgacoes({

    voltar

}) {
    const [

        creditos,

        setCreditos

    ] = useState(null);

    const [

        carregando,

        setCarregando

    ] = useState(true);

    const [

        categoriasDisponiveis,

        setCategoriasDisponiveis

    ] = useState([]);

    const [

        cidadesDisponiveis,

        setCidadesDisponiveis

    ] = useState([]);

    const [

        categoriaAtual,

        setCategoriaAtual

    ] = useState("");

    const [

        cidadeAtual,

        setCidadeAtual

    ] = useState("");

    const [

        categoriasSelecionadas,

        setCategoriasSelecionadas

    ] = useState([]);

    const [

        cidadesSelecionadas,

        setCidadesSelecionadas

    ] = useState([]);

    const [

        processando,

        setProcessando

    ] = useState(false);
    const [
        finalizandoAnimacao,
        setFinalizandoAnimacao
    ] = useState(false);
    const [

        mensagem,

        setMensagem

    ] = useState("");
    const [
        etapaAtual,
        setEtapaAtual
    ] = useState(0);

    useEffect(() => {

        carregar();

    }, []);
    useEffect(() => {

        if (!processando) {

            setEtapaAtual(0);

            return;

        }

        setEtapaAtual(0);

        const tempo1 = setTimeout(() => {

            setEtapaAtual(1);

        }, 20000);

        const tempo2 = setTimeout(() => {

            setEtapaAtual(2);

        }, 20000);

        const tempo3 = setTimeout(() => {

            setEtapaAtual(3);

        }, 30000);

        let alternando;

        const iniciarAlternancia = setTimeout(() => {

            let mostrandoTerceira = true;

            alternando = setInterval(() => {

                if (mostrandoTerceira) {

                    setEtapaAtual(2);

                    setTimeout(() => {

                        setEtapaAtual(3);

                    }, 5000);

                }

                mostrandoTerceira = !mostrandoTerceira;

            }, 20000);

        }, 200000);

        return () => {

            clearTimeout(tempo1);
            clearTimeout(tempo2);
            clearTimeout(tempo3);
            clearTimeout(iniciarAlternancia);

            if (alternando) {

                clearInterval(alternando);

            }

        };

    }, [processando]);
    async function carregar() {

        const token =
            localStorage.getItem(
                "token"
            );

        const resposta =
            await fetch(

                `${API_URL}/divulgacoes`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );

        const dados =
            await resposta.json();
        setCarregando(
            false
        );
        setCreditos(
            dados.creditos
        );

        setCategoriasDisponiveis(
            dados.categorias
        );

        setCidadesDisponiveis(
            dados.cidades
        );

    }

    function adicionarCategoria() {

        const valor =
            categoriaAtual.trim();

        if (
            !valor
        ) {

            return;

        }

        if (

            categoriasSelecionadas.includes(
                valor
            )

        ) {

            return;

        }

        setCategoriasSelecionadas(

            [

                ...categoriasSelecionadas,

                valor

            ]

        );

        setCategoriaAtual(
            ""
        );

    }

    function adicionarCidade() {

        const valor =
            cidadeAtual.trim();

        if (
            !valor
        ) {

            return;

        }

        if (

            cidadesSelecionadas.includes(
                valor
            )

        ) {

            return;

        }

        setCidadesSelecionadas(

            [

                ...cidadesSelecionadas,

                valor

            ]

        );

        setCidadeAtual(
            ""
        );

    }

    function removerCategoria(

        categoria

    ) {

        setCategoriasSelecionadas(

            categoriasSelecionadas.filter(

                item =>

                    item !== categoria

            )

        );

    }

    function removerCidade(

        cidade

    ) {

        setCidadesSelecionadas(

            cidadesSelecionadas.filter(

                item =>

                    item !== cidade

            )

        );

    }

    async function iniciarDivulgacoes() {

        setProcessando(
            true
        );

        setMensagem(
            ""
        );

        const token =
            localStorage.getItem(
                "token"
            );

        const resposta =
            await fetch(

                `${API_URL}/divulgacoes`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body:

                        JSON.stringify({

                            categorias:
                                categoriasSelecionadas,

                            cidades:
                                cidadesSelecionadas

                        })

                }

            );
        const dados =
            await resposta.json();

        setFinalizandoAnimacao(
            true
        );

        await new Promise(

            resolve =>

                setTimeout(
                    resolve,
                    2000
                )

        );

        setProcessando(
            false
        );

        setFinalizandoAnimacao(
            false
        );

        if (
            !dados.sucesso
        ) {

            setMensagem(

                dados.mensagem

            );

            return;

        }

        setCreditos(

            dados.creditos_restantes

        );

        setCategoriasSelecionadas([]);

        setCidadesSelecionadas([]);

        setMensagem(

            `${dados.divulgadas} empresas receberam seu perfil.`

        );

    }
    if (processando) {

        return (

            <div
                className={
                    finalizandoAnimacao

                        ? "divulgacoesProcessando divulgacoesProcessandoSaindo"

                        : "divulgacoesProcessando"
                }
            >

                <div
                    className="divulgacoesSpinner"
                ></div>

                <h2>

                    Estamos divulgando seu perfil

                </h2>

                <p>

                    Seu perfil profissional está sendo enviado para empresas compatíveis. Aguarde alguns instantes enquanto nosso sistema realiza a divulgação.

                </p>

                <div
                    className="divulgacoesBarra"
                ></div>

                <div
                    className="divulgacoesEtapas"
                >

                    {

                        etapaAtual === 0 && (

                            <div className="divulgacoesEtapa">

                                ✔ Preparando seu perfil profissional

                            </div>

                        )

                    }

                    {

                        etapaAtual === 1 && (

                            <div className="divulgacoesEtapa">

                                ✔ Localizando empresas compatíveis

                            </div>

                        )

                    }

                    {

                        etapaAtual === 2 && (

                            <div className="divulgacoesEtapa">

                                ✔ Enviando seu perfil

                            </div>

                        )

                    }

                    {

                        etapaAtual === 3 && (

                            <div className="divulgacoesEtapa">

                                ✔ Finalizando divulgação

                            </div>

                        )

                    }

                </div>

            </div>

        );

    }
    if (
        carregando
    ) {

        return (

            <div
                className="divulgacoesProcessando"
            >

                <div
                    className="divulgacoesSpinner"
                ></div>

                <h2>

                    Carregando suas informações...

                </h2>

                <p>

                    Aguarde alguns instantes.

                </p>

            </div>

        );

    }
    return (

        <div
            className="divulgacoesContainer"
        >

            <button
                className="divulgacoesBotaoVoltar"
                onClick={() => window.location.href = window.location.href}
            >

                ← Voltar

            </button>

            <h1
                className="divulgacoesTitulo"
            >

                Divulgação do Perfil

            </h1>



            {

                creditos > 0 ? (

                    <div
                        className="divulgacoesConteudo"
                    >

                        <div
                            className="divulgacoesLadoEsquerdo"
                        >
                            <h2
                                className="divulgacoesSubtitulo"
                            >

                                Créditos disponíveis

                            </h2>
                            <div
                                className="divulgacoesCreditosValor"
                            >

                                {creditos}

                            </div>

                        </div>

                        <div
                            className="divulgacoesLadoDireito"
                        >



                            <h2
                                className="divulgacoesSubtitulo"
                            >

                                Categorias

                            </h2>
                            <h4>
                                Informe as categorias e cidades de seu interesse para encontrarmos empresas mais compatíveis com o seu perfil.
                            </h4>                            <input

                                className="divulgacoesCampo"

                                list="categorias"

                                value={
                                    categoriaAtual
                                }

                                onChange={
                                    e =>
                                        setCategoriaAtual(
                                            e.target.value
                                        )
                                }

                            />

                            <datalist
                                id="categorias"
                            >

                                {

                                    categoriasDisponiveis.map(

                                        categoria => (

                                            <option

                                                key={
                                                    categoria
                                                }

                                                value={
                                                    categoria
                                                }

                                            />

                                        )

                                    )

                                }

                            </datalist>

                            <button

                                className="divulgacoesBotaoAdicionar"

                                onClick={
                                    adicionarCategoria
                                }

                            >

                                Adicionar categoria

                            </button>

                            <div
                                className="divulgacoesCategoriasSelecionadas"
                            >

                                {

                                    categoriasSelecionadas.map(

                                        categoria => (

                                            <div

                                                key={
                                                    categoria
                                                }

                                                className="divulgacoesCategoriaItem"

                                            >

                                                <span
                                                    className="divulgacoesItemTexto"
                                                >

                                                    {
                                                        categoria
                                                    }

                                                </span>

                                                <button

                                                    className="divulgacoesItemRemover"

                                                    onClick={
                                                        () =>
                                                            removerCategoria(
                                                                categoria
                                                            )
                                                    }

                                                >

                                                    ✕

                                                </button>

                                            </div>

                                        )

                                    )

                                }

                            </div>



                            <h2
                                className="divulgacoesSubtitulo"
                            >

                                Cidades

                            </h2>

                            <input

                                className="divulgacoesCampo"

                                list="cidades"

                                value={
                                    cidadeAtual
                                }

                                onChange={
                                    e =>
                                        setCidadeAtual(
                                            e.target.value
                                        )
                                }

                            />
                            <datalist
                                id="cidades"
                            >

                                {

                                    cidadesDisponiveis.map(

                                        cidade => (

                                            <option

                                                key={
                                                    cidade
                                                }

                                                value={
                                                    cidade
                                                }

                                            />

                                        )

                                    )

                                }

                            </datalist>

                            <button

                                className="divulgacoesBotaoAdicionar"

                                onClick={
                                    adicionarCidade
                                }

                            >

                                Adicionar cidade

                            </button>

                            <div
                                className="divulgacoesCidadesSelecionadas"
                            >

                                {

                                    cidadesSelecionadas.map(

                                        cidade => (

                                            <div

                                                key={
                                                    cidade
                                                }

                                                className="divulgacoesCidadeItem"

                                            >

                                                <span
                                                    className="divulgacoesItemTexto"
                                                >

                                                    {
                                                        cidade
                                                    }

                                                </span>

                                                <button

                                                    className="divulgacoesItemRemover"

                                                    onClick={
                                                        () =>
                                                            removerCidade(
                                                                cidade
                                                            )
                                                    }

                                                >

                                                    ✕

                                                </button>

                                            </div>

                                        )

                                    )

                                }

                            </div>



                            {

                                mensagem && (

                                    <p
                                        className="divulgacoesMensagem"
                                    >

                                        {
                                            mensagem
                                        }

                                    </p>

                                )

                            }

                            <button

                                disabled={
                                    processando
                                }

                                onClick={
                                    iniciarDivulgacoes
                                }

                                className="divulgacoesBotaoPrincipal"

                            >

                                {

                                    processando

                                        ? "Divulgando..."

                                        : "Iniciar divulgação"

                                }

                            </button>

                        </div>

                    </div>

                ) : (

                    <div
                        className="divulgacoesSemCreditos"
                    >


                        <h2
                            className="divulgacoesSemCreditosTitulo"
                        >

                            Você não possui créditos disponíveis.

                        </h2>

                        <p
                            className="divulgacoesSemCreditosTexto"
                        >

                            Quando adquirir novos créditos, esta área será liberada para iniciar novas divulgações. <br />
                            Volte para acompanhar seu progresso.

                        </p>

                    </div>

                )

            }

        </div>

    );
}