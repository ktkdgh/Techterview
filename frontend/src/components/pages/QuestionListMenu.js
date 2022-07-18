import React, { Component } from 'react';


class QuestionMenu extends Component {
    render() {
        return (
            <div>
                <div className="naviagation-bar-vertical-container">
                    <ul className='navigation-bar-vertical'>
                        <li><div >전체보기</div></li>
                        <li><div >직무별</div ></li>
                        <li><div >카테고리별</div ></li>
                    </ul>
                </div>
            </div>

        )
    }
}
export default QuestionMenu

