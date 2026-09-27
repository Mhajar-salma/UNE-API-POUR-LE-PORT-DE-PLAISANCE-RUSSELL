// Fonction utilitaire pour appeler l'API avec le token si disponible
async function apiCall(url, method = 'GET', body = null) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  const data = await res.json();
  return { status: res.status, data };
}

// Vérifie si l'utilisateur est connecté, sinon redirige vers l'accueil
function requireAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/';
  }
}

// Déconnexion
function logout() {
  localStorage.removeItem('token');
  window.location.href = '/';
}
