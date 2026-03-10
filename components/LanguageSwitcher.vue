<template>
  <button
    @click="toggle"
    class="lang-toggle"
    :class="{ 'is-en': locale === 'en' }"
  >
    <span class="lang-track">
      <span class="lang-item">
        <span class="code">FR</span>
      </span>
      <span class="lang-divider"></span>
      <span class="lang-item">
        <span class="code">EN</span>
      </span>
      <span class="lang-indicator"></span>
    </span>
  </button>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();
const toggle = () => setLocale(locale.value === "fr" ? "en" : "fr");
</script>

<style scoped>
.lang-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  outline: none;
}

.lang-track {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
  background: rgba(31, 41, 55, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.6);
  border-radius: 10px;
  padding: 3px;
  transition: border-color 0.3s ease;
}

.lang-toggle:hover .lang-track {
  border-color: rgba(20, 184, 166, 0.5);
}

.lang-item {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 7px;
  transition: color 0.3s ease;
}

.flag {
  font-size: 14px;
  line-height: 1;
}

.code {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: rgb(156, 163, 175);
  transition: color 0.3s ease;
}

/* Indicateur glissant */
.lang-indicator {
  position: absolute;
  top: 3px;
  left: 3px;
  width: calc(50% - 5px);
  bottom: 3px;
  background: linear-gradient(
    135deg,
    rgba(20, 184, 166, 0.2),
    rgba(20, 184, 166, 0.1)
  );
  border: 1px solid rgba(20, 184, 166, 0.4);
  border-radius: 7px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 8px rgba(20, 184, 166, 0.15);
}

/* Langue active = EN → slide à droite */
.lang-toggle.is-en .lang-indicator {
  transform: translateX(calc(100% + 4px));
}

/* Code de la langue active en teal */
.lang-toggle:not(.is-en) .lang-item:first-child .code,
.lang-toggle.is-en .lang-item:last-child .code {
  color: rgb(20, 184, 166);
}

.lang-divider {
  width: 1px;
  height: 14px;
  background: rgba(75, 85, 99, 0.5);
  flex-shrink: 0;
}
</style>
