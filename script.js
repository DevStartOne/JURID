// Chave para salvar os cards no LocalStorage
const STORAGE_KEY = 'flashCardsJuridico';
const QUIZ_STORAGE_KEY = 'quizQuestionsJuridico';

// Array para armazenar todos os flash cards
let flashCards = [];

// Variável global para armazenar o ID do card sendo editado
let cardIdToEdit = null; 

// Array de Questões do Simulado (Filtradas para Múltipla Escolha e sem referência a Artigos)
let quizQuestions = [
    { id: 1, text: "O Direito pode ser definido como:", correct: "Conjunto de normas impostas pelo Estado que regulam a vida social.", wrong: ["Conjunto de regras morais da sociedade.", "Apenas normas de etiqueta e costume.", "Ideais de justiça sem aplicação prática.", "Regras de comportamento pessoal."] },
    { id: 2, text: "O ordenamento jurídico é:", correct: "Um conjunto de normas hierarquizadas, coerentes e unificadas.", wrong: ["Apenas leis federais.", "Normas de etiqueta social.", "Conjunto de regras religiosas.", "Apenas normas de conduta moral."] },
    { id: 3, text: "O império da lei significa:", correct: "Que a lei é obrigatória para todos.", wrong: ["Que a vontade individual prevalece sobre a lei.", "Que apenas o juiz pode interpretar a lei.", "Que normas morais substituem a lei.", "Que a lei é opcional para cidadãos comuns."] },
    { id: 4, text: "O império da vontade refere-se a:", correct: "A supremacia da vontade do indivíduo sobre a lei.", wrong: ["A obrigatoriedade da lei.", "Uma forma de integração do Direito.", "A autoridade do Estado em criar normas.", "Um princípio moral da sociedade."] },
    { id: 5, text: "Direito objetivo é:", correct: "O conjunto de normas jurídicas do ordenamento.", wrong: ["A faculdade individual de agir conforme a lei.", "Normas internas da consciência.", "Apenas regras penais.", "Conjunto de valores morais da sociedade."] },
    { id: 6, text: "Direito subjetivo corresponde a:", correct: "Poder ou faculdade que o indivíduo exerce em face de outro ou do Estado.", wrong: ["Norma abstrata sem titular.", "Prerrogativa exclusiva do Estado de criar normas.", "Costumes sociais obrigatórios.", "Valores éticos de convivência."] },
    { id: 7, text: "Elementos essenciais do negócio jurídico são:", correct: "Agente capaz, objeto lícito, forma prescrita, vontade livre.", wrong: ["Apenas objeto e vontade.", "Apenas forma escrita.", "Apenas valores morais.", "Apenas consentimento verbal."] },
    { id: 8, text: "A personalidade da pessoa natural começa:", correct: "Com o nascimento com vida.", wrong: ["Com a concepção.", "Aos 18 anos.", "Após registro escolar.", "Aos 21 anos."] },
    { id: 9, text: "A personalidade da pessoa jurídica:", correct: "É distinta da de seus membros.", wrong: ["É igual à de todos os associados.", "Só vale no âmbito privado.", "Só vale no âmbito público.", "Não existe."] },
    { id: 10, text: "Capacidade civil plena é adquirida:", correct: "Aos 18 anos, salvo emancipação.", wrong: ["Aos 16 anos automaticamente.", "Aos 21 anos.", "Aos 14 anos com consentimento.", "Aos 12 anos em qualquer circunstância."] },
    { id: 11, text: "O domicílio civil é:", correct: "O local de residência com intenção de permanência.", wrong: ["O local de nascimento.", "Apenas onde trabalha a pessoa.", "Onde está o cônjuge.", "Onde se registrou escola ou trabalho."] },
    { id: 12, text: "Bens móveis são:", correct: "Aqueles que podem ser transportados sem alteração de substância.", wrong: ["Imóveis.", "Apenas consumíveis.", "Apenas terrenos.", "Apenas veículos."] },
    { id: 13, text: "Bens imóveis são:", correct: "Aqueles que não podem ser transportados sem destruição.", wrong: ["Todos os bens registráveis.", "Apenas terrenos.", "Apenas construções.", "Apenas bens fungíveis."] },
    { id: 14, text: "O erro substancial:", correct: "Vicia a vontade e torna o negócio anulável.", wrong: ["Não afeta a validade do negócio.", "Sempre torna o negócio nulo.", "Não pode ser alegado judicialmente.", "Apenas se for intencional."] },
    { id: 15, text: "O dolo:", correct: "É vício da vontade intencional.", wrong: ["Sempre gera nulidade do negócio.", "Não tem efeito jurídico.", "Apenas ocorre em contratos comerciais.", "Apenas se a vítima for menor de idade."] },
    { id: 16, text: "Coação:", correct: "É ameaça grave e injusta que domina a vontade.", wrong: ["Sempre produz nulidade absoluta.", "Não gera efeito legal.", "Só vale se houver contrato escrito.", "Só vale se houver dano patrimonial."] },
    { id: 17, text: "Estado de perigo:", correct: "Ocorre quando alguém assume obrigação excessiva por desespero.", wrong: ["Ocorre apenas por ameaça direta.", "Sempre anula o negócio.", "Só ocorre para menores de idade.", "Não é reconhecido pelo Código Civil."] },
    { id: 18, text: "Lesão:", correct: "Ocorre quando há desproporção entre prestação e contraprestação.", wrong: ["Não afeta validade do negócio.", "Ocorre apenas em contratos civis.", "Ocorre apenas em transações comerciais.", "Não é prevista em lei."] },
    { id: 19, text: "Fraude contra credores:", correct: "É ato do devedor para prejudicar credores, sendo anulável.", wrong: ["Sempre nula.", "Não produz efeitos jurídicos.", "Só ocorre em empresas.", "Não depende de intenção."] },
    { id: 20, text: "Um contrato sem forma exigida por lei é:", correct: "Nulo.", wrong: ["Válido.", "Anulável.", "Opcional.", "Somente moralmente inválido."] },
    { id: 21, text: "Casamento de pessoa já casada é:", correct: "Nulo.", wrong: ["Válido.", "Anulável.", "Depende do juiz.", "Permitido em alguns estados."] },
    { id: 22, text: "Compra feita por menor sem autorização dos pais é:", correct: "Anulável.", wrong: ["Nula.", "Válida.", "Apenas moralmente inválida.", "Sempre confirmável."] },
    { id: 23, text: "Contrato feito sob ameaça de morte é:", correct: "Anulável.", wrong: ["Nulo.", "Válido.", "Apenas moralmente inválida.", "Sempre convalidável."] },
    { id: 24, text: "Reconhecimento de filho é:", correct: "Ato jurídico.", wrong: ["Fato jurídico.", "Fato não jurídico.", "Norma moral.", "Costume social."] },
    { id: 25, text: "Pagamento de dívida:", correct: "Ato jurídico.", wrong: ["Fato jurídico.", "Fato não jurídico.", "Norma moral.", "Apenas obrigação moral."] },
    { id: 26, text: "A morte de pessoa:", correct: "Fato jurídico.", wrong: ["Ato jurídico.", "Fato não jurídico.", "Negócio jurídico.", "Norma moral."] },
    { id: 27, text: "O nascimento com vida:", correct: "Dá personalidade jurídica à pessoa natural.", wrong: ["Não dá efeitos jurídicos.", "É ato jurídico.", "É um vício da vontade.", "Depende de registro civil."] },
    { id: 28, text: "Um desastre natural que destrói contrato:", correct: "Fato jurídico.", wrong: ["Ato jurídico.", "Negócio jurídico.", "Fato não jurídico.", "Norma moral."] },
    { id: 29, text: "Amanhecer ensolarado:", correct: "Fato não jurídico.", wrong: ["Fato jurídico.", "Ato jurídico.", "Negócio jurídico.", "Norma moral."] },
    { id: 30, text: "Um contrato celebrado sob erro irrelevante é:", correct: "Válido", wrong: ["Anulável", "Nulo", "Sem efeito", "Apenas moralmente inválido"] },
    { id: 31, text: "Um contrato feito com dolo intencional é:", correct: "Anulável", wrong: ["Válido", "Nulo", "Sempre confirmável", "Sem efeito"] }
];


