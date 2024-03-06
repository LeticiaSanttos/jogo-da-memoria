const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

//Voltar para pag de login
function go_to_login(){
    window.location = 'game.html'
}

//nome das cartas
const characters = [
'eleven',
'mike',
'steve',
'dustin',
'max'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length == 10){
        //para o timer
        clearInterval(this.loop)
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}s`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter === secondCharacter){

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
  
        firstCard = '';
        secondCard = '';

        checkEndGame();
    }else{
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            
            firstCard = '';
            secondCard = '';

        }, 600);
    }
}

const revealCard = ({target}) => {

    if(target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if(firstCard == ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }else if(secondCard == ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
    
}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    //data-(nome) é usado para criar um atributo qualquer para o elemento;
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {

    const duplicateCharacteres = [...characters, ...characters ];

    const shuffledArray = duplicateCharacteres.sort(() => Math.random() - 0.5);
    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () => {
    this.loop = setInterval(() => {
       const currentTime = Number(timer.innerHTML);
       timer.innerHTML = currentTime + 1;
    }, 1000)
}

window.onload = () => {
  const playerName = localStorage.getItem('player');
  spanPlayer.innerHTML = 'Player: '+playerName;  
  startTimer();
  loadGame();
}