---
title: '[React] 컴포넌트 밖 클릭을 감지하는 기능 구현'
category: 'React'
tags:
  - JavaScript
  - React
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-11-05
---

## handleClickOutside

리액트 공부를 하면서 진행중인 프로젝트 중에 컴포넌트 바깥을 클릭했을 때에 대한 이벤트를 주고 싶어서 검색을 해봤습니다.

![](https://i.ibb.co/GPdptjS/2020-11-05-9-17-27.png)

~~구글없인 못살아!!~~

[답변자 코드 링크]: https://codesandbox.io/s/30q3mzjv91?module=%2Fsrc%2FOutsideAlerter.js

## 구현방법

```react
import React, { Component } from 'react';

export default class OutsideAlerter extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      alert('You clicked outside of me!');
    }
  }

  render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>;
  }
}
```

[답변자 코드 링크] 에 가보면 실제로 button의 바깥을 클릭하면 alert가 뜹니다!!

특정 컴포넌트에 ref를 걸어서 클릭이벤트의 타겟이 컴포넌트의 안에 포함되는지를 확인하는 방식입니다.

바로 이거다!! 싶어서 제 코드에 바로 적용해봤습니다.

그 결과

![](https://i.ibb.co/Bw58b4t/outclick1.gif)

<br>

정말로 되더랍니다!! 우왕!!~~

그런데 기뻐하기도 잠시..문제가 발생합니다..

<br>

<img src="https://i.ibb.co/7vNVVj9/outclick2.gif z" style="zoom:64%;" />

<br>

우측 상단의 프로필사진에 클릭리스너를 달아두고, 그로 인해 나타나는 메뉴컨테이너의 바깥을 클릭했을 때 꺼지게 하는데까지 성공했는데

우측 상단의 프로필사진도 메뉴컨테이너의 바깥이기 때문에(..) 이벤트를 걸어둔 기능이 두번 실행되는겁니다!!

<br>

<img src="https://i.ibb.co/M7M90N1/outerclick3.gif z" style="zoom:65%;" />

<br>

결국..우측 상단의 사진에도 ref를 걸어서 메뉴 컨테이너에 props로 보내준 후

컨테이너 바깥을 클릭했고, 우측 상단의 사진을 클릭하지 않았을 때 이벤트가 발생하도록 수정하여

문제를 해결하긴 하였으나 왠지 찝찝한 이 기분,,,뭔가 더 기똥찬 방법이 없을지...

고민을 좀 더 해봐야겠습니다...ㅎㅎ
