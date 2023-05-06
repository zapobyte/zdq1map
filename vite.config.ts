import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      devOptions: {
        enabled: true
      },
      includeAssets: ['/favicon.ico'],
      manifestFilename: 'manifest.json',
      manifest: {
        name: 'zDQMap',
        short_name: 'zDQMap',
        description: ' Full interactive map, Walkthrough, Game Information and Resources, FAQ ',
        theme_color: '#222',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-chrome-pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})