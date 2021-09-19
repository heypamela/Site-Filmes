const sliders = document.querySelector(".carousel-box");
var scrollPerClick;
var imagemPadding = 20;


showMovieData();


var scrollAmount = 0;

function sliderScrollEsquerdo(){
    sliders.scrollTo({
        top: 0,
        left: (scrollAmount -= scrollPerClick),
        behavior: "smooth",
    });
    if(scrollAmount < 0){
        scrollAmount = 0
    }
}

function sliderScrollDireito(){
    if(scrollAmount <= sliders.scrollWidth - sliders.clientWidth){
        sliders.scrollTo({
            top:0,
            left: (scrollAmount += scrollPerClick),
            behavior: "smooth",
        });
    }
}



async function showMovieData(){
    const api_key = '7efe3392bcebfa2380b72a5ae65f22a4';

    var result = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+api_key+"&sort_by=popularity.desc");

    result = result.data.results;

    result.filter(function (cur, index){
        sliders.insertAdjacentHTML(
            "afterbegin",
            ` <div>
                 <img class="img-${index} slider-img" src="https://image.tmdb.org/t/p/w185/${cur.poster_path}" id="teste"/>
                 <h2>${cur.vote_average}</h2><h4 class="title-${index} slider-title">${cur.title}</h4>
              </div>`
        );
    });
    scrollPerClick = 400;
}

