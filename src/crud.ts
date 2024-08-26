interface Tarefa {
    descricao: string;
    concluida: boolean;
}

const taskListContainer = document.querySelector('.app__section-task-list') as HTMLElement;
const formTask = document.querySelector('.app__form-add-task') as HTMLFormElement;
const toggleFormTaskBtn = document.querySelector('.app__button--add-task') as HTMLButtonElement;
const toggleFormCancelBtn = document.querySelector('.app__form-footer__button--cancel') as HTMLButtonElement;
const toggleFormDeleteBtn = document.querySelector('.app__form-footer__button--delete') as HTMLButtonElement;
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas') as HTMLButtonElement;
const btnRemoverTodas = document.querySelector('#btn-remover-todas') as HTMLButtonElement;
const formLabel = document.querySelector('.app__form-label') as HTMLLabelElement;
const textArea = document.querySelector('.app__form-textarea') as HTMLTextAreaElement;
const localStorageTarefas = localStorage.getItem('tarefas');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description') as HTMLParagraphElement;

const taskIcon = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`;

//Lista de tarefas
    //Caso não esteja vazio, passa a string no Json para uma array
    //Caso esteja vazio, cria uma lista vazia
let tarefas: Tarefa[] = localStorageTarefas ? JSON.parse(localStorageTarefas) : [];

let tarefaSelecionada: Tarefa | null = null;
let liTarefaSelecionado: HTMLLIElement | null = null;

//Função responsavel pela criação de tarefas
function createTask(tarefa: Tarefa): HTMLLIElement {
    //Cria um elemento li para a tarefa ser adicionado posteriormente
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    
    const icon = document.createElement('svg');
    icon.innerHTML = taskIcon;

    //Cria um elemento p para mostrar a descrição da tarefa
    const paragraph = document.createElement('p');
    paragraph.classList.add('app__section-task-list-item-description');
    paragraph.textContent = tarefa.descricao;

    //Botão de edição da tarefa
    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    //Adiciona o onclick desse botão, para possibilidade de alteração
    botao.onclick = () => {
        const novaDescricao = prompt('Novo nome da tarefa:');
        if (novaDescricao) {
            paragraph.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            //Atualiza no localStorage a nova descrição da tarefa
            updateLocalStorage();
        }
    };

    //Cria elemento HTML para ser adicionado no site
    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png');
    botao.append(imagemBotao);

    li.appendChild(icon);
    li.appendChild(paragraph);
    li.appendChild(botao);

    //Caso a tarefa esteja concluida, altera o layout dessa tarefa (definido no css)
    if (tarefa.concluida) {
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'true');
    } else {
        //Adiciona onClick na tarefa para ser adicionada na aba de "em andamento"
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active').forEach((item) => {
                item.classList.remove('app__section-task-list-item-active');
            });

            //Caso a tarefa clicada seja a que está em andamento, remove a tarefa de em andamento
            if (tarefaSelecionada === tarefa) {
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionado = null;
                return;
            }

            tarefaSelecionada = tarefa;
            liTarefaSelecionado = li;

            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
            li.classList.add('app__section-task-list-item-active');
        };
    }

    return li;
}
//Adiciona as tarefas na tela
tarefas.forEach((task) => {
    const taskItem = createTask(task);
    taskListContainer.appendChild(taskItem);
});

//Botão para adicionar tarefa
toggleFormTaskBtn.addEventListener('click', () => {
    formLabel.textContent = 'Adicionando tarefa';
    formTask.classList.toggle('hidden');
});

//Botão para cancelar a adição de tarefa
toggleFormCancelBtn.addEventListener('click', () => {
    formTask.classList.toggle('hidden');
    textArea.value = '';
});

//Botão para remover a descrição da tarefa digitada
toggleFormDeleteBtn.addEventListener('click', () => {
    textArea.value = '';
});

//Atualiza o localStorage
const updateLocalStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
};

//Ao concluir o submit, a tarefa é adicionada
formTask.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = {
        descricao: textArea.value,
        concluida: false
    };
    tarefas.push(task);
    const taskItem = createTask(task);
    taskListContainer.appendChild(taskItem);

    updateLocalStorage();
    textArea.value = '';
    formTask.classList.add('hidden')
});

//Quando o cronometro for finalizado, garante a conclusão da tarefa
document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionado) {
        liTarefaSelecionado.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionado.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionado?.querySelector('button')?.setAttribute('disabled', 'true')
        tarefaSelecionada.concluida = true
        updateLocalStorage()
    }
} )


const removerTarefas = (somenteCompletas: boolean) => {
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    document.querySelectorAll(seletor).forEach(item => {
        item.remove()
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.concluida) : []
    updateLocalStorage()
}

btnRemoverConcluidas.onclick = () => removerTarefas(true)

btnRemoverTodas.onclick = () => removerTarefas(false)