// Um conjunto grande de opções incorretas para preenchimento aleatório
const questionPool = [
    "Apenas normas de etiqueta social.", 
    "Ideais de justiça sem aplicação prática.",
    "Apenas leis federais.",
    "Que a vontade individual prevalece sobre a lei.",
    "Apenas regras penais.",
    "Norma abstrata sem titular.",
    "Apenas forma escrita.",
    "Aos 21 anos.",
    "Apenas em casos civis.",
    "O local de nascimento.",
    "Imóveis.",
    "Todos os bens registráveis.",
    "Sempre torna o negócio nulo.",
    "Sempre produz nulidade absoluta.",
    "Ocorre apenas por ameaça direta.",
    "Não é prevista em lei.",
    "Não depende de intenção.",
    "Apenas moralmente inválido.",
    "Apenas se houver registro.",
    "Apenas normas internas.",
    "Apenas tratados comerciais.",
    "Apenas salários.",
    "Apenas doutrina.",
    "Sempre gera nulidade do negócio.",
    "Ocorre apenas em contratos comerciais.",
    "Apenas se houver dano patrimonial.",
    "Não é reconhecido pelo Código Civil.",
    "Apenas em transações comerciais.",
    "Apenas se for intencional.",
    "Sempre confirmável.",
    "Somente moralmente inválido.",
    "Permitido em alguns estados.",
    "Sempre convalidável.",
    "Fato não jurídico.",
    "Norma moral.",
    "É ato jurídico.",
    "Não dá efeitos jurídicos.",
    "Fato não jurídico.",
    "Norma moral.",
    "Apenas em Direito Penal.",
    "Apenas em Direito Civil.",
    "Apenas se houver disputa judicial.",
    "Apenas analogia.",
    "Apenas em contratos.",
    "Apenas em menores.",
    "Apenas em compras.",
    "Apenas em empréstimos.",
    "Apenas em contratos civis.",
    "Apenas se houver terceiro.",
    "Apenas em empresas.",
    "Apenas se houver registro.",
    "Sempre confirmável.",
    "Sem efeito.",
    "Apenas parcialmente.",
    "Apenas se for judicial.",
    "Apenas moralmente.",
    "Apenas se for cidadão.",
    "Apenas se houver testemunha.",
    "Negócio jurídico.",
    "Apenas servidores.",
    "Apenas normas internas.",
    "Apenas conflitos.",
    "Apenas salários.",
    "Apenas sindicatos.",
    "Apenas férias.",
    "Apenas referência.",
    "Apenas teoria.",
    "Apenas se houver litígio.",
    "Apenas em Direito Penal.",
    "Nunca.",
    "Apenas judicialmente.",
    "Apenas com testemunhas.",
    "Apenas se doloso.",
    "Apenas se houver coação.",
    "Apenas em contrato escrito.",
    "Apenas se houver menor.",
    "Apenas em contrato comercial.",
    "Apenas verbal.",
    "Apenas escrita.",
    "Apenas moral.",
    "Apenas se menor.",
    "Apenas em contrato.",
    "Apenas em negócios comerciais.",
    "Apenas financeira.",
    "Apenas moral.",
    "Apenas voluntária.",
    "Apenas parcialmente.",
    "Apenas com acordo.",
    "Apenas moralmente.",
    "Anulabilidade.",
    "Dolo.",
    "Coação.",
    "Nulidade.",
    "Erro.",
    "Fraude.",
    "Coação.",
    "Lesão.",
    "Fraude.",
    "Estado de perigo.",
    "Lesão.",
    "Coação.",
    "Fraude.",
    "Nulidade.",
    "Anulabilidade.",
    "Apenas moral.",
    "Apenas social.",
    "Apenas financeiro.",
    "Fato não jurídico.",
    "Apenas moral.",
    "Apenas costume.",
    "Apenas recomendação.",
    "Apenas no direito penal.",
    "Apenas na moral religiosa.",
    "Apenas no costume.",
    "Apenas se contrato escrito.",
    "Apenas se houver testemunha.",
    "Apenas em negócios privados.",
    "Apenas se contrato.",
    "Apenas se menor.",
    "Apenas se lei prever.",
    "Apenas moralmente.",
    "Apenas parcial.",
    "Apenas judicial.",
    "Opcional.",
    "Moralmente inválida."
];


