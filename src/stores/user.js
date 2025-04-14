import {defineStore} from "pinia";
import {ref, computed} from "vue";

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    token: null
  })

  function setInfo(data) {
    user.value.id = data.id
    user.value.email = data.email
    user.value.firstName = data.firstName
    user.value.lastName = data.lastName
    user.value.token = data.token
  }

  function reset() {
    user.value = {
      id: null,
      email: null,
      firstName: null,
      lastName: null,
      token: null
    }
    // Supprime du localStorage
    localStorage.removeItem('pinia-user')
  }

  const getUser = computed(() => user.value);
  function getToken() {
    return user.value.token || null;
  }

  return {user, setInfo, getToken, getUser, reset}
}, {
  persist: true,
});
