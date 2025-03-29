<script setup>
import { ref } from 'vue';
import { User } from "@/service/user.js";

const formData = ref({
  email: '',
  password: '',
  rememberMe: false
});

const errors = ref({
  email: '',
  password: ''
});

const showPassword = ref(false);
const isSubmitting = ref(false);

const validateField = (field, value) => {
  switch(field) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errors.value.email = emailRegex.test(value) ? '' : 'Veuillez entrer un email valide';
      break;
    case 'password':
      errors.value.password = value.length >= 4 ? '' : 'Le mot de passe doit contenir au moins 8 caractères';
      break;
  }
};

const handleSubmit = async () => {
  // Validation des champs
  validateField('email', formData.value.email);
  validateField('password', formData.value.password);

  // Vérification des erreurs
  const hasErrors = Object.values(errors.value).some(error => error !== '');

  if (!hasErrors) {
    isSubmitting.value = true;
    try {
      const form = new FormData();
      form.append('username', formData.value.email);
      form.append('password', formData.value.password);

      const userService = new User();
      const response = await userService.login(form);

      console.log('Connexion réussie:', response);
      // Redirection ou traitement après connexion...

    } catch (error) {
      console.error('Échec de la connexion:', error);
      errors.value.email = 'Identifiants incorrects';
      errors.value.password = 'Identifiants incorrects';
    } finally {
      isSubmitting.value = false;
    }
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
  const passwordInput = document.getElementById('userPassword');
  if (passwordInput) {
    passwordInput.type = showPassword.value ? 'text' : 'password';
  }
};
</script>

<template>
  <div class="bg-base-100 w-full rounded-lg shadow-base-300/20 shadow-sm">
    <h5 class="bg-base-300/10 rounded-t-lg p-4 text-xl font-bold">Connexion</h5>
    <div class="w-full p-4">
      <form @submit.prevent="handleSubmit" class="needs-validation peer grid gap-y-4" novalidate>
        <div>
          <label class="label-text" for="userEmail">Email</label>
          <input
            id="userEmail"
            v-model="formData.email"
            @blur="validateField('email', formData.email)"
            type="email"
            class="input"
            placeholder="john@gmail.com"
            :class="{ 'border-error': errors.email }"
            required
          />
          <span v-if="errors.email" class="text-error text-sm mt-1 block">{{ errors.email }}</span>
          <span v-else-if="formData.email" class="text-success text-sm mt-1 block">Valide</span>
        </div>

        <div>
          <label class="label-text" for="userPassword">Mot de passe</label>
          <div class="input" :class="{ 'border-error': errors.password }">
            <input
              id="userPassword"
              v-model="formData.password"
              @blur="validateField('password', formData.password)"
              :type="showPassword ? 'text' : 'password'"
              class="grow"
              placeholder="Entrez votre mot de passe"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="my-auto ms-4 block cursor-pointer"
            >
              <span v-if="showPassword" class="icon-[tabler--eye] text-base-content/80 size-4 shrink-0"></span>
              <span v-else class="icon-[tabler--eye-off] text-base-content/80 size-4 shrink-0"></span>
            </button>
          </div>
          <span v-if="errors.password" class="text-error text-sm mt-1 block">{{ errors.password }}</span>
          <span v-else-if="formData.password" class="text-success text-sm mt-1 block">Valide</span>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              id="rememberMe"
              v-model="formData.rememberMe"
              class="checkbox checkbox-primary"
            />
            <label class="label-text text-base" for="rememberMe">Se souvenir de moi</label>
          </div>
          <router-link to="/mot-de-passe-oublie" class="text-sm link link-primary">
            Mot de passe oublié ?
          </router-link>
        </div>

        <div class="mt-4">
          <button
            type="submit"
            name="submitButton"
            class="btn btn-primary w-full"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="loading loading-spinner"></span>
            {{ isSubmitting ? 'Connexion en cours...' : 'Se connecter' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
