import api from "../shared/api";

function FeedbackDeleteModal({ closeModal, feedbackId }) {
    var referrer = document.referrer
    const deleteFeedbackPage = async () => {
        await api.delete(`/api/feedback/deletePage/${feedbackId}`)
            .then(res => {
                window.location.href = referrer
            })
    };

    return (

        <div className="video-delete-modal">
            <div className="video-delete-modal-content">
                <div className="video-delete-modal-body">
                    등록한 피드백을 삭제하시겠습니까까까깍?
                </div>
                <div className="video-delete-modal-footer">
                    <button className="btn-yes" onClick={() => closeModal(false)}>취소</button>
                    <button className="btn-cancel" onClick={() => deleteFeedbackPage(feedbackId)}>삭제</button>
                </div>
            </div>
        </div>
    )
}

export default FeedbackDeleteModal