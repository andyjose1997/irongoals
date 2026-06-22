import { useNavigate } from "react-router-dom";
import "./botoes.css";

export default function Botoes() {

    const navigate = useNavigate();

    return (
        <div className="perfilBotoesContainer">

            <button
                className="perfilBotaoAcao"
                onClick={() => navigate("/portfolio/desempenho")}
            >
                Desempenho
            </button>

            <button
                className="perfilBotaoAcao"
                onClick={() => navigate("/portfolio/infos")}
            >
                Informações Pessoais
            </button>

            <button
                className="perfilBotaoAcao"
                onClick={() => navigate("/portfolio/experiencias")}
            >
                Experiências
            </button>

            <button
                className="perfilBotaoAcao"
                onClick={() => navigate("/portfolio/formacao")}
            >
                Formação
            </button>

            <button
                className="perfilBotaoAcao"
                onClick={() => navigate("/portfolio/habilidades")}
            >
                Habilidades
            </button>
            <button
                className="perfilBotaoAcao"
                onClick={() => navigate("/portfolio/idiomas")}
            >
                Idiomas
            </button>

            <button
                style={{ display: "none" }}
                className="perfilBotaoAcao"
                onClick={() => navigate("/portfolio/configuracoes")}
            >
                Configurações
            </button>

        </div>
    );
}