import { v4 as uuidv4 } from "https://jspm.dev/uuid"
import { movies } from "./script.js"
class Movie {
     constructor(data) {
          Object.assign(this, data)

          this.uuid = uuidv4()
          this.isClicked = false
          this.isRemoved = false
          this.uuidSpan = uuidv4()
          this.uuidMore = uuidv4()
          this.uuidAdd = uuidv4()
     }
}

function getRenderHTML(data) {
     let { Title, Poster, Runtime, Genre, Plot, imdbRating, uuid, uuidSpan, uuidMore, uuidAdd } = data

     let posterControl = ""
     let imdbRatingControl = ""
     let PlotControl = Plot
     if (Poster === "N/A" || Poster === 0 || Poster === "" || Poster === undefined || !Poster) {
          posterControl = `https://media.giphy.com/media/l2Je66zG6mAAZxgqI/giphy.gif`
     } else {
          posterControl = Poster
     }

     const plotSize = PlotControl.split(" ").length

     if (plotSize) {
          let first50 = PlotControl.substring(0, 100)
          PlotControl = `${first50}  <span data-more="${uuidMore}">Read More...</span> `
     } else if (Runtime === "N/A" || Runtime === undefined) {
          Runtime = "Unknown runtime ⌚"
     } else if (Genre === "N/A" || Genre === undefined) {
          Genre = "Unknown ⌚"
     } else if (imdbRating === "N/A" || imdbRating === undefined) {
          imdbRating = "Unknown ⌚"
     }

     if (imdbRating === "N/A" || imdbRating === undefined) {
          imdbRatingControl = `😭`
     } else {
          imdbRatingControl = imdbRating
     }

     if (Plot === "N/A" || Plot === undefined) {
          PlotControl = "Unknown 📃📄📑"
     }

     let html = `
          <div class="content" id="${uuid}"  >
             <div class="image" >
                  <img src="${posterControl}"  alt="film image" />
             </div>
             <div class="description">
                  <div class="title">
                       <h3>${Title}</h3>
                       <span title=${imdbRatingControl}  id="spanRate"> <img src="./assets/images/star.svg" />${imdbRatingControl}</span>
                  </div>
                  <div class="time">
                       <span>${Runtime}</span>
                       <span>${Genre}</span>
                       <span id="${uuidSpan}" data-add="${uuidAdd}"><img  src="./assets/images/+.svg">Watchlist</img></span>
                  </div>
                  <div id="${uuidMore}" class="filmContent">
                      <p>${PlotControl}</p> 
                  </div>
             </div>
        </div>
             `

     return html
}

//clicking events on document
document.addEventListener("click", (e) => {
     if (e.target.dataset.add) {
          add(e.target.dataset.add)
     } else if (e.target.dataset.more) {
          more(e.target.dataset.more)
     }
})

const add = (id) => {
     // catching clicked id's array
     const target = movies.filter((data) => {
          return data.uuidAdd === id
     })[0]

     // object destructuring on target object
     let { Poster, isClicked, uuidSpan } = target
     // nodelistin idlerini aldık,
     // Array.from methodu ile queryselectorall ile aldığımız nodelisti array e çevirdik
     let content = Array.from(document.querySelectorAll(`.content`))

     // setting to local storage

     //getting existing movies from local storage per click or creating an empty array
     let moviesArray = JSON.parse(localStorage.getItem("contentDiv")) || []

     //storing per click updated  movies array in local storage
     localStorage.setItem("contentDiv", JSON.stringify(moviesArray))

     // add and remove buttons
     if (isClicked === true) {
          document.getElementById(`${uuidSpan}`).innerHTML = `<img  src="./assets/images/+.svg">Watchlist</img>`
          target.isClicked = false
     } else if (isClicked === false) {
          document.getElementById(`${uuidSpan}`).innerHTML = `<img  src="./assets/images/-.svg">Remove</img>`
          target.isClicked = true
          moviesArray.unshift(target)
          localStorage.setItem("contentDiv", JSON.stringify(moviesArray))
     }

     // editing came data
     let posterControl = ""
     if (Poster === "N/A" || Poster === 0 || Poster === "" || Poster === undefined || !Poster) {
          posterControl = `https://media.giphy.com/media/l2Je66zG6mAAZxgqI/giphy.gif`
     } else {
          posterControl = Poster
     }
}

//read more  feature's function
const more = (item) => {
     const targetItem = movies.filter((more) => more.uuidMore === item)[0]

     let { Plot, uuidMore } = targetItem

     document.getElementById(`${uuidMore}`).innerHTML = `<p>${Plot}</p> `
}

export { Movie, getRenderHTML }
