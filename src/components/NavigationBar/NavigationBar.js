import React, { useEffect, useState, useRef } from "react"
import "./NavigationBar.css"
import Ping from "ping.js"
import Loader from "../Loader/Loader"
import VoiceAssistant from "../VoiceAssistant/VoiceAssistant"


const NavigationBar = () => {
    const [pingStatus, setPingStatus] = useState(<Loader />)
    const [pingIcon, setPingIcon] = useState("black")
    const [showYoutubeSearch, setShowYoutubeSeacrh] = useState(false)
    const [search, setSearch] = useState("")
    const youtubeSearchBarRef = useRef()

    useEffect(() => {
        const ping = new Ping()
        const interval = setInterval(() => {
            ping.ping("https://github.com", function (err, data) {
                let latency = Math.floor(data / 10)
                try {
                    setPingStatus(latency + "MS")
                } catch (err) {
                    setPingStatus("Error")
                }
                (latency <= 60) ? setPingIcon("#138A36") : (latency <= 120) ? setPingIcon("#E4EE27") : setPingIcon("#E80505");
            })
        }, 5000);
        return () => clearInterval(interval)
    }, []);

    useEffect(() => {
        if (showYoutubeSearch) {
            youtubeSearchBarRef.current.style.width = "60%" 
        } else {
            youtubeSearchBarRef.current.style.width = "40px" 
            youtubeSearchBarRef.current.style.height = "40px" 
        }
    }, [showYoutubeSearch])
    
    const handleYoutubeSearch = (event) => {
        event.preventDefault();
        const query = search.replace(/ /g,"+")
        window.open(`https://www.youtube.com/results?search_query=${query}`)
        setShowYoutubeSeacrh(!showYoutubeSearch)
        setSearch("")
    }
    return (
        <div className="navigation-bar">
            <div className="navbar">
                <div className="voice-assiatant">
                    <VoiceAssistant />
                </div>
                <div className="navbar-search-bar">
                    <form className="form-search-bar" onSubmit={ handleYoutubeSearch }>
                        <input id="navbar-search" ref={youtubeSearchBarRef} className="search" placeholder="Youtube Search" type="text" value={ search } onChange={(event)=> setSearch(event.target.value)}></input>
                    </form>
                    <div className="search-button">
                        <span onClick={() => setShowYoutubeSeacrh(!showYoutubeSearch)} className="material-symbols-outlined">youtube_activity</span>
                    </div>
                    <div className="ping">
                        <span id="ping-icon" className="material-symbols-outlined" style={{ color: pingIcon }}>wifi</span>
                        <p className="ping-value">{pingStatus}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default NavigationBar;