import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Replace 3000 with your preferred port
  },
  base: '/TicTacToe_Game/', // Set the base path to your GitHub repository name
});
