// const inputnacimiento = document.querySelector("#birth");

// inputnacimiento.addEventListener("blur", (evento)=>{
//     validarNacimiento(evento.target);
// })

export function valida(input){
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML ="";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = 
        mostrarMensajeDeError(tipoInput,input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío",
      },
      email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido",
      },
      password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch:"Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
      },
      nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
      },
      numero: {
        valueMissing: "El campo telefono no puede estar vacío",
        patternMismatch: "El formato requerido es de 10 caracteres"
      },
      direccion: {
        valueMissing: "El campo direccion no puede estar vacío",
        patternMismatch: "El formato (direccion) requerido de al menos 10 caracteres y maximo 50"
      },
      ciudad: {
        valueMissing: "El campo ciudad no puede estar vacío",
        patternMismatch: "El formato (ciudad) requerido de al menos 10 caracteres y maximo 50"
      },
      estado: {
        valueMissing: "El campo estado no puede estar vacío",
        patternMismatch: "El formato (estado) requerido de al menos 10 caracteres y maximo 50"
      },
};

const validadores ={
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput,input){
    let mensaje ="";
    tipoDeErrores.forEach (error =>{
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input){
    const fechaUsuario = new Date(input.value);
    mayorDeEdad(fechaUsuario);

    let mensaje="";
    if(!mayorDeEdad(fechaUsuario)){
        mensaje ="Edad minima de 18 años para registrarse";
    }
    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha){
    const fechaActual= new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}