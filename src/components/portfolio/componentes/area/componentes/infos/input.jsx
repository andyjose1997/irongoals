import React from "react";
import "./infos.css"
export default function Input({
    campo,
    valor,
    onChange,
    placeholder = ""
}) {

    function somenteNumeros(texto) {
        return texto.replace(/\D/g, "");
    }

    function formatarTelefone(numero) {

        const n = somenteNumeros(numero)
            .slice(0, 11);

        if (n.length <= 2) {
            return n;
        }

        if (n.length <= 7) {
            return `(${n.slice(0, 2)}) ${n.slice(2)}`;
        }

        return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
    }

    function formatarCep(numero) {

        const n = somenteNumeros(numero)
            .slice(0, 8);

        if (n.length <= 5) {
            return n;
        }

        return `${n.slice(0, 5)}-${n.slice(5)}`;
    }

    function valorExibido() {

        switch (campo) {

            case "telefone":
            case "whatsapp":
                return formatarTelefone(
                    valor || ""
                );

            case "cep":
                return formatarCep(
                    valor || ""
                );

            default:
                return valor || "";
        }
    }

    function alterarValor(e) {

        let novoValor =
            e.target.value;

        switch (campo) {

            case "telefone":
            case "whatsapp":

                novoValor =
                    somenteNumeros(
                        novoValor
                    ).slice(0, 11);

                break;

            case "cep":

                novoValor =
                    somenteNumeros(
                        novoValor
                    ).slice(0, 8);

                break;

            default:
                break;
        }

        onChange(novoValor);
    }
    if (campo === "sexo") {

        return (
            <>
                <input
                    type="text"
                    list="sexoLista"
                    className="igInputCampoPrincipal"
                    value={valor || ""}
                    onChange={alterarValor}
                    placeholder="Selecione"
                />

                <datalist id="sexoLista">
                    <option value="Masculino" />
                    <option value="Feminino" />
                    <option value="Prefiro não informar" />
                </datalist>
            </>
        );
    }
    if (campo === "estado_civil") {

        return (
            <>
                <input
                    type="text"
                    list="estadoCivilLista"
                    className="igInputCampoPrincipal"
                    value={valor || ""}
                    onChange={alterarValor}
                    placeholder="Selecione"
                />

                <datalist id="estadoCivilLista">
                    <option value="Solteiro(a)" />
                    <option value="Casado(a)" />
                    <option value="Divorciado(a)" />
                    <option value="Separado(a)" />
                    <option value="Viúvo(a)" />
                    <option value="União Estável" />
                    <option value="Companheiro(a)" />
                    <option value="Prefiro não informar" />
                </datalist>
            </>
        );
    }
    if (campo === "nacionalidade") {

        return (
            <>
                <input
                    type="text"
                    list="nacionalidadeLista"
                    className="igInputCampoPrincipal"
                    value={valor || ""}
                    onChange={alterarValor}
                    placeholder="Digite ou selecione"
                />

                <datalist id="nacionalidadeLista">
                    <option value="Brasileira" />
                    <option value="Argentina" />
                    <option value="Boliviana" />
                    <option value="Chilena" />
                    <option value="Colombiana" />
                    <option value="Paraguaia" />
                    <option value="Peruana" />
                    <option value="Uruguaia" />
                    <option value="Venezuelana" />
                    <option value="Equatoriana" />
                    <option value="Mexicana" />
                    <option value="Canadense" />
                    <option value="Estadunidense" />
                    <option value="Portuguesa" />
                    <option value="Espanhola" />
                    <option value="Francesa" />
                    <option value="Italiana" />
                    <option value="Alemã" />
                    <option value="Britânica" />
                    <option value="Irlandesa" />
                    <option value="Holandesa" />
                    <option value="Belga" />
                    <option value="Suíça" />
                    <option value="Sueca" />
                    <option value="Norueguesa" />
                    <option value="Dinamarquesa" />
                    <option value="Finlandesa" />
                    <option value="Polonesa" />
                    <option value="Ucraniana" />
                    <option value="Russa" />
                    <option value="Turca" />
                    <option value="Israelense" />
                    <option value="Saudita" />
                    <option value="Egípcia" />
                    <option value="Sul-Africana" />
                    <option value="Nigeriana" />
                    <option value="Marroquina" />
                    <option value="Indiana" />
                    <option value="Paquistanesa" />
                    <option value="Chinesa" />
                    <option value="Japonesa" />
                    <option value="Coreana" />
                    <option value="Tailandesa" />
                    <option value="Filipina" />
                    <option value="Australiana" />
                    <option value="Neozelandesa" />
                </datalist>
            </>
        );
    }
    if (campo === "possui_cnh") {

        return (
            <>
                <input
                    type="text"
                    list="cnhLista"
                    className="igInputCampoPrincipal"
                    value={valor || ""}
                    onChange={alterarValor}
                    placeholder="Selecione"
                />

                <datalist id="cnhLista">
                    <option value="Não possuo CNH" />
                    <option value="CNH A" />
                    <option value="CNH B" />
                    <option value="CNH AB" />
                    <option value="CNH C" />
                    <option value="CNH D" />
                    <option value="CNH E" />
                    <option value="CNH ACC" />
                    <option value="CNH ACC + B" />
                </datalist>
            </>
        );
    }
    if (campo === "disponibilidade") {

        return (
            <>
                <input
                    type="text"
                    list="disponibilidadeLista"
                    className="igInputCampoPrincipal"
                    value={valor || ""}
                    onChange={alterarValor}
                    placeholder="Selecione"
                />

                <datalist id="disponibilidadeLista">
                    <option value="Presencial" />
                    <option value="Híbrido" />
                    <option value="Remoto" />

                </datalist>
            </>
        );
    }
    if (campo === "data_nascimento") {

        const hoje = new Date();

        const dataMinima = new Date(
            hoje.getFullYear() - 18,
            hoje.getMonth(),
            hoje.getDate()
        );

        const maxDate =
            dataMinima
                .toISOString()
                .split("T")[0];

        return (
            <input
                type="date"
                className="igInputCampoPrincipal"
                value={valor || ""}
                max={maxDate}
                onChange={alterarValor}
            />
        );
    }
    return (
        <input
            type="text"
            className="igInputCampoPrincipal"
            value={valorExibido()}
            placeholder={placeholder}
            onChange={alterarValor}
        />
    );
}