// Variável para armazenar as 25 questões selecionadas para a sessão atual
let currentQuizSession = [];


// ----------------------------------------------------
// --- Funções Auxiliares Comuns ---
// ----------------------------------------------------

/** Função para embaralhar um array (Algoritmo Fisher-Yates) */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// ----------------------------------------------------
// --- Inicialização e Setup ---
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. Exibir a mensagem de boas-vindas
    const welcomeText = "Direito Geral ";
    const welcomeElement = document.getElementById('welcome-message');
    if (welcomeElement) {
        welcomeElement.innerHTML = welcomeText;
    }
    
    // CORREÇÃO: Garante que o modal de flashcards comece fechado.
    // Isso é uma medida de segurança caso o CSS "display: none;" não funcione.
    closeModal(); 

    // 2. Tenta carregar os cards salvos (PERSISTÊNCIA - Flashcards)
    loadFlashCards();

    // 3. Carregar e/ou criar dados iniciais do Quiz
    loadQuizQuestions();

    // 4. SE NÃO HOUVER CARDS, CRIA ALGUNS CARDS DE TESTE
    if (flashCards.length === 0) {
        console.log("Nenhum card encontrado no localStorage. Criando cards de teste...");
        createTestCards();
        saveCardsToStorage(); 
    }

    // 5. Adicionar event listener ao formulário (Inicialmente para SALVAR Flashcard)
    const form = document.getElementById('new-card-form');
    if (form) {
        form.addEventListener('submit', saveFlashCard); 
    }
    
    // 6. Renderiza os cards (sejam os carregados ou os de teste)
    // Nota: O modal está fechado, mas o conteúdo é renderizado para ser exibido 
    // imediatamente ao abrir.
    renderFlashCards(); 
});


// ----------------------------------------------------
// --- Funções de LocalStorage (Persistência) e Teste ---
// ----------------------------------------------------

function loadFlashCards() {
    // Carrega os cards do navegador
    const savedCards = localStorage.getItem(STORAGE_KEY);
    if (savedCards) {
        try {
            flashCards = JSON.parse(savedCards);
        } catch (e) {
            console.error("Erro ao carregar flash cards do localStorage:", e);
            flashCards = [];
        }
    }
}

function saveCardsToStorage() {
    // Salva o array de cards no navegador
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(flashCards));
    } catch (e) {
        console.error("Erro ao salvar flash cards no localStorage:", e);
    }
}

function loadQuizQuestions() {
    const savedQuiz = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (savedQuiz) {
        try {
            // Combina as questões originais (se houver atualização no código) e as salvas pelo usuário
            const userAddedQuestions = JSON.parse(savedQuiz);
            // Evita duplicação se o usuário adicionou as questões iniciais
            const existingIds = new Set(quizQuestions.map(q => q.id));
            const newQuestions = userAddedQuestions.filter(q => !existingIds.has(q.id));
            quizQuestions = [...quizQuestions, ...newQuestions];
            
        } catch (e) {
            console.error("Erro ao carregar questões de quiz do localStorage:", e);
            // Se der erro, usa apenas o array inicial 'quizQuestions'
        }
    }
}

