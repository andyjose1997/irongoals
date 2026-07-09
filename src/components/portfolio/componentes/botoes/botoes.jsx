import { useState } from "react";
import "./botoes.css";
import {
    useNavigate,
    useLocation
} from "react-router-dom";
export default function Botoes() {

    const navigate = useNavigate();

    const [
        aberto,
        setAberto
    ] = useState(true);
    const location = useLocation();
    const botoes = [
        {
            emoji: "📊",
            texto: "Desempenho",
            rota: "/portfolio/desempenho"
        },
        {
            emoji: "👤",
            texto: "Informações",
            rota: "/portfolio/infos"
        },
        {
            emoji: "💼",
            texto: "Experiências",
            rota: "/portfolio/experiencias"
        },
        {
            emoji: "🎓",
            texto: "Formação",
            rota: "/portfolio/formacao"
        },
        {
            emoji: "⭐",
            texto: "Habilidades",
            rota: "/portfolio/habilidades"
        },
        {
            emoji: "🌎",
            texto: "Idiomas",
            rota: "/portfolio/idiomas"
        }
    ];

    return (

        <div
            className={`perfilBotoesContainer ${aberto
                ? ""
                : "perfilBotoesFechado"
                }`}
        >

            <button
                className="perfilBotaoSeta"
                onClick={() =>
                    setAberto(!aberto)
                }
            >

                {
                    aberto
                        ? "⬆️"
                        : "⬅️"
                }

            </button>

            {
                aberto &&
                botoes.map(botao => (

                    <button
                        key={botao.rota}
                        className={`perfilBotaoAcao ${location.pathname === botao.rota
                                ? "perfilBotaoAtivo"
                                : ""
                            }`} title={botao.texto}
                        onClick={() => navigate(botao.rota)}
                    >

                        <span className="perfilBotaoTexto">

                            {botao.texto}

                        </span>

                        <span className="perfilBotaoEmoji">

                            {botao.emoji}

                        </span>

                    </button>

                ))
            }

        </div>

    );

}