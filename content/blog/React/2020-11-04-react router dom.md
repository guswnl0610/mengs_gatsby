---
title: 'React 의 Routing "react-router-dom"'
category: 'React'
tags:
  - JavaScript
  - React
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-11-04
---

## Routing이란?

React 프로젝트는 Single Page Application이죠!

하지만 프로젝트에 화면이 하나만 있는것도 아니고...여러 개의 페이지를 보여주고 싶을 때가 있습니다.

한 개의 웹페이지 안에서 여러 개의 페이지를 보여주는 방법으로 Routing이 있는데요,

**Routing이란 다른 주소에 따라 다른 화면을 보여주는 것입니다.**

하지만 우리의 React 라이브러리에는 라우팅 기능이 포함되어 있지 않아 다른 라이브러리를 이용해야 합니다.

그 중 가장 많이 사용되는 것이 바로 react-router-dom입니다!!

## react-router-dom

### 설치

```
$ npm install react-router-dom
$ yarn add react-router-dom
```

npm의 경우 위 명령어를, yarn의 경우 아래 명령어를 입력하시면 됩니다

### 사용법

일단 라우팅을 해줄 js파일을 만듭니다. (ex. Routes.js)

```react
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App1 from "./App1";
import App2 from "./App2";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App1}></Route>
          <Route exact path="/about" component={App2}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
```

<br>

위 코드가 의미하는 바는 경로가 '/' 일때 (기본 경로 일때)는 App1을 보여주고, 경로가 '/about'일때는 App2를 보여주겠다는 의미입니다.

Switch는 Switch의 자식들을 보면서 현재 경로와 일치할때 해당 컴포넌트를 보여줍니다.

<br>

```react
import React from "react";
import {  Link  } from "react-router-dom";

export default function App1 {
  return (
  	<div>
      <Link to='/about'>
      	<Button>버튼이다요</Button>
      </Link>
    </div>
  );
}
```

<br>

Link태그는 HTML의 a 태그와 같다고 보면 됩니다. 하지만 a태그는 클릭하는 순간 새로고침이 됩니다.

우리는 새로고침 없이 매끄럽게 화면이 전환되길 원합니다! 그럴땐 Link 태그를 사용해주시면 되겠습니다.
