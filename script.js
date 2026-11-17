// Control de pestañas
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
        btn.classList.add('bg-slate-200', 'text-slate-700');
    });

    document.getElementById(`content-${tabId}`).classList.remove('hidden');
    const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
    activeBtn.classList.remove('bg-slate-200', 'text-slate-700');
    activeBtn.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
}

// Lógica del Simulador Ético y Legal
const scenarios = [
    {
        title: "Caso 1: Hallazgo de Vulnerabilidad sin Autorización",
        desc: "Un estudiante descubre por casualidad una falla grave en el servidor de inscripciones de su universidad que permite ver contraseñas de otros alumnos.",
        options: [
            { text: "Publicar el fallo en redes sociales para avergonzar a la universidad.", correct: false, feedback: "Incorrecto. Exponer datos públicamente vulnera la privacidad y constituye un delito informático." },
            { text: "Reportarlo de manera confidencial al departamento de TI de la institución.", correct: true, feedback: "¡Correcto! Es la conducta ética responsable (divulgación coordinada/responsable)." },
            { text: "Intentar entrar a las cuentas de los profesores para probar la magnitud del error.", correct: false, feedback: "Incorrecto. Acceder a sistemas sin autorización explícita viola las leyes de ciberdelincuencia." }
        ]
    },
    {
        title: "Caso 2: Solicitud de Contraseña por un Compañero",
        desc: "Un colega de trabajo en el área de soporte técnico te pide tu contraseña de administrador para solucionar una urgencia rápida mientras estás en descanso.",
        options: [
            { text: "Prestársela para ayudar a resolver el problema con rapidez.", correct: false, feedback: "Incorrecto. Compartir credenciales viola el principio de rendición de cuentas y responsabilidad individual." },
            { text: "Negarse educadamente y ofrecerse a realizar la tarea uno mismo o generar un acceso temporal autorizado.", correct: true, feedback: "¡Correcto! Las credenciales son personales e intransferibles." },
            { text: "Anotar la contraseña en un post-it y pegarla debajo del teclado por si acaso.", correct: false, feedback: "Incorrecto. Esto expone el sistema a brechas físicas de seguridad." }
        ]
    },
    {
        title: "Caso 3: Uso de Software No Licenciado",
        desc: "Tu jefe te pide instalar una versión pirateada de un costoso software de auditoría de seguridad para ahorrar presupuesto en el departamento.",
        options: [
            { text: "Instalarlo sin cuestionar para cumplir órdenes directas de la gerencia.", correct: false, feedback: "Incorrecto. Esto infringe leyes de propiedad intelectual y puede contener malware oculto." },
            { text: "Explicar los riesgos legales y de seguridad (posible malware en cracks) y proponer alternativas de código abierto (Open Source).", correct: true, feedback: "¡Correcto! El ciberanalista debe asesorar éticamente a la organización sobre riesgos legales y técnicos." },
            { text: "Comprarlo con tu propio dinero y cobrarlo de forma oculta.", correct: false, feedback: "Incorrecto. No resuelve el problema de gobernanza y genera conflictos financieros." }
        ]
    }
];

let currentScenario = 0;

function loadScenario() {
    const s = scenarios[currentScenario];
    document.getElementById('scenario-badge').innerText = `Caso ${currentScenario + 1} de ${scenarios.length}`;
    document.getElementById('scenario-title').innerText = s.title;
    document.getElementById('scenario-desc').innerText = s.desc;
    
    const optionsDiv = document.getElementById('scenario-options');
    optionsDiv.innerHTML = '';
    document.getElementById('scenario-feedback').classList.add('hidden');

    s.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-3.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-sm font-medium transition text-slate-700";
        btn.innerText = opt.text;
        btn.onclick = () => selectOption(idx);
        optionsDiv.appendChild(btn);
    });
}

function selectOption(idx) {
    const s = scenarios[currentScenario];
    const opt = s.options[idx];
    const feedbackDiv = document.getElementById('scenario-feedback');
    
    feedbackDiv.classList.remove('hidden');
    if (opt.correct) {
        feedbackDiv.className = "p-4 rounded-lg mt-4 text-sm font-medium bg-emerald-50 text-emerald-800 border border-emerald-200";
        feedbackDiv.innerHTML = `✅ <strong>¡Excelente decisión!</strong> ${opt.feedback}`;
        setTimeout(() => {
            currentScenario = (currentScenario + 1) % scenarios.length;
            loadScenario();
        }, 3500);
    } else {
        feedbackDiv.className = "p-4 rounded-lg mt-4 text-sm font-medium bg-rose-50 text-rose-800 border border-rose-200";
        feedbackDiv.innerHTML = `❌ <strong>Precaución:</strong> ${opt.feedback}`;
    }
}

// Lógica de Autoevaluación
const quizQuestions = [
    {
        question: "1. ¿Qué principio de diseño establece que se deben otorgar los permisos estrictamente necesarios y nada más?",
        options: ["Defensa en profundidad", "Privilegio mínimo", "Fail-safe", "Simplicidad"],
        correct: 1
    },
    {
        question: "2. ¿Cuáles son las 5 funciones principales del Marco NIST Cybersecurity (CSF)?",
        options: [
            "Planear, Hacer, Verificar, Actuar, Auditar",
            "Identificar, Proteger, Detectar, Responder, Recuperar",
            "Analizar, Prevenir, Mitigar, Educar, Resolver",
            "Cifrar, Autenticar, Autorizar, Monitorear, Respaldar"
        ],
        correct: 1
    },
    {
        question: "3. ¿Qué acción describe mejor la divulgación responsable de una vulnerabilidad?",
        options: [
            "Venderla al mejor postor en foros clandestinos",
            "Publicarla inmediatamente en Twitter sin avisar a nadie",
            "Notificar privadamente al proveedor o entidad afectada para que pueda solucionarla",
            "Ignorarla por completo"
        ],
        correct: 2
    }
];

function loadQuiz() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';
    quizQuestions.forEach((q, qIdx) => {
        let html = `<div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <p class="font-semibold text-slate-900 text-sm">${q.question}</p>
            <div class="space-y-2">`;
        q.options.forEach((opt, oIdx) => {
            html += `<label class="flex items-center space-x-3 text-sm text-slate-700 cursor-pointer">
                <input type="radio" name="q${qIdx}" value="${oIdx}" class="text-blue-600 focus:ring-blue-500">
                <span>${opt}</span>
            </label>`;
        });
        html += `</div></div>`;
        container.innerHTML += html;
    });
}

function submitQuiz() {
    let score = 0;
    quizQuestions.forEach((q, qIdx) => {
        const selected = document.querySelector(`input[name="q${qIdx}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) {
            score++;
        }
    });
    const scoreDiv = document.getElementById('quiz-score');
    scoreDiv.innerText = `Tu calificación final es: ${score} de ${quizQuestions.length} (${Math.round((score/quizQuestions.length)*100)}%)`;
}

// Inicializar componentes al cargar la página
window.onload = () => {
    loadScenario();
    loadQuiz();
};