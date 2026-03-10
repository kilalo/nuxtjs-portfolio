<template>
  <button
    @click="toggle"
    class="theme-toggle-btn"
    :aria-label="isDark ? 'Mode clair' : 'Mode sombre'"
    :title="isDark ? 'Mode clair' : 'Mode sombre'"
  >
    <Transition name="theme-icon" mode="out-in">
      <i v-if="isDark" key="sun" class="fas fa-sun"></i>
      <i v-else key="moon" class="fas fa-moon"></i>
    </Transition>
  </button>
</template>

<script setup lang="ts">
const { isDark, toggle } = useTheme()
</script>

<style scoped>
.theme-toggle-btn {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #64748b;
  font-size: 13px;
  transition: all 0.2s ease;
  cursor: pointer;
  flex-shrink: 0;
}

.theme-toggle-btn:hover {
  border-color: rgba(20, 184, 166, 0.35);
  color: #14b8a6;
  background: rgba(20, 184, 166, 0.07);
}

/* Light mode styles */
:global(html.light-mode) .theme-toggle-btn {
  border-color: rgba(15, 23, 42, 0.12);
  background: rgba(15, 23, 42, 0.04);
  color: #64748b;
}

:global(html.light-mode) .theme-toggle-btn:hover {
  border-color: rgba(20, 184, 166, 0.4);
  color: #0d9488;
  background: rgba(20, 184, 166, 0.08);
}

/* Icon transition */
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-30deg) scale(0.8);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(30deg) scale(0.8);
}
</style>
