---
title: '[React] 컴포넌트의 합성 (Composition)'
category: 'React'
tags:
  - JavaScript
  - React
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-11-07
---

> 이 포스트는 React 공식 문서의 내용을 정리한 포스트입니다.

[참조]: https://ko.reactjs.org/docs/composition-vs-inheritance.html

[참조]

어떤 컴포넌트는 자식으로 어떤 엘리먼트가 들어올 지 예상할 수 없는 경우가 있습니다.

주로 범용적인 컨테이너 역할을 하는 컴포넌트에서 자주 볼 수 있는 상황입니다.

이러한 컴포넌트에는 props.children을 사용해 자식 엘리먼트를 그대로 전달하는 것이 좋습니다.

### 컴포넌트에서 다른 컴포넌트 담기

```react
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}

ReactDOM.render(
  <WelcomeDialog />,
  document.getElementById('root')
);

```

위 코드에서 FancyBorder의 props를 console.log 해보면 아래와 같이 나타납니다.

![](https://i.ibb.co/7bRpV0S/2020-11-07-7-09-42.png)

props의 children으로 상위 element인 WelcomeDialog에서 FancyBorder 안에 작성한 React element들이 들어옵니다!

따라서 FancyBorder 내에서 {props.children}을 주석처리하면 Fancyborder의 최상위 div만 나타나게 되고

h1태그와 p 태그로 이루어진 element들은 나타나지 않습니다.

```react
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children[0]}
      <h3>안녕하세욥~</h3>
      {props.children[1]}
    </div>
  );
}
```

위 사진에서 보다시피 props.children은 배열의 형태로 들어오기 때문에 위와 같이 사용도 가능합니다

<img src="https://i.ibb.co/SKrW6Wg/2020-11-07-7-18-34.png" style="zoom:67%;" />

<br>

위처럼 props.children을 사용하는 대신 고유의 props로 react element를 보내줄 수 있는 방법도 있습니다.

```react
function Contacts() {
  return <div className="Contacts" />;
}

function Chat() {
  return <div className="Chat" />;
}

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

```

Contacts 와 Chat 같은 React element 또한 객체이기 때문에 props로 전달이 가능합니다!!

<br>

### 특수화

때로는 어떤 컴포넌트의 특수한 경우인 컴포넌트를 고려헤야 할 때가 있습니다.

예로, WelcomeDialog는 Dialog의 특수한 경우입니다.

이 경우도 합성을 통해 해결할 수 있습니다. 더 구체적인 컴포넌트가 일반적인 컴포넌트를 렌더링하고 props로 내용을 구성하는 방법입니다.

```react
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="안뇽"
      message="난 맹끼라고 해" />
  );
}

ReactDOM.render(
  <WelcomeDialog />,
  document.getElementById('root')
);
```

더 구체적인 component인 WelcomeDialog에서 Dialog에게 title, message props로 화면에 출력 될 값을 넣어주고,

Dialog에서는 WelcomeDialog로부터 받은 props로 화면을 구성합니다.

![](https://i.ibb.co/Ch97tbc/2020-11-07-8-22-10.png)

짜잔~~

수퍼쿨~~

합성을 이용하면 컴포넌트를 상속하지 않더라도 여러가지 문제를 해결할 수 있겠다는 것을 배웠습니다!
