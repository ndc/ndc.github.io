import { ref, computed } from './lib/vue.esm-browser.js'
import { DateTime } from "./lib/luxon.js";
import * as BlitzAPI from "./blitzapi.js"

export default {
    template: `
<div class="container">
    <div class="row">
        <div class="col">
            Selection: {{formatDate(showdate)}}
            {{cinema}}
            {{movie}}
            {{showtime}}
            {{movieformat}}
            {{auditype}}
        </div>
    </div>
</div>
`,
    props: {
        showdate: String,
        cinema: String,
        movie: String,
        showtime: String,
        auditype: String,
        movieformat: String
    },
    setup(props, context) {
        function formatDate(adate) {
            return DateTime.fromISO(adate).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
        }

        return { formatDate };
    }
}