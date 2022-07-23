import React from 'react';
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
                        title: 'CS',
                        itemId: '/CS',
                        subNav: [
                            {
                                title: '네트워크',
                                itemId: '/CS/1',
                            },
                            {
                                title: '데이터베이스',
                                itemId: '/CS/2',
                            },
                            {
                                title: '디자인패턴',
                                itemId: '/CS/3',
                            },
                            {
                                title: '알고리즘',
                                itemId: '/CS/4',
                            },
                            {
                                title: '운영체제',
                                itemId: '/CS/5',
                            },
                            {
                                title: '자료구조',
                                itemId: '/CS/6',
                            },
                            {
                                title: '컴퓨터구조',
                                itemId: '/CS/7',
                            },
                        ]
                    },
                    {
                        title: '기본질문 및 개발상식',
                        itemId: '/basic',
                        subNav: [
                            {
                                title: '개발상식',
                                itemId: '/basic/8',
                            },
                            {
                                title: '기본질문',
                                itemId: '/basic/9',
                            },
                        ]
                    },
                    {
                        title: '언어',
                        itemId: '/language',
                        subNav: [
                            {
                                title: 'React',
                                itemId: '/language/10',
                            },
                            {
                                title: 'java',
                                itemId: '/language/11',
                            },
                            {
                                title: 'javascript',
                                itemId: '/language/12',
                            },
                        ]
                    },
                    {
                        title: '직무별',
                        itemId: '/duty',
                        subNav: [
                            {
                                title: '프론트엔드',
                                itemId: '/duty/13',
                            },
                            {
                                title: '백엔드',
                                itemId: '/duty/14',
                            },
                        ]
                    },
                    {
                        title: 'My 영상 관리',
                        itemId: '/recording',
                        subNav: [
                            {
                                title: 'My 영상 목록',
                                itemId: '/recording/main',
                            },
                            {
                                title: 'My 피드백 목록',
                                itemId: '/recording/feedback',
                            },
                        ],
                    },
            ]}
            />
        </>
    );
}

export default FeedbackMenu