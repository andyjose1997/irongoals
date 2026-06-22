import React, {
    useEffect
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    API_URL
} from "../../config";

export default function Painel() {

    const navigate =
        useNavigate();

    useEffect(() => {

        verificarPainel();

    }, []);

    async function verificarPainel() {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            if (!token) {

                navigate(
                    "/"
                );

                return;

            }

            const resposta =
                await fetch(
                    `${API_URL}/painel/verificar`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const dados =
                await resposta.json();

            if (
                dados.autorizado
            ) {

                navigate(
                    "/painel-verificado"
                );

            } else {

                navigate(
                    "/"
                );

            }

        } catch (erro) {

            console.error(
                erro
            );

            navigate(
                "/"
            );

        }

    }

    return null;

}