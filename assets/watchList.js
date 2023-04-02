const containerTwo = document.getElementById("containerTwo")
let content = JSON.parse(localStorage.getItem("contentDiv"))

const getWatchList = () => {
     let watchListHtml = ``

     if (content.length > 0) {
          try {
               const watchList = JSON.parse(localStorage.getItem("contentDiv"))
               let posterControl = ""
               for (let movie of watchList) {
                    // editing came data

                    if (movie.Poster === "N/A" || movie.Poster === 0 || movie.Poster === "" || movie.Poster === undefined || !movie.Poster) {
                         posterControl = `https://media.giphy.com/media/l2Je66zG6mAAZxgqI/giphy.gif`
                    } else {
                         posterControl = movie.Poster
                    }
                    watchListHtml += `
     
               <div class="content" id="${movie.uuid}"  >
               <div class="image" >
                    <img src="${posterControl}"  alt="film image" />
               </div>
               <div class="description">
                    <div class="title">
                         <h3>${movie.Title}</h3>
                         <span title=${movie.imdbRatingControl}  id="spanRate"> <img src="./assets/images/star.svg" />${movie.imdbRating}</span>
                    </div>
                    <div class="time">
                         <span>${movie.Runtime}</span>
                         <span>${movie.Genre}</span>
                         <span id="${movie.uuidSpan}" data-remove="${movie.uuidAdd}"><img  src="./assets/images/-.svg">Remove</img></span>
                    </div>
                    <div id="${movie.uuidMore}" class="filmContent">
                        <p>${movie.Plot}</p> 
                    </div>
               </div>
          </div>
             `
               }
               return watchListHtml
          } catch (error) {
               containerTwo.innerHTML = `
               <h3>Something Went Wrong With Film Database 😭</h3>
               <a href="./index.html"
                    ><p><img src="./assets/images/+.svg" alt="" />Explore some movies</p></a
               >`
               return false
          }
     } else {
          containerTwo.innerHTML = `
          <h3>Your Watch List is Empty 😭</h3>
          <a href="./index.html"
               ><p><img src="./assets/images/+.svg" alt="" />Explore some movies</p></a
          >`
          containerTwo.style.alignItems = "center"
     }
}

if (!localStorage.length) {
     console.log("tiktiktik")
}

if (getWatchList()) {
     containerTwo.innerHTML = getWatchList()
}

document.addEventListener("click", (e) => {
     if (e.target.dataset.remove) {
          removeButton(e.target.dataset.remove)
     }
})

const removeButton = (targetId) => {
     const target = content.filter((data) => {
          return data.uuidAdd === targetId
     })[0]

     let localGet = localStorage.getItem("contentDiv") ? JSON.parse(localStorage.getItem("contentDiv")) : []
     let index
     for (let i = 0; i < localGet.length; i++) {
          if (localGet[i].uuid === target.uuid) {
               index = i
          }
     }

     localGet.splice(index, 1)
     localStorage.setItem("contentDiv", JSON.stringify(localGet))
     containerTwo.innerHTML = getWatchList()
     if (!getWatchList()) {
          containerTwo.innerHTML = `
               <h3>Your Watch List is Empty 😭</h3>
               <a href="./index.html"
                    ><p><img src="./assets/images/+.svg" alt="" />Explore some movies</p></a
               >`
          containerTwo.style.alignItems = "center"
     }
}
const clearAll = () => {
     return localStorage.clear()
}



