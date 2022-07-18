import React, { Component } from 'react';


function TrainingAloneStart ({closeModal}){
    return (

        <div className="training-alone-start-modal">
                <div className="training-alone-modal-content"> 
                    <div className="training-alone-modal-body">
                        시작 버튼을 클릭하시면 면접이 시작됩니다.
                        답변을 완료하신 후 다음 버튼을 클릭하면 그 다음 문제로 넘어가집니다.
                        면접을 완료한 후 종료 버튼을 클릭해주시기 바랍니다. 
                    </div>
                    <div className="training-delete-modal-footer">
                        <button className="btn-yes" onClick={()=>closeModal(false)}>시작</button>
                    </div>
             </div>
        </div>
    )
}

export default TrainingAloneStart