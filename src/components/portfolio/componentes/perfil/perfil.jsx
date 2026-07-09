import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../config";
import "./perfil.css"
import ModalFotoPerfil from "./modal";
export default function Perfil() {
    const [idade, setIdade] = useState(null);
    const navigate = useNavigate();
    const [
        abrirModalFoto,
        setAbrirModalFoto
    ] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        carregarUsuario();
    }, []);

    async function carregarUsuario() {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const resposta = await fetch(
                `${API_URL}/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (resposta.status === 401) {

                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            const dados = await resposta.json();

            setUsuario(dados);
            if (dados.data_nascimento) {

                const nascimento = new Date(dados.data_nascimento);

                const hoje = new Date();

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
                        hoje.getDate() < nascimento.getDate()
                    )
                ) {
                    idadeCalculada--;
                }

                setIdade(idadeCalculada);
            }
        } catch (erro) {

            console.error(erro);

            localStorage.removeItem("token");
            navigate("/login");

        } finally {

            setCarregando(false);

        }
    }

    function fazerLogout() {

        localStorage.removeItem("token");

        navigate("/login");
    }

    if (carregando) {
        return (
            <div className="portfolioSkeletonContainer">

                <div className="portfolioSkeletonCabecalho">

                    <div className="portfolioSkeletonFoto"></div>

                    <div className="portfolioSkeletonInformacoes">

                        <div className="portfolioSkeletonLinha portfolioSkeletonNome"></div>

                        <div className="portfolioSkeletonLinha portfolioSkeletonEmail"></div>

                        <div className="portfolioSkeletonLinha portfolioSkeletonIdade"></div>

                    </div>

                    <div className="portfolioSkeletonBotoes">

                        <div className="portfolioSkeletonBotao"></div>

                        <div className="portfolioSkeletonBotao"></div>

                    </div>

                </div>

            </div>
        );
    }
    console.log(usuario);
    console.log(usuario?.foto);
    return (
        <div className="portfolioPaginaContainer">

            <div className="portfolioCabecalhoArea">

                <img
                    src={
                        usuario?.foto ||
                        "https://placehold.co/200x200"
                    }
                    alt="Foto"
                    className="portfolioFotoPerfil"
                    onClick={() =>
                        setAbrirModalFoto(true)
                    }
                />

                <div className="portfolioInformacoesUsuario">

                    <h1 className="portfolioNomeUsuario">
                        {usuario?.nome} {usuario?.sobrenome}
                    </h1>


                    <p className="portfolioEmailUsuario">
                        {usuario?.email}
                    </p>

                    {idade && (<p className="portfolioEmailUsuario">
                        {idade} anos
                    </p>
                    )}

                    {usuario?.selo && (
                        <p className="portfolioEmailUsuario">
                            {usuario.selo}
                        </p>
                    )}
                </div>

                <div className="portfolioAcoesDireita">

                    <div className="portfolioAcoesLinha">

                        <button
                            className="portfolioBotaoInicio"
                            onClick={() => navigate("/sobre")}
                        >
                            Sobre
                        </button>

                        <button
                            className="portfolioBotaoLogout"
                            onClick={fazerLogout}
                        >
                            Sair
                        </button>

                    </div>

                    <button
                        className="portfolioBotaoPortfolioPublico"
                        disabled={!usuario?.portfolio_pronto}
                        title={
                            !usuario?.portfolio_pronto
                                ? "Preencha pelo menos uma experiência, uma formação e uma habilidade para liberar seu portfólio."
                                : "Visualizar Perfil Público"
                        }
                        onClick={() => {

                            if (!usuario?.portfolio_pronto) {
                                return;
                            }

                            window.open(
                                `/portfolio-publico/${encodeURIComponent(
                                    usuario?.id_publico
                                )}`,
                                "_blank"
                            );

                        }}
                    >
                        Visualizar Perfil Público
                    </button>
                    {
                        usuario?.admin && (

                            <button
                                className="portfolioBotaoPainelAdmin"
                                onClick={() =>
                                    navigate(
                                        "/painel"
                                    )
                                }
                            >
                                Painel
                            </button>

                        )
                    }
                </div>

            </div>
            <ModalFotoPerfil
                aberto={abrirModalFoto}
                fotoAtual={usuario?.foto}
                fechar={() =>
                    setAbrirModalFoto(false)
                }
                atualizarFoto={novaFoto => {

                    setUsuario(
                        anterior => ({
                            ...anterior,
                            foto: novaFoto
                        })
                    );

                }}
            />
        </div>
    );
}