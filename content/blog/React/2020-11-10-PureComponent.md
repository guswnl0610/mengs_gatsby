---
title: '[React] PureComponent'
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

[공식 문서]: https://ko.reactjs.org/docs/react-api.html#reactpurecomponent

> 본 포스트는 [공식 문서]의 내용을 정리한 포스트입니다.

## React.Component vs React.PureComponent

PureComponent는 props와 state에 대하여 얕은 비교만을 수행합니다.

```react
class Test extends PureComponent {
  state = {
    person: { name: "mengkki", age: 25 },
  };

  componentDidMount() {
    let prevperson = this.state.person;
    prevperson.age = 15;
    this.setState({ person: prevperson });
  }

  render() {
    console.log(this.state.person);
    return <div></div>;
  }
}
```

이 경우 console에는 이렇게 나타납니다.

![](https://i.ibb.co/f4wR7wh/2020-11-10-7-00-54.png)

```react
  componentDidMount() {
    let prevperson = this.state.person;
    prevperson = { name: "momo", age: 22 };
    this.setState({ person: prevperson });
  }
```

이 경우 console에는 아래와 같이 나타납니다.

![](https://i.ibb.co/3W9L6GZ/2020-11-10-7-01-03.png)

첫번째 예제에서는 state.person.age 를 변경했지만 아래의 예제는 state.person을 변경했습니다.

PureComponent에서는 변경된 state에 대한 얕은 비교만 하기 때문에 state.person.age에 대한 변경사항을 감지하지 못해 render함수가 호출되지 않습니다.

PureComponent의 이러한 특성을 이용해서 React 컴포넌트의 render함수가 동일한 props와 state에 대하여 동일한 결과를 렌더링한다면

PureComponent를 사용하여 render함수의 호출을 줄여 성능 향상을 노려 볼 수 있겠습니다!
