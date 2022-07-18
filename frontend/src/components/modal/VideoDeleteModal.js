function VideoDeleteModal ({closeModal}){
    return (

        <div className="video-delete-modal">
                <div className="video-delete-modal-content"> 
                    <div className="video-delete-modal-body">
                        영상을 삭제하시겠습니까?
                    </div>
                    <div className="video-delete-modal-footer">
                        <button className="btn-yes" onClick={()=>closeModal(false)}>취소</button>
                        <button className="btn-cancel">삭제</button>
                    </div>
             </div>
        </div>
    )
}

export default VideoDeleteModal