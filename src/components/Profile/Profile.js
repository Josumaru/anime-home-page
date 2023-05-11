import { useEffect,useState } from "react"
import "./Profile.css"

const Profile = () => {
    const [profile, setProfile]= useState()
    useEffect(() => {
        let category = ["waifu"]
        let index = Math.floor(Math.random() * category.length)
        fetch(`https://api.waifu.pics/sfw/${category[index]}`)
            .then((response) => response.json())
            .then((data) => {
                setProfile(data.url)
            })
    },[])
    return (
        <div className="profile">
            <img className="profile-image" src={profile}></img>
            <p>React JS</p>
        </div>
    )
}
export default Profile;