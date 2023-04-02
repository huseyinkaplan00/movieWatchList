import { Movie, getRenderHTML } from "./utility.js"

const postContainer = document.querySelector(".main-container")

const input = document.getElementById("input")

const searchBtn = document.getElementById("searchBtn")

let movies = []
searchBtn.addEventListener("click", async () => {
     postContainer.innerHTML = `<img class="loading" src="https://media.giphy.com/media/E9UdHwf6WleEFuG8TI/giphy.gif" />`

     const array = [fetch(`https://www.omdbapi.com/?apikey=4c25c679&t=${input.value}&plot=full`)]

     // if on of the fetch request throw an error this request not run with Promise.all

     try {
          const res = await fetch(`https://www.omdbapi.com/?apikey=4c25c679&s=${input.value}`)
          const data = await res.json()

          if (data.Response === "True") {
               movies = []
               data.Search.map((movie) => {
                    fetch(`https://www.omdbapi.com/?apikey=4c25c679&i=${movie.imdbID}&plot=full`)
                         .then((res) => res.json())
                         .then((data) => {
                              movies.push(new Movie(data))
                              getFilm()
                         })
               })
          } else {
               postContainer.innerHTML = "We can't find that "
          }
     } catch (e) {
          console.log(" fetch failed")
     }

     //Promise.allSettled, just run the succesfull status: fullfilled requests ...

     // const main = async () => {
     //      const res = await Promise.allSettled(array)
     //      // extracting response objects

     //      res.map((obj) => {
     //           if (obj.status === "fulfilled") {
     //                successArrays.push(obj.value)
     //           }
     //      })
     //      if (successArrays.length === 0) {
     //           throw new Error("all fetch requests failed")
     //      }

     //      const data = await Promise.all(
     //           successArrays.map((item) => {
     //                return item.json()
     //           })
     //      )
     //      movies.push(new Movie(data[0]))
     //      getFilm()
     // }

     if (input.value != "") {
          input.value = ""
     } else if (input.value === "") {
          console.log("lütfen bir şeyler yaz")
     }
})

function getFilm() {
     postContainer.innerHTML = ""
     return movies.map((movie) => {
          postContainer.innerHTML += getRenderHTML(movie)
     })
}

//getting random  backgrounds photos from unsplash api
fetch("https://api.unsplash.com/photos/random/?client_id=pVVx382GHiGR3xCEd0DxcestWfJYO8BlUCSJ50PyGHA&query=film&count=1")
     .then((res) => {
          console.log(res.status)
          if (!res.ok) {
               throw Error("something went wrong with unsplash api")
          }
          return res.json()
     })
     .then((data) => {
          const backgroundImageUrl = data[0].urls.regular
          document.querySelector(".headerBG").innerHTML = `
          <img
          class="headerBackground"
          src="${backgroundImageUrl}"
          alt=""
     />
          `
     })
     .catch(
          (err) => console.log(err),
          (document.querySelector(".headerBG").innerHTML = `
          <img
          class="headerBackground"
          src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
     />
          `)
     )

export { movies }
