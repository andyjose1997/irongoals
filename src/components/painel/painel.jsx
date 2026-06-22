import React, {
    useEffect
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    API_URL
} from "../../config";
import "./painel.css";
import Botoes from "./componentes/botoes/botoes";
import Area from "./componentes/area/area";


export default function PainelVerificado() {

    const navigate =
        useNavigate();

    useEffect(() => {

        verificarPermissao();

    }, []);

    async function verificarPermissao() {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            if (!token) {

                navigate("/");
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

            if (!resposta.ok) {

                navigate("/");
                return;

            }

            const dados =
                await resposta.json();

            if (!dados.autorizado) {

                navigate("/");
                return;

            }

        } catch {

            navigate("/");

        }

    }

    return (
        <div className="painelContainer">
            <Botoes />
            <Area />
        </div>
    );
}