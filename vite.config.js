import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// See specific instructions for github pages here: 
// https://vite.dev/guide/static-deploy.html#github-pages
export default defineConfig({
  plugins: [react()],
  base: '/pkmn-typechart-app/',
})
