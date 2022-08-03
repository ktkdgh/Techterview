import api from "../shared/api";
import '../css/ReplyDeleteModal.css';


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

        <div className="feedback-video-delete-modal">
            <div className="feedback-video-delete-modal-content">
                <div className="feedback-video-delete-modal-body">
                    등록한 영상을 삭제하시겠습니까?
                </div>
                <div className="feedback-video-delete-modal-footer">
                    <button className="feedback-video-btn-cancel" onClick={() => onclickclick()}>취소</button>
                    <button className="feedback-video-btn-delete" onClick={() => onclickDel()}>삭제</button>
                </div>
            </div>
        </div>
    )
}

export default FeedbackDeleteModal