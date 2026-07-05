import React from "react";

import Header from "./componentes/header";
import Rodape from "./componentes/rodape";

import "./quemsomos.css";

import Andy from "./andy.png";

export default function QuemSomos() {

    return (

        <div className="quemSomosPagina">

            <Header />

            <section className="quemSomosHero">

                <div className="quemSomosHeroOverlay">

                    <div className="quemSomosHeroConteudo">


                        <h1>

                            Conectando profissionais às empresas através da tecnologia.

                        </h1>

                        <p>

                            A IronGoals nasceu para transformar a forma como candidatos e empresas se encontram. Em vez de esperar que oportunidades apareçam, nossa plataforma trabalha para divulgar profissionais compatíveis às empresas, preservando sua privacidade e aumentando suas chances de conquistar novas oportunidades.

                        </p>

                        <a
                            href="/login"
                            className="quemSomosHeroBotao"
                        >

                            Criar meu perfil gratuitamente

                        </a>

                    </div>

                </div>

            </section>

            <section className="quemSomosMissao">

                <div className="quemSomosMissaoEsquerda">

                    <span>

                        NOSSA MISSÃO

                    </span>

                    <h2>

                        Dar visibilidade para quem merece ser encontrado.

                    </h2>

                    <p>

                        Todos os dias milhares de profissionais deixam de ser vistos por empresas simplesmente porque seus currículos nunca chegam até elas.

                    </p>

                    <p>

                        A IronGoals foi criada para mudar esse cenário utilizando tecnologia para divulgar automaticamente perfis profissionais a empresas compatíveis, sempre respeitando a privacidade e o controle do candidato sobre suas informações.

                    </p>

                </div>

                <div className="quemSomosMissaoDireita">

                    <div className="quemSomosNumero">

                        <h3>

                            100%

                        </h3>

                        <p>

                            Transparência durante todo o processo.

                        </p>

                    </div>

                    <div className="quemSomosNumero">

                        <h3>

                            Privacidade

                        </h3>

                        <p>

                            Seus dados para contato permanecem protegidos até você aceitar compartilhar.

                        </p>

                    </div>

                </div>

            </section>

            <section className="quemSomosDiferenciais">

                <h2>

                    O que torna a IronGoals diferente

                </h2>

                <div className="quemSomosCards">

                    <article className="quemSomosCard">

                        <div className="quemSomosIcone">

                            📤

                        </div>

                        <h3>

                            Divulgação Inteligente

                        </h3>

                        <p>

                            Seu perfil é divulgado automaticamente para empresas compatíveis utilizando filtros de cidade, categoria e compatibilidade profissional.

                        </p>

                    </article>

                    <article className="quemSomosCard">

                        <div className="quemSomosIcone">

                            🔒

                        </div>

                        <h3>

                            Privacidade

                        </h3>

                        <p>

                            Empresas visualizam seu perfil profissional, mas seus dados de contato permanecem protegidos até você aceitar uma entrevista.

                        </p>

                    </article>

                    <article className="quemSomosCard">

                        <div className="quemSomosIcone">

                            📊

                        </div>

                        <h3>

                            Transparência

                        </h3>

                        <p>

                            Você acompanha visualizações, empresas interessadas, entrevistas e todo o desempenho da divulgação do seu perfil.

                        </p>

                    </article>

                    <article className="quemSomosCard">

                        <div className="quemSomosIcone">

                            🚀

                        </div>

                        <h3>

                            Tecnologia

                        </h3>

                        <p>

                            Nossa plataforma foi desenvolvida para facilitar conexões reais entre empresas e profissionais utilizando automação e inteligência de compatibilidade.

                        </p>

                    </article>

                </div>

            </section>

            <section className="quemSomosFluxo">

                <h2>

                    Como funciona

                </h2>

                <div className="quemSomosTimeline">

                    <div className="quemSomosEtapa">

                        <div>

                            1

                        </div>

                        <h3>

                            Cadastro

                        </h3>

                        <p>

                            Crie gratuitamente sua conta utilizando seu login Google.

                        </p>

                    </div>

                    <div className="quemSomosLinha"></div>

                    <div className="quemSomosEtapa">

                        <div>

                            2

                        </div>

                        <h3>

                            Complete seu Perfil

                        </h3>

                        <p>

                            Preencha suas experiências, formação, habilidades e demais informações profissionais para aumentar sua compatibilidade com as empresas.

                        </p>

                    </div>

                    <div className="quemSomosLinha"></div>

                    <div className="quemSomosEtapa">

                        <div>

                            3

                        </div>

                        <h3>

                            Divulgue seu Perfil

                        </h3>

                        <p>

                            Utilize seus créditos para divulgar automaticamente seu perfil às empresas compatíveis com seu perfil profissional.

                        </p>

                    </div>

                    <div className="quemSomosLinha"></div>

                    <div className="quemSomosEtapa">

                        <div>

                            4

                        </div>

                        <h3>

                            Empresas Demonstram Interesse

                        </h3>

                        <p>

                            As empresas podem visualizar seu perfil, solicitar entrevistas e, somente após sua aprovação, terão acesso às informações de contato.

                        </p>

                    </div>

                </div>

            </section>

            <section className="quemSomosFundador">

                <div className="quemSomosFundadorFoto">

                    <img

                        src={Andy}

                        alt="Andy José de Oliveira Romero"

                    />

                </div>

                <div className="quemSomosFundadorTexto">

                    <span>

                        FUNDADOR

                    </span>

                    <h2>

                        Andy José de Oliveira Romero

                    </h2>

                    <p>

                        A IronGoals foi idealizada por Andy José de Oliveira Romero com o propósito de utilizar tecnologia para aproximar profissionais e empresas de uma forma mais transparente, eficiente e acessível.

                    </p>

                    <p>

                        O projeto nasceu da percepção de que milhares de pessoas qualificadas permanecem invisíveis para o mercado de trabalho. Em vez de apenas reunir vagas, a IronGoals trabalha para divulgar candidatos às empresas compatíveis, aumentando suas oportunidades de serem encontrados.

                    </p>

                    <p>

                        A plataforma continua em constante evolução, sempre buscando criar novas ferramentas que facilitem o relacionamento entre profissionais e empregadores, preservando a privacidade e oferecendo uma experiência moderna para ambos os lados.

                    </p>

                </div>

            </section>

            <Rodape />

        </div>

    );

}