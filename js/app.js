import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input"); //se seleccionan todos los input del html, lo que va a regresar es un arreglo

inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});