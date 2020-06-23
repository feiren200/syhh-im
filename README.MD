[![Build Status](https://travis-ci.org/feiren200/syhh-im.svg?branch=master)](https://travis-ci.org/feiren200/syhh-im)
[![NPM version](http://img.shields.io/npm/v/syhh-im.svg?style=flat)](https://npmjs.org/package/syhh-im)
[![NPM downloads](http://img.shields.io/npm/dm/syhh-im.svg?style=flat)](https://npmcharts.com/compare/syhh-im?minimal=true)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## IM-CLI

# 安装

`npm install syhh-im --save`

# 使用

`import SYHHIM from 'syhh-im'`

`const IM = new SYHHIM()`

首先在项目 app.js 中调用构造函数的 use 方法，传入所使用的 IM 插件、SDKAppID、日志级别表示

`IM.use(TIM, sdkAppID, logLevel)`

向构造函数传入一个处理函数，返回参数为 event。

`const { name, messageContent } = event`

name 是 IM 插件提供的事件名称，messageContent 是消息体，如果`name === MESSAGE_RECEIVED` 则 messageContent 无需处理，直接使用即可，其余事件需要手动处理

构造函数还暴露了 login、logout 方法，具体使用同 IM 插件
