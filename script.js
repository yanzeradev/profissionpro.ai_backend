// Função para enviar a pergunta
function sendQuestion() {
    const pergunta = document.getElementById('input').value.trim();
    
    if (pergunta === "") {
        alert("Por favor, digite uma pergunta.");
        return;
    }
    
    // Remove a mensagem de boas-vindas, se existir
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }

    const chat = document.getElementById('chat');
    
    // Exibe a pergunta do usuário
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message-container';
    userMessageDiv.innerHTML = `
        <div class="user-message">Você:</div>
        <div class="message">${pergunta}</div>`;
    chat.appendChild(userMessageDiv);

    // Exibe a mensagem "respondendo..." e desabilita o botão de enviar
    const respondendoDiv = document.createElement('div');
    respondendoDiv.className = 'message-container';
    respondendoDiv.innerHTML = `
        <div class="bot-message">ProfissionPro.AI:</div>
        <div class="message">Respondendo...</div>`;
    chat.appendChild(respondendoDiv);
    
    const sendButton = document.getElementById('send');
    sendButton.disabled = true;

    // Rola para o final do chat
    chat.scrollTop = chat.scrollHeight;

    fetch('https://web-production-0db1.up.railway.app/pergunta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pergunta: pergunta })
    })
    .then(response => response.json())
    .then(data => {
        // Remove a mensagem "respondendo..."
        respondendoDiv.remove();

        // Exibe a resposta do chatbot
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'message-container';
        botMessageDiv.innerHTML = `
            <div class="bot-message">ProfissionPro.AI:</div>
            <div class="message">${data.resposta}</div>`;
        chat.appendChild(botMessageDiv);
        
        document.getElementById('input').value = '';
        chat.scrollTop = chat.scrollHeight;
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Houve um erro ao enviar a pergunta.");
    })
    .finally(() => {
        sendButton.disabled = false;
    });
}

// Evento de clique no botão Enviar
document.getElementById('send').addEventListener('click', sendQuestion);

// Evento de pressionar Enter no campo de input
document.getElementById('input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendQuestion();
    }
});

// Função para criar uma nova conversa
function newChat() {
    const chat = document.getElementById('chat');
    chat.innerHTML = `
        <div id="welcome-message" class="message-container">
            <div class="bot-message">ProfissionPro.AI:</div>
            <div class="message">Olá! Sou o assistente ProfissionPro.AI. Como posso ajudar você hoje com questões relacionadas a profissões e carreira?</div>
        </div>`;
    document.getElementById('input').value = '';
}

// Evento de clique no botão Nova Conversa
document.getElementById('new-chat').addEventListener('click', newChat);
