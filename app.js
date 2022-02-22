const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    // load data 
    fetch(url)
        .then(response => response.json())
        .then(songs => displaySongs(songs.data))
        .catch(error => displayError('Somethings went wrong'));

    // try {
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     displaySongs(data.data);
    // }
    // catch (error) {
    //     displayError('Somethings went wrong');
    // }

}

const displaySongs = songs => {
    const songsContainer = document.getElementById('song-container');
    songsContainer.innerHTML = '';
    songs.forEach(song => {
        // console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
        
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
          </audio>

            </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songsContainer.appendChild(songDiv);
    });
}


const getLyric = async (artist, title) => {
    console.log(`${artist}  =  ${title}`);
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => displayLyric(data));

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyric(data);
    }
    catch (error) {
        displayError('Somethings went wrong');
    }
}

const displayLyric = lyric => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyric.lyrics;
    console.log(lyric.lyrics);

}


const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}