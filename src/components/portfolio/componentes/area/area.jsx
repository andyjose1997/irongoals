import { useLocation } from "react-router-dom";

import Desempenho from "./componentes/desempenho/desempenho";
import Infos from "./componentes/infos/infos";
import Experiencias from "./componentes/experiencias/experiencias";
import Formacao from "./componentes/formacao/formacao";
import Habilidades from "./componentes/hablilidades/hablilidades";
import Configuracoes from "./componentes/configuracoes/configuracoes";
import Idiomas from "./componentes/idiomas/idiomas";

export default function Area() {

    const location = useLocation();

    const rota = location.pathname
        .replace("/portfolio/", "");

    switch (rota) {

        case "desempenho":
            return <Desempenho />;

        case "infos":
            return <Infos />;

        case "experiencias":
            return <Experiencias />;

        case "formacao":
            return <Formacao />;

        case "habilidades":
            return <Habilidades />;
        case "idiomas":
            return <Idiomas />;

        case "configuracoes":
            return <Configuracoes />;

        default:
            return <Desempenho />;
    }
}