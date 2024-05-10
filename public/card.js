
const jsmediatags = window.jsmediatags;
let songs = [];
let CurrentSongs = new Audio()
let link;
let mediaQuery = window.matchMedia("(max-width: 600px)");
async function getSongs(link){
    let data = await fetch(`/Assets/Music/${link}/`)
    let song = await data.text()
    let div = document.createElement('div')
    div.innerHTML = song;
    songs = [];
    let a = div.getElementsByTagName('a')
    for (let index = 0; index < a.length; index++) {
        const element = a[index];
        if(element.href.endsWith('.mp3'))
        { 
            songs.push(element.href)
        }
    }

    return songs

}
function secondsToMinutesAndSeconds(totalSeconds) {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = Math.floor(totalSeconds % 60);
    

    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    
    return formattedMinutes + ":" + formattedSeconds;
}

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
    console.log(songs)
    let play = document.getElementById("play");
    let mediaplay = document.getElementById("mediaplay");
    let playmedia = document.getElementById("playmedia");
    CurrentSongs.src = songs; 
    play.src = "Assets/Icons/Pause Button.svg"
    mediaplay.src = "Assets/Icons/Play Icon.svg";
    playmedia.style.marginLeft = '0px';
    playmedia.src = "Assets/Icons/Pause icon.svg";
    CurrentSongs.play(); 
    play.removeEventListener("click", togglePlay);
    play.addEventListener("click", togglePlay);
    mediaplay.removeEventListener("click", togglePlay);
    mediaplay.addEventListener("click", togglePlay);
    playmedia.removeEventListener("click", togglePlay);
    playmedia.addEventListener("click", togglePlay);
    let duration = document.getElementById("duration");
    let playbackTime = document.querySelector(".playback");
    CurrentSongs.addEventListener("timeupdate", () => {
        playbackTime.lastElementChild.innerHTML = secondsToMinutesAndSeconds(CurrentSongs.duration);
        playbackTime.firstElementChild.innerHTML = secondsToMinutesAndSeconds(CurrentSongs.currentTime);

        let percentComplete = (CurrentSongs.currentTime / CurrentSongs.duration) * 100;
        duration.firstElementChild.style.left = `${percentComplete}%`;

        let gradientColor = "rgb(72, 72, 72)";

        duration.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${percentComplete}%, ${gradientColor} ${percentComplete}%, ${gradientColor} 100%)`;
        playbackTime.onmouseover = () => {
            duration.style.background = `linear-gradient(to right, #1ed760 0%, #1ed760 ${percentComplete}%, ${gradientColor} ${percentComplete}%, ${gradientColor} 100%)`;
        }
        playbackTime.onmouseleave = () => {
            duration.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${percentComplete}%, ${gradientColor} ${percentComplete}%, ${gradientColor} 100%)`;
        }
        if(CurrentSongs.currentTime===CurrentSongs.duration){
            onNextClick();
        }
    });

    duration.addEventListener("click",(e)=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left = percent + "%"
        CurrentSongs.currentTime = ((CurrentSongs.duration)*percent)/100;
    })
    jsmediatags.read(songs , {
        onSuccess: function(tag) {
            const data = tag.tags.picture.data;
            const format = tag.tags.picture.format;
            let base64String ="";
            let title = tag.tags.title;
            let artist = tag.tags.artist.replaceAll("/",", ");
            for(let index = 0; index < data.length; index++)
            {
                base64String += String.fromCharCode(data[index]);
            }
            let image = "data:image/"+format+";base64,"+window.btoa(base64String);
            getTitle(image,title,artist)
        },
        onError: function(error) {
            console.log(':(', error.type, error.info);
        }
    });

}

function togglePlay() {
    let play = document.getElementById("play");
    let mediaplay = document.getElementById("mediaplay");
    let playmedia = document.getElementById("playmedia");
    if (CurrentSongs.paused) {
        playmedia.style.marginLeft = '5px';
        playmedia.src = "Assets/Icons/Play Icon-1.svg";
        mediaplay.src = "Assets/Icons/Play Icon.svg";
        play.src = "Assets/Icons/Pause Button.svg";
        CurrentSongs.play();
    } else {
        playmedia.style.marginLeft = '0px';
        playmedia.src = "Assets/Icons/Pause icon.svg";
        mediaplay.src = "Assets/Icons/Play Icon-1.svg";
        play.src = "Assets/Icons/Play Button - Copy.svg";
        CurrentSongs.pause();
    }
}
 
function getTitle(image,title,artist){
    document.querySelector(".songImg").firstElementChild.src = image;
    document.querySelector("#Title").firstElementChild.innerHTML = title;
    document.querySelector("#Title").lastElementChild.innerHTML = artist;
}
async function nextAndPrev(){
    let Next = document.getElementById("Next");
    let Previous = document.getElementById("Previous"); 

    // Remove existing event listeners
    Next.removeEventListener("click", onNextClick);
    Previous.removeEventListener("click", onPreviousClick);

    // Add new event listeners
    Next.addEventListener("click", onNextClick);
    Previous.addEventListener("click", onPreviousClick);

}

function onNextClick() {
    let index = songs.indexOf(CurrentSongs.src);
    if((index+1) < songs.length-1){
        console.log(index)
        playMusic(songs[index+1]);
        let title = songs[index+1].split(`${link}/`)[1].replaceAll("%20"," ").replace(".mp3","").replaceAll(`_`,`"`);
        Active(title);
    }
}

