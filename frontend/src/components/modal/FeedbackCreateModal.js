import api from "../shared/api";

function FeedbackCreateModal({ closeModal, checkedList }) {

    const createFeedback = async (checkedList) => {
        await api.post('/api/feedback/createfeedback', {recordingIdList : checkedList})
            .then(res => {
                window.location.reload(true);
            })
    }

    return (
        <div className="video-delete-modal">
            <div className="video-delete-modal-content">
                <div className="video-delete-modal-body">
                    {checkedList.length !== 0 ? "선택한 영상을 등록하시겠습니까??" : "선택한 영상이 없습니다!" }
                </div>
                {checkedList.length !== 0 ?  
                <div className="video-delete-modal-footer">
                    <button className="btn-yes" onClick={() => closeModal(false)}>취소</button>
                    <button className="btn-save" onClick={() => createFeedback(checkedList)}>등록</button>
                </div>
                : <div className="video-delete-modal-footer">
                    <button className="btn-yes" onClick={() => closeModal(false)}>닫기</button>
                </div>}
            </div>
        </div>
    )
}

export default FeedbackCreateModal