import "./TrackSearchResult.css"


const TrackSearchResult = (props) => {
    const handleChoose = () => {
        props.chooseTrack(props.videoId)
        props.videoPlayer.current.src = `https://www.youtube.com/embed/${props.videoId}?autoplay=1`
        props.setShowPlayer(!props.showPlayer)
    }
    const handleDownload = () => {
        props.downloadTrack(props.videoId)
        props.setShowPlayer(!props.showPlayer)
    }
    return (
        <div className="track-search-result" >
            <div className="youtube-image">
                <img onClick={handleDownload} className="youtube-thumnails" src={props.image} alt="Album"></img>
                <span id="youtube-download" className="material-symbols-outlined">download</span>
            </div>
            <div className="title-section" onClick={handleChoose} >
                <p className="youtube-title">{ props.title }</p>
                <h2 className="youtube-title">{ props.channel }</h2>
            </div>
        </div>
    )
}
export default TrackSearchResult;