function onPreviousClick() {
    let index = songs.indexOf(CurrentSongs.src);
    if((index-1) >= 0 ){
        playMusic(songs[index-1]);
        let title = songs[index-1].split(`${link}/`)[1].replaceAll("%20"," ").replace(".mp3","").replaceAll(`_`,`"`);
        Active(title);
    }
}
function Active(title){
    let songElements = Array.from(document.getElementById("Sings").children);
        songElements.forEach(songElement => {
            let songTitle = songElement.querySelector('.nm').firstElementChild.innerHTML;
            if(songElement.classList.contains("active")){
                songElement.classList.remove("active");
                songElement.querySelector('.nm').firstElementChild.style.color = 'white';
                songElement.querySelector('.play1').src = "Assets/Icons/Play Icon-1 copy.svg";
            }
            else if(title === songTitle){
                songElement.classList.add("active");
                songElement.querySelector('.play1').src = "Assets/Icons/Play Icon.svg";
                songElement.querySelector('.nm').firstElementChild.style.color = '#1ed760';
            }
        });
}
function Volume(){
    let volume = document.querySelector(".vol").getElementsByTagName("input")[0];
    volume.addEventListener("change", (e)=>{
        CurrentSongs.volume = parseInt(e.target.value)/100;
        let percentComplete = (e.target.value / 100) * 100;
        volume.style.background = `linear-gradient(to right, #1ed760 0%, #1ed760 ${percentComplete}%, rgb(72, 72, 72) ${percentComplete}%, rgb(72, 72, 72) 100%)`;
        volume.onmouseover = ()=>{
            volume.style.background = `linear-gradient(to right, #1ed760 0%, #1ed760 ${percentComplete}%, rgb(72, 72, 72) ${percentComplete}%, rgb(72, 72, 72) 100%)`;
        }
        volume.onmouseleave = () => {
            volume.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${percentComplete}%, rgb(72, 72, 72) ${percentComplete}%, rgb(72, 72, 72)100%)`;
        }
        if(e.target.value == 0){
            CurrentSongs.muted = true;
        }else{
            CurrentSongs.muted = false;
        }

    })
}
function handleMediaQueryChange(mediaQuery){
    let playbar = document.querySelector(".playbar");
    let img = document.querySelector(".songImg").firstElementChild;
    let colors = getAverageRGB(img);
    if(mediaQuery.matches){
        playbar.style.background = `rgb(${colors.r}, ${colors.g}, ${colors.b})`;
    }else{
        playbar.style.background = `trasparent`;
    }
}
async function main(link){
    songs = await getSongs(link);
    Volume();
    handleMediaQueryChange(mediaQuery)
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    let images = Array.from(document.getElementsByClassName("card_2"));

    function handleMouseOver(event) {
        let image = event.target.querySelector(".Backimg");

        let colors = getAverageRGB(image);

        let bgChangeElement = document.getElementById("BGChange");

        bgChangeElement.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0) 75%, rgba(${colors.r}, ${colors.g}, ${colors.b}, 0.30) 90%)`;
    }


    for (let index = 0; index < images.length; index++) {
        images[index].addEventListener("mouseover", handleMouseOver,true);
    }

    DynamicLib();
    Songs();
    BackButton();
    nextAndPrev();
    let Playlist = document.getElementById("Change");
    let PlayName = Playlist.querySelector(".PlayName")
    let Number = songs.length;
    PlayName.lastElementChild.lastElementChild.innerHTML = `${Number} songs, about 10hr`;
}
async function DyLib(){
    await NewCard("Assets/Images/default (3).jpeg", "Kishore Kumar Mix");
    await NewCard("Assets/Images/default (4).jpeg", "Upbeat Mix");
    await NewCard("Assets/Images/default (1).jpeg", "Daily Mix 6");
    await NewCard("Assets/Images/default (2).jpeg", "Daily Mix 4");
    await NewCard("Assets/Images/default (6).jpeg", "2010s Mix");

    await FinalCard("Assets/Images/default (3).jpeg", "Kishore Kumar Mix", "Mohammad Rafi, Sushma Shrestha and Amit Kumar")
    await FinalCard("Assets/Images/default (4).jpeg", "Upbeat Mix",);
    await FinalCard("Assets/Images/default (5).jpeg", "Romantic Mix",);
    await FinalCard("Assets/Images/default (6).jpeg", "2010s mix",);
    await FinalCard("Assets/Images/Evergreen.jpeg", "Old EverGreen Hindi Songs");
    await FinalCard("Assets/Images/PZN_On_Repeat2_DEFAULT-en.jpg", "On Repeat");

    await Section("Made for STRANGE");

    await FinalCard("Assets/Images/Daily mix 2.jpeg", "Daily Mix 2");
    await FinalCard("Assets/Images/default (1).jpeg", "Daily Mix 5");
    await FinalCard("Assets/Images/default (2).jpeg", "Daily Mix 4");
    await FinalCard("Assets/Images/default (8).jpeg", "Daily Mix 1");
    await FinalCard("Assets/Images/default.jpeg", "Daily Mix 3");
    await FinalCard("Assets/Images/Discover Weekly.jpeg", "Discover Weekly");
}

async function DynamicLib(){
    let libs = Array.from(document.querySelectorAll(".cn1"));
    libs.forEach(LibElement => {
        LibElement.removeEventListener("click",onLibClick,false);
        LibElement.addEventListener("click",onLibClick),false;
    });
}
function onLibClick(e){
        document.getElementById("Sings").innerHTML = "";
        link = e.currentTarget.querySelector(".hd1").firstElementChild.innerHTML.replaceAll(" ","%20");
        main(link);
        let img = e.currentTarget.querySelector(".btn").firstElementChild.src;
        let title = link.replaceAll("%20"," ");
        let Playlist = document.getElementById("Change");
        Playlist.children[0].firstElementChild.src = img;
        let PlayName = Playlist.querySelector(".PlayName")
        PlayName.children[1].innerHTML = title;
        let imgcolor = getAverageRGB(e.currentTarget.querySelector(".btn").firstElementChild);
        document.getElementById("BGChange").style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0) 75%, rgba(${imgcolor.r}, ${imgcolor.g}, ${imgcolor.b}, 0.30) 90%)`;
        document.querySelector(".SongsList").style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0) 92%, rgb(${imgcolor.r} , ${imgcolor.g} , ${imgcolor.b},0.1) 101%)`;
        document.getElementById("Forward").style.background = "rgba(24, 24, 24, 0.737)";
        document.getElementById("Back").style.background = "black";
        document.querySelector(".Playlist1").style.display = "flex";
        document.querySelector(".SongsList").style.display = "flex";
        document.querySelector(".all").style.display = "none";
        document.querySelector(".scroll_2").style.display = "none";
        document.querySelector(".scroller").style.display = "none";
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



 async function Songs(){
    let html = document.getElementById("Sings")
        for (const song of songs){
           jsmediatags.read( song, {
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
    if (songElements.length === songs.length){
        songElements.forEach((songElement,index)=>{
            let titleElement = songElement.querySelector('.nm').firstElementChild;
            songElement.addEventListener("click", function() {
                // this.classList.add("active");
                // songElements.forEach(element =>{
                //     if (element !== this && element.classList.contains("active")){
                //         element.classList.remove("active");
                //         // element.children[1].style.opacity = "1";
                //         // element.querySelector('.play1').style.display = "none";
                //         element.querySelector('.nm').firstElementChild.style.color = 'white';
                //     }
                // });
                // if (this.classList.contains("active")) {
                //     // this.children[1].style.opacity = "0";
                //     // this.querySelector('.play1').style.display = "block";
                //     this.querySelector('.play1').src = "Assets/Icons/Play Icon.svg";
                //     titleElement.style.color = '#1ed760';
                // } else {
                //     // this.querySelector('.play1').style.display = "none";
                //     this.querySelector('.play1').src = "Assets/Icons/Play Icon-1 copy.svg";
                //     titleElement.style.color = 'white';
                // }
                let song = this.querySelector('.nm').firstElementChild.getAttribute("href");
                let image = this.querySelector('.titlee').firstElementChild.getAttribute("src");
                let title = titleElement.innerHTML;
                let artist = this.querySelector('.nm').lastElementChild.innerHTML;
                Active(title);
                playMusic(song);
                let playmedia = document.getElementById("playmedia");
                playmedia.onclick = () => { playMusic(song) };
            });
        });
    }
}
function BackButton(){
    let Back = document.getElementById("Back").firstElementChild;
    let Next = document.getElementById("Forward").firstElementChild;
    let Home = document.getElementById("Home")
    Home.addEventListener("click",libList)
    Back.addEventListener("click",libList)
    Next.addEventListener("click",SongsList)
}

function libList(){
    document.getElementById("Back").style.background = "rgba(24, 24, 24, 0.737)";
    document.getElementById("Forward").style.background = "black";
    document.querySelector(".Playlist1").style.display = "none";
    document.querySelector(".SongsList").style.display = "none";
    document.querySelector(".all").style.display = "flex";
    document.querySelector(".scroll_2").style.display = "flex";
    document.querySelector(".scroller").style.display = "flex";
}
function SongsList(){
    document.getElementById("Forward").style.background = "rgba(24, 24, 24, 0.737)";
    document.getElementById("Back").style.background = "black";
    document.querySelector(".Playlist1").style.display = "flex";
    document.querySelector(".SongsList").style.display = "flex";
    document.querySelector(".all").style.display = "none";
    document.querySelector(".scroll_2").style.display = "none";
    document.querySelector(".scroller").style.display = "none";
}



DyLib();
main();

