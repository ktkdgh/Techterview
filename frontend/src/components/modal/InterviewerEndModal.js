
function InterviewerEndModal({ closeModal }) {

    return (

        <div className="video-delete-modal">
            <div className="video-delete-modal-content">
                <div className="video-delete-modal-body">
                    😊 고생하셨습니다 😊
                </div>
                <div className="video-delete-modal-footer">
                    <button className="btn-yes" onClick={() => window.location.href = '/'}>홈으로 </button>
                </div>
            </div>
        </div>
    )
}

export default InterviewerEndModal