function saveQuizQuestions() {
    // Salva APENAS as questões que o usuário adicionou.
    // Usamos um ID maior que o inicial (31) para diferenciar as questões do usuário.
    // Agora, usamos os IDs dos cards recém-criados que são maiores que o ID máximo inicial do quiz.
    const maxInitialQuizId = 31; 
    const userAddedQuestions = quizQuestions.filter(q => q.id > maxInitialQuizId);
    try {
        localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(userAddedQuestions));
    } catch (e) {
        console.error("Erro ao salvar questões de quiz no localStorage:", e);
    }
}

function createTestCards() {
    flashCards = [
            { id: 1, question: "O que é o Ordenamento Jurídico?", answer: "O Ordenamento Jurídico é o conjunto de todas as leis e normas que organizam a vida em sociedade." },
            { id: 2, question: "O que é o Império da Vontade?", answer: "É o princípio segundo o qual vale a vontade das pessoas, desde que não contrarie a lei." },
            { id: 3, question: "O que é o Império da Lei?", answer: "É o princípio que determina que vale o que a lei estabelece, e todos devem obedecer." },
            { id: 4, question: "Quem são os Sujeitos do Direito?", answer: "São as pessoas que possuem direitos e deveres perante a lei." },
            { id: 5, question: "O que é Moral?", answer: "São regras de conduta criadas pela sociedade, não pelo Estado." },
            { id: 6, question: "O que são as Fontes do Direito?", answer: "São as origens de onde nascem as regras jurídicas, ou seja, de onde vem o Direito." },
            { id: 7, question: "O que é Doutrina?", answer: "São os estudos e opiniões dos juristas, como professores, juízes e advogados." },
            { id: 8, question: "O que são Costumes?", answer: "São práticas repetidas pela sociedade e aceitas como obrigatórias." },
            { id: 9, question: "O que são Formas de Integração do Direito?", answer: "São maneiras de resolver casos quando a lei não traz resposta direta, preenchendo lacunas legais." },
            { id: 10, question: "O que é Analogia?", answer: "É o uso de casos semelhantes para resolver situações sem lei específica." },
            { id: 11, question: "O que são Princípios Gerais do Direito?", answer: "São valores e ideias básicas de justiça, como boa-fé, igualdade e honestidade." },
            { id: 12, question: "O que é Lei?", answer: "É uma regra escrita criada pelo Estado para organizar a sociedade." },
            { id: 13, question: "Como ocorre a formação da Lei?", answer: "Segue as etapas: proposta → votação → sanção → publicação → vigência." },
            { id: 14, question: "O que é um Ato Comissivo?", answer: "É quando alguém pratica uma ação proibida pela lei." },
            { id: 15, question: "O que é um Ato Omissivo?", answer: "É quando alguém deixa de cumprir uma obrigação imposta pela lei." },
            { id: 16, question: "O que é Domicílio?", answer: "É o local onde uma pessoa estabelece residência com ânimo definitivo." },
            { id: 17, question: "O que é Domicílio da Pessoa Natural?", answer: "É o lugar onde a pessoa mora com intenção de permanecer." },
            { id: 18, question: "O que é Domicílio da Pessoa Jurídica de Direito Privado?", answer: "É o local onde funciona sua sede, diretoria ou administração, ou o endereço indicado no contrato social." },
            { id: 19, question: "Qual é o domicílio da Pessoa Jurídica com sede no exterior?", answer: "É o local da filial ou agência no Brasil que realizou o ato ou contrato." },
            { id: 20, question: "O que são Bens Imóveis?", answer: "São os bens que não podem ser movidos sem alteração ou destruição da estrutura." },
            { id: 21, question: "O que são Bens Móveis?", answer: "São os bens que podem ser transportados de um lugar para outro sem se danificarem." },
            { id: 22, question: "O que são Bens Fungíveis?", answer: "São bens substituíveis por outros da mesma espécie, qualidade e quantidade (art. 85 do Código Civil)." },
            { id: 23, question: "O que são Bens Consumíveis?", answer: "São bens que se extinguem com o uso, podendo ser utilizados apenas uma vez (art. 86 do Código Civil)." },
            { id: 24, question: "O que são Bens Divisíveis?", answer: "São bens que podem ser divididos em partes sem perder valor ou função." },
            { id: 25, question: "O que são Bens Indivisíveis?", answer: "São bens que não podem ser divididos sem perda de utilidade ou valor." },
            { id: 26, question: "O que são Bens Singulares?", answer: "São bens considerados isoladamente, com existência própria, mesmo fazendo parte de um conjunto." },
            { id: 27, question: "O que são Bens Coletivos?", answer: "São bens pertencentes a todos, de uso comum ou interesse geral da sociedade." },
            { id: 28, question: "O que são Bens de Uso Especial?", answer: "São bens públicos utilizados pelo governo para prestação de serviços públicos." },
            { id: 29, question: "O que são Bens Dominicais?", answer: "São bens públicos não utilizados, que podem ser vendidos ou alugados pelo governo." },
            { id: 30, question: "O que são Bens Públicos?", answer: "São bens pertencentes à União, Estados, DF ou Municípios, usados em benefício da coletividade." },
            { id: 31, question: "Qual a capacidade da pessoa de 0 a 16 anos?", answer: "É incapaz, necessitando de responsável legal." },
            { id: 32, question: "Qual a capacidade da pessoa de 16 a 18 anos?", answer: "Possui capacidade relativa, necessitando de assistência em alguns atos." },
            { id: 33, question: "Qual a capacidade da pessoa com mais de 18 anos?", answer: "Possui plena capacidade civil." },
            { id: 34, question: "O que são capacidades especiais?", answer: "São limitações à capacidade em razão de situações específicas, como alcoolismo, uso de drogas ou enfermidade mental." },
            { id: 35, question: "O que é um Fato não jurídico?", answer: "É um acontecimento sem relevância jurídica, que não produz efeitos legais." },
            { id: 36, question: "O que é um Fato jurídico em sentido amplo?", answer: "É um acontecimento que produz efeitos jurídicos, independentemente da vontade humana." },
            { id: 37, question: "O que é um Ato jurídico em sentido estrito?", answer: "É um ato lícito, praticado com vontade humana, que gera efeitos legais." },
            { id: 38, question: "O que são Defeitos do Negócio Jurídico?", answer: "São vícios que afetam a validade do negócio jurídico, como contratos e testamentos." },
            { id: 39, question: "O que é Nulidade?", answer: "É o vício que torna o negócio inválido desde o início, por violar gravemente a lei (art. 166 CC)." },
            { id: 40, question: "O que é Anulabilidade?", answer: "É o vício menos grave, ligado à vontade ou capacidade, podendo ser convalidado (art. 171 CC)." },
            { id: 41, question: "O que é Erro ou Ignorância?", answer: "É falsa percepção da realidade que afeta a vontade, tornando o ato anulável." },
            { id: 42, question: "O que é Dolo?", answer: "É o engano intencional que induz outra pessoa a manifestar vontade viciada (art. 145 CC)." },
            { id: 43, question: "O que é Coação?", answer: "É a ameaça grave e injusta que domina a vontade da pessoa, tornando o ato anulável (art. 151 CC)." },
            { id: 44, question: "O que é Estado de Perigo?", answer: "É quando a vontade é viciada pelo desespero diante de risco grave, aproveitado por outra parte (art. 156 CC)." },
            { id: 45, question: "O que é Lesão?", answer: "É o aproveitamento da necessidade ou inexperiência de alguém, impondo obrigação desproporcional (art. 157 CC)." },
            { id: 46, question: "O que é Fraude contra Credores?", answer: "É quando o devedor pratica ato para prejudicar credores, ocultando ou transferindo bens (arts. 158 a 165 CC)." },
            { id: 47, question: "O que é Invalidação do Negócio Jurídico?", answer: "Ocorre quando o negócio não atende aos requisitos de validade: agente capaz, objeto lícito, forma legal e vontade livre." },
            { id: 48, question: "Qual a diferença entre 'Lei' e 'Decreto'", answer: "Lei é criada pelo Poder Legislativo, Decreto pelo Poder Executivo para regulamentar uma lei." },
            { id: 49, question: "O que é Jurisprudência", answer: "Conjunto de decisões e interpretações das leis pelos tribunais." },
            { id: 50, question: "O que é 'Direito Civil", answer: "Ramo do direito que rege as relações entre particulares." },
            
        
    ];
}


