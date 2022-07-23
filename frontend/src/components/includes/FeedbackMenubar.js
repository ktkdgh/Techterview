import React, {useState} from 'react';

import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';


function FeedbackMenu() {

    return (
        <>
        <Navigation
            activeItemId="/management/members"
            onSelect={({itemId}) => {
                // maybe push to the route
            }}
            items={[
                {
                title: '모두 보기',
                itemId: '/dashboard',
                },
                {
                title: '카테고리 보기',
                itemId: '/management',
                subNav: [
                    {
                    title: 'Projects',
                    itemId: '/management/projects',
                    subNav: [{
                        title: 'Projects',
                        itemId: '/project/projectt',
                    }
                    ]
                    },
                    {
                    title: 'Members',
                    itemId: '/management/members',
                    },
                ],
                },
                {
                title: 'My 영상 관리',
                itemId: '/another',
                subNav: [
                    {
                    title: 'Teams',
                    itemId: '/management/teams',
                    },
                ],
                },
            ]}
            />
        </>
    );
}

export default FeedbackMenu