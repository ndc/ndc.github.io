import { DateTime } from "https://cdn.jsdelivr.net/npm/luxon@1.26.0/src/luxon.js";
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
        <div class="col">
            Selection: {{formatDate(selecteddate)}}
            {{allcinemas.find(c => c.code == selectedcinema)?.name}}
            {{selectedcity}}
            {{movies.find(m => m.code == selectedmovie)?.title}}
            {{selectedshow?.showtime}}
            {{selectedshow ? formatMovieFormat(selectedshow.movieformat) : ""}}
            {{selectedshow ? formatAudiType(selectedshow.auditype) : ""}}
            {{selectedshow?.price}}
        </div>
    </div>
</div>
`,
    components: {},
    data() {
        return {
            allcinemas: [],
            cities: [],
            cinemas: [],
            movies: [],
            shows: [],
            selecteddate: DateTime.now().toISODate(),
            selectedcity: "",
            selectedcinema: "",
            selectedmovie: "",
            selectedshow: null,
            lastshowid: 0
        }
    },
    async created() {
        await this.loadData();
    },
    methods: {
        async loadData() {
            this.allcinemas = await BlitzAPI.Cinema();
            this.cities = this.allcinemas.map(c => c.city).sort();
            this.cities = [...new Set(this.cities)];
            this.movies = await BlitzAPI.Movie();
        },
        async changedate(event) {
            this.selecteddate = event.target.value;
            await this.loadShow();
        },
        async changecity(event) {
            this.selectedcity = event.target.value;
            if (this.selectedcity == "") {
                this.cinemas = [];
            } else {
                this.cinemas = this.allcinemas.filter(c => c.city == this.selectedcity)
                    .sort((a, b) => a.name < b.name ? -1 : (a.name == b.name ? 0 : 1));
            }
            this.selectedcinema = "";
            await this.loadShow();
        },
        async changecinema(event) {
            this.selectedcinema = event.target.value;
            await this.loadShow();
        },
        async changemovie(event) {
            this.selectedmovie = event.target.value;
            await this.loadShow();
        },
        changeshow(show) {
            this.selectedshow = show;
        },
        async loadShow() {
            this.selectedshow = null;
            if (this.selectedmovie == "" || this.selectedcinema == "" || this.selecteddate == "") {
                this.shows = [];
                return;
            }
            this.shows = await BlitzAPI.Schedule(this.selecteddate, this.selectedcinema, this.selectedmovie);
            this.shows.forEach(s => {
                this.lastshowid += 1;
                s.id = this.lastshowid;
            });
        },
        formatAudiType(auditype) {
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
        },
        formatMovieFormat(movieformat) {
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
        },
        formatDate(adate) {
            return DateTime.fromISO(adate).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
        },
    }
}