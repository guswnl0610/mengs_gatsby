---
title: 'React 프로젝트에 sass 연결시 Node Sass version 5.0.0 is incompatible with ^4.0.0. 에러 해결'
category: 'React'
tags:
  - JavaScript
  - React
  - Sass
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-11-04
---

## 발단

Vanilla JS로 작업했을 때는 개별의 html에 개별의 css가 적용 돼 태그에 css 스타일을 적용했었으나

React에 코드를 싸그리 옮겨오자 같은 태그를 사용한 element들이나.... 클래스 이름이 같은 element들 사이에서

와장창 충돌이 나는 바람에 sass를 설치했다. 그런데 왠걸... 컴파일 에러가 발생했다!

```js
Failed to compile.

./src/App.scss (./node_modules/css-loader/dist/cjs.js??ref--5-oneOf-6-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--5-oneOf-6-3!./node_modules/s
ass-loader/dist/cjs.js??ref--5-oneOf-6-4!./src/App.scss)
Error: Node Sass version 5.0.0 is incompatible with ^4.0.0.
```

## 해결

답은 뭐다? 구글링이다~

Node Sass version 5.0.0 is incompatible with ^4.0.0. 을 복붙해 구글링하자 스택오버플로우 글이 나왔다

<img src="https://i.ibb.co/jw0xK1H/2020-11-04-4-23-02.png zo" style="zoom:50%;" />

<br>

한줄요약 : CRA로 만들어진 프로젝트는 5.0 버전이랑 충돌나니 4.xx버전으로 다시 깔아라

<br>

이 문제를 해결해주기 위해서는 npm을 이용할 경우,

```
//node-sass 삭제
$ npm uninstall node-sass
//node-sass 4.14.0 버전 설치
$ npm install node-sass@4.14.0
```

yarn을 이용할 경우

```
//node-sass 삭제
$ yarn remove node-sass
//node-sass 4.14.0버전 설치
$ yarn add node-sass@4.14.0
```

이렇게 해주면 해결!
