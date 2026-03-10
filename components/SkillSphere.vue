<template>
  <div
    ref="containerRef"
    class="skill-sphere"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    @touchmove.prevent="onTouchMove"
  >
    <span
      v-for="(tag, i) in tags"
      :key="tag.label"
      class="skill-sphere__tag"
      :class="{ 'skill-sphere__tag--ai': tag.ai }"
      :style="styles[i]"
    >{{ tag.label }}</span>
  </div>
</template>

<script setup lang="ts">
interface Tag { label: string; ai?: boolean }
const props = defineProps<{ tags: Tag[] }>()

const containerRef = ref<HTMLElement | null>(null)
const styles = ref<Record<string, string>[]>([])

const R = 170
let rotX = 0.25
let rotY = 0
let targetX = 0.25
let targetY = 0
let autoRotate = true
let rafId = 0

// Fibonacci sphere — répartition uniforme
const basePositions = computed(() => {
  const n = props.tags.length
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  return props.tags.map((_, i) => {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = goldenAngle * i
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r }
  })
})

const rotate = (p: { x: number; y: number; z: number }, rx: number, ry: number) => {
  // Y axis
  const cosY = Math.cos(ry), sinY = Math.sin(ry)
  const x1 = p.x * cosY + p.z * sinY
  const z1 = -p.x * sinY + p.z * cosY
  // X axis
  const cosX = Math.cos(rx), sinX = Math.sin(rx)
  const y2 = p.y * cosX - z1 * sinX
  const z2 = p.y * sinX + z1 * cosX
  return { x: x1, y: y2, z: z2 }
}

const frame = () => {
  if (autoRotate) rotY += 0.004
  rotX += (targetX - rotX) * 0.06
  rotY += (targetY - rotY) * 0.06

  styles.value = basePositions.value.map((p, i) => {
    const rp = rotate(p, rotX, rotY)
    const depth = (rp.z + 1) / 2 // 0 = back, 1 = front
    const scale = 0.55 + depth * 0.7
    const opacity = 0.15 + depth * 0.85
    const isAi = props.tags[i].ai

    const color = isAi
      ? `rgba(167,243,208, ${opacity})`
      : depth > 0.6
        ? `rgba(94,234,212, ${opacity})`
        : `rgba(148,163,184, ${opacity})`

    return {
      transform: `translate(calc(-50% + ${rp.x * R}px), calc(-50% + ${rp.y * R}px))`,
      fontSize: `${Math.round(9 + scale * 6)}px`,
      opacity: String(Math.round(opacity * 100) / 100),
      color,
      zIndex: String(Math.round(depth * 100)),
      fontWeight: depth > 0.65 || isAi ? '700' : '400',
      letterSpacing: isAi ? '0.04em' : '0',
      textShadow: isAi && depth > 0.5 ? `0 0 12px rgba(52,211,153,0.6)` : 'none',
    }
  })

  rafId = requestAnimationFrame(frame)
}

const onMouseMove = (e: MouseEvent) => {
  if (!containerRef.value) return
  autoRotate = false
  const rect = containerRef.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  targetX = -((e.clientY - cy) / (rect.height / 2)) * 0.6
  targetY = ((e.clientX - cx) / (rect.width / 2)) * 0.8
}

const onMouseLeave = () => {
  autoRotate = true
  targetX = 0.25
}

const onTouchMove = (e: TouchEvent) => {
  if (!containerRef.value || !e.touches[0]) return
  const rect = containerRef.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  targetX = -((e.touches[0].clientY - cy) / (rect.height / 2)) * 0.5
  targetY += 0.03
}

onMounted(() => { rafId = requestAnimationFrame(frame) })
onUnmounted(() => { cancelAnimationFrame(rafId) })
</script>

<style scoped>
.skill-sphere {
  position: relative;
  width: 400px;
  height: 400px;
  cursor: grab;
}
.skill-sphere:active { cursor: grabbing; }

.skill-sphere__tag {
  position: absolute;
  top: 50%;
  left: 50%;
  white-space: nowrap;
  font-family: "Inter", sans-serif;
  transition: text-shadow 0.3s ease;
  user-select: none;
  pointer-events: none;
}

.skill-sphere__tag--ai {
  font-family: "Courier New", monospace;
}

@media (max-width: 480px) {
  .skill-sphere { width: 300px; height: 300px; }
}
</style>
