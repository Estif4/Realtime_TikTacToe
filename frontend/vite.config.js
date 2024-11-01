import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [react()],
  base: '/TicTacToe_Game/', // Ensure this matches your GitHub repo name
});
