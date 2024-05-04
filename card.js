
const jsmediatags = window.jsmediatags;

let songs;
function secondsToMinutesAndSeconds(totalSeconds) {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = Math.floor(totalSeconds % 60);
    

    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    
    return formattedMinutes + ":" + formattedSeconds;
}


let CurrentSongs = new Audio()
function Card (Disc,name,thumbnail,Songs ) {
if(Disc === "Playlist") {
    document.getElementById("list").lastElementChild.insertAdjacentHTML("afterend",`<div class="card"> 
    <div class="image">
        <img src="${thumbnail}" alt="" >
    </div>
    <div class="title">
        <div class="name">
            <p>${name}</p>
        </div>
        <div class="disg">
            <span>${Disc}</span>
            <span>•</span>
            <span>${Songs}</span>
        </div>
    </div>
</div>`)

}
else if(Disc === "Artist") {
    document.getElementById("list").lastElementChild.insertAdjacentHTML("afterend",`<div class="card"> 
    <div class="image">
        <img src="${thumbnail}" alt="">
    </div>
    <div class="title">
        <div class="name">
            <p>${name}</p>
        </div>
        <div class="disg">
            <span>${Disc}</span>
        </div>
    </div>
</div>`)
    document.getElementById("list").lastElementChild.firstElementChild.firstElementChild.style.borderRadius = "50%";
    document.getElementById("list").lastElementChild.firstElementChild.firstElementChild.style.objectFit = "cover";
    document.getElementById("list").lastElementChild.firstElementChild.firstElementChild.style.objectPosition = "center";

}
}

Card( "Playlist","Old Evergreen Hindi Songs","Assets/Images/Evergreen.jpeg","Prakhar Ashlok");
Card("Playlist","On Repeat","Assets/Images/PZN_On_Repeat2_DEFAULT-en.jpg","Spotify");
Card("Playlist","poses","Assets/Images/ab67706f00000002e4e4d066f32e25fd2f81b50a.jpeg","Spotify");
Card("Artist","Selena Gomez & The Scene","Assets/Images/Selena.jpeg","Spotify");
Card("Artist","Selena Gomez","Assets/Images/Selena2.webp","Spotify");
Card("Artist","Camila Cabello","Assets/Images/CC.webp","Spotify");
Card("Artist","Justin Bieber","Assets/Images/ab6761610000101f8ae7f2aaa9817a704a87ea36.webp","Spotify");
Card("Artist","Billie Eilish", "Assets/Images/Bi.webp",);

async function NewCard (image,name){
    document.getElementById("sc2").lastElementChild.insertAdjacentHTML("afterend",`
    <div class="card_2">
        <div class="just">
            <div class="image2">
                <img src="${image}" alt="" class="Backimg">
            </div>
            <div class="name">
                <p>${name}</p>
            </div>
        </div>
        <div class="butt">
            <img src="Assets/Icons/Play Icon-1.svg" alt="">
        </div>
    </div>
`)
}

