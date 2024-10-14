import Button from "./Button"

const list = ["All","Cricket","Footbal","UCL","Movies","Songs","Trailers"]

const ButtonList = () => {
    return (
        <div className="flex">
            {
                list.map(e => <Button key={e} name={e}/>)
            }
        </div>
    )
}

export default ButtonList