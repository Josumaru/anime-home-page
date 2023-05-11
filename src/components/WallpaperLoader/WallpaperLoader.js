import React, { useState, useRef, useEffect} from "react";
import "./WallpaperLoader.css"
import Wallpaper from "../Wallpaper/Wallpaper";

const WallpaperLoader = () => {
    const [wallpaperSection, setWallpaperSection] = useState([])
    const [loader, setLoader] = useState("0%")
    const [counter, setCounter] = useState(0)
    const loaderRef = useRef()
    useEffect(() => {
        const fetchWallpaper = async () => {
            for (let i = 0; i <= 5; i++) {
                const category = ["waifu"]
                let index = Math.floor(Math.random() * category.length);
                let response = await fetch(`https://api.waifu.pics/sfw/${category[index]}`);
                let data = await response.json()
                setWallpaperSection(prevState => [...prevState, data.url])
                setLoader(`${i * 20}%`)
                if (i == 5) {
                    setTimeout(() => {
                        loaderRef.current.style.display = "none"
                    },3000)
                }
            }
        }
        fetchWallpaper();
    }, [counter])

    const handleUpdate = () => {
        setCounter((prevState) =>  prevState + 1 )
        setWallpaperSection([])
        setLoader("0%")
        loaderRef.current.style.display = "block"
    }
    return (
        <div id="content" className="wallpaper-loader">
            <div className="update">
                <span onClick={ handleUpdate } id="update" style={{cursor: "pointer", fontSize: "30px"} }  className="material-symbols-outlined">replay_circle_filled</span>
            </div>
            <div ref={loaderRef} style={{ width: loader }} className="progress-loader"></div>
            <div className="wallpaper-section">
            {wallpaperSection.map((wallpaperSection) => {
                return (
                    <Wallpaper key={ wallpaperSection } wallpaperSection={wallpaperSection} />
                );
            })}
            </div>
        </div>
    );
};
export default WallpaperLoader;
  