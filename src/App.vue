<template>
  <header class="app-header">
    <nav>
      <RouterLink to="/">{{ $t('nav.editor') }}</RouterLink>
      <RouterLink to="/settings">{{ $t('nav.settings') }}</RouterLink>
      <RouterLink to="/about">{{ $t('nav.about') }}</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-header nav {
  display: flex;
  gap: 1rem;
  padding: 0.75rem 1rem;
}
</style>
