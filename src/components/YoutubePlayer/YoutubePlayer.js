import { useEffect, useState, useRef } from "react";
import "./YoutubePlayer.css"
import axios from "axios";
import TrackSearchResult from "../TrackSeacrhResult/TrackSearchResult";


const YoutubePlayer = () => {
    const audioRef = useRef();
    const searchRef = useRef();
    const videoRef = useRef();
    const [showPlayer, setShowPlayer] = useState(false)
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState(
    [
        {
            "kind": "",
            "etag": "",
            "id": {
                "kind": "",
                "videoId": ""
            },
            "snippet": {
                "publishedAt": "",
                "channelId": "",
                "title": "Youtube Player",
                "description": "",
                "thumbnails": {
                    "default": {
                        "url": "",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*MnP5DPXdh9RJnwtwrVXl6A.jpeg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*MnP5DPXdh9RJnwtwrVXl6A.jpeg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "React JS",
                "liveBroadcastContent": "",
                "publishTime": ""
            }
        },
    ])

    //Fetching data from YouTube
    const fetchingYoutube = (search) => {
        const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
        let url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&q=${search}`
        fetch(url).then((response => response.json())).then(data => {
            setSearchResult(data.items)
            videoRef.current.src = data
        })
    }

    //Fetching data from API
    const youtubeDownload = async (videoId) => {
        const RAPID_YTSTREAM = process.env.REACT_APP_RAPID_YTSTREAM
        const options = {
            method: 'GET',
            url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
            params: {id: videoId},
            headers: {
              'content-type': 'application/octet-stream',
              'X-RapidAPI-Key': `${RAPID_YTSTREAM}`,
              'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
            }
          };
        try {
            const response = await axios.request(options);
            if (response && response.data.adaptiveFormats && response.data.formats[2].url) {
                const element = document.createElement('a')
                element.setAttribute = ("download", response.data.title)
                element.href = response.data.formats[2].url
                element.download = response.data.title
                element.target = "_blank"
                element.click()
    }
        } catch (error) {
            console.error("Error while fetching data",error);
        }
    }

    const chooseTrack = () => {
        setSearch('')
    }
    const downloadTrack = (videoId) => {
        youtubeDownload(videoId)
    }
    const handlePlay = () => {
        audioRef.current.play();
    }
    const handlePause = () => {
        audioRef.current.pause();
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        fetchingYoutube(search)
    }
    return (      
        <div className="youtube-player">
            <form onSubmit={handleSubmit} className="input-form">
                <div className="input-icon">
                    <span style={{position: "fixed", color: "var(--light-color)"}} onClick={() => {setShowPlayer(!showPlayer)}} className="material-symbols-outlined">search</span>
                </div>
                <input style={{width: showPlayer ?  "99%" : "40px"}} placeholder="Search..." className="youtube-search-bar" type="text" value={search} onChange={event => setSearch(event.target.value)}></input>
            </form>
            <div style={{display: showPlayer ?  "block" : "none"}} ref={searchRef} className="search-result">
                {searchResult.map((resultBox) => {
                    return (
                        <TrackSearchResult showPlayer={ showPlayer } setShowPlayer={ setShowPlayer } videoPlayer={ videoRef } chooseTrack={ chooseTrack } downloadTrack={ downloadTrack } key={resultBox.id.videoId} videoId={resultBox.id.videoId} channel={ resultBox.snippet.channelTitle } title={resultBox.snippet.title} image={ resultBox.snippet.thumbnails.medium.url} />
                    )
                })}
            </div>
            <div style={{ display: showPlayer ? "none" : "block" }} id="audio-player" className="audio-player">
                <iframe className="youtube-embed" ref={videoRef} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <div className="audio-controls">
                    <span style={{fontSize: "60px"}} className="material-symbols-outlined">skip_previous</span>
                    <span style={{fontSize: "60px"}} className="material-symbols-outlined" onClick={handlePause}>pause</span>
                    <span style={{fontSize: "60px"}} className="material-symbols-outlined" onClick={handlePlay}>play_arrow</span>
                    <span style={{fontSize: "60px"}} className="material-symbols-outlined">skip_next</span>
                </div>
                <audio ref={audioRef}></audio>
            </div>
        </div>
    )
}
export default YoutubePlayer;