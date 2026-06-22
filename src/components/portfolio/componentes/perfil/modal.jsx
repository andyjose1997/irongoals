import React,
{
    useState
}
    from "react";

import { API_URL } from "../../../../config";


import "./modal.css";

export default function ModalFotoPerfil({
    aberto,
    fechar,
    atualizarFoto,
    fotoAtual
}) {

    const [
        arquivo,
        setArquivo
    ] = useState(null);
    const [
        preview,
        setPreview
    ] = useState(null);
    const [
        carregando,
        setCarregando
    ] = useState(false);

    if (!aberto) {
        return null;
    }

    async function enviarFoto() {

        if (!arquivo) {
            return;
        }

        try {

            setCarregando(true);

            const token =
                localStorage.getItem(
                    "token"
                );

            const formData =
                new FormData();

            formData.append(
                "foto",
                arquivo
            );

            const resposta =
                await fetch(
                    `${API_URL}/foto-perfil`,
                    {
                        method: "POST",
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        },
                        body:
                            formData
                    }
                );

            const dados =
                await resposta.json();

            if (!resposta.ok) {

                alert(
                    dados.detail ||
                    "Erro ao enviar foto"
                );

                return;
            }

            atualizarFoto(
                dados.foto
            );

            fechar();

        } catch {

            alert(
                "Erro ao enviar foto"
            );

        } finally {

            setCarregando(false);

        }
    }
    function selecionarArquivo(
        evento
    ) {

        const arquivoSelecionado =
            evento.target.files[0];

        if (!arquivoSelecionado) {
            return;
        }

        setArquivo(
            arquivoSelecionado
        );

        setPreview(
            URL.createObjectURL(
                arquivoSelecionado
            )
        );

    }
    return (

        <div className="modalFotoPerfilOverlay">

            <div className="modalFotoPerfilCard">

                <h2>
                    Alterar foto de perfil
                </h2>

                <div className="modalFotoPerfilPreviewArea">

                    <img
                        src={
                            preview ||
                            fotoAtual ||
                            "https://placehold.co/220x220"
                        }
                        alt="Preview"
                        className="modalFotoPerfilPreviewImagem"
                    />

                </div>

                <label
                    className="modalFotoPerfilSelecionar"
                >

                    Escolher foto

                    <input
                        type="file"
                        accept="image/*"
                        onChange={
                            selecionarArquivo
                        }
                        hidden
                    />

                </label>

                <div
                    className="modalFotoPerfilBotoes"
                >

                    <button
                        className="modalFotoPerfilCancelar"
                        onClick={fechar}
                    >
                        Cancelar
                    </button>

                    <button
                        className="modalFotoPerfilSalvar"
                        disabled={
                            carregando ||
                            !arquivo
                        }
                        onClick={
                            enviarFoto
                        }
                    >
                        {
                            carregando
                                ? "Enviando..."
                                : "Salvar foto"
                        }
                    </button>

                </div>

            </div>

        </div>

    );
}