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
import "./termos.css"
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
                setCarregando(false);

                return;

            }

            console.log("CHEGOU AQUI");

            window.location.href =
                "/portfolio/desempenho";

        } catch (erro) {

            console.error(
                erro
            );

            setErroTermos(true);
            setCarregando(false);

        }

    }
    return (

        <div
            className="termosPaginaContainer"
        >

            <div
                className="termosCardPrincipal"
            >

                <span
                    className="termosBadge"
                >

                    IronGoals

                </span>

                <h1
                    className="termosTituloPrincipal"
                >

                    Termos de Uso da Plataforma

                </h1>

                <p
                    className="termosSubtitulo"
                >

                    Leia atentamente as informações abaixo antes de continuar.

                </p>

                <div
                    className="termosConteudoTexto"
                >

                    <h3>

                        1. Objetivo da Plataforma

                    </h3>

                    <p>

                        A IronGoals é uma plataforma de divulgação profissional que conecta candidatos e empresas através de um sistema de compatibilidade. A plataforma não atua como agência de empregos e não garante entrevistas ou contratações.

                    </p>

                    <h3>

                        2. Divulgação do Perfil

                    </h3>

                    <p>

                        Ao utilizar a plataforma, você autoriza que seu perfil profissional seja divulgado para empresas cadastradas ou compatíveis com seus objetivos profissionais, respeitando as configurações da plataforma e seus créditos disponíveis.

                    </p>

                    <h3>

                        3. Privacidade

                    </h3>

                    <p>

                        Informações pessoais como telefone, WhatsApp, e-mail e endereço permanecem protegidas. Esses dados somente poderão ser compartilhados após sua autorização durante o processo de entrevista.

                    </p>

                    <h3>

                        4. Informações Prestadas

                    </h3>

                    <p>

                        Você declara que todas as informações cadastradas são verdadeiras e se compromete a mantê-las atualizadas. Informações falsas poderão resultar na suspensão da conta.

                    </p>

                    <h3>

                        5. Créditos

                    </h3>

                    <p>

                        Os créditos representam oportunidades de divulgação profissional dentro da plataforma. Eles não possuem valor monetário, não podem ser convertidos em dinheiro e são utilizados exclusivamente para divulgar seu perfil às empresas.

                    </p>

                    <h3>

                        6. Responsabilidade da IronGoals

                    </h3>

                    <p>

                        Embora a plataforma trabalhe continuamente para aproximar candidatos e empresas, não existe garantia de visualizações, entrevistas ou contratação. As decisões de seleção pertencem exclusivamente às empresas.

                    </p>

                    <h3>

                        7. Uso Adequado

                    </h3>

                    <p>

                        É proibido utilizar a plataforma para divulgação de informações falsas, atividades ilegais, spam ou qualquer conduta que prejudique outros usuários ou empresas.

                    </p>

                    <h3>

                        8. Atualizações

                    </h3>

                    <p>

                        Estes termos poderão ser atualizados sempre que necessário para acompanhar a evolução da plataforma. Alterações relevantes poderão exigir um novo aceite.

                    </p>

                    <h3>

                        9. Aceite

                    </h3>

                    <p>

                        Ao clicar em <strong>"Li e Aceito os Termos"</strong>, você declara que leu, compreendeu e concorda com todas as condições de utilização da plataforma IronGoals.

                    </p>

                </div>

                {

                    carregando && (

                        <p
                            className="termosMensagemStatus"
                        >

                            Salvando seu aceite...

                        </p>

                    )

                }

                {

                    erroTermos && (

                        <p
                            className="termosMensagemErro"
                        >

                            Não foi possível confirmar seu aceite. Tente novamente.

                        </p>

                    )

                }

            </div>

            <div
                className="termosBarraInferior"
            >

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

                            : "Li e Aceito os Termos"

                    }

                </button>

            </div>

        </div>

    );

}