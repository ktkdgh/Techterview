import api from "../shared/api";
import '../css/ReplyDeleteModal.css';

function ReplyDeleteModal({ closeModal, replyId }) {

    const replyDelete = async (id) => {
        await api.delete(`/api/feedback/replyDelete/${id}`)
            .then(res => {
                window.location.reload(true)
            })
    }

    return (
        <div className="reply-delete-modal">
            <div className="reply-delete-modal-content">
                <div className="reply-delete-modal-body">
                    댓글을 삭제하시겠습니까?
                </div>
                <div className="reply-delete-modal-footer">
                    <button className="reply-btn-cancel" onClick={() => closeModal(false)}>취소</button>
                    <button className="reply-btn-delete" onClick={() => replyDelete(replyId)}>삭제</button>
                </div>
            </div>
        </div>
    )
}
export default ReplyDeleteModal