import React, {
    useEffect,
    useState,
    useRef
} from "react";
import Divulgacoes from "./divulgacoes/divulgacoes";
import {
    API_URL
} from "../../../../../../config";
import "./desempenho.css"
export default function Desempenho() {
    const listaRef = useRef(null);
    const [
        mostrarDivulgacoes,
        setMostrarDivulgacoes
    ] = useState(false);
    const [
        desempenho,
        setDesempenho
    ] = useState(null);
    const [

        portfolioPronto,

        setPortfolioPronto

    ] = useState(false);
    const [
        listaAtual,
        setListaAtual
    ] = useState(null);

    useEffect(() => {

        carregarDados();

    }, []);
    function abrirRelatorio(titulo, lista) {

        setListaAtual({
            titulo,
            lista
        });

        setTimeout(() => {

            listaRef.current?.scrollIntoView({

                behavior: "smooth",

                block: "end"

            });

        }, 80);

    }
    async function carregarDados() {

        const token =
            localStorage.getItem(
                "token"
            );

        const resposta =
            await fetch(
                `${API_URL}/desempenho`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );
        const respostaPortfolio =
            await fetch(
                `${API_URL}/portfolio/pronto`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const dadosPortfolio =
            await respostaPortfolio.json();

        setPortfolioPronto(
            dadosPortfolio.portfolio_pronto
        );
        const dados =
            await resposta.json();

        setDesempenho(
            dados
        );

    }

    if (!desempenho) {

        return (
            <div
                className="divulgacoesProcessando"
            >

                <div
                    className="divulgacoesSpinner"
                />

                <h2>

                    Carregando suas informações...

                </h2>

                <p>

                    Aguarde alguns instantes.

                </p>

            </div>
        );

    }
    function formatarData(
        data
    ) {

        if (
            !data
        ) {

            return "";

        }

        const meses = [

            "janeiro",
            "fevereiro",
            "março",
            "abril",
            "maio",
            "junho",
            "julho",
            "agosto",
            "setembro",
            "outubro",
            "novembro",
            "dezembro"

        ];

        const [
            ano,
            mes,
            dia
        ] = data.split("-");

        return `${Number(dia)} de ${meses[Number(mes) - 1]} de ${ano}`;

    }
    function renderizarLista() {

        if (!listaAtual) {

            return null;

        }
        function obterLinkContato(
            contato
        ) {

            if (!contato) {

                return null;

            }

            const texto =
                contato.trim();

            const textoLower =
                texto.toLowerCase();

            // LINK

            if (

                textoLower.startsWith(
                    "http://"
                )

                ||

                textoLower.startsWith(
                    "https://"
                )

                ||

                textoLower.includes(
                    "meet.google.com"
                )

                ||

                textoLower.includes(
                    "zoom.us"
                )

            ) {

                return texto;

            }

            // EMAIL

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (

                emailRegex.test(
                    texto
                )

            ) {

                return `mailto:${texto}`;

            }

            // TELEFONE / WHATSAPP

            const numeros =
                texto.replace(
                    /\D/g,
                    ""
                );

            if (

                numeros.length >= 10

            ) {

                return `https://wa.me/${numeros}`;

            }

            return null;

        }
        return (

            <div
                ref={listaRef}
                className="desempenhoListaContainer"
            >

                <h2
                    className="desempenhoListaTitulo"
                >

                    {
                        listaAtual.titulo
                    }

                </h2>

                {
                    listaAtual.lista.length === 0 && (

                        <p
                            className="desempenhoEmpresaLinha"
                        >

                            Nenhuma empresa.

                        </p>

                    )
                }

                {
                    [...listaAtual.lista]
                        .reverse()
                        .map(
                            (
                                empresa,
                                index
                            ) => (

                                <div
                                    key={index}
                                    className="desempenhoEmpresaCard"
                                >

                                    <strong
                                        className="desempenhoEmpresaNome"
                                    >

                                        {
                                            empresa.empresa
                                        }

                                    </strong>

                                    {
                                        empresa.cargo && (

                                            <p
                                                className="desempenhoEmpresaLinha"
                                            >

                                                <strong>

                                                    Cargo:

                                                </strong>

                                                {" "}

                                                {
                                                    empresa.cargo
                                                }

                                            </p>

                                        )
                                    }

                                    {
                                        empresa.dia && (

                                            <p
                                                className="desempenhoEmpresaLinha"
                                            >

                                                <strong>

                                                    Data da entrevista:

                                                </strong>

                                                {" "}

                                                {
                                                    formatarData(
                                                        empresa.dia
                                                    )
                                                }

                                                {" "}

                                                às

                                                {" "}

                                                {
                                                    Number.isInteger(
                                                        empresa.hora
                                                    )

                                                        ? `${String(
                                                            Math.floor(
                                                                empresa.hora / 3600
                                                            )
                                                        ).padStart(2, "0")}:${String(
                                                            Math.floor(
                                                                (empresa.hora % 3600) / 60
                                                            )
                                                        ).padStart(2, "0")}`

                                                        : empresa.hora
                                                }

                                            </p>

                                        )
                                    }

                                    {
                                        empresa.descricao && (

                                            <div
                                                className="desempenhoEmpresaDescricao"
                                            >

                                                <strong>

                                                    Descrição:

                                                </strong>

                                                {" "}

                                                {
                                                    empresa.descricao
                                                }

                                            </div>

                                        )
                                    }

                                    {
                                        empresa.contato && (

                                            <p
                                                className="desempenhoEmpresaLinha desempenhoEmpresaContato"
                                            >

                                                <strong>

                                                    Contato da empresa:

                                                </strong>

                                                {" "}

                                                {
                                                    (() => {

                                                        const link =
                                                            obterLinkContato(
                                                                empresa.contato
                                                            );

                                                        if (!link) {

                                                            return empresa.contato;

                                                        }

                                                        return (

                                                            <a
                                                                href={link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >

                                                                {
                                                                    empresa.contato
                                                                }

                                                            </a>

                                                        );

                                                    })()
                                                }

                                            </p>

                                        )
                                    }

                                    {
                                        empresa.aprovado === 0 && (
                                            <div>
                                                <p className="desempenhoEmpresaBotaoAviso">
                                                    Aceite a entrevista se desejar então seus dados serao publicados para a empresa <strong>  {empresa.empresa}</strong>
                                                </p>
                                                <button
                                                    className="desempenhoEmpresaBotao"
                                                    onClick={
                                                        () =>
                                                            aceitarEntrevista(
                                                                empresa.id
                                                            )
                                                    }
                                                >

                                                    Aceitar entrevista

                                                </button></div>


                                        )
                                    }

                                    {
                                        empresa.aprovado === 1 && (

                                            <div
                                                className="desempenhoEmpresaAceita"
                                            >

                                                ✅ Entrevista aceita

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
    async function aceitarEntrevista(
        entrevistaId
    ) {

        const token =
            localStorage.getItem(
                "token"
            );

        const resposta =
            await fetch(

                `${API_URL}/entrevista/aceitar/${entrevistaId}`,

                {

                    method: "PUT",

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );

        if (
            resposta.ok
        ) {

            setListaAtual(
                lista => {

                    if (!lista) {

                        return lista;

                    }

                    return {

                        ...lista,

                        lista: lista.lista.map(
                            empresa =>

                                empresa.id === entrevistaId

                                    ? {
                                        ...empresa,
                                        aprovado: 1
                                    }

                                    : empresa

                        )

                    };

                }
            );

            carregarDados();

        }

    }
    if (
        mostrarDivulgacoes
    ) {

        return (

            <Divulgacoes
                desempenho={
                    desempenho
                }
                voltar={() =>
                    setMostrarDivulgacoes(
                        false
                    )
                }
            />

        );

    }
    return (

        <div
            className="desempenhoPaginaContainer"
        >

            <div
                className="desempenhoCabecalho"
            >

                <h1
                    className="desempenhoTitulo"
                >

                    Desempenho

                </h1>

                <p
                    className="desempenhoDescricao"
                >

                    Acompanhe como seu perfil está sendo divulgado para empresas e visualize todas as interações recebidas.

                </p>

            </div>



            <div
                className="desempenhoMetricasGrid"
            >

                <div
                    className="desempenhoMetricaCard"
                >

                    <h3
                        className="desempenhoMetricaTitulo"
                    >

                        Créditos Disponíveis

                    </h3>

                    <p
                        className="desempenhoMetricaValor"
                    >

                        {
                            desempenho.creditos
                        }

                    </p>

                    {
                        portfolioPronto ? (

                            <button
                                className="desempenhoMetricaBotao"
                                onClick={() =>
                                    setMostrarDivulgacoes(
                                        true
                                    )
                                }
                            >

                                Divulgar meu perfil

                            </button>

                        ) : (

                            <div
                                className="desempenhoPortfolioIncompleto"
                            >

                                Complete pelo menos uma experiência, uma formação e uma habilidade para habilitar a divulgação do seu perfil.

                            </div>

                        )
                    }

                </div>

                <div
                    className="desempenhoMetricaCard"
                >

                    <h3
                        className="desempenhoMetricaTitulo"
                    >

                        Créditos Utilizados

                    </h3>

                    <p
                        className="desempenhoMetricaValor"
                    >

                        {
                            desempenho.creditos_usados
                        }

                    </p>

                </div>

            </div>

            <h2
                className="desempenhoListaTituloo"
            >

                Relatórios do seu perfil

            </h2>

            <div
                className="desempenhoRelatoriosGrid"
            >

                <div
                    className="desempenhoRelatorioCard"
                    onClick={() =>
                        abrirRelatorio(
                            "Empresas que visualizaram seu perfil",
                            desempenho.empresas_viram
                        )
                    }
                >

                    <div
                        className="desempenhoRelatorioNumero"
                    >

                        {
                            desempenho.perfil_visto
                        }

                    </div>

                    <div
                        className="desempenhoRelatorioTitulo"
                    >

                        EMPRESAS ALCANÇADAS

                    </div>

                </div>

                <div
                    className="desempenhoRelatorioCard"
                    onClick={() =>
                        abrirRelatorio(
                            "Empresas que abriram seu perfil",
                            desempenho.empresas_abriram
                        )
                    }
                >

                    <div
                        className="desempenhoRelatorioNumero"
                    >

                        {
                            desempenho.perfil_aberto
                        }

                    </div>

                    <div
                        className="desempenhoRelatorioTitulo"
                    >

                        PERFIL VISTO

                    </div>

                </div>

                <div
                    className="desempenhoRelatorioCard"
                    onClick={() =>
                        abrirRelatorio(
                            "Empresas que marcaram entrevista",
                            desempenho.empresas_agendaram
                        )
                    }
                >

                    <div
                        className="desempenhoRelatorioNumero"
                    >

                        {
                            desempenho.entrevistas_agendadas
                        }

                    </div>

                    <div
                        className="desempenhoRelatorioTitulo"
                    >

                        ENTREVISTAS AGENDADAS

                    </div>

                </div>

                <div
                    className="desempenhoRelatorioCard"
                    onClick={() =>
                        abrirRelatorio(
                            "Entrevistas aceitas",
                            desempenho.empresas_aceitaram
                        )
                    }
                >

                    <div
                        className="desempenhoRelatorioNumero"
                    >

                        {
                            desempenho.entrevistas_aceitas
                        }

                    </div>

                    <div
                        className="desempenhoRelatorioTitulo"
                    >

                        ENTREVISTAS ACEITAS

                    </div>

                </div>

            </div>
            <br />
            {
                renderizarLista()
            }

        </div>

    );

}