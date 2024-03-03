import type {DefaultTheme} from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    {
        text: '读书笔记',
        items: [
            {
                text: 'Spring 实战（第6版）',
                link: '/posts/book/Spring 实战（第6版）',
            },
            {
                text: 'Redis 设计与实现',
                link: '/posts/book/Redis 设计与实现',
            },
        ]
    },
    {
        text: 'Theme1',
        link: '/posts/theme/theme',
        //activeMatch: '/posts/theme'
    },
    {
        text: 'Theme2',
        link: '/posts/theme2/theme2',
        //activeMatch: '/posts/theme'
    },
]
