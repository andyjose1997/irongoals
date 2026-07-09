import React, {
    useEffect,
    useState
} from "react";
import "./publico.css"
import {
    useParams
} from "react-router-dom";
import {
    QRCodeCanvas
} from "qrcode.react";
import {
    API_URL
} from "../../config";

export default function PortfolioPublico() {
    const [modalCompartilhar, setModalCompartilhar] =
        useState(false);
    const {
        id
    } = useParams();
    const [mostrarTodasExperiencias,
        setMostrarTodasExperiencias] =
        useState(false);
    const [carregando, setCarregando] =
        useState(true);

    const [perfil, setPerfil] =
        useState(null);
    const [idade, setIdade] =
        useState(null);
    useEffect(() => {

        carregarPerfil();

    }, []);

    async function carregarPerfil() {

        try {

            const resposta =
                await fetch(
                    `${API_URL}/portfolio-publico/${id}`
                );

            if (!resposta.ok) {

                setCarregando(false);

                return;
            }

            const dados =
                await resposta.json();

            setPerfil(dados);
            if (dados.data_nascimento) {

                const nascimento =
                    new Date(
                        dados.data_nascimento
                    );

                const hoje =
                    new Date();

                let idadeCalculada =
                    hoje.getFullYear() -
                    nascimento.getFullYear();

                const mes =
                    hoje.getMonth() -
                    nascimento.getMonth();

                if (
                    mes < 0 ||
                    (
                        mes === 0 &&
                        hoje.getDate() <
                        nascimento.getDate()
                    )
                ) {

                    idadeCalculada--;

                }

                setIdade(
                    idadeCalculada
                );

            }
        } catch (erro) {

            console.error(
                erro
            );

        } finally {

            setCarregando(false);

        }

    }

    if (carregando) {

        return (
            <div>
                Carregando...
            </div>
        );

    }

    if (!perfil) {

        return (
            <div>
                Perfil não encontrado.
            </div>
        );

    }

    return (

        <div className="portfolioPublicoContainer">

            <section className="portfolioPublicoHero">

                <div className="portfolioPublicoHeroConteudo">

                    <img
                        src={perfil.foto}
                        alt={perfil.nome}
                        className="portfolioPublicoHeroFoto"
                    />

                    <div className="portfolioPublicoHeroTexto">
                        <h1>
                            {perfil.nome} {perfil.sobrenome}
                        </h1>

                        {
                            perfil.cargo_atual && (
                                <h2>
                                    {perfil.cargo_atual}

                                    {
                                        perfil.empresa_atual &&
                                        ` na empresa ${perfil.empresa_atual}`
                                    }
                                </h2>
                            )
                        }
                        <p>

                            Profissional com experiência na área de {

                                perfil.experiencias
                                    ?.map(
                                        item =>
                                            item.area_profissional
                                    )
                                    .filter(Boolean)
                                    .slice(0, 5)
                                    .join(" • ")

                            }

                        </p>
                        {
                            perfil.infos?.cidade && (
                                <p className="portfolioPublicoCidade">
                                    {perfil.infos.cidade}
                                </p>
                            )
                        }
                        <div className="portfolioPublicoContatoRapido">

                            {idade && (
                                <span>
                                    {idade} anos
                                </span>
                            )}

                            {perfil.contatos?.telefone && (
                                <span>
                                    {perfil.contatos.telefone}
                                </span>
                            )}

                            {perfil.contatos?.email && (
                                <a
                                    href={`mailto:${perfil.contatos.email}`}
                                >
                                    {perfil.contatos.email}
                                </a>
                            )}

                            {perfil.contatos?.whatsapp && (
                                <a
                                    href={
                                        perfil.contatos.whatsapp_link
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    WhatsApp
                                </a>
                            )}

                            {perfil.contatos?.linkedin && (
                                <a
                                    href={
                                        perfil.contatos.linkedin
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    LinkedIn
                                </a>
                            )}

                            {perfil.contatos?.site && (
                                <a
                                    href={
                                        perfil.contatos.site
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Site
                                </a>
                            )}

                        </div>

                    </div>

                </div>

            </section>



            {
                perfil.habilidades?.length > 0 && (

                    <section className="portfolioPublicoHabilidades">

                        <h2>
                            Competências Técnicas
                        </h2>

                        <div className="portfolioPublicoSkillGrid">

                            {
                                perfil.habilidades.map(
                                    habilidade => (

                                        <div
                                            key={habilidade.id}
                                            className="portfolioPublicoSkillCard"
                                        >

                                            <h3>
                                                {habilidade.habilidade}
                                            </h3>

                                            <span>
                                                {habilidade.nivel_habilidade}
                                            </span>

                                            {
                                                habilidade.tempo_experiencia && (
                                                    <p className="portfolioPublicoSkillTempo">
                                                        {habilidade.tempo_experiencia}
                                                    </p>
                                                )
                                            }

                                            {
                                                habilidade.sucesso && (
                                                    <div className="portfolioPublicoSkillSucesso">

                                                        <strong>
                                                            Resultados e conquistas:
                                                        </strong>

                                                        <p>
                                                            {habilidade.sucesso}
                                                        </p>

                                                    </div>
                                                )
                                            }

                                        </div>

                                    )
                                )
                            }

                        </div>

                    </section>

                )
            }
            {
                perfil.idiomas?.length > 0 && (

                    <section className="portfolioPublicoIdiomas">

                        <h2>
                            Idiomas
                        </h2>

                        <div className="portfolioPublicoIdiomasGrid">

                            {
                                perfil.idiomas.map(
                                    idioma => (

                                        <div
                                            key={idioma.id}
                                            className="portfolioPublicoIdiomaCard"
                                        >

                                            <h3>
                                                {idioma.idioma}
                                            </h3>

                                            <span>
                                                {idioma.nivel}
                                            </span>

                                        </div>

                                    )
                                )
                            }

                        </div>

                    </section>

                )
            }
            {
                perfil.experiencias?.length > 0 && (

                    <section className="portfolioPublicoExperiencias">

                        <div className="portfolioPublicoTituloComAcao">

                            <h2>
                                Histórico Profissional
                            </h2>

                            {
                                perfil.experiencias.length > 2 && (
                                    <button
                                        className="portfolioPublicoExpandirBotao"
                                        onClick={() =>
                                            setMostrarTodasExperiencias(
                                                !mostrarTodasExperiencias
                                            )
                                        }
                                    >
                                        {
                                            mostrarTodasExperiencias
                                                ? "▼"
                                                : "▶"
                                        }
                                    </button>
                                )
                            }

                        </div>

                        {
                            (
                                mostrarTodasExperiencias
                                    ? perfil.experiencias
                                    : perfil.experiencias.slice(0, 2)
                            ).map(
                                experiencia => (

                                    <article
                                        key={experiencia.id}
                                        className="portfolioPublicoProjetoCard"
                                    >

                                        <h3>
                                            {experiencia.cargo}
                                        </h3>

                                        <h4>
                                            {experiencia.empresa}
                                        </h4>

                                        <small>

                                            {experiencia.data_inicio}

                                            {" • "}

                                            {

                                                experiencia.atual?.toLowerCase() === "sim"

                                                    ? (
                                                        <>
                                                            Atualmente trabalhando nesta empresa
                                                        </>
                                                    )

                                                    : (
                                                        experiencia.data_fim ||
                                                        "Data não informada"
                                                    )

                                            }

                                        </small>

                                        <p>

                                            {
                                                experiencia.descricao
                                            }

                                        </p>

                                    </article>

                                )
                            )
                        }

                    </section>

                )
            }

            {
                perfil.formacoes?.length > 0 && (

                    <section className="portfolioPublicoFormacoes">

                        <h2>
                            Formação Acadêmica
                        </h2>

                        <div className="portfolioPublicoFormacaoGrid">

                            {
                                perfil.formacoes.map(
                                    formacao => (

                                        <div
                                            key={formacao.id}
                                            className="portfolioPublicoFormacaoCard"
                                        >

                                            <h3>
                                                {formacao.curso}
                                            </h3>

                                            <p>
                                                {
                                                    formacao.instituicao
                                                }
                                            </p>

                                            <span>
                                                {
                                                    formacao.nivel_formacao
                                                }
                                            </span>

                                        </div>

                                    )
                                )
                            }

                        </div>

                    </section>

                )
            }

            <section className="portfolioPublicoInformacoes">

                <h2>
                    Informações Complementares
                </h2>

                <div className="portfolioPublicoInfoGrid">

                    {
                        Object.entries(
                            perfil.infos || {}
                        )
                            .filter(
                                ([, valor]) =>
                                    valor
                            )
                            .map(
                                ([chave, valor]) => (

                                    <div
                                        key={chave}
                                    >

                                        <strong>
                                            {
                                                chave
                                                    .replaceAll(
                                                        "_",
                                                        " "
                                                    )
                                            }
                                        </strong>

                                        <p>
                                            {valor}
                                        </p>

                                    </div>

                                )
                            )
                    }

                </div>

            </section>
            <button
                className="portfolioPublicoBotaoCompartilhar"
                onClick={() =>
                    setModalCompartilhar(true)
                }
            >
                📤
            </button>
            {
                modalCompartilhar && (

                    <div
                        className="portfolioPublicoCompartilharModal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="portfolioPublicoCompartilharFechar"
                            onClick={() =>
                                setModalCompartilhar(false)
                            }
                        >
                            ✕
                        </button>

                        <div className="portfolioPublicoCompartilharTopo">


                            <h2>
                                {perfil.nome} {perfil.sobrenome}
                            </h2>



                        </div>

                        <div className="portfolioPublicoCompartilharQrArea">

                            <QRCodeCanvas
                                value={window.location.href}
                                size={220}
                            />

                        </div>

                        <div style={{ marginBottom: "42px" }} className="portfolioPublicoCompartilharLinkArea">



                            <button
                                className="portfolioPublicoCompartilharCopiar"
                                onClick={async () => {

                                    if (navigator.share) {

                                        await navigator.share({
                                            title:
                                                perfil.nome_completo,
                                            url:
                                                window.location.href
                                        });

                                    }

                                }}
                            >
                                📤
                            </button>

                        </div>



                    </div>

                )
            }
        </div>

    );

}