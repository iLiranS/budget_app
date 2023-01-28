import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA(
      {
        devOptions:{enabled:true},
        includeAssets: ['/icons/icon_192x192.png', '/icons/icon_512x512.png','./icons/maskable_icon.png'],
        manifest: {
          name: 'Budgeting App',
          short_name: 'Budget app',
          description: 'My Budgeting App',
          
          theme_color: '#ffffff',
          icons: [
            {
              src: '/icons/icon_192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/icons/icon_512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: '/icons/maskable_icon.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      }
    )
  ],
  server:{
    port:3000,
    host:true
  },
  
})
