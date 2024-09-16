document.getElementById('meuFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const dataNascimento = document.getElementById('dataNascimento');

    let valid = true; // Para acompanhar se tudo está válido

    // Validação do nome
    if (nome.validity.valueMissing) {
        nome.setCustomValidity("Por favor, insira seu nome.");
        valid = false;
    } else if (nome.validity.tooShort) {
        nome.setCustomValidity("O nome deve ter pelo menos 3 letras.");
        valid = false;
    } else if (nome.validity.patternMismatch) {
        nome.setCustomValidity("O nome deve conter apenas letras.");
        valid = false;
    } else {
        nome.setCustomValidity("");
    }

    // Validação do email
    if (email.validity.valueMissing) {
        email.setCustomValidity("Por favor, insira seu email.");
        valid = false;
    } else if (email.validity.patternMismatch) {
        email.setCustomValidity("Por favor, insira um email válido.");
        valid = false;
    } else {
        email.setCustomValidity("");
    }

    // Validação da data de nascimento
    if (dataNascimento.validity.valueMissing) {
        dataNascimento.setCustomValidity("Por favor, insira sua data de nascimento.");
        valid = false;
    } else if (dataNascimento.validity.patternMismatch) {
        dataNascimento.setCustomValidity("A data deve estar no formato DD/MM/AAAA.");
        valid = false;
    } else {
        dataNascimento.setCustomValidity("");
    }

    // Se tudo estiver válido, mostre os resultados no console
    if (valid && nome.checkValidity() && email.checkValidity() && dataNascimento.checkValidity()) {
        console.log(`Nome: ${nome.value}`);
        console.log(`Email: ${email.value}`);
        console.log(`Data de Nascimento: ${dataNascimento.value}`);
        
        alert("Formulário enviado com sucesso!"); // Pop-up de sucesso
    } else {
        // Mostra erros em um pop-up
        alert("Por favor, corrija os erros no formulário.");
        
    }
});
