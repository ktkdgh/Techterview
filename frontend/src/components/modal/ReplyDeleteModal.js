import api from "../shared/api";

function ReplyDeleteModal({ closeModal, replyId }) {

    const replyDelete = async (id) => {
        await api.delete(`/api/feedback/replyDelete/${id}`)
            .then(res => {
                window.location.reload(true)
            })
    }

    return (
        <div className="video-delete-modal">
            <div className="video-delete-modal-content">
                <div className="video-delete-modal-body">
                    댓글을 삭제하시겠습니까?
                </div>
                <div className="video-delete-modal-footer">
                    <button className="btn-yes" onClick={() => closeModal(false)}>취소</button>
                    <button className="btn-cancel" onClick={() => replyDelete(replyId)}>삭제</button>
                </div>
            </div>
        </div>
    )
}
export default ReplyDeleteModal