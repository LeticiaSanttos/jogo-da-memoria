const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');

const validateInput = ({target}) => {
 if (target.value.length > 2) {
    button.removeAttribute('disabled');
    button.style.cursor = 'pointer';
    return; 
}
 button.setAttribute('disabled', '');
 button.style.cursor = 'default';
}

const handleSubmit = (event) =>{
    //impede que o form recarregue após enviar os dados.
    event.preventDefault();
    //salva os dados no localstorage
    localStorage.setItem('player', input.value);
    //redireciona o site pra outra pagina
    window.location = 'pages/game.html';    
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);