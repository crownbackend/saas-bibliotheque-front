import {BaseApiService} from "@/service/baseApi.js";

export class User extends BaseApiService {
  constructor(baseUrl) {
    super(baseUrl, 'users');
  }

  async register(data) {
    return this.create(data, '/register');
  }

  async login(credentials) {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: credentials,
      });

      if (!response.ok) {
        throw new Error('Identifiants incorrects');
      }

      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}
