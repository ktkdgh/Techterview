import React, { useEffect, useState } from 'react';
import FeedbackDeleteModal from '../modal/FeedbackDeleteModal'
import ReplyDeleteModal from '../modal/ReplyDeleteModal';
import ReactPlayer from 'react-player'
import jwt from "jwt-decode";
import api from "../shared/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons'

<img className="video-edit-thumbnail" src={require("../images/like.png")} alt={"video thumbnail"} />


function FeedbackDetail() {
    const [openFeedbackDeleteModal, SetopenFeedbackDeleteModal] = useState(false);
    const [openReplyDeleteModal, SetopenReplyDeleteModal] = useState(false);
    const [DetailFeedback, SetDetailFeedback] = useState([]);
    const [LikeStatus, SetLikeStatus] = useState("");
    const [text, setText] = useState('');
    const [FeedLikeCnt, SetFeedLikeCnt] = useState(0);
    const [ReplyList, SetReplyList] = useState([]);
    const [Modify, SetModify] = useState(false);
    const [Idx, SetIdx] = useState(0);
    const [UpdateText, SetUpdateText] = useState("");
    const [ReplyId, SetReplyId] = useState(0);
    const [ClickMinus, SetClickMinus] = useState(1)

    let feedbackId = new URL(window.location.href).pathname.split('/')[3]
    const Token = sessionStorage.getItem('Authorization')
    const userInfo = jwt(Token)

    useEffect(() => {
        async function getFeedDetail() {
            api.get(`/api/feedback/getDetail/${feedbackId}/${userInfo.id}`)
                .then(res => {
                    SetDetailFeedback(res.data);
                    SetLikeStatus(res.data.userLikeCheck);
                    SetFeedLikeCnt(res.data.likes)
                    SetReplyList(res.data.replyList)
                });
        }
        getFeedDetail();
    }, [])

    const upLikeCnt = async () => {
        const LikeCntData = { userId: userInfo.id, feedId: feedbackId }
        await api.post('/api/feedback/LikeCnt', LikeCntData)
            .then(res => {
                if (LikeStatus) {
                    SetLikeStatus(false)
                    SetFeedLikeCnt(FeedLikeCnt - 1)
                } else {
                    SetLikeStatus(true)
                    SetFeedLikeCnt(FeedLikeCnt + 1)
                }
            })
    };

    const replyCreate = async () => {
        if (text !== "") {
            const replyData = { text: text, userId: userInfo.id, feedbackId: feedbackId }
            await api.post("/api/feedback/replyCreate", replyData)
                .then(res => {
                    window.location.reload(true)
                })
        }
    }

    const replyUpdate = async (id, originText) => {
        if (originText !== UpdateText) {
            await api.put('/api/feedback/replyUpdate', {
                reply_id: id,
                comment: UpdateText
            })
                .then(res => {
                    window.location.reload(true)
                })
        } else {
            window.location.reload(true)
        }
    }

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onUpdate = (e) => {
        SetUpdateText(e.target.value);
    };

    const replyUpdateClick = async (idx, text) => {
        SetModify(true)
        SetIdx(idx)
        SetUpdateText(text)
    }

    const YMDFormat = (num) => {
        if (!num) return "";
        let firstNum = num.slice(0, 10);
        let secondNum = num.slice(11, 16);
        return firstNum + " " + secondNum
    }

    const FeedbackDelete = ()=>{
        SetopenFeedbackDeleteModal(true)
        SetClickMinus(-1);
    }

    return (
        <div>

                <div className="feedbackdetail-container" >

                   <div className="feedbackdetail-left" > 
                        {DetailFeedback.deletebotton ?
                        <button className="feedbackdetail-video-delete-btn"  onClick={() => FeedbackDelete()}> 영상 삭제 <FontAwesomeIcon icon={faTrashCan} /></button>: ""}
                        <ReactPlayer  controls url={DetailFeedback.recordingUrl}    style={{zIndex: ClickMinus}} id= 'feedback-detail-video'/>

                            <div className="feedbackdetail-title" >
                                <div className="feedbackdetail-title-left"> {DetailFeedback.title} </div> 
                                <div className='feedbackdetail-title-right'>  {DetailFeedback.name}</div>        
                                <div className="feedbackdetail-video-delete-btn-container">
                                    <div className="feedbackdetail-video-btn">
                                        {LikeStatus ? <button className="feedbackdetail-video-like-btn"  onClick={() => { upLikeCnt() }}><FontAwesomeIcon icon={faThumbsUp}  />     {FeedLikeCnt} </button> :  <button className="feedbackdetail-video-no-like-btn"  onClick={() => { upLikeCnt() }}><FontAwesomeIcon icon={faThumbsUp} />     {FeedLikeCnt} </button>}
                                    </div>
                                </div>                
                            </div>

                     </div>
                    <div className='feedbackdetail-right'>
                        <div className="feedbackdtail-input-wrapper">
                            {/* {DetailFeedback.replys}의 댓글 */}
                            <input className="add-comment-input" placeholder="  댓글을 입력해주세요" onChange={onChange} value={text} />
                            <button className="feedbackdetail-video-submit-btn"  onClick={() => { replyCreate() }}>등록</button>
                        </div>

                        { ReplyList.length !== 0 ? 
                        <table className="feedbackdetail-comment-table">
                            <div className="feedback-thead">
                                <div className="feedback-grid-header">
                                    <div>작성자</div><div>내용</div>
                                </div>
                            </div>
                            <tbody className="feedback-tbody">
                                {ReplyList.map((value, idx) => {
                                    return (
                                        <div className="feedback-table-container" key={idx}>
                                            <div> {value.user_name} </div>
                                            <div >
                                                {Modify && Idx == idx + 1 ?
                                                <div> <input onChange={onUpdate} value={UpdateText} /> </div> :
                                                <div>{value.reply_comment}{value.updateCheck ? "" : "(수정됨)"}</div>}
                                                <div className="comment-icon-container">
                                                        <div className="comment-date"> {YMDFormat(value.createdAt)} </div>

                                                <div className="comment-edit-delete-btn-wrapper">
                                                    {!value.replyCheck ? "" : Modify && Idx == idx + 1 ?
                                                        <div className="comment-edit-delete-btn">
                                                            <button  className="feedbackdetail-video-edit-btn" onClick={() => { replyUpdate(value.id, value.reply_comment) }}>수정</button>
                                                            <button className="feedbackdetail-video-delete-btn"  onClick={() => { window.location.reload(true) }}>취소</button>
                                                        </div> :
                                                        <div  className="comment-edit-delete-btn">
                                                            <button className="feedbackdetail-video-edit-btn"  onClick={() => { replyUpdateClick(idx + 1, value.reply_comment) }}>수정</button>
                                                            <button className="feedbackdetail-video-delete"  onClick={() => { SetopenReplyDeleteModal(true); SetReplyId(value.id) }} >
                                                            <FontAwesomeIcon icon={faTrashCan}  /></button>
                                                        </div>
                                                    }
                                                </div>
                                                
                                                </div>  
                                            </div>
                                        </div>
                                    );
                                })}
                            </tbody>
                        </table> : <div className="no-comment">등록된 댓글이 없습니다.</div> }
                    </div>

            </div>
            {openFeedbackDeleteModal && <FeedbackDeleteModal SetClickMinus={SetClickMinus} closeModal={SetopenFeedbackDeleteModal} feedbackId={feedbackId}/>}
            {openReplyDeleteModal && <ReplyDeleteModal closeModal={SetopenReplyDeleteModal} replyId ={ReplyId} />}

        </div>
    )
}

export default FeedbackDetail
