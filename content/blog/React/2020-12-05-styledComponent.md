---
title: 'styled-components와 친해지기'
category: 'React'
tags:
  - JavaScript
  - React
  - CSS
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-12-05
---

[공식문서]: https://styled-components.com/

## styled-components?

Styled-components는 컴포넌트 기반으로 CSS 스타일링을 하게 도와주는 라이브러리입니다.

![](https://i.ibb.co/Xj5VrwY/2020-12-05-10-57-26.png)

엄청난 다운로드수... CSS in JS 라이브러리 중 가장 인기가 많습니다

[공식문서]에서 더 많은 정보를 얻으실 수 있습니다!

### 설치

```
$ npm install --save styled-components
혹은
$ yarn add styled-components
```

## Styled-component 사용해보기

기존에 우리가 먼저 JSX 코드나 html 태그를 작성한 후에 css로 스타일을 입혔다면,

styled-component는 우리가 지정한 스타일이 입혀진 component를 생성한다는 차이가 있습니다.

예를 봅시다! 공식문서에서 긁긁 해왔습니다.

```react
import React from "react";
import styled from "styled-components";

const Test = (props) => {
  return (
    <Wrapper>
      <Title>안녕하세용</Title>
    </Wrapper>
  );
};

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

export default Test;

```

![](https://i.ibb.co/BBqcPCP/2020-12-05-11-17-27.png)

결과

### styled-component 선언하기

```react
import styled from "styled-components";
```

먼저 styled component를 사용하기위해서는 styled를 import해와야합니다!

```react
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;
```

위 코드에서는 Title, Wrapper라는 컴포넌트를 만들었습니다.

아까 import 해온 styled 후에 새로 만들 컴포넌트의 html 태그를 적어준 후 백틱(``)

사이에 css 스타일을 적어주면 끝입니다!

```react
const Test = (props) => {
  return (
    <Wrapper>
      <Title>안녕하세용</Title>
    </Wrapper>
  );
};
```

그리고 우리가 만든 컴포넌트를 컴포넌트의 리턴 안에 써주면 됩니다

와! 정말 쉽죠!

```react
const Test = (props) => {
  return (
    <Wrapper>
      <Title>안녕하세용</Title>
      <span className="nested">반가워용</span>
    </Wrapper>
  );
};

...

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;

  .nested {
    color: rgba(110, 20, 50, 0.9);
  }
`;

```

![](https://i.ibb.co/yWxxtCD/2020-12-05-11-32-20.png)

그리고 nesting도 가능합니다!

### Props로 스타일 적용하기!!

```React
import React from "react";
import styled from "styled-components";

const Test = (props) => {
  return (
    <div>
      <Button>Normal</Button>
      <Button primary>Primary</Button>
    </div>
  );
};

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export default Test;

```

![](https://i.ibb.co/hY58RqB/2020-12-05-11-35-53.png)

component에서는 props를 사용할 수 있죠! styled-component도 마찬가지입니다.

위 예제에서는 Button 컴포넌트에 props 로 primary를 가지고 있으면 배경색이 palevioletred로, 가지고 있지 않으면 하얀색으로 바뀝니다.

![](https://i.ibb.co/7GWxWwq/2020-12-05-11-39-59.png)

~~styled-component를 만나고 나의 성공시대 시작됐다~~

이번 프로젝트 중 네비게이션 바가 흰색인 버전과 검은색인 버전이 있어서 컴포넌트를 두개를 만들어야하나 고민중이었는데

styled-component를 익히고 나니 컴포넌트 하나에 props로 색을 변경하게 해주어 고민이 해결되었습니다!! 수퍼쿨~~

아직 styled-component와 친해지는 단계에 있습니다.

이제 조금씩 공용으로 사용할 component도 만들어서 여러개의 페이지에 사용하면서 컴포넌트의 장점도 살리고 있어서 뿌듯하네요!

더욱 자세한 정보는 [공식문서]에서 확인해보세요!
