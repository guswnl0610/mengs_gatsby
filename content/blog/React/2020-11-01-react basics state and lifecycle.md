---
title: 'React 시작하기 - state와 lifecycle'
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

```react
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );

  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

시계가 1초마다 업데이트 되는 코드입니다.

위 코드는 시계에 쓰여진 시간 값을 변경하기 위해 1초마다 tick함수를 실행해 ReactDOM.render()를 호출합니다.

일단 위 코드의 Element를 재사용 가능한Clock component로 바꿔줍시다.

### Function -> class

```react
function Clock(props) {
  return (
    <div>
      <h1>hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(<Clock date={new Date()} />, document.getElementById('root'));
}

setInterval(tick, 1000);
```

우리는 clock이 스스로 타이머를 설정하고 스스로 매 초 업데이트하게 만들고 싶습니다.

이것을 구현하기 위해서는 clock component에 state를 추가해줘야 합니다.

state는 prop과 화면에 보여줄 정보를 가진다는 점에서 비슷하지만, props는 부모에서 전달받아야 사용할 수 있고, state는 컴포넌트 내에서 정의합니다.

일단 function으로 정의했던 clock을 class로 바꿔줍니다.

```react
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

function tick() {
  ReactDOM.render(<Clock date={new Date()} />, document.getElementById('root'));
}

setInterval(tick, 1000);
```

이제 render 메서드는 업데이트가 발생할 때마다 호출되지만, 같은 DOM노드로 <Clock /> 을 렌더링하는 경우 clock 클래스의 단일 인스턴스만 사용됩니다.

이것은 state와 생명주기 메서드와

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div>
        <h1>hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

function tick() {
  ReactDOM.render(<Clock />, document.getElementById('root'));
}

setInterval(tick, 1000);
```

이제 Clock이 스스로 타이머를 설정하고 매초 스스로 업데이트 하도록 만들겠습니다.

### 생성주기 method를 class에 추가하기

render는 1초마다 호출되어 내용을 변경해줘야 합니다.

Clock컴포넌트는 mounting된 동안은 자신의 컴포넌트 내에서 값이 업데이트 되어야 하므로 lifecycle 메소드가 필요합니다.

컴포넌트 클래스에서 특별한 메서드를 선언하여 컴포넌트가 마운트되거나 언마운트될 때 코드를 작동할 수 있습니다.

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount(){
    //컴포넌트가 render된 후 실행됨
  }

  componentWillUnmount(){
		//컴포넌트가 unmount되면 실행됨
  }

  render() {
    return (
      <div>
        <h1>hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

componentDidMount()와 componentWillUnmount()는 라이프사이클 함수입니다.

```react
  componentDidMount(){
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }
```

componentDidMount는 컴포넌트가 렌더 된 후에 실행되기 때문에 이곳에서 타이머를 설정해줍니다.

timerID와 같이 prop, state에 포함되지는 않지만 어떤 항목을 보관할 필요가 있다면 자유롭게 클래스에 수동으로 부가적인 필드를 추가해도 됩니다.

이제 1초마다 호출될 tick()함수를 작성합니다.

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    return (
      <div>
        <h1>hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById('root'));
```

1초마다 tick 함수가 실행되며 새로운 날짜를 this.state.date에 업데이트해줍니다.

state를 변경할 때는 this.setState()를 사용해줘야합니다.

Clock 컴포넌트가 mount되고 unmount 되기까지의 과정을 훑어보겠습니다.

1. ReactDOM.render()에서 <Clock />을 넘길때, Clock의 constructor를 호출합니다.
2. Clock의 초기 시간이 필요하기 때문에 this.state를 현재 시간으로 초기화합니다.
3. Clock 컴포넌트의 render()가 호출됩니다.
4. DOM에 render()에서 리턴된 react element가 추가되면 componentDidMount가 호출됩니다.
5. Clock 컴포넌트의 tick메서드가 매초 호출될 수 있도록 timer를 추가합니다.
6. 매 초 브라우저가 tick을 호출하면서 this.state.date가 변합니다.
7. state가 변경되면 원래 componentDidUpdate 함수가 호출되면 render()가 다시 호출되면서 바뀐 부분이 변경됩니다.
8. DOM에서 Clock 컴포넌트가 삭제되면 componentwillUnmount가 호출되고 timer가 멈춥니다.

### 컴포넌트의 라이프사이클

![](https://i.ibb.co/88sFWWn/2020-11-01-7-28-17.png)
