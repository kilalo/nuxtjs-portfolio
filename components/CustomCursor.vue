<template>
  <div v-if="active" class="cursor-root" aria-hidden="true">
    <div class="cursor-dot" :class="{ hover: isHovering }"></div>
    <div class="cursor-ring" :class="{ hover: isHovering, click: isClicking }"></div>
  </div>
</template>

<script setup lang="ts">
const active = ref(false)
const isHovering = ref(false)
const isClicking = ref(false)

onMounted(() => {
  if (!window.matchMedia('(pointer: fine)').matches) return

  active.value = true
  document.documentElement.classList.add('custom-cursor-active')

  let mx = window.innerWidth / 2
  let my = window.innerHeight / 2
  let rx = mx
  let ry = my
  let rafId: number

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const root = document.documentElement

  const tick = () => {
    rx = lerp(rx, mx, 0.1)
    ry = lerp(ry, my, 0.1)
    root.style.setProperty('--cx', `${mx}px`)
    root.style.setProperty('--cy', `${my}px`)
    root.style.setProperty('--rx', `${rx}px`)
    root.style.setProperty('--ry', `${ry}px`)
    rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)

  const onMove = (e: MouseEvent) => {
    mx = e.clientX
    my = e.clientY
  }

  const onOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    isHovering.value = !!target.closest('a, button, input, textarea, select, [data-hover]')
  }

  const onDown = () => { isClicking.value = true }
  const onUp = () => { isClicking.value = false }

  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseover', onOver)
  document.addEventListener('mousedown', onDown)
  document.addEventListener('mouseup', onUp)

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
    document.documentElement.classList.remove('custom-cursor-active')
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseover', onOver)
    document.removeEventListener('mousedown', onDown)
    document.removeEventListener('mouseup', onUp)
  })
})
</script>

<style>
.custom-cursor-active,
.custom-cursor-active * {
  cursor: none !important;
}
</style>

<style scoped>
.cursor-root {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
}

.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #14b8a6;
  transform: translate3d(calc(var(--cx, 50vw) - 50%), calc(var(--cy, 50vh) - 50%), 0);
  transition: width 0.2s ease, height 0.2s ease;
  will-change: transform;
}

.cursor-dot.hover {
  width: 5px;
  height: 5px;
}

.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid rgba(20, 184, 166, 0.45);
  transform: translate3d(calc(var(--rx, 50vw) - 50%), calc(var(--ry, 50vh) - 50%), 0);
  transition:
    width 0.25s ease,
    height 0.25s ease,
    border-color 0.25s ease,
    background-color 0.25s ease;
  will-change: transform;
}

.cursor-ring.hover {
  width: 54px;
  height: 54px;
  border-color: rgba(20, 184, 166, 0.7);
  background: rgba(20, 184, 166, 0.05);
}

.cursor-ring.click {
  width: 26px;
  height: 26px;
  border-color: rgba(20, 184, 166, 0.9);
}
</style>
