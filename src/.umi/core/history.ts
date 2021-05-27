// @ts-nocheck
import { createBrowserHistory, History } from '/Users/vnues/我的开源项目/dynamic-form/node_modules/@umijs/runtime';

let options = {
  "basename": "/dynamic-form/"
};
if ((<any>window).routerBase) {
  options.basename = (<any>window).routerBase;
}

// remove initial history because of ssr
let history: History = process.env.__IS_SERVER ? null : createBrowserHistory(options);
export const createHistory = (hotReload = false) => {
  if (!hotReload) {
    history = createBrowserHistory(options);
  }

  return history;
};

export { history };
