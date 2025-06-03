async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('loginError');
    
    errorElement.textContent = 'Sedang memproses...';
    
    try {
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbwo9QqACPfNSFi74Ra99gyKnbM4gpou0ykImQ8IjqiCOgpCLoFZ_HYKWA-HpRIB4oX9yA/exec';
        
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'login',
                username: username,
                password: password
                // key: 'aodhoaidjwodjoijdiwjdad' // Untuk sementara di nonaktifkan
            }),
            redirect: 'follow'
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
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Login error:', error);
        errorElement.textContent = error.message || 'Login gagal. Cek koneksi dan coba lagi.';
    }
}
