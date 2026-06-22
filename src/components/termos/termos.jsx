import {
    useState,
    useEffect
} from "react";
import {
    API_URL
} from "../../config";
import {
    useNavigate
} from "react-router-dom";

export default function Termos() {
    const [erroTermos, setErroTermos] =
        useState(false);
    const navigate =
        useNavigate();

    const [carregando, setCarregando] =
        useState(false);

    useEffect(() => {

        verificarTermos();

    }, []);

    async function verificarTermos() {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            if (!token) {

                navigate(
                    "/login",
                    {
                        replace: true
                    }
                );

                return;
            }

            const resposta =
                await fetch(
                    `${API_URL}/me`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            if (!resposta.ok) {
                return;
            }

            const dados =
                await resposta.json();

            if (
                dados.termos === "1"
            ) {

                navigate(
                    "/portfolio/desempenho",
                    {
                        replace: true
                    }
                );

            }

        } catch (erro) {

            console.error(
                erro
            );

        }

    }

    async function aceitarTermos() {

        try {

            setErroTermos(false);

            setCarregando(true);

            const token =
                localStorage.getItem(
                    "token"
                );

            const resposta =
                await fetch(
                    `${API_URL}/termos/aceitar`,
                    {
                        method: "POST",
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            if (!resposta.ok) {

                setErroTermos(true);

                return;
            }

            setTimeout(
                () => {

                    window.location.reload();

                },
                2000
            );

        } catch (erro) {

            console.error(
                erro
            );

            setErroTermos(true);

        }

    }
    return (

        <div
            className="termosPaginaContainer"
        >

            <div
                className="termosCardPrincipal"
            >

                <h1
                    className="termosTituloPrincipal"
                >
                    Termos de Uso
                </h1>

                <div
                    className="termosConteudoTexto"
                >

                    <p>
                        Ao utilizar a plataforma
                        IronGoals, você concorda
                        com nossos termos de uso.
                    </p>

                    <p>
                        A IronGoals não garante
                        emprego, contratação ou
                        entrevistas.
                    </p>

                    <p>
                        A plataforma tem como
                        objetivo divulgar perfis
                        profissionais para
                        empresas compatíveis.
                    </p>

                    <p>
                        Seus dados serão tratados
                        conforme as regras de
                        privacidade da plataforma.
                    </p>

                    <p>
                        O uso indevido da
                        plataforma poderá
                        resultar em suspensão ou
                        encerramento da conta.
                    </p>

                </div>
                {
                    carregando && (
                        <p
                            className="termosMensagemStatus"
                        >
                            Salvando e redirecionando...
                        </p>
                    )
                }

                {
                    erroTermos && (
                        <p
                            className="termosMensagemErro"
                        >
                            Não foi possível confirmar o aceite.
                            Tente novamente.
                        </p>
                    )
                }
                <button
                    className="termosBotaoAceitar"
                    onClick={
                        aceitarTermos
                    }
                    disabled={
                        carregando
                    }
                >

                    {
                        carregando
                            ? "Confirmando aceite..."
                            : "Aceito os Termos"
                    }

                </button>

            </div>

        </div>

    );

}