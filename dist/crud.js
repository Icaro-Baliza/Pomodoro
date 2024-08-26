"use strict";
const taskListContainer = document.querySelector('.app__section-task-list');
const formTask = document.querySelector('.app__form-add-task');
const toggleFormTaskBtn = document.querySelector('.app__button--add-task');
const toggleFormCancelBtn = document.querySelector('.app__form-footer__button--cancel');
const toggleFormDeleteBtn = document.querySelector('.app__form-footer__button--delete');
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const btnRemoverTodas = document.querySelector('#btn-remover-todas');
const formLabel = document.querySelector('.app__form-label');
const textArea = document.querySelector('.app__form-textarea');
const localStorageTarefas = localStorage.getItem('tarefas');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');
const taskIcon = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`;
let tarefas = localStorageTarefas ? JSON.parse(localStorageTarefas) : [];
let tarefaSelecionada = null;
let liTarefaSelecionado = null;
function createTask(tarefa) {
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
    }
    else {
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
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
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
    formTask.classList.add('hidden');
});
document.addEventListener('FocoFinalizado', () => {
    var _a;
    if (tarefaSelecionada && liTarefaSelecionado) {
        liTarefaSelecionado.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionado.classList.add('app__section-task-list-item-complete');
        (_a = liTarefaSelecionado === null || liTarefaSelecionado === void 0 ? void 0 : liTarefaSelecionado.querySelector('button')) === null || _a === void 0 ? void 0 : _a.setAttribute('disabled', 'true');
        tarefaSelecionada.concluida = true;
        updateLocalStorage();
    }
});
const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item";
    document.querySelectorAll(seletor).forEach(item => {
        item.remove();
    });
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.concluida) : [];
    updateLocalStorage();
};
btnRemoverConcluidas.onclick = () => removerTarefas(true);
btnRemoverTodas.onclick = () => removerTarefas(false);
