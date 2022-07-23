import React, { useState } from 'react';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useParams } from 'react-router-dom';


function FeedbackMenu() {

    const Options = [
        {
            key: 1,
            value: "네트워크",
        },
        {
            key: 2,
            value: "데이터베이스",
        },
        {
            key: 3,
            value: "디자인패턴",
        },
        {
            key: 4,
            value: "알고리즘",
        },
        {
            key: 5,
            value: "운영체제",
        },
        {
            key: 6,
            value: "자료구조",
        },
        {
            key: 7,
            value: "컴퓨터구조"
        },
        {
            key: 8,
            value: "JavaScript",
        },
        {
            key: 9,
            value: "Java",
        },
        {
            key: 10,
            value: "React",
        },
        {
            key: 11,
            value: "기본질문",
        },
        {
            key: 12,
            value: "개발상식",
        },
        {
            key: 13,
            value: "프론트엔드",
        },
        {
            key: 14,
            value: "백엔드"
        }
    ];


    const [feedbackNum, SetFeedbackNum] = useState([])

    function handleClick() {
        window.location.replace("../feedback/main/" + feedbackNum)
    }

    return (
        <>
            <Navigation
                activeItemId="/management/members"
                onSelect={({ itemId }) => {
                    // maybe push to the route
                }}
                items={[
                    {
                        title: '모두 보기',
                        // itemId: '/dashboard',
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