// ----------------------------------------------------
// --- Funções de Navegação e Modal ---
// ----------------------------------------------------

function loadContent(contentType) {
    if (contentType === 'flashcards-juridico') {
        openModal();
    } else if (contentType === 'simulado-multipla-escolha') {
        // Seleciona as 25 questões aleatórias (conforme solicitado)
        currentQuizSession = shuffleAndSliceQuestions(quizQuestions, 25);
        openQuizModal(); 
    } else {
        alert(`Você clicou em: ${contentType.replace('-', ' ')}.\nEsta funcionalidade será implementada em breve!`);
    }
}

function openModal() {
    const modal = document.getElementById('flashcard-modal');
    if (modal) {
        modal.style.display = 'flex';
        
        // **MODIFICAÇÃO 1: Embaralha os cards ANTES de renderizar**
        shuffleArray(flashCards); 
        
        renderFlashCards();
    }
}

function closeModal() {
    const modal = document.getElementById('flashcard-modal');
    if (modal) {
        modal.style.display = 'none'; 
    }
    
    const formDiv = document.getElementById('add-flashcard-form');
    const addButton = document.querySelector('#flashcard-modal .add-button');

    if (formDiv) formDiv.style.display = 'none';
    if (addButton) addButton.style.display = 'block';

    resetFormToSaveState();
}

