import React, {
    useState
} from "react";

import Header from "./componentes/header";
import Rodape from "./componentes/rodape";
import Card from "./login/card";
import { GoogleLogin } from "@react-oauth/google";
import { API_URL } from "../../config";
import "./login.css";

export default function Login() {

    const [

        carregandoLogin,

        setCarregandoLogin

    ] = useState(false);

    async function fazerLoginGoogle(
        credentialResponse
    ) {

        setCarregandoLogin(
            true
        );

        try {

            const resposta = await fetch(
                `${API_URL}/auth/google`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        credential:
                            credentialResponse.credential
                    })
                }
            );

            const dados =
                await resposta.json();

            if (!resposta.ok) {

                setCarregandoLogin(
                    false
                );

                alert(
                    dados.detail ||
                    "Erro ao fazer login"
                );

                return;
            }

            localStorage.setItem(
                "token",
                dados.token
            );

            window.location.href =
                "/portfolio/desempenho";

        } catch (erro) {

            setCarregandoLogin(
                false
            );

            console.error(
                erro
            );

            alert(
                "Erro ao conectar ao servidor"
            );

        }

    }

    return (

        <div
            className="igLoginPaginaContainer"
        >

            <Header />

            <main
                className="igLoginConteudoPrincipal"
            >

                <section
                    className="igLoginCardEntrar"
                >

                    <h1
                        className="igLoginTitulo"
                    >

                        Entre na IronGoals

                    </h1>

                    <p
                        className="igLoginDescricao"
                    >

                        Crie gratuitamente seu perfil profissional e permita que empresas compatíveis encontrem você.

                    </p>

                    <div
                        className="igLoginBeneficios"
                    >

                        <div
                            className="igLoginBeneficio"
                        >

                            <span>

                                ✅

                            </span>

                            <p>

                                Perfil profissional online gratuito.

                            </p>

                        </div>

                        <div
                            className="igLoginBeneficio"
                        >

                            <span>

                                ✅

                            </span>

                            <p>

                                Divulgação automática para empresas.

                            </p>

                        </div>

                        <div
                            className="igLoginBeneficio"
                        >

                            <span>

                                ✅

                            </span>

                            <p>

                                Controle total sobre seus dados pessoais.

                            </p>

                        </div>

                        <div
                            className="igLoginBeneficio"
                        >

                            <span>

                                ✅

                            </span>

                            <p>

                                Empresas entram em contato somente após sua aprovação.

                            </p>

                        </div>

                    </div>

                    <div
                        className="igLoginAreaGoogle"
                    >

                        <GoogleLogin

                            onSuccess={
                                fazerLoginGoogle
                            }

                            onError={() => {

                                alert(
                                    "Erro ao autenticar com Google"
                                );

                            }}

                        />

                    </div>

                    <p
                        className="igLoginAviso"
                    >

                        Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.

                    </p>

                </section>

                <Card />

            </main>

            <Rodape />

            {

                carregandoLogin && (

                    <div
                        className="igLoginModalCarregando"
                    >

                        <div
                            className="igLoginModalCard"
                        >

                            <div
                                className="igLoginModalSpinner"
                            ></div>

                            <h2>

                                Entrando na IronGoals

                            </h2>

                            <p>

                                Aguarde alguns instantes enquanto preparamos sua conta.

                            </p>

                        </div>

                    </div>

                )

            }

        </div>

    );

}