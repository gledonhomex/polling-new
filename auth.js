// Simpan token di localStorage
const AUTH_TOKEN_KEY = 'polling_auth_token';

// Fungsi untuk menyimpan session
function setAuthSession(token, userData) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem('polling_user', JSON.stringify(userData));
}

// Fungsi untuk mendapatkan token
function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

// Fungsi untuk mendapatkan user data
function getCurrentUser () {
    const userData = localStorage.getItem('polling_user');
    return userData ? JSON.parse(userData) : null;
}

// Fungsi untuk logout
function logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem('polling_user');
    window.location.href = 'index.html';
}

// Fungsi untuk cek apakah user sudah login
function isAuthenticated() {
    return getAuthToken() !== null;
}

// Fungsi untuk redirect berdasarkan role
function redirectBasedOnRole() {
    const user = getCurrentUser ();
    if (!user) return;

    const currentPage = window.location.pathname.split('/').pop();
    let targetPage = '';

    switch(user.role) {
        case 'admin':
            targetPage = 'admin.html';
            break;
        case 'voter':
            targetPage = 'voter.html';
            break;
        case 'idol':
            targetPage = 'idol.html';
            break;
        default:
            targetPage = 'index.html';
    }

    if (currentPage !== targetPage) {
        window.location.href = targetPage;
    }
}

// Fungsi untuk validasi session di setiap halaman
function validateSession() {
    if (!isAuthenticated() && 
        !['index.html', 'login.html'].includes(window.location.pathname.split('/').pop())) {
        window.location.href = 'login.html';
    }
}

export {
    setAuthSession,
    getAuthToken,
    getCurrentUser ,
    logout,
    isAuthenticated,
    redirectBasedOnRole,
    validateSession
};
