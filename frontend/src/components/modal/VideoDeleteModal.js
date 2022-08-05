import api from "../shared/api";

function VideoDeleteModal({ closeModal, checkedList }) {
    const deleteRecording = async (checkedList) => {
        await api.delete(`/api/feedback/deleterecording/${[checkedList]}`)
            .then(res => {
                console.log(res.data);
                window.location.reload(true);
            })
    }

    return (
        <div className="video-delete-modal" >
            <div className="video-delete-modal-content">
                <div className="video-delete-modal-body">
                    {checkedList.length !== 0 ? "선택한 영상을 삭제하시겠습니까?" : "선택한 영상이 없습니다!" }
                </div>
                {checkedList.length !== 0 ? 
                <div className="video-delete-modal-footer">
                    <button className="btn-yes" onClick={() => closeModal(false)}>취소</button>
                    <button className="btn-cancel" onClick={() => deleteRecording(checkedList)}>삭제</button>
                </div> :
                <div className="video-delete-modal-footer">
                    <button className="btn-yes" onClick={() => closeModal(false)}>닫기</button>
                </div> }
            </div>
        </div>
    )
}

export default VideoDeleteModal