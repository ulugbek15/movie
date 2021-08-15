let elForm = MakeElem("#form");
let movieList = MakeElem(".movie__list")
let movieGenreList = MakeElem(".movie__genre-list")
let movieGenre= MakeElem(".movie__genre")
let movieSearch= MakeElem(".movie__search")
let movieSelect= MakeElem(".select")
let elMovieFilter= MakeElem(".movie__filter")
let elModal= MakeElem(".modal")
let elModalDesc= MakeElem(".modal__description")

// Function renders Genres for Select
function renderGenersSelect(films, element){
    const result = [];

    films.forEach((film) =>{
        film.genres.forEach((genre) =>{
            if(!result.includes(genre)){
                result.push(genre)
            }
        })
    })

    result.forEach((genre) =>{
        const newOption = CreateDom("option");
        newOption.value = genre;
        newOption.textContent = genre;

        element.appendChild(newOption);
    })
}

renderGenersSelect(films, movieGenre)


// Function renders gners
function render(arrFilm, element){

    element.innerHTML = null;

    arrFilm.forEach((film, index) =>{

        //creating elements
        let newLi = CreateDom("li")
        let newImg = CreateDom("img")
        let newHeading = CreateDom("h2")
        let newTime = CreateDom("time")
        let newGenreLi = CreateDom("p")
        let newButton = CreateDom("button")
        
        //creating attributes
        newImg.setAttribute("src", film.poster);
        newGenreLi.setAttribute("src", "move__genre");
        newImg.setAttribute("width", "150px");
        newImg.setAttribute("height", "200px");
        newLi.setAttribute("class", "movie__item")
        newHeading.setAttribute("class", "movie__item-title")
        newTime.setAttribute("class", "movie__list-time")
        newTime.setAttribute("datetime", normaLizeDate(film.release_date))
        
        //Assigning values
        newHeading.textContent = film.title
        newButton.dataset.uuid = film.id
        newButton.textContent = "more"
        newTime.textContent = normaLizeDate(film.release_date)
        newGenreLi.textContent = films[index].genres

        //appendChild elements
        newLi.appendChild(newImg)
        newLi.appendChild(newHeading)
        newLi.appendChild(newTime)
        newLi.appendChild(newGenreLi)
        newLi.appendChild(newButton)
        element.appendChild(newLi)

        newButton.addEventListener('click', (e) =>{
            let filmId = e.target.dataset.uuid

           let x = arrFilm.find((e) => filmId == e.id)

           elModalDesc.textContent = x.overview

            elModal.classList.add('modal--active')
        })
    })
}

render(films, movieList)


function filterFilm(filmArr, format){
    let filterAlph = filmArr.sort((a, b) =>{
        if(a.title > b.title){
            return 1
        }
        else if(a.title < b.title){
            return -1
        }else{
            return 0
        }
    })

    let filterDate = filmArr.sort((a, b) => a.release_date - b.release_date)

    if(format === 'a_z'){
      return filterAlph
    }else if(format === 'z_a'){
      return filterAlph.reverse()
    }
    if(format === 'old_new'){
        return filterDate
    }else if(format === 'new_old'){
        return filterDate.reverse()
    }
}

elForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    
    let selectGenres = movieGenre.value.trim();
    let searchFilm = movieSearch.value.trim();

    let regex = new RegExp(searchFilm, 'gi')

    let searchedFilms = films.filter((film) =>{
        return film.title.match(regex)
    })


    let foundFilms = [];

    if(selectGenres == "All"){
        foundFilms = searchedFilms
    }else{
        foundFilms = searchedFilms.filter((film) =>{
            return film.genres.includes(selectGenres)
        })
    }

    filterFilm(foundFilms, elMovieFilter.value.trim())

    render(foundFilms, movieList)
})
