// ============================================================
// TaskFlow — To-Do App | Vanilla JS + localStorage
// ============================================================

// --- Constants ---
const DB_KEY = 'todo_db';
const SESSION_KEY = 'currentUser';

// --- Database Layer ---
function initDB() {
    if (!localStorage.getItem(DB_KEY)) {
        localStorage.setItem(DB_KEY, JSON.stringify({ users: [], todos: [] }));
    }
}

function getDB() {
    return JSON.parse(localStorage.getItem(DB_KEY));
}

function saveDB(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
}

// --- Session Layer ---
function getCurrentUser() {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearCurrentUser() {
    localStorage.removeItem(SESSION_KEY);
}

// ============================================================
// Rendering Engine
// ============================================================

function render() {
    const app = document.getElementById('app');
    const user = getCurrentUser();

    if (user) {
        app.innerHTML = renderDashboard(user);
        setupDashboardEvents(user);
    } else {
        const hash = window.location.hash;
        if (hash === '#register') {
            app.innerHTML = renderRegister();
            setupRegisterEvents();
        } else {
            app.innerHTML = renderLogin();
            setupLoginEvents();
        }
    }
}

// ============================================================
// Templates
// ============================================================

function renderLogin() {
    return `
        <div class="flex items-center justify-center min-h-screen">
            <div class="glass rounded-2xl p-8 sm:p-10 w-full max-w-md animate-fade-in">
                <!-- Branding -->
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 mb-4 shadow-lg shadow-sky-500/20">
                        <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                        </svg>
                    </div>
                    <h1 class="text-2xl font-bold text-white tracking-tight">Bem-vindo ao TaskFlow</h1>
                    <p class="text-slate-400 text-sm mt-1">Entre na sua conta para continuar</p>
                </div>

                <form id="loginForm" class="space-y-5" novalidate>
                    <!-- General error -->
                    <div id="loginError" class="hidden bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg text-center transition-smooth"></div>

                    <div>
                        <label for="loginEmail" class="block text-sm font-medium text-slate-300 mb-1.5">E-mail</label>
                        <input
                            type="email"
                            id="loginEmail"
                            class="input-field w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 transition-smooth"
                            placeholder="seu@email.com"
                        >
                        <span id="loginEmailErr" class="text-red-400 text-xs mt-1 hidden block">O e-mail é obrigatório.</span>
                    </div>

                    <div>
                        <label for="loginPassword" class="block text-sm font-medium text-slate-300 mb-1.5">Senha</label>
                        <input
                            type="password"
                            id="loginPassword"
                            class="input-field w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 transition-smooth"
                            placeholder="••••••••"
                        >
                        <span id="loginPasswordErr" class="text-red-400 text-xs mt-1 hidden block">A senha é obrigatória.</span>
                    </div>

                    <button type="submit" id="loginSubmitBtn" class="btn-primary w-full text-white font-semibold py-2.5 rounded-lg mt-2">
                        Entrar
                    </button>
                </form>

                <p class="mt-6 text-center text-sm text-slate-400">
                    Não tem uma conta?
                    <a href="#register" class="text-sky-400 hover:text-sky-300 font-medium transition-smooth">Cadastre-se</a>
                </p>
            </div>
        </div>
    `;
}

function renderRegister() {
    return `
        <div class="flex items-center justify-center min-h-screen">
            <div class="glass rounded-2xl p-8 sm:p-10 w-full max-w-md animate-fade-in">
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 mb-4 shadow-lg shadow-emerald-500/20">
                        <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                        </svg>
                    </div>
                    <h1 class="text-2xl font-bold text-white tracking-tight">Criar Conta</h1>
                    <p class="text-slate-400 text-sm mt-1">Comece a organizar suas tarefas</p>
                </div>

                <form id="registerForm" class="space-y-5" novalidate>
                    <div id="registerError" class="hidden bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg text-center transition-smooth"></div>

                    <div>
                        <label for="regName" class="block text-sm font-medium text-slate-300 mb-1.5">Nome</label>
                        <input type="text" id="regName"
                            class="input-field w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 transition-smooth"
                            placeholder="Seu nome completo">
                        <span id="regNameErr" class="text-red-400 text-xs mt-1 hidden block">O nome é obrigatório.</span>
                    </div>

                    <div>
                        <label for="regEmail" class="block text-sm font-medium text-slate-300 mb-1.5">E-mail</label>
                        <input type="email" id="regEmail"
                            class="input-field w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 transition-smooth"
                            placeholder="seu@email.com">
                        <span id="regEmailErr" class="text-red-400 text-xs mt-1 hidden block">O e-mail é obrigatório.</span>
                    </div>

                    <div>
                        <label for="regPassword" class="block text-sm font-medium text-slate-300 mb-1.5">Senha</label>
                        <input type="password" id="regPassword"
                            class="input-field w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 transition-smooth"
                            placeholder="••••••••">
                        <span id="regPasswordErr" class="text-red-400 text-xs mt-1 hidden block">A senha é obrigatória.</span>
                    </div>

                    <button type="submit" id="registerSubmitBtn" class="btn-primary w-full text-white font-semibold py-2.5 rounded-lg mt-2">
                        Cadastrar
                    </button>
                </form>

                <p class="mt-6 text-center text-sm text-slate-400">
                    Já tem uma conta?
                    <a href="#login" class="text-sky-400 hover:text-sky-300 font-medium transition-smooth">Entrar</a>
                </p>
            </div>
        </div>
    `;
}

function renderDashboard(user) {
    const db = getDB();
    const userTodos = db.todos
        .filter(t => t.userId === user.email)
        .sort((a, b) => {
            if (a.done !== b.done) return a.done ? 1 : -1;
            return b.id - a.id;
        });

    const todosHTML = userTodos.length === 0
        ? `<div class="text-center py-16">
                <svg class="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <p class="text-slate-500 text-lg font-medium">Nenhuma tarefa cadastrada ainda.</p>
                <p class="text-slate-600 text-sm mt-1">Crie a sua primeira tarefa acima!</p>
           </div>`
        : `<div class="space-y-3 stagger">${userTodos.map((todo, i) => renderTaskCard(todo, i)).join('')}</div>`;

    return `
        <div class="max-w-2xl mx-auto py-8 px-4 animate-fade-in">
            <!-- Header -->
            <header class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-sky-500/20">
                        ${user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 class="text-lg font-semibold text-white leading-tight">Olá, ${user.name}</h1>
                        <p class="text-xs text-slate-400">${getGreeting()}</p>
                    </div>
                </div>
                <button id="logoutBtn" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/70 border border-slate-700/40 text-slate-300 hover:text-white text-sm font-medium transition-smooth">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Sair
                </button>
            </header>

            <!-- Task creation form -->
            <section class="glass rounded-2xl p-6 sm:p-8 mb-8">
                <h2 class="text-base font-semibold text-white mb-5 flex items-center gap-2">
                    <svg class="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                    Nova Tarefa
                </h2>
                <form id="taskForm" class="space-y-4" novalidate>
                    <div id="taskError" class="hidden bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg text-center transition-smooth"></div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label for="taskTitle" class="block text-sm font-medium text-slate-300 mb-1.5">Título *</label>
                            <input type="text" id="taskTitle"
                                class="input-field w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 transition-smooth"
                                placeholder="Ex.: Estudar para a prova">
                            <span id="taskTitleErr" class="text-red-400 text-xs mt-1 hidden block">O título é obrigatório.</span>
                        </div>
                        <div>
                            <label for="taskType" class="block text-sm font-medium text-slate-300 mb-1.5">Tipo</label>
                            <select id="taskType"
                                class="input-field w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-4 py-2.5 text-white transition-smooth appearance-none cursor-pointer"
                                style="background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22%3E%3Cpolyline points=%226 9 12 15 18 9%22/%3E%3C/svg%3E'); background-repeat: no-repeat; background-position: right 12px center;">
                                <option value="Trabalho">Trabalho</option>
                                <option value="Pessoal">Pessoal</option>
                                <option value="Estudos">Estudos</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label for="taskDesc" class="block text-sm font-medium text-slate-300 mb-1.5">Descrição <span class="text-slate-500">(opcional)</span></label>
                        <textarea id="taskDesc" rows="3"
                            class="input-field w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 transition-smooth resize-none"
                            placeholder="Detalhes sobre a tarefa..."></textarea>
                    </div>

                    <button type="submit" id="addTaskBtn" class="btn-primary w-full sm:w-auto text-white font-semibold py-2.5 px-8 rounded-lg">
                        Adicionar Tarefa
                    </button>
                </form>
            </section>

            <!-- Task list -->
            <section>
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-base font-semibold text-white flex items-center gap-2">
                        <svg class="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                        </svg>
                        Suas Tarefas
                    </h2>
                    <span class="text-xs text-slate-500 font-medium">${userTodos.length} tarefa${userTodos.length !== 1 ? 's' : ''}</span>
                </div>
                ${todosHTML}
            </section>
        </div>
    `;
}

function renderTaskCard(todo, index) {
    const typeBadge = getTypeBadge(todo.type);
    const doneClass = todo.done ? 'task-done' : '';
    const delay = Math.min(index * 60, 400);

    return `
        <div class="glass-light rounded-xl p-5 ${doneClass} transition-smooth" style="animation-delay: ${delay}ms;">
            <div class="flex items-start justify-between gap-4">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2.5 mb-1.5 flex-wrap">
                        <h3 class="task-title text-white font-medium text-[15px] leading-snug">${escapeHTML(todo.title)}</h3>
                        <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold tracking-wide uppercase ${typeBadge}">
                            ${escapeHTML(todo.type)}
                        </span>
                    </div>
                    ${todo.description
                        ? `<p class="task-desc text-slate-400 text-sm leading-relaxed mt-1">${escapeHTML(todo.description)}</p>`
                        : ''
                    }
                </div>
                <div class="flex-shrink-0 pt-0.5">
                    ${todo.done
                        ? `<span class="inline-flex items-center gap-1 text-emerald-400/70 text-xs font-medium">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                </svg>
                                Concluída
                           </span>`
                        : `<button data-complete-id="${todo.id}" class="complete-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/30 text-emerald-400 text-xs font-medium transition-smooth cursor-pointer">
                                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                </svg>
                                Concluir
                           </button>`
                    }
                </div>
            </div>
        </div>
    `;
}

// ============================================================
// Helpers
// ============================================================

function getTypeBadge(type) {
    const badges = {
        'Trabalho': 'bg-sky-500/15 text-sky-300 border border-sky-500/20',
        'Pessoal':  'bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/20',
        'Estudos':  'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
    };
    return badges[type] || badges['Trabalho'];
}

function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia! ☀️';
    if (h < 18) return 'Boa tarde! 🌤️';
    return 'Boa noite! 🌙';
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function showInlineError(id, show) {
    const el = document.getElementById(id);
    if (!el) return;
    if (show) el.classList.remove('hidden');
    else el.classList.add('hidden');
}

function showGeneralError(id, message) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.classList.remove('hidden');
}

