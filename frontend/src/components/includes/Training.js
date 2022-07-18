import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Training extends Component {
    render() {
        return (
            <div className="training-container">
                <Helmet><style>{'body { background-color: black; }'}</style></Helmet>
                <div className="training-navigation-bar-logo"> TECHTERVIEW </div>

                <div className='traing-inner-box'>

                </div>
                <div className='training-footer'>
                    <div class="training-container-box">
                        <div class="training-item1">1<img className="video-thumbnail-second-place" src={require("../images/start.png")} alt={"start button"} /></div>
                        <div class="training-item-first-place"><img className="video-thumbnail-first-place" src={require("../images/next.png")} alt={"next button"} />   </div>
                        <div class="training-item"><img className="video-thumbnail-third-place" src={require("../images/end.png")} alt={"end button"} />   </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Training
