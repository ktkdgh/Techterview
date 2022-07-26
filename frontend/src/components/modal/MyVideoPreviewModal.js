// import api from "../shared/api";
import ReactPlayer from 'react-player'

function MyVideoPreviewModal({ closeModal, videoUrl }) {

    return (
        <div className="video-delete-modal">
            <div className="my-video-prev-modal">
                <div className="video-delete-modal-body">
                    <ReactPlayer controls url={videoUrl} />
                </div>
                <div className="video-delete-modal-footer">
                    <button className="btn-yes" onClick={() => closeModal(false)}>닫기</button>
                </div>
            </div>
        </div>
    )
}

export default MyVideoPreviewModal