window.onclick = function(event) {
    const flashcardModal = document.getElementById('flashcard-modal');
    const quizModal = document.getElementById('quiz-modal');
    const addQuizModal = document.getElementById('add-quiz-modal');

    // Fechar modal de Flashcards se clicar fora
    if (event.target === flashcardModal) {
        closeModal();
    }
    // Fechar modal de Quiz se clicar fora
    if (event.target === quizModal) {
        closeQuizModal();
    }
    // Fechar modal de Adicionar Questão se clicar fora
    if (event.target === addQuizModal) {
        closeAddQuizModal();
    }
}


// ----------------------------------------------------
// --- Funções de Formulário (CRUD Flashcards) ---
// ----------------------------------------------------

function resetFormToSaveState() {
    cardIdToEdit = null;
    document.getElementById('new-card-form').reset();
    
    const submitButton = document.getElementById('submit-card-button');
    submitButton.textContent = "Salvar Card";
    document.querySelector('.form-container h3').textContent = "Adicionar Novo Flash Card";

    const form = document.getElementById('new-card-form');
    // Remove o listener de edição e adiciona o de salvar (estado padrão)
    form.removeEventListener('submit', updateFlashCard);
    form.addEventListener('submit', saveFlashCard);
}

function toggleAddForm() {
    const formDiv = document.getElementById('add-flashcard-form');
    const displayGrid = document.querySelector('#flashcard-display .flashcard-grid'); 
    const noCardsMsg = document.querySelector('#flashcard-display .no-cards-message');
    const addButton = document.querySelector('#flashcard-modal .add-button');
    
    if (!formDiv || !addButton) return;

    if (formDiv.style.display === 'none' || formDiv.style.display === '') {
        // ABRIR FORMULÁRIO
        formDiv.style.display = 'block';
        addButton.style.display = 'none';

        if (displayGrid) displayGrid.style.display = 'none';
        if (noCardsMsg) noCardsMsg.style.display = 'none';

    } else {
        // FECHAR FORMULÁRIO
        formDiv.style.display = 'none';
        addButton.style.display = 'block';
        
        renderFlashCards();
        
        resetFormToSaveState(); 
    }
}

function saveFlashCard(event) {
    event.preventDefault(); 
    
    const question = document.getElementById('card-question').value.trim();
    const answer = document.getElementById('card-answer').value.trim();
    
    if (question && answer) {
        // 1. Cria o Flash Card
        const newCard = {
            id: Date.now(), 
            question: question,
            answer: answer
        };
        
        flashCards.push(newCard);
        saveCardsToStorage(); 
        
        // **MODIFICAÇÃO 2: CRIA E SALVA A NOVA QUESTÃO DE QUIZ**
        const newQuizQuestion = {
            // Usa o mesmo ID para que possa ser gerenciado (atualizado/excluído)
            id: newCard.id, 
            text: newCard.question, // A pergunta do flash card vira o texto da questão
            correct: newCard.answer, // A resposta do flash card vira a resposta correta
            wrong: [] // Deixa o array de incorretas vazio; o renderizador preencherá aleatoriamente
        };
        
        quizQuestions.push(newQuizQuestion);
        saveQuizQuestions(); // Salva o array de questões no LocalStorage
        
        
        document.getElementById('new-card-form').reset();
        toggleAddForm(); 
    } else {
        alert("Por favor, preencha a Pergunta e a Resposta.");
    }
}

function updateFlashCard(event) {
    event.preventDefault();

    const question = document.getElementById('card-question').value.trim();
    const answer = document.getElementById('card-answer').value.trim();

    if (question && answer && cardIdToEdit !== null) {
        const cardIndex = flashCards.findIndex(card => card.id === cardIdToEdit);
        const quizIndex = quizQuestions.findIndex(q => q.id === cardIdToEdit); // Encontra a questão associada

        if (cardIndex !== -1) {
            // 1. Atualiza o Flash Card
            flashCards[cardIndex].question = question;
            flashCards[cardIndex].answer = answer;

            // **MODIFICAÇÃO 4: Atualiza a Questão do Simulado (se existir)**
            if (quizIndex !== -1) {
                 quizQuestions[quizIndex].text = question;
                 quizQuestions[quizIndex].correct = answer;
                 saveQuizQuestions();
            }

            saveCardsToStorage(); 
            
            resetFormToSaveState();
            toggleAddForm(); 
        }
    } else {
        alert("Por favor, preencha a Pergunta e a Resposta.");
    }
}

function deleteFlashCard(id) {
    if (confirm("Tem certeza que deseja excluir este flash card e a questão de simulado associada?")) {
        // Remove o Flash Card
        flashCards = flashCards.filter(card => card.id !== id);
        saveCardsToStorage(); 
        
        // **MODIFICAÇÃO 3: Remove a Questão do Simulado (Usando o mesmo ID)**
        quizQuestions = quizQuestions.filter(q => q.id !== id);
        saveQuizQuestions();
        
        renderFlashCards();
    }
}

