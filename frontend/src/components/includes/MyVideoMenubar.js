import React from 'react';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import "../css/FeedBack.css"

function FeedbackMenu({ selectMyVideoMenu }) {

    return (
        <>
            <Navigation
                onSelect={({ itemId }) => {
                    selectMyVideoMenu(itemId)
                }}
                items={[
                    {
                        title: 'My 영상 목록',
                        itemId: '/recording/15',
                    },
                    {
                        title: 'My 피드백 목록',
                        itemId: '/recording/16',
                    },
                ]}
            />
        </>
    );
}
export default FeedbackMenu