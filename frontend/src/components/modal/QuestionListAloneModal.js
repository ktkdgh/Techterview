import api from "../shared/api";

function QuestionListAloneModal({ closeModal, questionlist }) {

    const getQeustions = async () => {
        await api.post('/api/questionList/randomQuestion', {
            list : questionlist
        })
            .then(res => {
                sessionStorage.setItem('QuestionList', res.data)
                window.location.replace("../page/training/Alone/" + 15)
            })
    };

    return (
        <div className="video-delete-modal">
            <div className="video-delete-modal-content">
                <div className="video-delete-modal-body">
                    <div>선택한 질문들</div>
                    { questionlist.map((value, idx) => {
                        return(
                            <div>
                                {idx + 1}. {value}
                            </div>
                        )
                    })}
                </div>
                <div className="video-delete-modal-footer">
                    <button className="btn-yes" onClick={() => closeModal(false)}>취소</button>
                    <button className="btn-cancel" onClick={() => getQeustions()}>나혼자 연습하러가기</button>
                </div>
            </div>
        </div>
    )
}

export default QuestionListAloneModal
