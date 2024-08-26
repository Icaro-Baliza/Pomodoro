# Pomodoro - Gerenciamento de Tempo e Atividades

## Descrição do Projeto

Este é um projeto de gerenciamento de tempo baseado na técnica Pomodoro, desenvolvido para ajudar na gestão de atividades diárias. A aplicação permite ao usuário adicionar, ativar, editar e excluir tarefas, oferecendo uma interface dinâmica e interativa. As tarefas são armazenadas no `localStorage`, garantindo que os dados sejam preservados mesmo após o encerramento da sessão. Além disso, o projeto inclui funcionalidades para personalização de texto, cores e imagens, tornando a experiência do usuário mais envolvente.

### Funcionalidades Principais

1. **Adição de Tarefa:** Permite adicionar novas tarefas, que serão listadas no site e salvas no `localStorage`.
2. **Ativação de Tarefa:** Ao clicar em uma tarefa, ela é marcada como "em andamento", e o cronômetro Pomodoro é ativado para a tarefa selecionada.
3. **Edição de Atividade:** As tarefas podem ser editadas, permitindo ajustes no nome ou descrição da atividade.
4. **Exclusão de Atividades:** As tarefas podem ser excluídas individualmente, em conjunto, ou apenas as tarefas concluídas.
5. **Cronômetro Personalizável:** A aplicação inclui um cronômetro com três botões que permitem ao usuário selecionar o propósito do período: **Foco**, **Descanso** ou **Descanso Longo**. Cada modo altera o layout do site e toca uma música específica, criando uma atmosfera adequada para cada tipo de atividade.

A aplicação também conta com recursos de personalização, como a alteração de texto, cores e imagens, que aprimoram a experiência do usuário.

## Como Executar a Aplicação

Para executar a aplicação localmente, siga os passos abaixo:

1. Certifique-se de que o TypeScript esteja instalado em sua máquina.
2. No terminal, navegue até o diretório do projeto.
3. Execute o comando `tsc` para compilar os arquivos TypeScript.
4. Utilize uma ferramenta como o **Live Server** ou qualquer outra biblioteca para executar o projeto localmente e visualizar o site em seu navegador.

## Tecnologias Utilizadas

- **HTML:** Estrutura e marcação do conteúdo da página.
- **CSS:** Estilização e design da interface do usuário.
- **TypeScript:** Lógica do projeto e funcionalidades do Pomodoro.
- **Node.js:** Suporte ao ambiente de desenvolvimento e execução de scripts.

## Possíveis Melhorias Futuras

1. **Método Kanban para Gestão de Tarefas:** Implementar um sistema de categorização das tarefas, como "A Fazer", "Em Desenvolvimento", "Processo de Correção" e "Concluída", além de filtros para facilitar a organização.
2. **Mini Game na Aba de Descanso:** Adicionar um mini game para o período de descanso, tornando o tempo de pausa mais interativo e relaxante.
3. **Escolha do Período de Descanso:** Permitir que o usuário personalize o tempo de descanso entre as sessões de trabalho.
4. **Banco de Dados Hospedado:** Substituir o `localStorage` por um banco de dados hospedado, permitindo armazenamento de tarefas em longo prazo e acesso em múltiplos dispositivos.
5. **Autenticação de Usuários:** Implementar um sistema de login, permitindo que cada usuário tenha acesso a suas próprias tarefas e personalizações.
