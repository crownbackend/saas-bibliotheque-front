<script setup>

import {RouterLink} from "vue-router";
import {useUserStore} from "@/stores/user.js";
import {computed} from 'vue'

const userStore = useUserStore()
const user = userStore.getUser
const isLoggedIn = computed(() => !!userStore.user.token); // ou autre champ
</script>

<template>
  <nav class="navbar bg-base-100 rounded-box shadow-base-300/20 shadow-sm">
    <div class="flex flex-1 items-center">
      <RouterLink class="link text-base-content link-neutral text-xl font-bold no-underline" :to="{name: 'home'}">
        FlyonUI
      </RouterLink>
    </div>
    <div class="navbar-end flex items-center gap-4">
      <div class="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
        <button id="dropdown-scrollable" type="button" class="dropdown-toggle btn btn-text btn-circle dropdown-open:bg-base-content/10 size-10" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
          <div class="indicator">
            <span class="indicator-item bg-error size-2 rounded-full"></span>
            <span class="icon-[tabler--bell] text-base-content size-5.5"></span>
          </div>
        </button>
        <div class="dropdown-menu dropdown-open:opacity-100 hidden" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-scrollable">
          <div class="dropdown-header justify-center">
            <h6 class="text-base-content text-base">Notifications</h6>
          </div>
          <div class="overflow-auto text-base-content/80 max-h-56 max-md:max-w-60">
            <div class="dropdown-item">
              <div class="avatar avatar-away-bottom">
                <div class="w-10 rounded-full">
                  <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar 1" />
                </div>
              </div>
              <div class="w-60">
                <h6 class="truncate text-base">Charles Franklin</h6>
                <small class="text-base-content/50 truncate">Accepted your connection</small>
              </div>
            </div>
            <div class="dropdown-item">
              <div class="avatar">
                <div class="w-10 rounded-full">
                  <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png" alt="avatar 2" />
                </div>
              </div>
              <div class="w-60">
                <h6 class="truncate text-base">Martian added moved Charts & Maps task to the done board.</h6>
                <small class="text-base-content/50 truncate">Today 10:00 AM</small>
              </div>
            </div>
            <div class="dropdown-item">
              <div class="avatar avatar-online-bottom">
                <div class="w-10 rounded-full">
                  <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-8.png" alt="avatar 8" />
                </div>
              </div>
              <div class="w-60">
                <h6 class="truncate text-base">New Message</h6>
                <small class="text-base-content/50 truncate">You have new message from Natalie</small>
              </div>
            </div>
            <div class="dropdown-item">
              <div class="avatar avatar-placeholder">
                <div class="bg-neutral text-neutral-content w-10 rounded-full p-2">
                  <span class="icon-[tabler--user] size-full"></span>
                </div>
              </div>
              <div class="w-60">
                <h6 class="truncate text-base">Application has been approved 🚀</h6>
                <small class="text-base-content/50 text-wrap">Your ABC project application has been approved.</small>
              </div>
            </div>
            <div class="dropdown-item">
              <div class="avatar">
                <div class="w-10 rounded-full">
                  <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-10.png" alt="avatar 10" />
                </div>
              </div>
              <div class="w-60">
                <h6 class="truncate text-base">New message from Jane</h6>
                <small class="text-base-content/50 text-wrap">Your have new message from Jane</small>
              </div>
            </div>
            <div class="dropdown-item">
              <div class="avatar">
                <div class="w-10 rounded-full">
                  <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-3.png" alt="avatar 3" />
                </div>
              </div>
              <div class="w-60">
                <h6 class="truncate text-base">Barry Commented on App review task.</h6>
                <small class="text-base-content/50 truncate">Today 8:32 AM</small>
              </div>
            </div>
          </div>
          <a href="#" class="dropdown-footer justify-center gap-1">
            <span class="icon-[tabler--eye] size-4"></span>
            View all
          </a>
        </div>
      </div>
      <div v-if="!isLoggedIn">
        <RouterLink class="link link-neutral mr-2" :to="{name: 'register'}">Inscription</RouterLink>
        <RouterLink class="link link-primary" :to="{name: 'login'}">Connexion</RouterLink>
      </div>
      <div v-else>
        {{ user.email }}
        <button v-if="isLoggedIn" @click="userStore.reset" class="btn btn-primary">Déconnexion</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>
