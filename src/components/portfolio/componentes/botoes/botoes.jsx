import { useState } from "react";
import "./botoes.css";
import {
    useNavigate,
    useLocation
} from "react-router-dom";
import desempenhoImg from "./emojis/desempenho.png";
import informacoesImg from "./emojis/informacoes.png";
import experienciasImg from "./emojis/experiencias.png";
import formacaoImg from "./emojis/formacao.png";
import habilidadesImg from "./emojis/habilidades.png";
import idiomasImg from "./emojis/idiomas.png";



export default function Botoes() {

    const navigate = useNavigate();

    const [
        aberto,
        setAberto
    ] = useState(true);
    const location = useLocation();


    const botoes = [
        {
            imagem: desempenhoImg,
            texto: "Desempenho",
            rota: "/portfolio/desempenho"
        },
        {
            imagem: informacoesImg,
            texto: "Informações",
            rota: "/portfolio/infos"
        },
        {
            imagem: experienciasImg,
            texto: "Experiências",
            rota: "/portfolio/experiencias"
        },
        {
            imagem: formacaoImg,
            texto: "Formação",
            rota: "/portfolio/formacao"
        },
        {
            imagem: habilidadesImg,
            texto: "Habilidades",
            rota: "/portfolio/habilidades"
        },
        {
            imagem: idiomasImg,
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
                        ? "🔼"
                        : "🔽"
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
                            }`}
                        title={botao.texto}
                        onClick={() => navigate(botao.rota)}
                    >

                        <img
                            src={botao.imagem}
                            alt={botao.texto}
                            className="perfilBotaoIcone"
                        />

                        <span className="perfilBotaoTexto">

                            {botao.texto}

                        </span>

                    </button>
                ))
            }

        </div>

    );

}