// auth.js
const AUTH_TOKEN_KEY = 'polling_auth_token';

// Session management
export function setAuthSession(token, userData) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem('polling_user', JSON.stringify(userData));
}

export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getCurrentUser() {
    const userData = localStorage.getItem('polling_user');
    return userData ? JSON.parse(userData) : null;
}

export function logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem('polling_user');
    window.location.href = 'index.html';
}

export function isAuthenticated() {
    return getAuthToken() !== null;
}

export function redirectBasedOnRole() {
    const user = getCurrentUser();
    if (!user) return;

    const currentPage = window.location.pathname.split('/').pop();
    const rolePages = {
        'admin': 'admin.html',
        'voter': 'voter.html',
        'idol': 'idol.html'
    };

    const targetPage = rolePages[user.role] || 'index.html';

    if (currentPage !== targetPage) {
        window.location.href = targetPage;
    }
}

export function validateSession() {
    const allowedPages = ['index.html', 'login.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!isAuthenticated() && !allowedPages.includes(currentPage)) {
        window.location.href = 'login.html';
    }
}
