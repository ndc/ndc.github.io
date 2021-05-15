import { createApp } from './lib/vue.esm-browser.js'
import Routes from './routes.js'
import App from './app.js'

createApp(App).use(Routes).mount("#app");