function hideGeneralError(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}

// ============================================================
// Event Handlers
// ============================================================

function setupLoginEvents() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        let valid = true;
        hideGeneralError('loginError');

        if (!email) { showInlineError('loginEmailErr', true); valid = false; }
        else { showInlineError('loginEmailErr', false); }

        if (!password) { showInlineError('loginPasswordErr', true); valid = false; }
        else { showInlineError('loginPasswordErr', false); }

        if (!valid) return;

        const db = getDB();
        const user = db.users.find(u => u.email === email);

        if (!user) {
            showGeneralError('loginError', 'E-mail não encontrado. Verifique ou crie uma conta.');
            return;
        }

        if (user.password !== password) {
            showGeneralError('loginError', 'Senha incorreta. Tente novamente.');
            return;
        }

        setCurrentUser({ id: user.id, name: user.name, email: user.email });
        window.location.hash = '';
        render();
    });
}

function setupRegisterEvents() {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value.trim();

        let valid = true;
        hideGeneralError('registerError');

        if (!name) { showInlineError('regNameErr', true); valid = false; }
        else { showInlineError('regNameErr', false); }

        if (!email) { showInlineError('regEmailErr', true); valid = false; }
        else { showInlineError('regEmailErr', false); }

        if (!password) { showInlineError('regPasswordErr', true); valid = false; }
        else { showInlineError('regPasswordErr', false); }

        if (!valid) return;

        const db = getDB();

        if (db.users.some(u => u.email === email)) {
            showGeneralError('registerError', 'Este e-mail já está cadastrado. Tente fazer login.');
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
        };

        db.users.push(newUser);
        saveDB(db);

        setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email });
        window.location.hash = '';
        render();
    });
}

