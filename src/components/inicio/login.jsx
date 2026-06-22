import React from "react";
import Header from "./componentes/header";
import Rodape from "./componentes/rodape";
import Card from "./login/card";
import { GoogleLogin } from "@react-oauth/google";
import { API_URL } from "../../config";
import "./login.css";

export default function Login() {

    async function fazerLoginGoogle(
        credentialResponse
    ) {

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

            console.error(erro);

            alert(
                "Erro ao conectar ao servidor"
            );
        }
    }

    return (
        <div className="igLoginPaginaContainer">

            <Header />

            <main className="igLoginConteudoPrincipal">

                <section className="igLoginCardEntrar">

                    <h1 className="igLoginTitulo">
                        Entrar na IronGoals
                    </h1>

                    <p className="igLoginDescricao">
                        Acesse sua conta e acompanhe suas oportunidades profissionais.
                    </p>

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

                </section>

                <Card />

            </main>

            <Rodape />

        </div>
    );
}