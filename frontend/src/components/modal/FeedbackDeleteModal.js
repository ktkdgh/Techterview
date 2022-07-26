import api from "../shared/api";

function FeedbackDeleteModal({SetClickMinus, closeModal, feedbackId }) {
    var referrer = document.referrer
    const deleteFeedbackPage = async () => {
        await api.delete(`/api/feedback/deletePage/${feedbackId}`)
            .then(res => {
                window.location.href = referrer
            })
    };

function onclickclick () {
    SetClickMinus(1);
    closeModal(false)
}

function onclickDel () {
    SetClickMinus(1);
    deleteFeedbackPage(feedbackId)
}


    return (

        <div className="video-delete-modal">
            <div className="video-delete-modal-content">
                <div className="video-delete-modal-body">
                    등록한 피드백을 삭제하시겠습니까까까깍?
                </div>
                <div className="video-delete-modal-footer">
                    <button className="btn-yes" onClick={onclickclick}>취소</button>
                    <button className="btn-cancel" onClick={onclickDel}>삭제</button>
                </div>
            </div>
        </div>
    )
}

export default FeedbackDeleteModal