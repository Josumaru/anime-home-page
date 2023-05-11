import { useState,useEffect } from "react";
import "./SearchBar.css"

const SearchBar = () => {
    const [search, setSearch] = useState([])

    const handleSearch = (event) => {
        event.preventDefault()
        let query = search.replace(/ /g,"+")
        window.open(`https://www.google.com/search?q=${query}`)
        setSearch("")
    }
    return (
        <div className="content-search-bar">
            <form onSubmit={ handleSearch } className="content-form">
                <input className="main-search-bar" type="search" placeholder="Search" value={search} onChange={(event)=> setSearch(event.target.value)}></input>
            </form>
        </div>
    )
}
export default SearchBar;