<script setup>
import { RouterView } from 'vue-router'
import Header from "@/components/partials/Header.vue";
</script>

<template>
  <header>
    <Header/>
  </header>
  <main class="container mx-auto mt-5">
    <RouterView />
  </main>
</template>

<style scoped>
</style>
