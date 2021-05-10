export default {
    template: `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">NNDDCC</a>
    <div>
        <ul class="navbar-nav mr-auto">
            <li class="nav-item" :class="{active: $route.name == 'selectshow'}">
                <router-link :to="{name: 'selectshow'}" class="nav-link">
                    Select Show
                </router-link>
            </li>
        </ul>
    </div>
</nav>
<br />
<router-view />
`,
    components: {
    }
}