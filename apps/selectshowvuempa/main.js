import * as Vue from 'https://cdn.jsdelivr.net/npm/vue@3.0.11/dist/vue.esm-browser.js'
import SelectShow from './selectshow.js'

Vue.createApp({
    template: `
<SelectShow></SelectShow>
`,
    components: {
        SelectShow
    }
}).mount("#app");