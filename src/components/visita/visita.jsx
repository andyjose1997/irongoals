import { useEffect } from "react";
import { API_URL } from "../../config";

export default function VisitarEmpresas() {

    console.log("COMPONENTE RENDERIZADO");

    useEffect(() => {

        console.log("USEEFFECT CHAMOU");

        async function registrar() {

            console.log("ANTES DO FETCH");

            try {

                const resposta = await fetch(
                    `${API_URL}/visitas-empresas`
                );

                console.log("STATUS:", resposta.status);

            } catch (erro) {

                console.error(erro);

            }

            console.log("REDIRECIONANDO");

            window.location.href = "https://irongoals.com";

        }

        registrar();

    }, []);

    return null;

}