function playMusic(songs){
    let play = document.getElementById("play");
    CurrentSongs.src = songs; 
    play.src = "Assets/Icons/Pause Button.svg"
    CurrentSongs.play();
    play.addEventListener("click", ()=>{
        if(CurrentSongs.paused){
            play.src = "Assets/Icons/Pause Button.svg"
            CurrentSongs.play();
            
        }
        else{
            CurrentSongs.pause();
            play.src = "Assets/Icons/Play Button - Copy.svg"
        }
    })
    let duration = document.getElementById("duration");
    let playbackTime = document.querySelector(".playback");
    // setInterval(() => {
    //     let duration = document.querySelector(".playback")
    //     duration.lastElementChild.innerHTML = secondsToMinutesAndSeconds(CurrentSongs.duration)
    //     duration.firstElementChild.innerHTML = secondsToMinutesAndSeconds(CurrentSongs.currentTime)
    // },1000)
    // let duration = document.getElementById("duration")
    // setInterval(() => {
    //     duration.firstElementChild.style.left= `${CurrentSongs.currentTime / CurrentSongs.duration *100}%`
    //     if(duration.onmouseover === true){
    //         setInterval(() => {
    //             duration.style.background = `linear-gradient(to right, #1ed760 0%, #1ed760 ${CurrentSongs.currentTime / CurrentSongs.duration *100 }%, #ffffff ${CurrentSongs.currentTime / CurrentSongs.duration *100}%, #ffffff 100%)`
    //         }, 10);
    //     }
    //     else{
    //         setInterval(() => {
    //             duration.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${CurrentSongs.currentTime / CurrentSongs.duration *100 }%, rgb(72, 72, 72) ${CurrentSongs.currentTime / CurrentSongs.duration *100}%, rgb(72, 72, 72) 100%)`
    //         }, 10);
    //     }
    // },10)
           
    CurrentSongs.addEventListener("timeupdate", () => {
        playbackTime.lastElementChild.innerHTML = secondsToMinutesAndSeconds(CurrentSongs.duration);
        playbackTime.firstElementChild.innerHTML = secondsToMinutesAndSeconds(CurrentSongs.currentTime);

        let percentComplete = (CurrentSongs.currentTime / CurrentSongs.duration) * 100;
        duration.firstElementChild.style.left = `${percentComplete}%`;

        let gradientColor = duration.onmouseover ? "#1ed760" : "rgb(72, 72, 72)";
        duration.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${percentComplete}%, ${gradientColor} ${percentComplete}%, ${gradientColor} 100%)`;
    });

    duration.addEventListener("click",(e)=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left = percent + "%"
        CurrentSongs.currentTime = ((CurrentSongs.duration)*percent)/100;
    })
   
}
 

function getTitle(image,title,artist){
    document.querySelector(".songImg").firstElementChild.src = image;
    document.querySelector("#Title").firstElementChild.innerHTML = title;
    document.querySelector("#Title").lastElementChild.innerHTML = artist;
}
async function nextAndPrev(){
    let Next = document.getElementById("Next");
    let Previous = document.getElementById("Previous"); 

    Previous.addEventListener("click",()=>{
        let index = songs.indexOf(CurrentSongs.src);
        if((index-1) >= 0){
            playMusic(songs[index-1])
        }
    })

    Next.addEventListener("click", ()=>{
        let index = songs.indexOf(CurrentSongs.src);
        if((index+1) < songs.length-1){
            playMusic(songs[index+1])
        }
    })
}
nextAndPrev();
async function main(){

await NewCard("Assets/Images/default (3).jpeg","Kishore Kumar Mix");
await NewCard("Assets/Images/default (4).jpeg","Upbeat Mix");
await NewCard("Assets/Images/default (1).jpeg","Daily Mix 6");
await NewCard("Assets/Images/default (2).jpeg","Daily Mix 4");
await NewCard("Assets/Images/default (6).jpeg","2010s Mix");
await NewCard("Assets/Images/default (5).jpeg","Romantic Mix");
await NewCard("Assets/Images/default (7).jpeg","ABBA Mix");

await FinalCard("Assets/Images/default (3).jpeg","Kishore Kumar Mix","Mohammad Rafi, Sushma Shrestha and Amit Kumar")
await FinalCard("Assets/Images/default (4).jpeg","Upbeat Mix",);
await FinalCard("Assets/Images/default (5).jpeg","Romantic Mix",);
await FinalCard("Assets/Images/default (6).jpeg","2010s mix",);
await FinalCard("Assets/Images/Evergreen.jpeg","OLd EverGreen Hindi Songs");
await FinalCard("Assets/Images/PZN_On_Repeat2_DEFAULT-en.jpg","On Repeat");

await Section("Made for STRANGE");

await FinalCard("Assets/Images/Daily mix 2.jpeg","Daily Mix 2");
await FinalCard("Assets/Images/default (1).jpeg","Daily Mix 5");
await FinalCard("Assets/Images/default (2).jpeg","Daily Mix 4");
await FinalCard("Assets/Images/default (8).jpeg","Daily Mix 1");
await FinalCard("Assets/Images/default.jpeg","Daily Mix 3");
await FinalCard("Assets/Images/Discover Weekly.jpeg","Discover Weekly");


let images = document.getElementsByClassName("Backimg");


function handleMouseOver(event) {

    let colors = getAverageRGB(event.target);

    let bgChangeElement = document.getElementById("BGChange");

    bgChangeElement.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0) 65%, rgba(${colors.r}, ${colors.g}, ${colors.b}, 0.6) 90%)`;
}


for (let index = 0; index < images.length; index++) {
    
    images[index].addEventListener("mouseover", handleMouseOver, true);
}

}


async function Section(title){
   document.getElementById("Scc").insertAdjacentHTML("beforeend",`
                <div class="hding">
                    <p>${title}</p>
                    <p>Show all</p>
                </div>
                <div class="ct2" id="ct2">
                </div>
`)
}


