import { createApp } from 'https://cdn.jsdelivr.net/npm/vue@3.0.11/dist/vue.esm-browser.js'
import Routes from './routes.js'
import App from './app.js'

createApp(App).use(Routes).mount("#app");
