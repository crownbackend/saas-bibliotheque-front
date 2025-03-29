<script setup>
import { ref } from 'vue';
import {User} from "@/service/user.js";

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  agreeTerms: false
});

const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  agreeTerms: ''
});

const showPassword = ref(false);
const isSubmitting = ref(false);

const validateField = (field, value) => {
  switch(field) {
    case 'firstName':
      errors.value.firstName = value.trim() ? '' : 'Veuillez entrer votre prénom';
      break;
    case 'lastName':
      errors.value.lastName = value.trim() ? '' : 'Veuillez entrer votre nom';
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errors.value.email = emailRegex.test(value) ? '' : 'Veuillez entrer un email valide';
      break;
    case 'password':
      errors.value.password = value.length >= 4 ? '' : 'Le mot de passe doit contenir au moins 8 caractères';
      break;
    case 'agreeTerms':
      errors.value.agreeTerms = value ? '' : 'Veuillez accepter les conditions générales';
      break;
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();

  // Validation de tous les champs
  validateField('firstName', formData.value.firstName);
  validateField('lastName', formData.value.lastName);
  validateField('email', formData.value.email);
  validateField('password', formData.value.password);
  validateField('agreeTerms', formData.value.agreeTerms);

  // Vérification des erreurs
  const hasErrors = Object.values(errors.value).some(error => error !== '');

  if (!hasErrors) {
    isSubmitting.value = true;
    try {
      const form = new FormData();
      form.append('email', formData.value.email);
      form.append('password', formData.value.password);
      form.append('firstName', formData.value.firstName);
      form.append('lastName', formData.value.lastName);
      const userService = new User
      const user = await userService.register(form)
      console.log(user)
    } catch (error) {
      console.error('Échec de l\'inscription:', error);
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
    <h5 class="bg-base-300/10 rounded-t-lg p-4 text-xl font-bold">Inscription</h5>
    <div class="w-full p-4">
      <form @submit="handleSubmit" class="needs-validation peer grid gap-y-4" novalidate>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label class="label-text" for="firstName">Nom</label>
            <input
              id="firstName"
              v-model="formData.firstName"
              @blur="validateField('firstName', formData.firstName)"
              type="text"
              placeholder="John"
              class="input"
              :class="{ 'border-error': errors.firstName }"
              required
            />
            <span v-if="errors.firstName" class="text-error text-sm mt-1 block">{{ errors.firstName }}</span>
            <span v-else-if="formData.firstName" class="text-success text-sm mt-1 block">Valide</span>
          </div>
          <div>
            <label class="label-text" for="lastName">Prénom</label>
            <input
              id="lastName"
              v-model="formData.lastName"
              @blur="validateField('lastName', formData.lastName)"
              type="text"
              placeholder="Doe"
              class="input"
              :class="{ 'border-error': errors.lastName }"
              required
            />
            <span v-if="errors.lastName" class="text-error text-sm mt-1 block">{{ errors.lastName }}</span>
            <span v-else-if="formData.lastName" class="text-success text-sm mt-1 block">Valide</span>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
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
        </div>

        <div>
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              id="userAgre"
              v-model="formData.agreeTerms"
              @change="validateField('agreeTerms', formData.agreeTerms)"
              class="checkbox checkbox-primary"
              required
            />
            <label class="label-text text-base" for="userAgre">J'accepte les conditions générales</label>
          </div>
          <span v-if="errors.agreeTerms" class="text-error text-sm mt-1 block">{{ errors.agreeTerms }}</span>
          <span v-else-if="formData.agreeTerms" class="text-success text-sm mt-1 block">Valide</span>
        </div>

        <div class="mt-4">
          <button
            type="submit"
            name="submitButton"
            class="btn btn-primary"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="loading loading-spinner"></span>
            {{ isSubmitting ? 'Traitement...' : 'S\'inscrire' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