function setupDashboardEvents(user) {
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        clearCurrentUser();
        window.location.hash = '#login';
        render();
    });

    // Add task
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('taskTitle').value.trim();
        const type = document.getElementById('taskType').value;
        const description = document.getElementById('taskDesc').value.trim();

        hideGeneralError('taskError');

        if (!title) {
            showInlineError('taskTitleErr', true);
            return;
        }
        showInlineError('taskTitleErr', false);

        const db = getDB();
        const newTodo = {
            id: Date.now(),
            userId: user.email,
            title,
            type,
            description,
            done: false,
        };

        db.todos.push(newTodo);
        saveDB(db);
        render();
    });

    // Complete task (event delegation)
    document.addEventListener('click', handleCompleteClick);
}

function handleCompleteClick(e) {
    const btn = e.target.closest('[data-complete-id]');
    if (!btn) return;

    const todoId = Number(btn.dataset.completeId);
    const db = getDB();
    const todo = db.todos.find(t => t.id === todoId);

    if (todo) {
        todo.done = true;
        saveDB(db);
        render();
    }
}

// ============================================================
// Bootstrap
// ============================================================

window.addEventListener('hashchange', render);

document.addEventListener('DOMContentLoaded', () => {
    initDB();
    render();
});

// Clean up delegated listener on re-renders
document.removeEventListener('click', handleCompleteClick);