function editFlashCard(id) {
    const cardToEdit = flashCards.find(card => card.id === id);
    
    if (!cardToEdit) return;

    cardIdToEdit = id;
    document.getElementById('card-question').value = cardToEdit.question;
    document.getElementById('card-answer').value = cardToEdit.answer;

    const submitButton = document.getElementById('submit-card-button');
    submitButton.textContent = "Salvar Alterações";
    document.querySelector('.form-container h3').textContent = "Editar Flash Card Existente";

    const form = document.getElementById('new-card-form');
    // Remove o listener de salvar e adiciona o de edição
    form.removeEventListener('submit', saveFlashCard);
    form.addEventListener('submit', updateFlashCard);
    
    toggleAddForm(); 
}

function renderFlashCards() {
    const displayDiv = document.getElementById('flashcard-display');
    if (!displayDiv) return;
    
    // Obtém o elemento do formulário de adição/edição
    const formDiv = document.getElementById('add-flashcard-form');
    
    // Armazena temporariamente os elementos filhos
    const elementsToKeep = formDiv ? [formDiv] : [];
    
    // Limpa o conteúdo, mas mantém os elementos a serem preservados
    displayDiv.innerHTML = ''; 
    elementsToKeep.forEach(el => displayDiv.appendChild(el));

    // Se o formulário estiver aberto, não renderiza a lista de cards
    if (formDiv && formDiv.style.display === 'block') {
        return;
    }
    
    if (flashCards.length === 0) {
        displayDiv.innerHTML += `
            <p class="no-cards-message">
                Nenhum flash card cadastrado ainda. Clique em "Adicionar Novo Flash Card" para começar.
            </p>
        `;
        return;
    }
    
    const cardGrid = document.createElement('div');
    cardGrid.classList.add('flashcard-grid');

    flashCards.forEach(card => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('flashcard-container'); 
        
        cardContainer.innerHTML = `
            <div class="flashcard" onclick="this.classList.toggle('flipped')">
                <div class="flashcard-front">
                    <p>${card.question}</p>
                    <small style="margin-top: 10px; color: var(--color-secondary);">Clique para virar</small>
                </div>
                <div class="flashcard-back">
                    <p>${card.answer}</p>
                </div>
            </div>
            
            <div class="card-actions">
                <button onclick="editFlashCard(${card.id})" class="action-button edit-button">Editar</button>
                <button onclick="deleteFlashCard(${card.id})" class="action-button delete-button">Excluir</button>
            </div>
        `;
        cardGrid.appendChild(cardContainer);
    });

    displayDiv.appendChild(cardGrid);
}


// ----------------------------------------------------
// --- MÓDULO: QUIZ DE MÚLTIPLA ESCOLHA ---
// ----------------------------------------------------

