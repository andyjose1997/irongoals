import React from "react";
import Perfil from "./componentes/perfil/perfil";
import Area from "./componentes/area/area";
import Botoes from "./componentes/botoes/botoes";
import Rodape from "../inicio/componentes/rodape";
import "./portfolio.css";

export default function Portfolio() {
    return (
        <div className="portfolioLayoutContainer">

            <div className="portfolioPerfilBloco">
                <Perfil />
            </div>

            <div className="portfolioBotoesBloco">
                <Botoes />
            </div>

            <div className="portfolioAreaBloco">
                <Area />
            </div>

            <div className="portfolioRodapeBloco">
                <Rodape />
            </div>

        </div>
    );
}