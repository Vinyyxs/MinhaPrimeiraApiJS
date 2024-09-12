document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('#formularioInscricao');

    formulario.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o comportamento padrao de envio do formulario

        // Pega os dados do formulario
        const nome = document.querySelector('#nome').value;
        const email = document.querySelector('#email').value;
        const idade = document.querySelector('#idade').value;

        // Aparece as informacoes no console
        console.log(`Nome: ${nome}`);
        console.log(`Email: ${email}`);
        console.log(`Idade: ${idade}`);
        
    });
});