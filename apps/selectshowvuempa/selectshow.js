import { ref, computed } from './lib/vue.esm-browser.js'
import { DateTime } from "./lib/luxon.js";
import * as BlitzAPI from "./blitzapi.js"

export default {
    template: `
<div class="container">
    <form>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label for="selectdate">Date</label>
                    <input :value="selecteddate" @change="changedate" type="date" id="selectdate" class="form-control">
                </div>
                <div class="form-group">
                    <label for="selectcity">City</label>
                    <select :value="selectedcity" @change="changecity" id="selectcity" class="form-control">
                        <option value="">-</option>
                        <option v-for="city in cities" :key="city" :value="city">{{city}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Cinema</label>
                    <div v-for="cinema in cinemas" :key="cinema.code" class="form-check">
                        <input name="selectcinemagroup" :value="cinema.code" @change="changecinema" :id="'selectcinema' + cinema.code" type="radio"
                            class="form-check-input">
                        <label :for="'selectcinema' + cinema.code" class="form-check-label">{{cinema.name}}</label>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label>Movie</label>
                    <div v-for="movie in movies" :key="movie.code" class="form-check">
                        <input name="selectmoviegroup" :value="movie.code" @change="changemovie" :id="'selectmovie' + movie.code" type="radio"
                            class="form-check-input">
                        <label :for="'selectmovie' + movie.code" class="form-check-label">{{movie.title}}</label>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label>Show</label>
                    <div v-for="show in shows" :key="show.id" class="form-check">
                        <input name="selectshowgroup" :value="show.id" @change="changeshow(show)" :id="'selectshow' + show.id"
                            type="radio" class="form-check-input">
                        <label :for="'selectshow' + show.id" class="form-check-label">
                            {{show.showtime}} {{formatMovieFormat(show.movieformat)}} {{formatAudiType(show.auditype)}} {{show.price}}</label>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <div class="row">
        <div class="col-10">
            Selection: {{formatDate(selecteddate)}}
            {{allcinemas.find(c => c.code == selectedcinema)?.name}}
            {{selectedcity}}
            {{movies.find(m => m.code == selectedmovie)?.title}}
            {{selectedshow?.showtime}}
            {{selectedshow ? formatMovieFormat(selectedshow.movieformat) : ""}}
            {{selectedshow ? formatAudiType(selectedshow.auditype) : ""}}
            {{selectedshow?.price}}
        </div>
        <div class="col">
            <router-link v-if="!!selectedshow" :to="{name: 'selectseat', params: {
                showdate: selecteddate, cinema: selectedcinema, movie: selectedmovie, showtime: selectedshow.showtime,
                auditype: selectedshow.auditype, movieformat: selectedshow.movieformat}}"
                class="btn btn-outline-primary btn-block">
                Select Seat
            </router-link>
        </div>
    </div>
</div>
`,
    components: {},
    setup() {
        const allcinemas = ref([]);
        const cities = ref([]);
        const cinemas = ref([]);
        const movies = ref([]);
        const shows = ref([]);
        const selecteddate = ref(DateTime.now().toISODate());
        const selectedcity = ref("");
        const selectedcinema = ref("");
        const selectedmovie = ref("");
        const selectedshow = ref(null);
        const lastshowid = ref(0);

        async function loadData() {
            allcinemas.value = await BlitzAPI.Cinema();
            cities.value = allcinemas.value.map(c => c.city).sort();
            cities.value = [...new Set(cities.value)];
            movies.value = await BlitzAPI.Movie();
        }

        async function changedate(event) {
            selecteddate.value = event.target.value;
            await loadShow();
        }

        async function changecity(event) {
            selectedcity.value = event.target.value;
            if (selectedcity.value == "") {
                cinemas.value = [];
            } else {
                cinemas.value = allcinemas.value.filter(c => c.city == selectedcity.value)
                    .sort((a, b) => a.name < b.name ? -1 : (a.name == b.name ? 0 : 1));
            }
            selectedcinema.value = "";
            await loadShow();
        }

        async function changecinema(event) {
            selectedcinema.value = event.target.value;
            await loadShow();
        }

        async function changemovie(event) {
            selectedmovie.value = event.target.value;
            await loadShow();
        }

        function changeshow(show) {
            selectedshow.value = show;
        }

        async function loadShow() {
            selectedshow.value = null;
            if (selectedmovie.value == "" || selectedcinema.value == "" || selecteddate.value == "") {
                shows.value = [];
                return;
            }
            shows.value = await BlitzAPI.Schedule(selecteddate.value, selectedcinema.value, selectedmovie.value);
            shows.value.forEach(s => {
                lastshowid.value += 1;
                s.id = lastshowid.value;
            });
        }

        function formatAudiType(auditype) {
            switch (auditype) {
                case 'N':
                    return "Regular";
                case 'Y':
                    return "Satin";
                case 'V':
                    return "Velvet";
                case 'O':
                    return "Velvet Suite";
                case 'D':
                    return "Dining";
                default:
                    return auditype;
            }
        }

        function formatMovieFormat(movieformat) {
            switch (movieformat) {
                case 'C':
                    return "Celluloid"
                case '2D':
                    return "Digital 2D";
                case '3D':
                    return "Digital 3D";
                default:
                    return movieformat;
            }
        }

        function formatDate(adate) {
            return DateTime.fromISO(adate).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
        }

        loadData();

        return {
            allcinemas, cities, cinemas, movies, shows, selecteddate, selectedcity, selectedcinema, selectedmovie,
            selectedshow, lastshowid,
            loadData, changedate, changecity, changecinema, changemovie, changeshow, loadShow, formatAudiType,
            formatMovieFormat, formatDate
        }
    }
}