import {defineConfig} from 'vitepress';
import {head, nav, sidebar} from './configs';
import {fileURLToPath, URL} from 'node:url';

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
    // 基本路径
    base: "/blog/",
    // 输出目录
    outDir: '../dist',
    cacheDir: '../../node_modules/vitepress_cache',
    // 语言
    lang: 'zh-CN',
    // 标题
    title: 'VitePress',
    // 描述
    description: 'tools',
    // 顶部栏配置
    head,
    // 将从URL中删除尾随的.html
    cleanUrls: true,
    // 最后更新时间
    lastUpdated: true,
    /* markdown 配置 */
    markdown: {
        lineNumbers: false,
        container: {
            tipLabel: "提示",
            warningLabel: "警告",
            dangerLabel: "危险",
            infoLabel: "信息",
            detailsLabel: "详情"
        }
    },

    vite: {
        server: {
            // host: "0.0.0.0",
            port: 5175,
            strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
            hmr: false,//禁用或配置 HMR 连接
        },
        resolve: {
            alias: [
                {
                    find: /^.*\/VPSwitchAppearance\.vue$/,
                    replacement: fileURLToPath(
                        new URL('./theme/components/SwitchAppearance.vue', import.meta.url),
                    ),
                },
            ],
        },
    },

    themeConfig: {
        // 导航栏
        nav,
        // 侧导航栏
        sidebar,
        // 首页logo图
        logo: '/logo.png',
        // 本地搜索
        search: {
            provider: 'local'
        },

        /*
          algolia: {
            appId: '7H67QR5P0A',
            apiKey: 'deaab78bcdfe96b599497d25acc6460e',
            indexName: '',
             searchParameters: {
               facetFilters: [],
             },
          },
        */

        // 顶部栏右侧icon
        socialLinks: [
            {icon: 'github', link: 'https://github.com/baixia03'},
            {
                icon: {
                    svg: '<svg t="1708659223568" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4103" width="200" height="200"><path d="M512 512m-494.933333 0a494.933333 494.933333 0 1 0 989.866666 0 494.933333 494.933333 0 1 0-989.866666 0Z" fill="#C71D23" p-id="4104"></path><path d="M762.538667 457.045333h-281.088a24.4736 24.4736 0 0 0-24.439467 24.405334v61.098666c-0.034133 13.5168 10.922667 24.439467 24.405333 24.439467h171.1104c13.5168 0 24.439467 10.922667 24.439467 24.439467v12.219733a73.3184 73.3184 0 0 1-73.3184 73.3184h-232.209067a24.439467 24.439467 0 0 1-24.439466-24.439467v-232.174933a73.3184 73.3184 0 0 1 73.3184-73.3184h342.152533c13.482667 0 24.405333-10.922667 24.439467-24.439467l0.034133-61.098666a24.405333 24.405333 0 0 0-24.405333-24.439467H420.352a183.296 183.296 0 0 0-183.296 183.296V762.538667c0 13.482667 10.922667 24.439467 24.405333 24.439466h360.516267a164.9664 164.9664 0 0 0 165.000533-165.000533v-140.526933a24.439467 24.439467 0 0 0-24.439466-24.439467z" fill="#FFFFFF" p-id="4105"></path></svg>'
                },
                link: 'https://gitee.com/baixia77'
            },
        ],

        /* 右侧大纲配置 */
        outline: {
            level: 'deep',
            label: '目录'
        },

        //  页面底部栏
        editLink: {
            pattern: 'https://github.com/baixia03/baixia03.github.io/tree/main/docs/:path',
            text: '在 Github 上编辑此页'
        },

        // 上次更新
        lastUpdated: {
            text: '上次更新',
        },

        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        },

        // 底部栏
        footer: {
            message: 'Early Access',
            copyright: 'Copyright © 2022-present Joseph Liang'
        },

        darkModeSwitchLabel: '外观',
        returnToTopLabel: '返回顶部',
    },
});