/** Seleciona N questões aleatórias do pool sem repetição */
function shuffleAndSliceQuestions(allQuestions, count) {
    // 1. Embaralha todo o array de questões
    const shuffled = shuffleArray([...allQuestions]);
    
    // 2. Limita o número de questões ao solicitado ou ao total disponível
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function openQuizModal() {
    const modal = document.getElementById('quiz-modal');
    const resultsDiv = document.getElementById('quiz-results');
    
    if (modal) {
        modal.style.display = 'flex';
        resultsDiv.style.display = 'none'; // Esconde resultados antigos
        resultsDiv.innerHTML = ''; 
        renderQuizQuestions();
    }
}

function closeQuizModal() {
    const modal = document.getElementById('quiz-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function renderQuizQuestions() {
    const container = document.getElementById('quiz-questions-container');
    if (!container) return;

    // Adiciona o botão de adicionar questão no topo do container
    container.innerHTML = `
        <button class="add-button" onclick="openAddQuizModal()" style="margin-bottom: 30px;">
            Adicionar Nova Questão
        </button>
    `;
    
    // Se não houver questões na sessão atual, informa
    if (currentQuizSession.length === 0) {
        container.innerHTML += `<p style="text-align: center; color: var(--color-danger); font-weight: bold;">
            Nenhuma questão disponível para o Simulado. Adicione uma ou atualize a página.
        </p>`;
        return;
    }
    
    // Itera sobre as 25 questões aleatórias selecionadas
    const questionsHtml = currentQuizSession.map((q, index) => {
        // 1. Cria o array de todas as alternativas para esta questão
        let options = [q.correct];
        
        // 2. Seleciona 4 alternativas incorretas (ou o máximo possível)
        let incorrectOptions = [];
        
        if (q.wrong && q.wrong.length >= 4) {
            // Se a questão já tiver 4 ou mais alternativas incorretas, usa elas
            incorrectOptions = shuffleArray([...q.wrong]).slice(0, 4);
        } else {
            // Se não tiver alternativas suficientes (ou nenhuma), preenche aleatoriamente do pool
            const availablePool = questionPool.filter(opt => opt !== q.correct && (q.wrong ? !q.wrong.includes(opt) : true));
            incorrectOptions = shuffleArray(availablePool).slice(0, 4);

            // Adiciona as incorretas da questão (se houver) ao que foi preenchido
            if (q.wrong) {
                incorrectOptions = [...q.wrong, ...incorrectOptions];
                // Limita a 4 únicas opções
                incorrectOptions = Array.from(new Set(incorrectOptions)).slice(0, 4);
            }
        }

        // 3. Junta a correta com as incorretas
        options = [q.correct, ...incorrectOptions];

        // 4. Embaralha as alternativas
        const shuffledOptions = shuffleArray(options);

        // 5. Gera o HTML das opções
        const optionsHtml = shuffledOptions.map((option, optIndex) => {
            const letter = String.fromCharCode(65 + optIndex); // A, B, C, D, E...
            
            // O valor do radio button agora é a opção em si, e não a letra (para facilitar a checagem)
            return `
                <div class="option-row">
                    <input type="radio" id="q${q.id}_${letter}" name="q${q.id}" value="${option}">
                    <label for="q${q.id}_${letter}">${letter}) ${option}</label>
                </div>
            `;
        }).join('');

        return `
            <div class="quiz-question-card" data-id="${q.id}" data-correct="${q.correct}">
                <h3>${index + 1}. ${q.text}</h3>
                <div class="options-group">
                    ${optionsHtml}
                </div>
                <p class="feedback-message" style="display: none;"></p>
            </div>
        `;
    }).join('');
    
    container.innerHTML += questionsHtml;
}

function checkQuizAnswers() {
    let score = 0;
    const totalQuestions = currentQuizSession.length;
    const resultsDiv = document.getElementById('quiz-results');
    
    if (!resultsDiv) return;

    // Itera sobre as questões da sessão atual
    currentQuizSession.forEach(q => {
        const questionCard = document.querySelector(`.quiz-question-card[data-id="${q.id}"]`);
        const feedbackMessage = questionCard.querySelector('.feedback-message');
        const selectedOption = document.querySelector(`input[name="q${q.id}"]:checked`);
        const correctAnswerText = questionCard.getAttribute('data-correct'); // Pega a resposta correta

        // Remove classes de feedback antigas
        questionCard.classList.remove('correct-answer', 'wrong-answer');
        
        let isCorrect = false;
        let selectedValue = null;

        if (selectedOption) {
            selectedValue = selectedOption.value;
            isCorrect = (selectedValue === correctAnswerText);
        }

        // Aplica o feedback visual em todas as opções para mostrar a correta
        questionCard.querySelectorAll('.option-row').forEach(row => {
            const input = row.querySelector('input');
            
            // Se a opção for a correta
            if (input.value === correctAnswerText) {
                 row.style.border = `2px solid var(--color-success)`; 
                 row.style.fontWeight = 'bold';
                 row.style.backgroundColor = '#e6ffec'; // Fundo levemente verde
            } else if (input.checked) {
                // Se a opção foi marcada, mas está incorreta
                row.style.border = `2px solid var(--color-danger)`; 
                row.style.backgroundColor = '#ffeded'; // Fundo levemente vermelho
            } else {
                // Reseta as outras opções
                row.style.border = `1px solid #ddd`; 
                row.style.fontWeight = 'normal';
                row.style.backgroundColor = 'var(--color-surface)';
            }
        });


        if (isCorrect) {
            score++;
            questionCard.classList.add('correct-answer');
            feedbackMessage.style.display = 'block';
            feedbackMessage.textContent = 'Correto!';
            feedbackMessage.style.backgroundColor = 'var(--color-success)'; // Verde
            
        } else {
            questionCard.classList.add('wrong-answer');
            feedbackMessage.style.display = 'block';
            
            let message = 'Incorreto. ';
            if (selectedValue) {
                 message += `Sua resposta foi: "${selectedValue}". `;
            } else {
                 message += `Você não respondeu. `;
            }
            message += `A resposta correta é: "${correctAnswerText}".`;
            
            feedbackMessage.textContent = message;
            feedbackMessage.style.backgroundColor = 'var(--color-danger)'; // Vermelho
        }
    });

    // Exibe o resultado final
    const percentage = ((score / totalQuestions) * 100).toFixed(2);
    resultsDiv.style.display = 'block';
    resultsDiv.style.backgroundColor = '#e9ecef'; // Fundo neutro para resultados

    resultsDiv.innerHTML = `
        <h3>Resultado Final</h3>
        <p>Você acertou **${score}** de **${totalQuestions}** questões.</p>
        <p>Sua pontuação: **${percentage}%**</p>
    `;

    // Rola para o topo do modal para ver o resultado
    document.getElementById('quiz-modal').scrollTop = 0;
}


// ----------------------------------------------------
// --- MÓDULO: ADICIONAR QUESTÃO ---
// ----------------------------------------------------

function openAddQuizModal() {
    // Esconde o modal principal do Quiz
    closeQuizModal();
    
    // Exibe o novo modal 
    const addModal = document.getElementById('add-quiz-modal');
    if (addModal) {
        addModal.style.display = 'flex';
        document.getElementById('new-quiz-form').reset();
    } else {
        alert("Erro: Modal de Adicionar Questão não encontrado. Verifique o HTML.");
    }
}

function closeAddQuizModal() {
    const addModal = document.getElementById('add-quiz-modal');
    if (addModal) {
        addModal.style.display = 'none';
    }
    // Reabre o modal principal do Quiz
    openQuizModal();
}

function saveNewQuizQuestion(event) {
    event.preventDefault();
}