---
title: 'React 시작하기 - 이벤트 처리하기'
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

### React에서 이벤트 처리하기

React에서는 HTML과 달리 문자열이 아닌 함수로 이벤트 핸들러를 전달합니다.

```react
//HTML
<button onclick="activateLasers()">
	Active Lasers
</button>
//React
<button onclick={activateLasers}>
	Activate Lasers
</button>
```

react에서는 addEventListener를 호출할 필요가 없습니다. 엘리먼트가 처음 렌더링될때 이벤트리스너를 제공하면 됩니다.

```react
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  render() {
    return <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>;
  }
}

ReactDOM.render(<Toggle />, document.getElementById('root'));
```

이 예제에서 ON과 OFF를 토글할 수 있는 버튼을 렌더링합니다.

JSX에서 onclick의 콜백으로 handleClick메서드를 호출되어있는데

클래스의 메서드는 기본적으로 바인딩되어있지 않기 때문에

this.handleClick를 바인딩하지않고 onclick에 전달했다면 함수가 실제 호출될때 this는 undefined가 됩니다.

따라서 o'clock = {this.handleClick}처럼 뒤에 ()를 사용하지 않고 메소드를 참조할 경우, 해당 메소드를 바인딩 해주어야 합니다.

```react
constructor(props) {
	super(props);
  this.state = { isToggleOn: true };

  this.handleClick = this.handleClick.bind(this);
  }
```

이렇게 말이죠!!

화살표 함수를 사용해서 바인딩 하는 방법도 있습니다.

```react
render(){
	return(
  	<button onClick={() => this.handleClick()}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
  )
}
```

> 이 문법의 문제점은 Toggle`이 렌더링될 때마다 다른 콜백이 생성된다는 것입니다. 대부분의 경우 문제가 되지 않으나, 콜백이 하위 컴포넌트에 props로서 전달된다면 그 컴포넌트들은 추가로 다시 렌더링을 수행할 수도 있습니다. 이러한 종류의 성능 문제를 피하고자, 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하는 것을 권장합니다.

### 이벤트 핸들러에 인자 전달하기

```react
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

두 경우는 같은 일을 하며 두 경우 모두 이벤트를 나타내는 e 인자가 id 뒤로 2번째 인자로 전달됩니다.

bind를 사용할 경우 추가인자가 자동으로 전달됩니다.
