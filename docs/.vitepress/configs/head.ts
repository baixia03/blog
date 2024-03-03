import type { HeadConfig } from 'vitepress'

export const head: HeadConfig[] = [
  ['link', { rel: 'pngn', href: '/favicon.png' }],
  ['meta', { name: 'theme-color', content: '#5f67ee' }],
  ['meta', { name: 'og:type', content: 'website' }],
  ['meta', { name: 'og:locale', content: 'zh-CN' }],
  ['meta', { name: 'og:site_name', content: 'VitePress' }],

  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['link', { rel: 'apple-touch-pngn', href: '/favicon.png' }],
  ['meta', { name: 'msapplication-TileImage', content: '/favicon.png' }],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
]
