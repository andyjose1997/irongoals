import React from "react";

import Header from "./componentes/header";
import Rodape from "./componentes/rodape";

import "./pacotes.css";

export default function Pacotes() {

    return (

        <div className="pacotesPagina">

            <Header />

            <main className="pacotesConteudo">

                <section className="pacotesHero">

                    <div className="pacotesHeroConteudo">

                        <span>

                            Estamos começando 🚀

                        </span>

                        <h1>

                            Os primeiros 150 cadastrados recebem 300 créditos gratuitos.

                        </h1>

                        <p>

                            Queremos que os primeiros usuários tenham a oportunidade de conhecer a plataforma e divulgar seus perfis profissionais sem nenhum custo.

                        </p>

                    </div>

                </section>

                <section className="pacotesExplicacao">

                    <h2>

                        O que são os créditos?

                    </h2>

                    <p>

                        Os créditos representam oportunidades de divulgação profissional dentro da IronGoals.

                    </p>

                    <p>

                        Cada vez que seu perfil é divulgado para uma empresa cadastrada na plataforma, um crédito é utilizado.

                    </p>

                    <p>

                        Quanto mais créditos você possuir, mais empresas poderão conhecer seu perfil profissional.

                    </p>

                </section>

                <section className="pacotesFuncionamento">

                    <h2>

                        Como funciona?

                    </h2>

                    <div className="pacotesGrid">

                        <div className="pacotesCard">

                            <h3>

                                1. Complete seu perfil

                            </h3>

                            <p>

                                Preencha suas experiências, formação, habilidades e demais informações profissionais.

                            </p>

                        </div>

                        <div className="pacotesCard">

                            <h3>

                                2. Utilize seus créditos

                            </h3>

                            <p>

                                Escolha as cidades e categorias desejadas para iniciar sua divulgação.

                            </p>

                        </div>

                        <div className="pacotesCard">

                            <h3>

                                3. Seu perfil é divulgado

                            </h3>

                            <p>

                                A IronGoals envia automaticamente seu perfil para empresas compatíveis.

                            </p>

                        </div>

                        <div className="pacotesCard">

                            <h3>

                                4. Empresas demonstram interesse

                            </h3>

                            <p>

                                Você acompanha visualizações, entrevistas e solicitações diretamente no painel da plataforma.

                            </p>

                        </div>

                    </div>

                </section>

                <section className="pacotesPromocao">

                    <h2>

                        Promoção de lançamento

                    </h2>

                    <div className="pacotesPromocaoCard">

                        <h3>

                            🎁 Primeiros 150 usuários

                        </h3>

                        <h1>

                            300 Créditos Gratuitos

                        </h1>

                        <p>

                            Nenhum pagamento é necessário para receber este benefício. Os créditos são adicionados automaticamente no momento do cadastro enquanto houver vagas disponíveis na promoção.

                        </p>

                    </div>

                </section>

                <section className="pacotesImportante">

                    <h2>

                        Importante

                    </h2>

                    <p>

                        A IronGoals não vende vagas de emprego e não garante contratações.

                    </p>

                    <p>

                        Nosso objetivo é aumentar a visibilidade do seu perfil profissional, conectando você com empresas compatíveis e ampliando suas oportunidades de entrevista.

                    </p>

                </section>

            </main>

            <Rodape />

        </div>

    );

}