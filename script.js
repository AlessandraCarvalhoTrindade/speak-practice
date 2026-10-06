const perguntas = {
    apresentacao: [
        {
            pergunta: "What is your name?",
            exemplo: "My name is Alessandra.",
            traducao: "Meu nome é Alessandra."
        },
        {
            pergunta: "Where are you from?",
            exemplo: "I am from Brazil.",
            traducao: "Eu sou do Brasil."
        },
        {
            pergunta: "How old are you?",
            exemplo: "I am 30 years old.",
            traducao: "Eu tenho 30 anos."
        },
        {
            pergunta: "What do you do?",
            exemplo: "I work in administration and I am studying programming.",
            traducao: "Eu trabalho na área administrativa e estou estudando programação."
        }
    ],
    trabalho: [
        {
            pergunta: "What is your job?",
            exemplo: "I work in back office.",
            traducao: "Eu trabalho com back office."
        },
        {
            pergunta: "Do you like your job?",
            exemplo: "I am looking for new opportunities.",
            traducao: "Estou buscando novas oportunidades."
        },
        {
            pergunta: "What are your strengths?",
            exemplo: "I am organized and responsible.",
            traducao: "Eu sou organizada e responsável."
        }
    ],
    viagem: [
        {
            pergunta: "Have you ever traveled abroad?",
            exemplo: "Not yet, but I would like to.",
            traducao: "Ainda não, mas eu gostaria."
        },
        {
            pergunta: "Where would you like to travel?",
            exemplo: "I would like to visit the United States.",
            traducao: "Eu gostaria de visitar os Estados Unidos."
        },
        {
            pergunta: "Do you prefer beach or mountains?",
            exemplo: "I prefer the beach.",
            traducao: "Eu prefiro a praia."
        }
    ],
    cotidiano: [
        {
            pergunta: "What time do you usually wake up?",
            exemplo: "I usually wake up at 7 AM.",
            traducao: "Eu normalmente acordo às 7 da manhã."
        },
        {
            pergunta: "What do you like to do on weekends?",
            exemplo: "I like to rest and study programming.",
            traducao: "Eu gosto de descansar e estudar programação."
        },
        {
            pergunta: "What is your favorite food?",
            exemplo: "My favorite food is pasta.",
            traducao: "Minha comida favorita é macarrão."
        }
    ]
};

let temaAtual = [];
let indiceAtual = 0;

function escolherTema(tema) {
    temaAtual = perguntas[tema];
    indiceAtual = 0;
    document.getElementById("area-pratica").classList.remove("escondido");
    mostrarPergunta();
}

function mostrarPergunta() {
    const atual = temaAtual[indiceAtual];
    document.getElementById("pergunta").innerText = atual.pergunta;
    document.getElementById("sua-resposta").innerText = "";
    document.getElementById("resposta-exemplo").classList.add("escondido");
}

function falarPergunta() {
    const texto = document.getElementById("pergunta").innerText;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
}

function comecarReconhecimento() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Seu navegador não suporta reconhecimento de voz. Use o Google Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    document.getElementById("btn-responder").innerText = "🎙️ Ouvindo...";

    recognition.start();

    recognition.onresult = function(event) {
        const resultado = event.results[0][0].transcript;
        document.getElementById("sua-resposta").innerText = "Você disse: " + resultado;
        document.getElementById("btn-responder").innerText = "🎤 Responder";

        // Mostra a resposta exemplo
        const atual = temaAtual[indiceAtual];
        document.getElementById("exemplo-ingles").innerText = atual.exemplo;
        document.getElementById("exemplo-portugues").innerText = atual.traducao;
        document.getElementById("resposta-exemplo").classList.remove("escondido");
    };

    recognition.onerror = function() {
        document.getElementById("btn-responder").innerText = "🎤 Responder";
        document.getElementById("sua-resposta").innerText = "Não consegui ouvir. Tente novamente.";
    };

    recognition.onend = function() {
        document.getElementById("btn-responder").innerText = "🎤 Responder";
    };
}

function proximaPergunta() {
    indiceAtual++;
    if (indiceAtual >= temaAtual.length) {
        indiceAtual = 0;
    }
    mostrarPergunta();
}
