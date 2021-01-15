---
title: '[React] setState() 톺아보기'
category: 'React'
tags:
  - JavaScript
  - React
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-11-10
---

React에서 state는 component 안에서 사용하는 **객체**입니다.

지금까지 우리가 JS에서 객체의 내용을 변경하고 싶을 때 아래와 같은 방법을 사용했습니다.

```js
const mengkki = { name: 'mengkki', age: 25 }
mengkki.age = 15
console.log(mengkki) // { name: 'mengkki', age: 15 }
```

<br>

하지만 우리는 React에서 state를 변경할 때 this.state.mengkki.age = 15라고 하지 않습니다.

대신 this.setState()함수를 사용합니다! setState()함수에 대해서 딮하게 알아봅시다

## setState()

[setstate에 대한 공식 문서]: https://ko.reactjs.org/docs/react-component.html#setstate

일단[setState에 대한 공식 문서]를 읽어봅시다.

setState()함수는 아래와 같이 정의됩니다.

```js
setState(updater, [callback])
```

updater는 다음과 같은 형태를 가지는 함수입니다.

```
(state, props) => stateChange
```

> state는 변경사항이 적용되는 시점에 컴포넌트의 state에 대한 참조입니다.
>
> **state는 직접 변경하면 안되고** 전달된 state와 props를 기반으로 **새로운 객체를 만들어** 변경사항을 표현해야 합니다.
>
> `updater` 함수로 전달된 `state`와 `props`는 최신값임이 보장됩니다. `updater`의 결과는 `state`에 **얕게 병합**됩니다.

### 얕은 병합

```react
class App extends React.Component{
	constructor(){
		super();
		this.state={
			name: 'Mengkki',
			age: 25,
		}
	}
	...
	someFunction = () => {
		this.setState({age: 15});
	}
}
```

얕은 병합에 대해서 알아봅시다.

위 코드에서 App Component의 State를 {name: 'Mengkki', age:25}의 상태로 초기화했고

후에 someFunction에 의해서 age가 15로 바뀌었습니다.

리액트에서는 얕은 병합을 하기 때문에 setState 후에 state의 값을 살펴보면

{name: 'Mengkki', age: 15}의 형태로 변하게 됩니다.

이런 식의 병합을 얕은 병합이라고 합니다.

### setState()는 비동기적이다

setState는 실행되는 즉시 state를 변경하지 않습니다.

React에서는 여러 개의 state의 변경 사항들을 일괄적으로 갱신하거나, 나중으로 미룰 수도 있습니다.

따라서 setState함수 호출 후에 console.log로 state를 찍어봐도 변경된 사항이 콘솔에 찍히지 않습니다.

이러한 특성으로 인해 아래와 같은 상황이 발생합니다.

```react
class App extends React.Component{
	constructor(){
    super();
    this.state={
      counter : 1,
    }
  }
  ...
  someFunction = () => {
    this.setState({counter : this.state.counter + 1});
    this.setState({counter : this.state.counter + 1});
    this.setState({counter : this.state.counter + 1});
    this.setState({counter : this.state.counter + 1});
  }
  ...
  componentDidUpdate() {
    console.log(this.state.counter); // 2
  }
}
```

이전의 값을 사용하여 1을 더하는 setState를 4번 호출했으나 실제로 콘솔에 찍히는 값은 2입니다.

state가 setState를 호출하는 즉시 변경되지 않기 때문에 일어나는 현상입니다.

이를 방지하기 위해서는 아래와 같이 수정해주어야 합니다.

```react
someFunction = () => {
	  this.setState((state) => {
      return { counter: state.counter + 1 };
    });
    this.setState((state) => {
      return { counter: state.counter + 1 };
    });
    this.setState((state) => {
      return { counter: state.counter + 1 };
    });
}

componentDidUpdate(){
  console.log(this.state.counter) // 4
}

```

setState의 updater 함수로 전달된 state와 props는 항상 최신의 값임이 보장됩니다. 따라서 이번에는 콘솔에 4가 찍히게 됩니다!

따라서 다음 state의 값이 이전 state 값에 의존한다면 updater 함수 형태를 사용하는 것이 좋습니다!
