// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/vnues/我的开源项目/dynamic-form/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('/Users/vnues/我的开源项目/dynamic-form/node_modules/@umijs/preset-dumi/lib/theme/layout').default],
    "component": (props) => {
        const { default: getDemoRenderArgs } = require('/Users/vnues/我的开源项目/dynamic-form/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/src/builtins/Previewer.tsx');
        const { default: demos } = require('@@/dumi/demos');
        const { usePrefersColor } = require('dumi/theme');

        
      const renderArgs = getDemoRenderArgs(props, demos);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        }
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('/Users/vnues/我的开源项目/dynamic-form/node_modules/@umijs/preset-dumi/lib/theme/layout').default, require('/Users/vnues/我的开源项目/dynamic-form/node_modules/dumi-theme-default/src/layout.tsx').default],
    "routes": [
      {
        "path": "/",
        "component": require('/Users/vnues/我的开源项目/dynamic-form/docs/README.zh.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/README.zh.md",
          "updatedTime": 1621938164000,
          "title": "ReactFormMaker",
          "hero": {
            "title": "ReactFormMaker",
            "desc": "<div class=\"markdown\"><p>🌇 基于antd高性能Form组件的动态表单方案。</p></div>",
            "actions": [
              {
                "text": "开发指南",
                "link": "/guide"
              }
            ]
          },
          "features": [
            {
              "title": "简单",
              "desc": "<div class=\"markdown\"><p>针对于表单的解决方案，无须任何配置，即可一键使用</p></div>"
            },
            {
              "title": "完备",
              "desc": "<div class=\"markdown\"><p>配置齐全，支持热更新，TDK配置，路由按需加载</p></div>"
            },
            {
              "title": "快速",
              "desc": "<div class=\"markdown\"><p>基于antd 的轻量级组件，使用JSON配置即可生成表单组件</p></div>"
            }
          ],
          "footer": "<div class=\"markdown\"><p>遵循 MIT 开源协议 | 版权所有 © 2020<br />由 <a href=\"https://d.umijs.org/\" target=\"_blank\">dumi<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"\" x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a> 提供支持</p></div>",
          "slugs": [
            {
              "depth": 2,
              "value": "📦 安装",
              "heading": "-安装"
            },
            {
              "depth": 2,
              "value": "🔨 使用",
              "heading": "-使用"
            },
            {
              "depth": 2,
              "value": "社区",
              "heading": "社区"
            }
          ],
          "locale": "zh"
        },
        "title": "ReactFormMaker"
      }
    ],
    "title": "noov",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
