const favMovie = document.getElementsByClassName("favourite-conatiner");
// getting the fav movies stored in the local storage 
var storageData = localStorage.getItem('MovieArray');
var favMovieArray = JSON.parse(storageData);
// looping over the fav movie array 
favMovieArray.forEach(async id =>{
    const URL = `https://www.omdbapi.com/?i=${id}&page=1&apikey=e7226d24`;
    const res = await fetch(`${URL}`);
    const data = await res.json(); 
    favMovieLoader(data, id)
});
   function favMovieLoader(data, id){
    var eachListItem = document.createElement('div');
    eachListItem.classList.add('fav-element');
    eachListItem.innerHTML =`
    <div class="fav-element" id="fav-element">
       <div class = "movie-poster">
          <img src = "${data.Poster}" alt = "movie poster">
      </div>
      <div class = "movie-info">
          <h3 class = "movie-title">${data.Title}</h3>
          <ul class = "movie-misc-info">
              <li class = "year">Year: ${data.Year}</li>
              <li class = "rated">Ratings: ${data.Rated}</li>
              <li class = "released">${data.Released}</li>
          </ul>
          <p class = "genre"><b>Genre:</b>${data.Genre}</p>
          <p class = "writer"><b>Writer:</b>${data.Writer}</p>
          <p class = "actors"><b>Actors: </b>${data.Actors}</p>
          <p class = "plot"><b>Plot:</b>${data.Plot}</p>
          <p class = "language"><b>Language:</b> ${data.Language}</p>
          <p class = "awards">Awards:<b></b> ${data.Awards}</p>
          <button class="remove-fav" id='${id}' onclick="deleteMovie(${id})">Remove fav</button>   
          </div> 
      </div>
    </div>
    `
    document.getElementById('fav-container').appendChild(eachListItem);
   }
    
   async function deleteMovie(id){
    if(window.confirm('Delete this movie from fav list?')){
        var temp = await JSON.parse(localStorage.getItem('MovieArray'));
        var i = await temp.indexOf(id.toString());
        await temp.splice(i, 1);
        await localStorage.setItem('MovieArray', JSON.stringify(temp));
        await window.location.reload();
    }
}

    
