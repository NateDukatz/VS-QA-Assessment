import { defineConfig } from 'cypress'
import { verifyDownloadTasks } from 'cy-verify-downloads';

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.vistarmedia.com',
    setupNodeEvents(on, config) {
      on('task', verifyDownloadTasks);
    },
  },
})