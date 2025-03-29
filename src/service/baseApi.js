export class BaseApiService {
  constructor(baseUrl, endpoint) {
    this.baseUrl = baseUrl || 'https://127.0.0.1:8000/api';
    this.endpoint = endpoint;
  }

  async _fetch(method, path = '', body = null) {
    const url = `${this.baseUrl}/${this.endpoint}${path}`;

    // Ne pas stringify si c'est déjà un FormData
    const isFormData = body instanceof FormData;

    const options = {
      method,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type' sera automatiquement défini pour FormData
        ...(!isFormData && {'Content-Type': 'application/json'}),
        'Authorization': `Bearer ${this._getToken()}`
      },
      body: isFormData ? body : (body ? JSON.stringify(body) : null)
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(await response.text());
      return await response.json();
    } catch (error) {
      console.error(`API Error:`, error);
      throw error;
    }
  }

  _getToken() {
    // Implémentez votre logique de récupération de token
    return localStorage.getItem('authToken');
  }

  // Méthodes CRUD de base
  async getAll() {
    return this._fetch('GET');
  }

  async getById(id) {
    return this._fetch('GET', `/${id}`);
  }

  async create(data, path) {
    return this._fetch('POST', path, data);
  }

  async update(id, path, data) {
    return this._fetch('PUT', `${path}/${id}`, data);
  }

  async delete(id) {
    return this._fetch('DELETE', `/${id}`);
  }

  // Méthode pour les requêtes custom
  async customFetch(method, path, data = null) {
    return this._fetch(method, path, data);
  }
}
