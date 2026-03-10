<template>
  <div
    class="atom-logo"
    :style="{ width: `${size}px`, height: `${size}px` }"
    aria-hidden="true"
  >
    <div class="atom-logo__inner">
      <div class="atom-logo__line" :style="lineStyle"></div>
      <div class="atom-logo__line" :style="lineStyle"></div>
      <div class="atom-logo__line" :style="lineStyle"></div>
      <div class="atom-logo__dot" :style="dotStyle">●</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number
    color?: string
    duration?: number
  }>(),
  {
    size: 32,
    color: '#14b8a6',
    duration: 1200,
  },
)

const lineStyle = computed(() => ({
  animationDuration: `${props.duration}ms`,
  borderLeftWidth: `${Math.max(1, props.size / 25)}px`,
  borderTopWidth: `${Math.max(1, props.size / 25)}px`,
  borderLeftColor: props.color,
}))

const dotStyle = computed(() => ({
  color: props.color,
  fontSize: `${props.size * 0.22}px`,
}))
</script>

<style scoped>
.atom-logo,
.atom-logo * {
  box-sizing: border-box;
}

.atom-logo {
  overflow: visible;
  flex-shrink: 0;
  display: block;
}

.atom-logo__inner {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
}

.atom-logo__dot {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1;
}

.atom-logo__line {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-left-style: solid;
  border-top-style: solid;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
}

.atom-logo__line:nth-child(1) {
  animation: atom-spin-1 var(--atom-duration, 1.2s) linear infinite;
  transform: rotate(120deg) rotateX(66deg) rotate(0deg);
}

.atom-logo__line:nth-child(2) {
  animation: atom-spin-2 var(--atom-duration, 1.2s) linear infinite;
  transform: rotate(240deg) rotateX(66deg) rotate(0deg);
}

.atom-logo__line:nth-child(3) {
  animation: atom-spin-3 var(--atom-duration, 1.2s) linear infinite;
  transform: rotate(360deg) rotateX(66deg) rotate(0deg);
}

@keyframes atom-spin-1 {
  to {
    transform: rotate(120deg) rotateX(66deg) rotate(360deg);
  }
}

@keyframes atom-spin-2 {
  to {
    transform: rotate(240deg) rotateX(66deg) rotate(360deg);
  }
}

@keyframes atom-spin-3 {
  to {
    transform: rotate(360deg) rotateX(66deg) rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .atom-logo__line {
    animation-duration: 6s;
  }
}
</style>
