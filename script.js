document.getElementById('meuFormulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const dataNascimento = document.getElementById('dob');

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

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('meuFormulario');
    const peopleTable = document.getElementById('tabelaDados').getElementsByTagName('tbody')[0];

    // Função para carregar pessoas do localStorage
    function loadPeople() {
        const savedPeople = localStorage.getItem('people');
        if (savedPeople) {
            const peopleList = JSON.parse(savedPeople); // Converte de volta para um array de objetos
            peopleList.forEach(person => {
                addPersonToTable(person.name, person.email, person.dob);
            });
        }
    }

    // Função para adicionar uma pessoa na tabela
    function addPersonToTable(name, email, dob) {
        const newRow = peopleTable.insertRow();
        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);
        const dobCell = newRow.insertCell(2);
        nameCell.textContent = name;
        emailCell.textContent = email;
        dobCell.textContent = dob;

    }

    // Carrega as pessoas salvas ao iniciar a página
    loadPeople();

    // Função que salva uma pessoa no localStorage
    function savePerson(name, email, dob) {
        const savedPeople = localStorage.getItem('people');
        const peopleList = savedPeople ? JSON.parse(savedPeople) : []; // Converte ou cria uma lista nova
        peopleList.push({ name, email, dob }); // Adiciona nova pessoa
        localStorage.setItem('people', JSON.stringify(peopleList)); // Salva a lista atualizada
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita o envio do formulário

        const nameInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const dobInput = document.getElementById('dob');

        const name = nameInput.value.trim();
        const email = emailInput.value;
        const dob = dobInput.value;

        // Limpa as mensagens de erro personalizadas
        nameInput.setCustomValidity('');
        emailInput.setCustomValidity('');
        dobInput.setCustomValidity('');

        // Validações personalizadas
        const nameRegex = /^[A-Za-zÀ-ÿ]+$/;
        if (name === '') {
            nameInput.setCustomValidity('O campo Nome não pode estar vazio.');
        } else if (name.length < 3 || name.length > 120) {
            nameInput.setCustomValidity('O Nome deve ter entre 3 e 120 caracteres.');
        } else if (!nameRegex.test(name)) {
            nameInput.setCustomValidity('O Nome deve conter apenas letras.');
        }

        if (!dob) {
            dobInput.setCustomValidity('O campo Data de Nascimento não pode estar vazio.');
        }

        // Se o formulário for válido, salva os dados e adiciona à tabela
        if (form.checkValidity()) {
            console.log('Nome:', name);
            console.log('Email:', email);
            console.log('Data de Nascimento:', dob);

            // Adiciona a pessoa à tabela
            addPersonToTable(name, email, dob);

            // Salva a pessoa no localStorage
            savePerson(name, email, dob);

            // Limpa o formulário
            form.reset();
        } else {
            console.log('Existem erros no formulário.');
        }
    });
});