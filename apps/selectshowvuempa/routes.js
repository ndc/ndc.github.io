import { createRouter, createWebHashHistory } from './vue-router.esm-browser.js'
import SelectShow from './selectshow.js'
import SelectSeat from './selectseat.js'

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
        },
        {
            path: '/selectseat/:showdate/:cinema/:movie/:showtime/:auditype/:movieformat',
            name: 'selectseat',
            component: SelectSeat,
            props: true
        },
        {
            path: '/:catchAll(.*)',
            component: {
                template: `<h1>404 Not Found</h1>`
            }
        }
    ]
});

export default routes;
