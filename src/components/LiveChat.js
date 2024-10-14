import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addMessage } from "../utils/chatSlice"
import ChatMessage from "./ChatMessage"
import { generateRandomName, makeRandomMessage } from "../utils/helper"

const LiveChat = () => {

    const [liveMessage,setLiveMessage] = useState("")
    const dispatch = useDispatch()
    const chatMessages = useSelector(store => store.chat.messages)

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log("API polling")
            dispatch(addMessage({name: generateRandomName(), message: makeRandomMessage(20)}))
        }, 1500)

        return () => { clearInterval(interval) }
    },[])

    return (
        <>
            <div className="w-full h-[543px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
                <div>
                    {
                        chatMessages.map((m,i) => <ChatMessage key={i} name={m.name} message={m.message} />) 
                    }
                </div>
            </div>
            <form 
                onSubmit={(e) => { e.preventDefault(); dispatch(addMessage({name: "Akshay", message:liveMessage})); setLiveMessage("")}} 
                className="w-full p-2 ml-2 border border-black"
            >
                <input 
                    onChange={(e) => setLiveMessage(e.target.value)} 
                    className="w-80 mr-4 border border-black" 
                    type="text" 
                    value={liveMessage} 
                />
                <button className="px-2 mx-2 bg-green-500" >send</button>
            </form>
        </>
    )
}

export default LiveChat