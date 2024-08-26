const html = document.querySelector('html') as HTMLElement;
const buttonFoco = document.querySelector('.app__card-button--foco') as HTMLButtonElement;
const buttonCurto = document.querySelector('.app__card-button--curto') as HTMLButtonElement;
const buttonLongo = document.querySelector('.app__card-button--longo') as HTMLButtonElement;
const buttons = document.querySelectorAll('.app__card-button') as NodeListOf<HTMLButtonElement>;
const banner = document.querySelector('.app__image') as HTMLImageElement;
const titulo = document.querySelector('.app__title') as HTMLHeadingElement;
const musicaFocoInput = document.getElementById('alternar-musica') as HTMLInputElement;
const buttonStart = document.querySelector('#start-pause') as HTMLButtonElement;
const iniciarOuPausar = buttonStart.childNodes[3] as HTMLElement;
const imgIniciarOuPausar = buttonStart.childNodes[1] as HTMLImageElement;
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const tempoNaTela = document.getElementById('timer') as HTMLElement;
const somFinalizado = new Audio('./sons/beep.mp3');
const somPause = new Audio('./sons/pause.mp3');
const somPlay = new Audio('./sons/play.wav');

musica.loop = true;

let tempo: number = 1500;
let tempoAtual: number = tempo;
let intervaloId:  any = null;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

//Ativação do Botão de foco, alterando as informações correspondentes
buttonFoco.addEventListener('click', () => {
    tempo = 1500;
    tempoAtual= tempo;
    alterarContexto('foco');
    buttonFoco.classList.add('active');
});

//Ativação do Botão de descanso, alterando as informações correspondentes
buttonCurto.addEventListener('click', () => {
    tempo = 300;
    tempoAtual= tempo;
    alterarContexto('descanso-curto');
    buttonCurto.classList.add('active');
});

//Ativação do Botão de descanso longo, alterando as informações correspondentes
buttonLongo.addEventListener('click', () => {
    tempo = 900;
    tempoAtual= tempo;
    alterarContexto('descanso-longo');
    buttonLongo.classList.add('active');
});

//Altera o layout do site a depender do botão clicado
function alterarContexto(contexto: string): void {
    mostrarTempo();
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `../imagens/${contexto}.png`);
    buttons.forEach((btn) => {
        btn.classList.remove('active');
    });
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}

const contagemRegressiva = (): void => {
    if (tempoAtual <= 0) {
        parar();
        const focoAtivo = html.getAttribute('data-contexto') === 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        iniciarOuPausar.textContent = 'Começar';
        imgIniciarOuPausar.setAttribute('src', '../imagens/play_arrow.png');
        tempoAtual = tempo;
        setTimeout(() => {
            mostrarTempo();
        }, 6500);
        return;
    }
    tempoAtual--;
    mostrarTempo();
};

//Botão para iniciar ou pausar o tempo do cronometro
function iniciar_pausar(): void {
    
    //Caso esteja rodando
    if (intervaloId) {
        somPause.play();
        parar();
        iniciarOuPausar.textContent = 'Retomar';
        imgIniciarOuPausar.setAttribute('src', '../imagens/play_arrow.png');
        return;
    }
    //Retoma o cronometro
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausar.textContent = 'Pausar';
    imgIniciarOuPausar.setAttribute('src', '../imagens/pause.png');
}

buttonStart.addEventListener('click', () => {
    iniciar_pausar();
});

//Função para parar o cronometro
function parar(): void {
    if (intervaloId) {
        clearInterval(intervaloId);
        intervaloId = null;
    }
}

//Mostra o tempo na tela
function mostrarTempo(): void {
    const tempoEmHoras = new Date(tempoAtual * 1000);
    const tempoFormatado = tempoEmHoras.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
