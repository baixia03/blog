import type {DefaultTheme} from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/posts/language/java': [
        {
            text: 'Java 语言',
            collapsed: true,
            items: [
                {
                    text: 'Java 教程',
                    link: '/posts/language/java/Java 教程.md'
                },
                {
                    text: 'Java Lambda 表达式',
                    link: '/posts/language/java/Java Lambda 表达式.md'
                }
            ]
        },
        {
            text: 'Java 集合',
            collapsed: true,
            items: [
                {
                    text: 'Java 集合',
                    link: '/posts/language/java/Java 集合.md'
                }
            ]
        },
        {
            text: 'Java 并发性',
            collapsed: true,
            items: [
                {
                    text: 'Java 并发性与多线程介绍',
                    link: '/posts/language/java/Java 并发性与多线程介绍.md'
                },
                {
                    text: '多线程的优点',
                    link: '/posts/language/java/多线程的优点.md'
                },
                {
                    text: 'Java 并发性与多线程介绍',
                    link: '/posts/language/java/多线程的代价.md'
                }
            ]
        },
        {
            text: 'Java 函数式编程',
            collapsed: true,
            items: [
                {
                    text: 'Java 函数式编程',
                    link: '/posts/language/java/Java 函数式编程.md'
                },
                {
                    text: 'Java 高阶函数',
                    link: '/posts/language/java/Java 高阶函数.md'
                },
                {
                    text: 'Java 函数式接口',
                    link: '/posts/language/java/Java 函数式接口.md'
                },
                {
                    text: 'Java 函数式组合',
                    link: '/posts/language/java/Java 函数式组合.md'
                },
                {
                    text: 'Java Stream API',
                    link: '/posts/language/java/Java Stream API.md'
                },
            ]
        }
    ],
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
            collapsed: true,
            items: [
                {
                    text: '常用网址',
                    link: '/posts/my/常用网址.md'
                },
                {
                    text: '常用软件',
                    link: '/posts/my/常用软件.md'
                },
                {
                    text: '浏览器插件',
                    link: '/posts/my/浏览器插件.md'
                }
            ]
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
