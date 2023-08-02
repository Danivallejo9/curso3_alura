export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) { //verificar si en validadores existe un tipoDeInput
      validadores[tipoDeInput](input);
    }
    
    if(input.validity.valid) { //esto es para que se resalte el campo de rojo si no se diligencia
        input.parentElement.classList.remove("input-container--invalid") //si es válido no la muestra
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
  }

  const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
  ]

  const mensajesDeError = {
    nombre: {
        valueMissing: "El nombre es obligatorio"
    }, 
    email: {
        valueMissing: "El correo es obligatorio",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "La contraseña es obligatoria",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "La fecha de nacimiento es obligatoria",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "El número de teléfono es obligatorio",
        patternMismatch: "El número de teléfono no es válido (xxxxxxxxxx)"
    },
    direccion: {
        valueMissing: "La dirección es obligatoria",
        patternMismatch: "La dirección no es válida, se requiere entre 10-40 caracteres"
    },
    ciudad: {
        valueMissing: "La ciudad es obligatoria",
        patternMismatch: "La ciudad no es válida, se requiere entre 4-30 caracteres"
    },
    estado: {
        valueMissing: "El estado es obligatorio",
        patternMismatch: "El estado no es válido, se requiere entre 4-30 caracteres"
    }
  }

const validadores = { //es un objeto
    nacimiento: input => validarNacimineto(input)
}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimineto(input) {
    const fechaUsuario = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaUsuario)) {
        mensaje = "Debes tener al menos 18 añños de edad"
    }
    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, //la fecha que está ingresando el usuario, se le suman 18 años
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return diferenciaFechas < fechaActual;

}