// --- ESTADO DE AUTENTICACIÓN (LOCALSTORAGE) ---
let isRegistering = false;

const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authBtn = document.getElementById('auth-btn');
const toggleAuth = document.getElementById('toggle-auth');
const toggleMsg = document.getElementById('toggle-msg');

const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');

// Cambiar entre Formulario de Inicio de Sesión y Registro
toggleAuth.addEventListener('click', (e) => {
  e.preventDefault();
  isRegistering = !isRegistering;
  if (isRegistering) {
    authTitle.textContent = 'Crear Cuenta';
    authBtn.textContent = 'Registrarse';
    toggleMsg.textContent = '¿Ya tienes cuenta?';
    toggleAuth.textContent = 'Inicia sesión aquí';
  } else {
    authTitle.textContent = 'Iniciar Sesión';
    authBtn.textContent = 'Entrar';
    toggleMsg.textContent = '¿No tienes cuenta?';
    toggleAuth.textContent = 'Regístrate aquí';
  }
});

// Manejo de Registro e Inicio de Sesión
authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();

  const users = JSON.parse(localStorage.getItem('app_users') || '{}');

  if (isRegistering) {
    if (users[user]) {
      alert('El usuario ya existe.');
      return;
    }
    users[user] = pass;
    localStorage.setItem('app_users', JSON.stringify(users));
    alert('Cuenta creada exitosamente. Ahora inicia sesión.');
    toggleAuth.click();
  } else {
    if (users[user] && users[user] === pass) {
      localStorage.setItem('current_user', user);
      loadApp();
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }
});

function loadApp() {
  authContainer.classList.add('hidden');
  appContainer.classList.remove('hidden');
}

function logout() {
  localStorage.removeItem('current_user');
  location.reload();
}

// Comprobar sesión activa al cargar
if (localStorage.getItem('current_user')) {
  loadApp();
}

// --- NAVEGACIÓN ENTRE PESTAÑAS ---
function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));
  
  const targetTab = document.getElementById(`tab-${tabName}`);
  if (targetTab) {
    targetTab.classList.add('active');
  }
}

// --- FUNCIONALIDAD DE BÚSQUEDA (DUCKDUCKGO) ---
function searchWeb() {
  const query = document.getElementById('search-query').value.trim();
  const frame = document.getElementById('search-frame');
  
  if (query) {
    frame.src = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
  } else {
    frame.src = `https://duckduckgo.com/`;
  }
}

// --- MÓDULO ABOUT:BLANK CLOAKING ---
function openAboutBlank() {
  const win = window.open('about:blank', '_blank');
  if (!win) {
    alert('Por favor, permite los pop-ups para ejecutar esta función.');
    return;
  }

  const doc = win.document;
  doc.title = 'Classes'; // Título para camuflaje

  const iframe = doc.createElement('iframe');
  iframe.style.width = '100vw';
  iframe.style.height = '100vh';
  iframe.style.border = 'none';
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  
  iframe.src = window.location.href;

  doc.body.style.margin = '0';
  doc.body.style.padding = '0';
  doc.body.appendChild(iframe);
}