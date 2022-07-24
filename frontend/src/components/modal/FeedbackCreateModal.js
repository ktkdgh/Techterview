import api from "../shared/api";

function FeedbackCreateModal({ closeModal, checkedList }) {

    const createFeedback = async (checkedList) => {
        await api.post('/api/feedback/createfeedback', {recordingIdList : checkedList})
            .then(res => {
                console.log(res.data);
                window.location.reload(true);
            })

    }

    console.log(checkedList);
    return (

        <div className="video-delete-modal">
            <div className="video-delete-modal-content">
                <div className="video-delete-modal-body">
                    선택한 영상을 등록하시겠습니까??
                </div>
                <div className="video-delete-modal-footer">
                    <button className="btn-yes" onClick={() => closeModal(false)}>취소</button>
                    <button className="btn-cancel" onClick={() => createFeedback(checkedList)}>등록</button>
                </div>
            </div>
        </div>
    )
}

export default FeedbackCreateModal