// UTILITY FUNCTIONS
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const secsToMins = (secs) => `${Math.floor(secs / 60)}:${Math.round(secs % 60).toString().padStart(2, `0`)}`


//DOCUMENT ELEMENTS
const dancing = $(`#dancing`)
const playOrPause = $(`#playOrPause`)
const playPrev = $(`#playPrev`)
const playNext = $(`#playNext`)
const playlistEle = $(`#playlist`)
const trackDuration = $(`#trackDuration`)
const trackVolume = $(`#trackVolume`)
const progressBar = $(`#progressBar`)
const trackProgress = $(`#trackProgress`)
const musicAlbum = $(`.musicAlbum`)
const musicName = $(`#musicName`)


// DATA
const musics = [
    {
    name: "Primavera-nos-dente",
    cleanName: "Primavera nos dentes",
    duration: "4:53",
    },
  {
    name: "vale-da-boca-seca",
    cleanName: "Vale da boca seca",
    duration: "5:00",
    },  
  {
    name: "Flerte-Revival",
    cleanName: "Flerte revival",
    duration: "3:22",
    },
  {
    name: "Misterio-Stereo",
    cleanName: "Misterio sterio",
    duration: "4:15",
    },
  {
    name: "Tudo-Foi-Feito-Pelo-Sol",
    cleanName: "Tudo foi feito pelo Sol",
    duration: "8:46",
    },          
]



let playingIndex = 0;
// variables
let playIndex = 0
const song = new Audio()
song.src = `audio/${musics[playingIndex].name}.mp3`;

//play/Pause and music duration
function tocar(){
  song.src = `audio/${musics[playingIndex].name}.mp3`;
  if(musics[playingIndex].name === 'Misterio-Stereo'){
    song.currentTime = 7;
  }
  song.play();
  playOrPause.setAttribute('src', "./img/pause.png")
  dancing.setAttribute('src', "./img/pulp.gif")
  musicAlbum.setAttribute('src', `./img/${musics[playingIndex].name}.jpeg`)
  trackDuration.innerHTML = `${musics[playingIndex].duration}`;
  musicName.innerHTML = `${musics[playingIndex].cleanName}`
  
}

function parar(){
  song.pause();
  playOrPause.setAttribute('src', "./img/play.png")
  dancing.setAttribute('src', "./img/dance.gif")
}
playOrPause.addEventListener(`click`, function (event) {
  if (song.paused) {
    song.play()
    playOrPause.setAttribute('src', "./img/pause.png")
  dancing.setAttribute('src', "./img/pulp.gif")
    
  } else {
    parar()
    
  }
})


song.addEventListener(`timeupdate`, function(event) {
  trackTime.textContent = secsToMins(song.currentTime)
  if(song.currentTime === song.duration){
    next()
  }

  // Don't update while you're dragging
  if (amDragProgress) return
  progressBar.value = song.currentTime / song.duration
})

let amDragProgress = false
progressBar.addEventListener(`input`, function(event) {
  amDragProgress = true
})
progressBar.addEventListener(`change`, function(event) {
  amDragProgress = false
  song.currentTime = progressBar.value * song.duration
})

//display musics name
for (let info in musics) {
  console.log(info)
  playlistEle.innerHTML += `<li data-index="${info}">${musics[info].cleanName}' <img class='imagePlaylist' src='./img/${musics[info].name}.jpeg' alt="Primavera-nos-dente"></li>`;
  
}

//change volume
trackVolume.addEventListener(`input`, function(event) {
  song.volume = trackVolume.value
})
// start volume
song.volume = trackVolume.value;







playlistEle.addEventListener(`click`, function(event) {
  
  const songToPlay = event.target

  if (songToPlay.matches(`li`)) {
    playingIndex = Number(songToPlay.dataset.index)
    console.log(playingIndex)
    tocar()
    
  }
})

// musics.forEach(function(name, index){
//   playlistEle.innerHTML += `<li data-index="${index}">${name}</li>`
// })




//play next
const next = function(){
  if (playingIndex < musics.length - 1) {
    playingIndex = playingIndex + 1
    console.log(playingIndex)
    tocar()
      
    
  } else {
    playingIndex = 0;
    tocar()
  }
}

playNext.addEventListener(`click`, function () {
  next()
})

 //play previous
playPrev.addEventListener(`click`, function () {
  if (playingIndex != 0) {
    playingIndex = playingIndex - 1
    console.log(playingIndex)
    song.src = `audio/${musics[playingIndex].name}.mp3`
    tocar()
      
    
  } else {
    playingIndex = (musics.length-1);
    song.src = `audio/${musics[playingIndex].name}.mp3` 
    tocar()
  }

})

 

// const allMusic = [
//   {
//     name: `Primavera-nos-dentes`,
//     image: `1.png`,
//     Duration: 
//     yourFav: false
//   }