async function FinalCard(img,Name,Dsc){
    document.getElementById("Scc").lastElementChild.insertAdjacentHTML("beforeend",`
        <div class="cn1">
            <div class="fy">
                <div class="btn">
                    <img src="${img}" alt="">
                    <img src="Assets/Icons/Play Icon-1.svg" alt="">
                </div>
                <div class="hd1">
                    <p>${Name}</p>
                </div>
                <div class="dsc">
                    <p>${Dsc}</p>
                </div>
            </div>
        </div>
    `)
}



function Something(com,one,two,three,four,five){
    document.getElementById("upfoot").firstElementChild.insertAdjacentHTML("beforeend",`
    <ul>
        <h4>${com}</h4>
        <li>${one}</li>
        <li>${two}</li>
        <li>${three}</li>
        <li>${four}</li>
        <li>${five}</li>
    </ul>
    
    `)
}
Something("Communities","For Artists","Developers","Advertising","Investors","Vendors")
Something("Useful links","Support","Free Mobile App","","","")
Something("Spotify Plans","Premium Individual","Premium Duo","Premium Family","Premium Student","Spotify Free")

function getAverageRGB(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

}

async function getSongs(){
    let data = await fetch('/Assets/Music/Old%20Evergreen%20Hindi%20Songs/')
    let song = await data.text()
    let div = document.createElement('div')
    div.innerHTML = song;
    let a = div.getElementsByTagName('a')
    let songs =[]
    for (let index = 0; index < a.length; index++) {
        const element = a[index];
        if(element.href.endsWith('.mp3'))
        { 
            songs.push(element.href)
        }
    }
    return songs
}

 async function Songs(){
    let html = document.getElementById("Sings")
    songs = await getSongs()
    for (const song of songs){
       jsmediatags.read(song , {
            onSuccess: function(tag) {
                const data = tag.tags.picture.data;
                const format = tag.tags.picture.format;
                let base64String ="";
                let title = tag.tags.title;
                let album = tag.tags.album;
                let artist = tag.tags.artist.replaceAll("/",", ");
                for(let index = 0; index < data.length; index++)
                {
                    base64String += String.fromCharCode(data[index]);
                }
                let image = "data:image/"+format+";base64,"+window.btoa(base64String);
                let audio = new Audio(song)
                let nos = html.children.length + 1;
               html.insertAdjacentHTML("beforeend",`
                <li>
                    <img id="player" class="play1" src="Assets/Icons/Play Icon-1 copy.svg" alt="">                                 
                    <span class="nos">${nos}</span>
                    <div class="titlee">
                        <img src="${image}" alt="">
                        <div class="nm">
                            <p href="${song}">${title}</p>
                            <p>${artist}</p>
                        </div>
                    </div>
                    <div class="Album">
                        <p>${album}</p>
                    </div>
                    <div class="dateAdded">
                        <p></p>
                        <img src="Assets/Icons/Add Icon-1.svg" alt="">
                    </div>
                    <div class="dur">
                        <p>00:00</p>
                        <span>•••</span>
                    </div>
                </li>
                `)

                toggleActiveClass();
            },
            onError: function(error) {
                console.log(':(', error.type, error.info);
            }
        });
    } 
}


function toggleActiveClass() {
    let songElements = Array.from(document.getElementById("Sings").children);
    if (songElements.length === 83) {
        songElements.forEach((songElement,index)=> {
            let titleElement = songElement.querySelector('.nm').firstElementChild; // Assuming there's a class 'title' for the song title
            songElement.addEventListener("click", function() {
                this.classList.add("active");

                songElements.forEach(element => {
                    if (element !== this && element.classList.contains("active")) {
                        element.classList.remove("active");
                        element.children[1].style.opacity = "1";
                        element.querySelector('.play1').style.display = "none";
                        element.querySelector('.nm').firstElementChild.style.color = 'white';
                    }
                });


                if (this.classList.contains("active")) {
                    this.children[1].style.opacity = "0";
                    this.querySelector('.play1').style.display = "block";
                    this.querySelector('.play1').src = "Assets/Icons/Play Icon.svg";
                    titleElement.style.color = '#1ed760';
                } else {
                    this.querySelector('.play1').style.display = "none";
                    this.querySelector('.play1').src = "Assets/Icons/Play Icon-1 copy.svg";
                    titleElement.style.color = 'white';
                }

                let song = this.querySelector('.nm').firstElementChild.getAttribute("href");
                let image = this.querySelector('.titlee').firstElementChild.getAttribute("src");
                let title = titleElement.innerHTML;
                let artist = this.querySelector('.nm').lastElementChild.innerHTML;
                playMusic(song);
                getTitle(image, title, artist);
            });
        });
    }
}


main();
Songs();




