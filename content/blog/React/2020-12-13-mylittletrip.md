---
title: '마이리얼트립 클론 프로젝트 "마이리틀트립" 후기'
category: 'React'
tags:
  - JavaScript
  - React
  - daily
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-12-13
---

![](https://i.ibb.co/ZhjDmwc/logo.png)

[마이리얼트립]: https://www.myrealtrip.com/

## About Mylittletrip

저번 G9 클론 프로젝트에 이어 이번에는 [마이리얼트립] 클론 프로젝트에 참여하게 되었다.

프로젝트를 배정받고 나서 우리가 클론할 부분을 살펴보다가...엄청난 압박감이 몰려왔다.

**페이지가 너무 많아..!!** 😱

전부 너무 예쁘고 사랑스러운 기능들로 가득한 페이지였지만,

시간은 우리를 기다려 주지 않기에... 눈물을 머금고 쳐낼 것은 쳐내야 했다.

그렇게 채택된 것은 바로 항공권이었다!

### 프로젝트 진행 기간

2020-11-30 ~ 2020-12-11 (12일 간)

### 기술 스택 (Front-End)

- React
- Redux
- Styled-components
- JavaScript
- git

## 프로젝트 결과물

저번 프로젝트는 class component와 sass를 사용했다면,

이번 프로젝트는 functional component와 styled-components, 그리고 redux를 사용해서 구현해 보았다.

### 메인 페이지

![](https://i.ibb.co/RpDPSYv/main.gif)

어쩌다 보니 이번에도 메인 페이지를 맡게 되었다.

#### React-slick 라이브러리

이번에도 react-slick 라이브러리를 사용하여 image carousel을 구현했다.

이 라이브러리는 이전에도 사용해봤기에 커스터마이징 하는데 큰 어려움은 없었지만..

그 중에서도 꽤나 신경썼던 한가지를 꼽아보자면 바로 이 친구다.

![](https://i.ibb.co/5GkyL4v/2020-12-13-10-48-47.png)

자동으로 넘어가는 carousel에서 현재 페이지만 다른 색으로 보여주는 custom dot을 만들었다.

```react
const [currentPage, setCurrentPage] = useState(1);
...
const sliderSettings = {
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3500,
    beforeChange: (current, next) => setCurrentPage(Math.ceil(next / 2) + 1),
  };

...
return (
	<Slider {...sliderSettings} ref={sliderRef}>
    ...
)
```

이런 식으로 현재 페이지를 state로 관리해주면서 react-slick에서 제공해주는 beforeChange를 사용해 현재 페이지를 갱신해주었다.

역시 document 잘 되어있는 라이브러리가 짱이라는 것을 또 새삼 느꼈다

#### 네비게이션 바

[마이리얼트립]에는 두가지 버전의 네비게이션 바가 있다.

![](https://i.ibb.co/KFPVwXW/2020-12-13-10-22-48.png)

![](https://i.ibb.co/F35sMK7/2020-12-13-10-22-56.png)

색깔만 다르고 하는 기능은 완전히 같다.

처음에는 기존에 하던 것 처럼 classname으로 색을 조절해야하나 싶었지만

styled-components를 익히고 나니 완전 쉽게 해결되었다. 이것이...스타일드 컴포넌트의 매력..?

```react
<Navbar themeColor="normal" />
```

우선 Navbar 컴포넌트에 themeColor라는 prop을 넘겨주었고

```react
const LogoImage = styled.img.attrs((props) => ({
  alt: "my little trip logo",
  src: props.themeColor === "normal" ? "/images/logo.png" : "/images/logo_white.png",
}))`
  width: 128px;
  margin: 0 20px;
`;

const NavContainer = styled.div`
  z-index: 100;
  border-bottom: 1px solid
    ${(props) => (props.themeColor === "normal" ? "rgba(0,0,0,0.05)" : "rgba(255, 255, 255, 0.2)")};
`;

...

    &.signUpButton {
      padding: 9px 30px 7px 30px;
      border: 1px solid
        ${({ themeColor, theme }) => (themeColor === "normal" ? theme.deepBlue : theme.transparentWhite)};
```

Navbar는 그로부터 받아온 themeColor prop의 값이 무엇인지에 따라

다른 색이나 다른 이미지를 보여주도록 styled-component를 이용해 주었다.

너무 편하고 멋져..!

#### React-datepicker 라이브러리

![](https://i.ibb.co/n36c4d5/calander.gif)

Date picker 라이브러리를 사용하여 항공권의 가는날 - 오는날 옵션 선택 창을 만들었다.

이 라이브러리도 document가 굉장히 잘 되어 있다.

엄청나게 다양한 옵션들이 있고, 원하는 옵션을 뽑아서 쓰면 된다.

<img src="https://i.ibb.co/ygQS0nY/2020-12-13-11-14-24.png" style="zoom:50%;" />

나의 캘린더...

Css 커스터마이징도 어렵지 않게 해낼 수 있었다.

### 카카오 소셜 로그인/회원가입

![](https://i.ibb.co/rfvm4tM/kakao.gif)

이번에는 소셜 로그인을 구현해보았다.

카카오 developers에 나와있는 가이드를 착실히 따라해보니 잘 되더라...

이번에 한번 해봤으니 다음에는 더 쉽게 해낼 수 있을 것 같다.

다음에는 다른 플랫폼으로도 시도해보는걸로...

### 로딩 화면

![](https://i.ibb.co/ySGbwVf/loading.gif)

메인 페이지에서 리스트 페이지로 넘어갈 때 무조건 5초간 이 페이지가 보이도록 했다.

5초가 조금 긴 감도 있지만... 너무 예뻐서 자랑하고 싶은 마음에...(?)

그리고 깨알같이 메인 페이지에서 선택했던 옵션이 로딩스크린에도 나타난다.

```react
    const searchInfo = {
      id: Date.now(),
      depPlace,
      arrPlace,
      startDate,
      endDate,
      headCount,
      seatType,
    };

    history.push({
      pathname: "/list",
      search: this.makeQueryString(searchInfo),
      state: {
        searchInfo,
      },
    });
```

react-router-dom의 usehistory를 사용하여 리스트 페이지로 넘어갈 때

searchInfo 객체를 같이 state에 넘겨주고,

List 페이지에서는 location.state로 searchInfo에 접근하게 해 주었다.

이 기능 완전 꿀인 것 같다. 다음에도 꼭 써먹어야지...!

## 마무리하며...

![](https://i.ibb.co/449Dq49/2020-12-13-11-27-15.png)

이번에 처음 hook을 배우고 나서 나름의 custom Hook을 만들어서 컴포넌트 여기저기서 써먹었다.

(사실 구글신 지분률 70%지만... 쉿...)

clickOutside hook은 주로 모달창 컴포넌트에서, useAxios는 http 통신하는 거의 모든 컴포넌트에서 사용했던 것 같다.

이래서 사람들이 함수형 컴포넌트 사용하는구나를 새삼 느꼈고,,

생각해보면 redux나 hook, styled-components 같은 나름 새로운 개념들을 배우면서 12일이라는 짧은 시간동안 이 일들을 해내야 했는데

처음에는 이걸 공부하면서 할 수 있는 걸까..? 싶었지만,... 해보니 되긴 되더라...

공부한 내용들을 바로 프로젝트에 적용해보면서 하니 더욱 습득이 빨랐던 것 같기도 하다.

마지막으로 무엇보다 우리 팀원분들...고생 많으셨습니다....

어찌보면 저번 프로젝트보다 훨씬 정신도 없고 시간도 훨씬 빨리 지나갔던 것 같습니다

중간에 갑자기 사회적 거리두기 2.5단계가 되면서 어려운 부분도 많았지만 ㅜㅜ 어떻게 해내긴 했네요..!

의문의 코딩공장 4층...잊지못할 추억거리도 남았어요... 지나고 나니 미화되는 기억쓰,,,
