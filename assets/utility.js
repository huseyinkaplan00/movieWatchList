import { v4 as uuidv4 } from "https://jspm.dev/uuid"
import { movies } from "./script.js"
class Movie {
     constructor(data) {
          Object.assign(this, data)
     }
}

function getRenderHTML(data) {
     let { Title, Poster, Runtime, Genre, Plot, imdbRating } = data
     const plotSize = Plot.split(" ").length

     if (imdbRating === "N/A" || imdbRating === undefined) {
          imdbRating = `😭`
     } else if (Poster === "N/A" || Poster === 0 || Poster === "" || Poster === undefined || !Poster) {
          Poster = `https://media.giphy.com/media/l2Je66zG6mAAZxgqI/giphy.gif`
     } else if (Plot === "N/A" || Plot === undefined) {
          Plot = "Unknown 📃📄📑"
     } else if (plotSize) {
          let first50 = Plot.substring(0, 100)
          Plot = `${first50}  <span>Read More...</span> `
          let full = Plot.substring(100, plotSize)
     } else if (Runtime === "N/A" || Runtime === undefined) {
          Runtime = "Unknown runtime ⌚"
     } else if (Genre === "N/A" || Genre === undefined) {
          Genre = "Unknown ⌚"
     } else if (imdbRating === "N/A" || imdbRating === undefined) {
          imdbRating = "Unknown ⌚"
     }

     return `
          <div class="content" id="${uuidv4()}"  >
             <div class="image" >
                  <img src="${Poster}"  alt="film image" />
             </div>
             <div class="description">
                  <div class="title">
                       <h3>${Title}</h3>
                       <span title=${imdbRating}  id="spanRate"> <img src="./assets/images/star.svg" />${imdbRating}</span>
                  </div>
                  <div class="time">
                       <span>${Runtime}</span>
                       <span>${Genre}</span>
                       <span data-add-icon="${Title}"><img  src="./assets/images/+.svg">Watchlist</img></span>
                  </div>
                  <div class="filmContent">
                       <p>${Plot}</p>
                  </div>
             </div>
        </div>
             `

     html
}
document.addEventListener("click", (e) => {
     if (e.target.dataset.addIcon) {
          console.log(e.target.dataset.addIcon)
     }
})

const addContent = (contentId) => {
     movies["uuid"] = contentId
}

export { Movie, getRenderHTML }
