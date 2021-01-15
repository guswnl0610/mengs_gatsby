---
title: '첫 React 프로젝트 후기'
category: 'React'
tags:
  - JavaScript
  - React
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-11-14
---

[vanillajs로 인스타그램 클론]: https://guswnl0610.github.io/javascript/instagram-clone/

## 시작하기 앞서...

이전의 [VanillaJS로 인스타그램 클론]해보기에 이어서 같은 프로젝트를 이번에는 React 프로젝트로 만들어보는 프로젝트였습니다.

사실 React를 완전히 처음 접했던건 아닙니다. 대략 1년 전 조금 해보긴 했지만,,,

그건 정말로..정말 정말로 수박 겉핥기 수준이었다는 것을 이 프로젝트를 해보며 뼈저리게 느꼈습니다...

이 전에 발등에 불떨어져서 봤던 React 튜토리얼 강의 영상... 그 당시에는 정말 무슨 말인지 이해가 1도 되지 않았지만 지금 들으니 확실히 느낌이 달랐습니다.

아만보라고 하죠,, 아무래도 JS에 대한 기초도 쌓지 않은 상태에서 들으니 그럴만도 했던 것 같습니다.

## 프로젝트 이야기

사실 저번 Vanilla JS로 했던 프로젝트와 구현한 기능은 거의 같습니다.

그래도!! 새로 추가된 부분들이 있기에 자랑타임 한번 가져보도록 하겠습니다.

### json데이터로부터 렌더링

<img src="https://i.ibb.co/gW35vXb/2020-11-13-9-29-25.png" style="zoom:50%;" />

<img src="https://i.ibb.co/5jsTdjL/standing.gif" style="zoom:67%;" />

<img src="https://i.ibb.co/BPyT8VN/search.gif z" style="zoom:67%;" />

우선 직접 json 데이터를 만들어서 백엔드와 통신을 하는 것 처럼 만들었습니다.

~~이 데이터를 팀원들에게 공유하고, 팀원들의 화면에 우리 뽀야미가 나왔을 때의 그 희열이란...ㅠㅠ~~

이제와서 생각해보니 그때의 그 item carousel 라이브러리를 받아와서 여러 장의 이미지를 담을 수 있는 피드로 만들어볼걸 하는 아쉬움도 남네요...ㅋㅋㅋㅋㅋ

### 신통방통했던 http 통신

<img src="https://i.ibb.co/FBPMHY2/2020-11-13-9-42-40.png" style="zoom:50%;" />

다음으로는 백엔드와 직접 통신을 해보았던 부분입니다.

직접 API주소와 key값을 맞춰가며 회원가입을 해보고, 로그인했을 때 JWT 토큰을 받아보는 부분까지!!

정상적으로 토큰을 받아오자 너무나 행복해하셨던 백엔드 개발자분의 표정도 떠오르네요 😇

### 우당탕탕 컴포넌트 밖 클릭 감지 기능

[컴포넌트 밖 클릭 감지]: https://guswnl0610.github.io/react/react-handleClickOutside/

그리고 이 프로젝트 진행중 포스팅 했던 [컴포넌트 밖 클릭 감지] 기능 구현...

방금 전 React 공식 문서를 읽고 있었는데, 접근성 파트에서 이런 구절이 눈을 사로잡았습니다.

<img src="https://i.ibb.co/yn8x3NV/2020-11-13-9-48-48.png z" style="zoom:50%;" />

~~뭐야....이거 완전 난데...?~~

포인터 장치(마우스 같은 것) 사용자들에게는 이런식으로 구현해도 괜찮지만

키보드를 사용하는 유저에게는 이런 방식으로 구현하는 것보다는 onFocus, onBlur이벤트를 사용해서 구현하는 편이 더 바람직하다고 하네요.

이런식으로 또 배워갑니다,,, 왜 이런 정보는 꼭 다 끝나고 나서야 눈에 들어오는 걸까요,,, 아무튼 수정해봐야겠습니다,,,

### PR과 코드리뷰

```react
this.setState({
newcommentValue: "",
comments: [...comments, newComment]
});
```

<img src="https://i.ibb.co/0jY4xPJ/2020-11-14-3-26-28.png" style="zoom:50%;" />

Pull Request를 보내보고, 코드리뷰를 직접 받아보며 점점 쿨해져가는 제 코드를 보자니 가슴이 웅장해졌습니다...

이전에는 github를 그저 제 코드 저장소로만 사용했고, 항상 master 브랜치만 사용했었는데

이제는 협업툴로서의 github를 사용할 줄 알게 된 것 같은 느낌이 듭니다. 아직도 버벅거리긴 합니다만...😉

그리고 ES6의 destructure는 정말 최고인것 같습니다,,

## 뒤돌아보며...

이제 React의 세계에 한 걸음 내딛은 느낌이 듭니다. 더 알아야 할 것도 배울 것도 많이 남아 있으니

현재에 안주하지 않고, 계속 성장해나가는 제 자신이 되도록 노력하겠습니다...

앞으로도 화이팅 화이팅 야야야~~
