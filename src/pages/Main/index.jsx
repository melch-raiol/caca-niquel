import { useState } from "react"
import "./styles.css"
import { PopupImage } from "../../components/popupImage"

export function Main() {

    const [openPopup, setOpenPopup] = useState(false)
    const [openPopupImg, setOpenPopupImg] = useState(false)
    const [openPopupVideo, setOpenPopupVideo] = useState(false)

    const handleOpenPopup = () => {
        setOpenPopup(!openPopup)
    }

    const handleOpenImage = () => {
        setOpenPopupImg(true)
        setOpenPopupVideo(false)
        handleOpenPopup()
    }

    const handlePopupVideo = () => {
        setOpenPopupImg(false)
        setOpenPopupVideo(true)
        handleOpenPopup()
    }

    return (
        <div className="container">
            <button
                className="btn-save btn-main"
                onClick={() => handleOpenImage()}
            >Popup Imagem
            </button>
            <button
                className="btn-save btn-main"
                onClick={() => handlePopupVideo()}

            >Popup Video
            </button>
            {openPopup && <PopupImage
                setOpenPopup={setOpenPopup}
                setOpenPopupImg={setOpenPopupImg}
                openPopupImg={openPopupImg}
                openPopupVideo={openPopupVideo}
            />}
        </div>
    )
}