import { 
    setAuthSession, 
    getCurrentUser , 
    logout, 
    validateSession,
    redirectBasedOnRole
} from './auth.js';

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    validateSession();
    setupEventListeners();
    
    if (isAuthenticated()) {
        redirectBasedOnRole();
        loadPageContent();
    }
});

// Setup event listeners
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

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('https://your-backend-api.com', { // Ganti dengan URL Web App Anda
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'login', username, password, key: 'YOUR_SECURE_API_KEY' }), // Ganti dengan API key Anda
            credentials: 'same-origin'
        });
        
        if (!response.ok) throw new Error('Login failed');
        
        const data = await response.json();
        
        if (data.token && data.user) {
            setAuthSession(data.token, data.user);
            redirectBasedOnRole();
        } else {
            throw new Error('Invalid response from server');
        }
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('loginError').textContent = 'Login gagal. Cek username dan password.';
    }
}

// Load page content berdasarkan role
function loadPageContent() {
    const user = getCurrentUser ();
    if (!user) return;
    
    // Load content sesuai role
    if (user.role === 'admin') {
        loadAdminContent();
    } else if (user.role === 'voter') {
        loadVoterContent();
    }
    // ... lainnya
}
