import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { closeMenu } from "../utils/appSlice"
import { useSearchParams } from "react-router-dom"

const WatchPage = () => {

    const [searchParams] = useSearchParams()
    const videoId = searchParams.get("v")
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(closeMenu())
    },[])

    return (
        <div className="px-5">
            <iframe 
                width="966" 
                height="543" 
                src={"https://www.youtube.com/embed/"+videoId+"?&autoplay=1"} 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin">
            </iframe>
        </div>
    )
}

export default WatchPage