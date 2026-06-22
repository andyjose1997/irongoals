import React from "react";
import "./rodape.css";
import logo from "./logo/ig.png";

export default function Rodape() {
    return (
        <footer className="igRodapePrincipalContainer">
            <p className="igRodapeTexto">
                <img src={logo} alt="IronGoals" />
                © {new Date().getFullYear()} IronGoals • Conectando profissionais e empresas. <br />
                Sua próxima oportunidade começa quando a empresa certa encontra o seu potencial.

            </p>

        </footer>
    );
}