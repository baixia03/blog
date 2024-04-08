import type {DefaultTheme} from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    {
        text: '读书笔记',
        items: [
            {
                text: 'Redis 设计与实现',
                link: '/posts/book/1/第 11 章 AOF持久化',
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
    {
        text: '数据库',
        items: [
            {
                text: 'MySQL',
                link: '/posts/database/mysql/MySQL-基础篇.md',
            }
        ]
    }
]
