import type {DefaultTheme} from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/posts/front/base': [
        {
            text: 'JavaScript',
            collapsed: true,
            items: [
                {
                    text: 'JavaScript 基础 01',
                    link: '/posts/front/base/JavaScript 基础 01.md'
                }
            ]
        },
        {
            text: '样式设计',
            collapsed: true,
            items: [
                {
                    text: '自定义消息提示',
                    link: '/posts/front/base/自定义消息提示.md'
                },
                {
                    text: '自定义 footer',
                    link: '/posts/front/base/自定义 footer.md'
                }
            ]
        }
    ],
    '/posts/book/1': [
        {
            text: '第 11 章 AOF持久化',
            link: '/posts/book/1/第 11 章 AOF持久化'
        },
        {
            text: '第 18 章 发布与订阅',
            link: '/posts/book/1/第 18 章 发布与订阅'
        },
        {
            text: '第 19 章 事务',
            link: '/posts/book/1/第 19 章 事务'
        }
    ],
    '/posts/database/mysql': [
        {
            text: 'mysql-基础篇',
            link: '/posts/database/mysql/MySQL-基础篇'
        },
        {
            text: 'mysql-进阶篇',
            link: '/posts/database/mysql/MySQL-进阶篇'
        },
    ],
    '/posts/wechat': [
        {
            text: '微信小程序 01',
            link: '/posts/wechat/微信小程序 01.md'
        },
        {
            text: '微信小程序 02',
            link: '/posts/wechat/微信小程序 02.md'
        },
    ],
    '/posts/my': [
        {
            text: '导航',
            link: '/posts/my/导航.md'
        },
        {
            text: '软件',
            link: '/posts/my/软件.md'
        },
        {
            text: '浏览器插件',
            link: '/posts/my/浏览器插件.md'
        }
    ],

}
// export const sidebar: DefaultTheme.Config['sidebar'] = {
//     '/posts/book/': [
//         {
//             text: 'Spring 实战（第6版）',
//             link: '/posts/book/Spring 实战（第6版）'
//         },
//         {
//             text: 'Redis 设计与实现',
//             link: '/posts/book/Redis 设计与实现'
//         },
//         {
//             text: 'Java 并发编程实战',
//             link: '/posts/book/Java 并发编程实战',
//         },
//     ],
// }


// export const sidebar: DefaultTheme.Config['sidebar'] = [
//   {
//     text: 'Introduction',
//     collapsed: false,
//     items: [
//       { text: 'VitePress Theme', link: '/posts/theme.md' },
//       { text: 'VitePress Theme2', link: '/posts/theme2.md' },
//       {
//         text: 'dir',
//         items:[
//           { text: 'VitePress Theme', link: '/posts/theme.md' },
//           { text: 'VitePress Theme2', link: '/posts/theme2.md' },
//           {
//             text: 'dir2',
//             items:[
//               { text: 'VitePress Theme', link: '/posts/theme.md' },
//               { text: 'VitePress Theme2', link: '/posts/theme2.md' },
//             ]
//           }
//         ]
//       }
//     ]
//   },
// ]
