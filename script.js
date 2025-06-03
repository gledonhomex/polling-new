// script.js
import { 
    setAuthSession, 
    getCurrentUser, 
    logout, 
    validateSession,
    redirectBasedOnRole
} from './auth.js';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    validateSession();
    setupEventListeners();
    
    if (isAuthenticated()) {
        redirectBasedOnRole();
        loadPageContent();
    }
});

function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('loginError');
    
    errorElement.textContent = '';
    
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwo9QqACPfNSFi74Ra99gyKnbM4gpou0ykImQ8IjqiCOgpCLoFZ_HYKWA-HpRIB4oX9yA/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                action: 'login', 
                username, 
                password, 
                key: 'aodhoaidjwodjoijdiwjdad' 
            })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        if (data.token && data.user) {
            setAuthSession(data.token, data.user);
            redirectBasedOnRole();
        } else {
            throw new Error('Invalid response from server');
        }
    } catch (error) {
        console.error('Login error:', error);
        errorElement.textContent = error.message || 'Login failed. Please try again.';
    }
}

function loadPageContent() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Update UI with user info
    const welcomeElement = document.querySelector('header h1');
    if (welcomeElement) {
        welcomeElement.textContent += ` - ${user.username}`;
    }
    
    // Load role-specific content
    if (user.role === 'admin') {
        loadAdminContent();
    } else if (user.role === 'voter') {
        loadVoterContent();
    }
}

function loadAdminContent() {
    const main = document.querySelector('main');
    if (main) {
        main.innerHTML = `
            <div class="dashboard-card">
                <h2>Admin Dashboard</h2>
                <p>Welcome to the admin panel. Here you can manage users and polls.</p>
            </div>
        `;
    }
}

function loadVoterContent() {
    const main = document.querySelector('main');
    if (main) {
        main.innerHTML = `
            <div class="dashboard-card">
                <h2>Voter Dashboard</h2>
                <p>Welcome to the voting panel. Here you can participate in polls.</p>
            </div>
        `;
    }
}
