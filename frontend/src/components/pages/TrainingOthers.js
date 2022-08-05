import React from 'react';
import PeerOthersroom from '../peerjs/PeerOthersroom'

function TrainingOthers() {

    return (
        <div className="training-container">
            <PeerOthersroom />
            <div className='training-footer'>
                <div className="training-container-box">
                </div>
            </div>
        </div>
    )
}

export default TrainingOthers