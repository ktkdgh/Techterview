import React from 'react';
import { Navigation } from 'react-minimal-side-navigation';
// import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
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
                        title: '내 최근 목록',
                        itemId: '/recording/15',
                    },
                    {
                        title: '업로드 목록',
                        itemId: '/recording/16',
                    },
                ]}
            />
        </>
    );
}
export default FeedbackMenu