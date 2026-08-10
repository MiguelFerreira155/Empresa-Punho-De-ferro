// Função para alternar entre as abas principais
function mostrar(id) {
    let secoes = document.querySelectorAll(".conteudo");

    secoes.forEach(secao => {
        secao.style.display = "none";
    });

    document.getElementById(id).style.display = "block";
}

// Inicializa mostrando a seção 'empresa'
mostrar("empresa");

// Função para buscar o endereço via CEP (API ViaCEP)
function buscarCEP() {
    let cepInput = document.getElementById("cep").value;
    let cep = cepInput.replace(/\D/g, ''); // Remove qualquer caractere não numérico

    if (cep.length === 8) {
        let url = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert("CEP não encontrado!");
                    limparFormularioEndereco();
                } else {
                    document.getElementById("rua").value = data.logradouro;
                    document.getElementById("bairro").value = data.bairro;
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("uf").value = data.uf;
                }
            })
            .catch(error => {
                console.error("Erro ao buscar o CEP:", error);
                alert("Erro ao consultar o CEP.");
            });
    } else if (cep.length > 0) {
        alert("Formato de CEP inválido!");
        limparFormularioEndereco();
    }
}

function limparFormularioEndereco() {
    document.getElementById("rua").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("uf").value = "";
}

// Abrir e fechar a janela do Chatbot
function toggleChat() {
    let chat = document.getElementById("chat-container");
    if (chat.style.display === "flex") {
        chat.style.display = "none";
    } else {
        chat.style.display = "flex";
    }
}

// Respostas pré-programadas do Chatbot
function responderBot(opcao) {
    let chatMessages = document.getElementById("chat-messages");
    let userMsg = document.createElement("div");
    let botMsg = document.createElement("div");

    userMsg.className = "message user";
    botMsg.className = "message bot";

    if (opcao === 'planos') {
        userMsg.innerText = "Planos e Preços";
        botMsg.innerText = "Nossos planos começam a partir de R$ 89,90/mês no Plano Mensal, e R$ 69,90/mês no Plano Anual com acesso livre!";
    } else if (opcao === 'horarios') {
        userMsg.innerText = "Horário de Funcionamento";
        botMsg.innerText = "Segunda a Sexta: 06h às 23h\nSábados: 08h às 18h\nDomingos e Feriados: 09h às 13h";
    } else if (opcao === 'modalidades') {
        userMsg.innerText = "Modalidades";
        botMsg.innerText = "Oferecemos Musculação, Cardio, Cross Training, Dança e Pilates. Tudo incluso dependendo do seu plano!";
    } else if (opcao === 'atendente') {
        userMsg.innerText = "Falar com Atendente";
        botMsg.innerText = "Para falar diretamente com nossa equipe no WhatsApp, chame no número: (11) 99999-9999.";
    }

    chatMessages.appendChild(userMsg);
    
    setTimeout(() => {
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 400);
}