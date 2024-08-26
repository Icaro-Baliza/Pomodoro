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

let tarefas: Tarefa[] = localStorageTarefas ? JSON.parse(localStorageTarefas) : [];

let tarefaSelecionada: Tarefa | null = null;
let liTarefaSelecionado: HTMLLIElement | null = null;

function createTask(tarefa: Tarefa): HTMLLIElement {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const icon = document.createElement('svg');
    icon.innerHTML = taskIcon;

    const paragraph = document.createElement('p');
    paragraph.classList.add('app__section-task-list-item-description');
    paragraph.textContent = tarefa.descricao;

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    botao.onclick = () => {
        const novaDescricao = prompt('Novo nome da tarefa:');
        if (novaDescricao) {
            paragraph.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            updateLocalStorage();
        }
    };

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png');
    botao.append(imagemBotao);

    li.appendChild(icon);
    li.appendChild(paragraph);
    li.appendChild(botao);

    if (tarefa.concluida) {
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'true');
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active').forEach((item) => {
                item.classList.remove('app__section-task-list-item-active');
            });

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

tarefas.forEach((task) => {
    const taskItem = createTask(task);
    taskListContainer.appendChild(taskItem);
});

toggleFormTaskBtn.addEventListener('click', () => {
    formLabel.textContent = 'Adicionando tarefa';
    formTask.classList.toggle('hidden');
});

toggleFormCancelBtn.addEventListener('click', () => {
    formTask.classList.toggle('hidden');
    textArea.value = '';
});

toggleFormDeleteBtn.addEventListener('click', () => {
    textArea.value = '';
});

const updateLocalStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
};

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