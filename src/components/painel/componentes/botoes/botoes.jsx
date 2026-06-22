import React from "react";

export default function Botoes() {

    return (

        <aside className="painelBotoesLateral">

            <div className="painelBotoesCabecalho">

                <h2 className="painelBotoesTitulo">
                    Administração
                </h2>

                <p className="painelBotoesSubtitulo">
                    Painel interno IronGoals
                </p>

            </div>

            <nav className="painelBotoesMenu">

                <button className="painelBotaoItem">
                    Dashboard
                </button>

                <button className="painelBotaoItem">
                    Empresas
                </button>

                <button className="painelBotaoItem">
                    Mensagens
                </button>

                <button className="painelBotaoItem">
                    Candidatos
                </button>

                <button className="painelBotaoItem">
                    Compatibilidade
                </button>

                <button className="painelBotaoItem">
                    Entrevistas
                </button>

                <button className="painelBotaoItem">
                    Créditos
                </button>

                <button className="painelBotaoItem">
                    Configurações
                </button>

            </nav>

        </aside>

    );

}