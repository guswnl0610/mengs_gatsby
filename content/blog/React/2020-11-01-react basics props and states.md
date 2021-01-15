---
title: 'React 시작하기 - props와 component'
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

## Component

component를 통해 UI를 재사용 가능한 개별적인 여러 조각으로 나누고, 각 조각을 개별적으로 조작할 수 있습니다.

component는 Javascript 함수와 유사합니다.

함수가 input을 받아 결과를 리턴하듯이, component는 props라는 입력을 받고, react element를 return합니다.

### function component / class component

component를 정의하는 방법은 두 가지가 있습니다.

```react
function Welcome(props){
	return <h1>Hello, {props.name}</h1>;
}

class Welcome extends React.Component {
	render(){
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

두 welcome은 똑같은 react element를 리턴합니다.

하지만 class로 정의한 경우 React.Component를 상속해주어야 하고 render()메소드를 필수로 작성해주어야 합니다.

function으로 작성한 메소드에서는 props를 parameter로 받아오고, class에서는 this.props로 접근한다는 차이가 있습니다.

### Props

그래서 props가 대체 어디에 쓰이는 친구인가 하면

```react
function Welcome(props) {
  return <h1>Welcome, {props.name}</h1>;
}

ReactDOM.render(
  <Welcome name='mengkki' />,
  document.querySelector('#root')
);
```

props는 property의 줄임말로 부모 component에서 자식component에게 데이터를 전달해 줄때 사용합니다. 그리고 object입니다!

위 예제에서는 Welcome에 name으로 'mengkki'를 전달했고,

Welcome에서는 props.name으로 'mengkki'를 받아올 수 있습니다.

props로는 문자열, 숫자, 어레이 등등 다양한 데이터를 보낼 수 있습니다.
