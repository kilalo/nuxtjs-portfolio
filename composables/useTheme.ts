export const useTheme = () => {
  const isDark = useState('theme-dark', () => true)

  const apply = (dark: boolean) => {
    if (!process.client) return
    document.documentElement.classList.toggle('light-mode', !dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  const toggle = () => {
    isDark.value = !isDark.value
    apply(isDark.value)
  }

  const init = () => {
    if (!process.client) return
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = saved ? saved === 'dark' : true
    isDark.value = dark
    apply(dark)
  }

  return { isDark, toggle, init }
}
