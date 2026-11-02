<template>
  <div class="lang-switch">
    <NuxtLink
      :to="switchLocalePath('fr')"
      hreflang="fr"
      lang="fr"
      class="lang-btn"
      :class="{ active: locale === 'fr' }"
      :aria-current="locale === 'fr' ? 'true' : undefined"
    >
      FR
    </NuxtLink>
    <span class="lang-sep"></span>
    <NuxtLink
      :to="switchLocalePath('en')"
      hreflang="en"
      lang="en"
      class="lang-btn"
      :class="{ active: locale === 'en' }"
      :aria-current="locale === 'en' ? 'true' : undefined"
    >
      EN
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<style scoped>
.lang-switch {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px 4px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition: border-color 0.2s ease, background 0.3s ease;
}

.lang-switch:hover {
  border-color: rgba(20, 184, 166, 0.3);
}

.lang-btn {
  position: relative;
  padding: 4px 9px;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #475569;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
  line-height: 1;
}

.lang-btn:hover:not(.active) {
  color: #94a3b8;
}

.lang-btn.active {
  color: #14b8a6;
  background: rgba(20, 184, 166, 0.12);
}

.lang-sep {
  width: 1px;
  height: 12px;
  background: rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  transition: background 0.3s ease;
}

/* Light mode */
:global(html.light-mode) .lang-switch {
  background: rgba(15, 23, 42, 0.04);
  border-color: rgba(15, 23, 42, 0.1);
}

:global(html.light-mode) .lang-switch:hover {
  border-color: rgba(13, 148, 136, 0.35);
}

:global(html.light-mode) .lang-btn {
  color: #94a3b8;
}

:global(html.light-mode) .lang-btn:hover:not(.active) {
  color: #64748b;
}

:global(html.light-mode) .lang-btn.active {
  color: #0d9488;
  background: rgba(13, 148, 136, 0.1);
}

:global(html.light-mode) .lang-sep {
  background: rgba(15, 23, 42, 0.1);
}
</style>
