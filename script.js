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

    localStorage.removeItem('people');

    function loadPeople() {
        const savedPeople = localStorage.getItem('people');
        if (savedPeople) {
            const peopleList = JSON.parse(savedPeople);
            peopleList.forEach(person => {
                addPersonToTable(person.name, person.email, person.dob);
            });
        }
    }

    function addPersonToTable(name, email, dob) {
        const newRow = peopleTable.insertRow();
        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);
        const dobCell = newRow.insertCell(2);
        const actionCell = newRow.insertCell(3);

        nameCell.textContent = name;
        emailCell.textContent = email;
        dobCell.textContent = dob;

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        actionCell.appendChild(editButton);

        editButton.addEventListener('click', function () {
            const newName = prompt("Atualize o nome:", nameCell.textContent);
            const newEmail = prompt("Atualize o email:", emailCell.textContent);
            const newDob = prompt("Atualize a data de nascimento:", dobCell.textContent);

            if (newName) nameCell.textContent = newName;
            if (newEmail) emailCell.textContent = newEmail;
            if (newDob) dobCell.textContent = newDob;

            updateLocalStorage(); // Atualiza o localStorage após a edição
        });
    }

    function savePerson(name, email, dob) {
        const savedPeople = localStorage.getItem('people');
        const peopleList = savedPeople ? JSON.parse(savedPeople) : [];
        peopleList.push({ name, email, dob });
        localStorage.setItem('people', JSON.stringify(peopleList));
    }

    function updateLocalStorage() {
        const updatedPeople = [];
        for (let i = 0; i < peopleTable.rows.length; i++) {
            const row = peopleTable.rows[i];
            updatedPeople.push({
                name: row.cells[0].textContent,
                email: row.cells[1].textContent,
                dob: row.cells[2].textContent
            });
        }
        localStorage.setItem('people', JSON.stringify(updatedPeople));
    }

    loadPeople();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value;
        const dob = document.getElementById('dob').value;

        if (form.checkValidity()) {
            addPersonToTable(name, email, dob);
            savePerson(name, email, dob);
            form.reset();
        } else {
            alert("Por favor, corrija os erros no formulário.");
        }
    });
});