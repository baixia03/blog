import type {DefaultTheme} from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    {
        text: '读书笔记',
        items: [
            {
                text: 'Redis 设计与实现',
                link: '/posts/book/1/第 18 章 发布与订阅',
            },
            {
                text: 'Spring 实战（第6版）',
                link: '/posts/book/Spring 实战（第6版）',
            },
            {
                text: 'Java 并发编程实战',
                link: '/posts/book/Java 并发编程实战',
            },
        ]
    },
]
