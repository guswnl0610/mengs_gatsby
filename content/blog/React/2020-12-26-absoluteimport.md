---
title: 'CRA 프로젝트 절대경로 import (absolute import)하는 방법'
category: 'React'
tags:
  - TypeScript
  - React
  - JavaScript
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-12-26
---

## 절대경로 Import와 상대경로 Import

![](https://i.ibb.co/jhYQ5jd/2020-12-26-8-08-26.png)

절대경로 import와 상대경로 import.jpg

<br>

상대경로 import는 현재 작성중인 파일의 위치를 기준삼아 '.'을 이용해 목적 파일을 찾아서 import 하는 반면,

절대경로 import는 baseUrl을 기준으로 디렉토리 트리를 쭉쭉 내려가면서 목적 파일을 찾습니다.

<br>

### 왜 절대경로 import를 써야 하는가?

상대경로 import도 수퍼쿨 하다고 생각할 수 있지만, 프로젝트의 규모가 커지고 나서 어떤 파일의 경로 수정이 필요할 때... 많은 부작용을 일으킬 수 있습니다.

그리고 만약 import하는 파일과 당하는 파일의 디렉토리 트리가 엄청 멀리 떨어져 있을때...

![](https://i.ibb.co/qJ0TqLf/image.jpg)

절대경로 import로 편-안 해질 수 있습니다.

<br>

## CRA 프로젝트에서 절대경로 import 설정하는 법

### JS의 경우

### <img src="https://i.ibb.co/k8nssvd/2020-12-26-8-25-46.png z" style="zoom:67%;" />

먼저 프로젝트 root 에 jsconfig.json 파일을 생성합니다.

그리고 아래 내용을 입력합니다

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

![](https://i.ibb.co/N6B4WN9/2020-12-26-8-27-00.png)

그러면 요로코롬 절대경로 import를 할 수 있게 됩니다! 자동완성도 되는 모습~ 너무 멋져요~~

<br>

### TS의 경우

<img src="https://i.ibb.co/fCqhYWS/2020-12-26-8-34-10.png ㅋ" style="zoom:67%;" />

마찬가지로 프로젝트 root에 tsconfig.json을 생성합니다.

~~그런데 아마 ts프로젝트라면 이미 생성돼 있을 듯...~~

그리고 js의 경우와 같이 아래 내용을 추가합니다.

```json
{
  ...
  "compilerOptions": {
    ...
    "baseUrl": "src"
  },
  "include": ["src"]
  ...
}
```

그러면 짠! 완성입니다~~

![](https://i.ibb.co/YT55JT4/2020-12-26-8-37-50.png)

설정 한 이후에도 이렇게 빨간줄이 쳐지면서... 자동완성도 안된다면 vscode의 세팅을 열어봅니다

<br>

![](https://i.ibb.co/0FJLbHC/2020-12-26-8-39-35.png)

해당 옵션을 auto 혹은 non-relative로 수정해주면 끝!

절대경로 Import를 하고나서 나의 성공시대 시작됐다~
