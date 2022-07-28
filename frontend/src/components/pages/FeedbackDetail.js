import React, { useEffect, useState } from 'react';
import FeedbackDeleteModal from '../modal/FeedbackDeleteModal'
import ReplyDeleteModal from '../modal/ReplyDeleteModal';
import ReactPlayer from 'react-player'
import jwt from "jwt-decode";
import api from "../shared/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons'
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
        const replyData = { text: text, userId: userInfo.id, feedbackId: feedbackId }
        await api.post("/api/feedback/replyCreate", replyData)
            .then(res => {
                window.location.reload(true)
            })
    }

    const replyUpdate = async (id) => {
        await api.put('/api/feedback/replyUpdate', {
            reply_id: id,
            comment: UpdateText
        })
            .then(res => {
                window.location.reload(true)
            })
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

    const onClick = ()=>{
        SetopenFeedbackDeleteModal(true)
        SetClickMinus(-1);
        console.log(ClickMinus);
    }

    return (
        <div>
        
                <div className="feedbackdetail-container" >
                            
                   <div className="feedbackdetail-left" > 
                                        
                                         <ReactPlayer  controls url={DetailFeedback.recordingUrl}    style={{zIndex: ClickMinus}} id= 'feedback-detail-video'/>

                                         <div className="feedbackdetail-title" >
                                            <div className="feedbackdetail-title-left"> {DetailFeedback.title} </div> 
                                            <div className='feedbackdetail-title-right'>  {DetailFeedback.name}</div> 
                                                  
                                    <div className="feedbackdetail-video-delete-btn-container">

                                    <div className="feedbackdetail-video-btn">

                                        {openFeedbackDeleteModal && <FeedbackDeleteModal SetClickMinus={SetClickMinus} closeModal={SetopenFeedbackDeleteModal} feedbackId={feedbackId}/>}
                                        {openReplyDeleteModal && <ReplyDeleteModal closeModal={SetopenReplyDeleteModal} replyId ={ReplyId} />}
                                        {LikeStatus ? <button className="feedbackdetail-video-like-btn"  onClick={() => { upLikeCnt() }}><FontAwesomeIcon icon={faHeartCircleCheck}  />     {FeedLikeCnt} </button> :  <button className="feedbackdetail-video-like-btn"  onClick={() => { upLikeCnt() }}><FontAwesomeIcon icon={faHeartBroken} />     {FeedLikeCnt} </button>}
                                      
                                        {DetailFeedback.deletebotton ?
                                        <button className="feedbackdetail-video-delete-btn"  onClick={onClick}>  <FontAwesomeIcon icon={faTrashCan}  /></button>: ""}
                                    </div>

                                        </div>                
                                    </div>
    
                                    

                     </div>
                    <div className='feedbackdetail-right'>
                        <div className="feedbackdtail-input-wrapper">
                            {DetailFeedback.replys}의 댓글
                            <input className="add-comment-input" onChange={onChange} value={text} />
                            <button className="feedbackdetail-video-like-btn"  onClick={() => { replyCreate() }}>등록</button>
                        </div>
                        <table className="feedbackdetail-comment-table">
                            <thead>
                                <tr className="feedback-grid-header">
                                    <th>작성자</th><th>내용</th><th>등록일</th><th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ReplyList.map((value, idx) => {
                                    return (
                                        <tr>
                                            <td> {value.user_name} </td>
                                            {Modify && Idx == idx + 1 ?
                                                <td> <input onChange={onUpdate} value={UpdateText} /> </td> :
                                                <td>{value.reply_comment}{value.updateCheck ? "" : "(수정됨)"}</td>}
                                            <td> {YMDFormat(value.createdAt)} </td>
                                            {!value.replyCheck ? "" : Modify && Idx == idx + 1 ?
                                                <td>
                                                    <button  className="feedbackdetail-video-like-btn" onClick={() => { replyUpdate(value.id) }}>수정</button>
                                                    <button className="feedbackdetail-video-delete-btn"  onClick={() => { window.location.reload(true) }}>취소</button>
                                                </td> :
                                                <td>
                                                    <button className="feedbackdetail-video-like-btn"  onClick={() => { replyUpdateClick(idx + 1, value.reply_comment) }}>수정</button>
                                                    <button className="feedbackdetail-video-delete"  onClick={() => { SetopenReplyDeleteModal(true); SetReplyId(value.id) }} >
                                                    <FontAwesomeIcon icon={faTrashCan}  /></button>
                                                </td>
                                            }
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

            </div>
                    
        </div>
    )
}

export default FeedbackDetail
