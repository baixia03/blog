import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/posts/book/': [
        {
            text: 'Spring 实战（第6版）',
            link: '/posts/book/Spring 实战（第6版）'
        },
        {
            text: 'Redis 设计与实现',
            link: '/posts/book/Redis 设计与实现'
        },
    ],
    '/posts/theme/': [
        {
            text: '基础',
            link: '/guide/'
        }
    ],
    '/posts/theme2/': [
        {
            text: 'VuePress配置',
            items: [
                {
                    text: '介绍',
                    link: '/vuepress-config/'
                }
            ]
        }
    ]
}


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
