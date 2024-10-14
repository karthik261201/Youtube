import { useDispatch, useSelector } from "react-redux"
import { toggleMenu } from "../utils/appSlice"
import { useEffect, useState } from "react"
import { YOUTUBE_SEARCH_API } from "../utils/constants"
import { cacheResults } from "../utils/searchSlice"

const Header = () => {

    const [searchQuery,setSearchQuery] = useState("")
    const [suggestions,setSuggestions] = useState([])
    const [showSuggestion,setShowSuggestion] = useState(false)
    const searchCache = useSelector(store => store.search)
    const dispatch = useDispatch()

    const toggleMenuHandler = () => {
        dispatch(toggleMenu())
    }

    const getSearchSuggestions = async () => {
        const data = await fetch(YOUTUBE_SEARCH_API+searchQuery)
        const json = await data.json()
        setSuggestions(json[1])
        dispatch(cacheResults({
            [searchQuery]: json[1]
        }))
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if(searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery])
            }
            else {
                getSearchSuggestions()
            }
        }, 200)
        return () => { clearTimeout(timer) }
        // console.log(searchQuery)
    },[searchQuery])

    return (
        <div className="grid grid-flow-col p-5 m-2 shadow-lg">
            <div className="flex col-span-1">
                <img
                    onClick={() => toggleMenuHandler()} 
                    className="h-6 cursor-pointer"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
                    alt="hamburger-icon" 
                />
                <img 
                    className="h-6 mx-3"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
                    alt="youtube-logo" 
                />
            </div>
            <div className="col-span-10">
                <div>
                    <input 
                        className="px-5 w-1/2 border border-gray-500 p-1 rounded-l-full" 
                        type="text" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSuggestion(true)}
                        onBlur={() => setShowSuggestion(false)}
                    />
                    <button className="border border-gray-500 px-3 py-1 rounded-r-full bg-gray-200">🔍</button>
                </div>
                {
                    showSuggestion &&
                    <div className="fixed bg-white py-2 px-5 w-[35rem] shadow-lg rounded-lg border border-gray-100">
                        <ul>
                            {
                                suggestions.map(s => <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">🔍 {s}</li>)
                            }
                        </ul>
                    </div>
                }
            </div>
            <div className="col-span-1">
                <img 
                    className="h-6"
                    src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                    alt="user-icon" 
                />
            </div>
        </div>
    )
}

export default Header