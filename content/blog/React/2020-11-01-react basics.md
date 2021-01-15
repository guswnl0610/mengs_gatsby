---
title: 'React 시작하기 - JSX'
category: 'React'
tags:
  - JavaScript
  - React
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-11-01
---

## JSX

```react
const myjsx = <h1>hello</h1>;
```

JSX는 React에서 사용하는 Javascript를 확장한 문법입니다.

쉽게 말하면, HTML을 Javascript 안에 작성하면 JSX가 됩니다. 위처럼 변수에 지정할 수도 있고, 함수의 인자로 넘길 수도 있습니다.

### JSX attribute

HTML 태그에 attribute를 주었던 것 처럼 JSX에도 attribute를 부여할 수 있습니다.

```react
const myjsx = <h1 className="hello">hello</h1>;
```

그러나 위처럼 실제 HTML에서 사용하는 attribute 이름이 다를 수 있습니다.

원래 HTML에서는 class=""를 통해 element에 클래스를 부여하지만

JSX에서는 className=""을 사용해야 합니다.

### JSX에 JavaScript 사용

```react
const name = 'mengkki';
const element = <h1>hello, {name}</h1>; //hello, mengkki
```

JSX 중간에 {}를 넣어 javascript를 사용할 수 있습니다.

```react
const myobj = {name: mengkki, class: momo};
const element = <h1 className={myobj.class}> hello, {myobj.name}</h1>
```

{}를 사용해 attribute에 javascript 표현식을 사용할 수도 있습니다.

> 어트리뷰트에 JavaScript 표현식을 삽입할 때 중괄호 주변에 따옴표를 입력하지 마세요. 따옴표(문자열 값에 사용) 또는 중괄호(표현식에 사용) 중 하나만 사용하고, 동일한 어트리뷰트에 두 가지를 동시에 사용하면 안 됩니다. - React 공식 문서

### JSX와 child element

```react
const elem = (
<div>
	<p>hello</p>
  <h3>nice to meet u</h3>
</div>
)
```

JSX는 자식을 포함할 수 있습니다.

이런 식으로 중첩된 element를 만들기 위해서는 **소괄호**로 감싸줘야 합니다.

### Render React element

```react
ReactDOM.render(
  <h1>hello hello~</h1>,
  document.getElementById('root')
);
```

React element가 DOM node에 추가되어 화면에 렌더되려면 ReactDOM.render함수를 사용해야 합니다.

첫번째 인자로 JSX로 작성한 React element를 넘기고, 두번째 인자로는 해당 요소를 렌더하고자 하는 부모 element를 전달합니다.
