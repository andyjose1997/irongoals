import React from "react";

import Header from "./componentes/header";
import Corpo from "./componentes/corpo";
import Rodape from "./componentes/rodape";

import "./inicio.css";

export default function Inicio() {

    return (

        <div className="igInicioPagina">

            <Header />

            <main className="igInicioConteudo">

                <Corpo />

            </main>

            <Rodape />

        </div>

    );

}