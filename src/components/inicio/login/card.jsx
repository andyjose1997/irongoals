import React from "react";
import "./card.css"
export default function Card() {
    return (
        <section className="igLoginCardInformacoes">

            <h2 className="igLoginNumerosTitulo">
                Aumente sua visibilidade profissional
            </h2>

            <div className="igLoginNumeroBox">
                <strong>1.247</strong>
                <span>Usuários cadastrados</span>
            </div>

            <div className="igLoginNumeroBox">
                <strong>382</strong>
                <span>Empresas recebendo perfis profissionais</span>
            </div>

            <p className="igLoginTextoInfo">
                Crie seu perfil profissional e permita que empresas compatíveis encontrem você.
            </p>

        </section>
    );
}