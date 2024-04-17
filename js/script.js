import ehUmCpf from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

const camposDoFormulario = document.querySelectorAll('[required]');
const btnEnviar = document.querySelector('#enviar');
const btnTermos = document.querySelector('[name="termos"]');
const formulario = document.querySelector('[data-formulario]');

camposDoFormulario.forEach((campo) => {
    campo.addEventListener('blur', () => verificaCampo(campo));
    campo.addEventListener('invalid', (evento) => evento.preventDefault());
})

btnEnviar.addEventListener('click', () => {
     camposDoFormulario.forEach((campo) => verificaCampo(campo));
})

btnTermos.addEventListener('change', () => verificaCampo(btnTermos));

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    console.log(evento.target.elements);
    const usuario = {
        nome: evento.target.elements['nome'].value,
        email: evento.target.elements['email'].value,
        rg: evento.target.elements['rg'].value,
        cpf: evento.target.elements['cpf'].value,
        aniversario: evento.target.elements['aniversario'].value,
    }

    localStorage.setItem('cadastro', JSON.stringify(usuario));
    window.location.href = '../pages/abrir-conta-form-2.html';
});

const tiposDeErro = [
    'customError',
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um e-mail válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo) {
    let mensagem = '';
    campo.setCustomValidity('');

    if(campo.name == 'cpf' && campo.value.length >= 11) {
        ehUmCpf(campo);
    } else if(campo.name == 'aniversario' && campo.value != "") {
        ehMaiorDeIdade(campo);
    }

    tiposDeErro.forEach((erro) => {
        if(campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    mensagemErro.textContent = mensagem;
    // const validadorDeInput = campo.checkValidity();

    // if(!validadorDeInput) {
    //     mensagemErro.textContent = mensagem;
    // } else {
    //     mensagemErro.textContent = "";
    // }
}

// function registraUsuario() {
//     const usuario = {};
//     camposDoFormulario.forEach((campo) => {
//         if(campo.name == 'termos'){
//             return;
//         }
//         usuario[campo.name] = campo.value;
//     })

//     usuarios.push(usuario);
//     localStorage.setItem('usuarios', JSON.stringify(usuarios));
// }


