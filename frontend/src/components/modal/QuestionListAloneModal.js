import api from "../shared/api";

function QuestionListAloneModal({ closeModal, questionlist }) {
    const getQeustions = async () => {
        await api.post('/api/questionList/randomQuestion', {
            list : questionlist
        })
            .then(res => {
                sessionStorage.setItem('QuestionList', JSON.stringify(res.data))
                window.location.replace("../page/training/Alone/" + 15)
            })
    };

    return (
        <div className="question-list-modal">
            {questionlist.length !== 0 ? 
            <div className="question-list-modal-content">
                <div className="question-list-modal-body">
                    <div> 선택한 질문들</div> <br></br>
                    { questionlist.map((value, idx) => {
                        return(
                            <div key={idx}>
                                {idx + 1}. {value}
                            </div>
                        )
                    })}
                </div>
                <div className="question-list-modal-footer">
                    <button className="btn-yes" onClick={() => closeModal(false)}>취소</button>
                    <button className="btn-save" onClick={() => getQeustions()}>나혼자 연습하러가기</button>
                </div>
            </div> : 
                <div className="question-list-modal-content">
                <div className="question-list-modal-body">
                    <div> 선택한 질문이 없습니다....😢</div> 
                </div>
                <div className="question-list-modal-footer">
                    <button className="btn-yes" onClick={() => closeModal(false)}>질문 담으러 가기</button>
                </div>
            </div> }
        </div>
    )
}

export default QuestionListAloneModal
