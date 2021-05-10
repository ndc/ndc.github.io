import { DateTime } from "https://cdn.jsdelivr.net/npm/luxon@1.26.0/src/luxon.js";
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
    props: ['showdate', 'cinema', 'movie', 'showtime', 'auditype', 'movieformat'],
    data() {
        return {
        }
    },
    methods: {
        formatDate(adate) {
            return DateTime.fromISO(adate).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
        },
    }
}