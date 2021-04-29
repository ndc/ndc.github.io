
const BaseURL = "https://app.endycahyono.com/first/blitz";

async function Movie() {
    let url = BaseURL + "/movie";
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function Cinema() {
    let url = BaseURL + "/cinema";
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function Schedule(showdate, cinema, movie) {
    let url = new URL(BaseURL + "/schedule");
    url.search = new URLSearchParams({
        showdate,
        cinema,
        movie
    }).toString();
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function AudiNo(cinema, movie, showdate, auditype, showtime, movieformat) {
    let url = new URL(BaseURL + "/audino");
    url.search = new URLSearchParams({
        cinema,
        movie,
        showdate,
        auditype,
        showtime,
        movieformat
    }).toString();
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

export { Movie, Cinema, Schedule, AudiNo };