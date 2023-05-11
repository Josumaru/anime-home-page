import "./Wallpaper.css"

const Wallpaper = (props) => {
    return (
        <div className="wallpaper-container">
            <img className="wallpaper" src={props.wallpaperSection}></img>
        </div>
    )
}
export default Wallpaper;