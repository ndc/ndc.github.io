import { createRouter, createWebHashHistory } from './vue-router.esm-browser.js'
import SelectShow from './selectshow.js'

const routes = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: { name: 'selectshow' }
        },
        {
            path: '/selectshow',
            name: 'selectshow',
            component: SelectShow
        }
    ]
});

export default routes;
