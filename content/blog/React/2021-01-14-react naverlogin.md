---
title: '[React] 네아로(네이버 아이디 로그인) 연동하기'
category: 'React'
draft: false
date: 2021-01-14
---

## 네아로에 app 등록

[네아로]: https://nid.naver.com/user2/campaign/introNaverIdLogin.nhn

우리의 리액트 앱에 [네아로]서비스를 연동하기 위해서는 우선 네아로에 우리의 어플리케이션을 등록해야한다.

![](https://i.ibb.co/n3M9tVh/2021-01-14-6-44-35.png)

어플리케이션 목록에 새로운 앱을 추가하자.

로그인에 필요한 정보와 서비스 url / callback url을 설정해 주면 어플리케이션 등록을 마칠 수 있다.

Client ID를 발급받았다면 준비완료!!

<br>

## index.html 수정

```html
<script
  type="text/javascript"
  src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"
  charset="utf-8"
></script>
```

Html 파일의 head 태그 안에 위 코드를 추가해준다.

<br>

## 로그인 버튼 추가

로그인 버튼을 띄우는 과정에서 좀 애를 먹었다...

일단 함수를 작성해주어야 한다.

```react
const { naver } = window as any;

function Login(props: any) {
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: 발급받은 client ID,
      callbackUrl: app 등록할 때 callbackurl에 추가해주었던 url,
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: 'white', type: 1, height: '47' }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    ...
    <div id='naverIdLogin' /> { /* id 꼭 입력해주어야 함 */}
    ...
  )
}
```

initializeNaverLogin 함수에서 생성한 로그인 버튼은 id가 naverIdLogin인 element 에 들어가는 방식으로 작동한다.

그러므로 저 id를 입력해주지 않으면 Uncaught TypeError: Cannot read property 'firstChild' of null 에러가 난다.

이것때문에 엄청 삽질했는데,,,후,,,, ;ㅅ;

아무튼 여기까지 하면 작고 귀여운 네이버 로그인 버튼이 나타날 것이다.

![](https://i.ibb.co/VDP44mk/2021-01-14-7-38-02.png)

<br>

## access token 사용하기

<img src="https://i.ibb.co/Nm10sLC/2021-01-14-7-38-58.png" style="zoom:50%;" />

버튼을 클릭하고 나타나는 화면에서 네이버 아이디로 로그인을 하면 위와 같은 주소로 redirect 된다.

여기서 우리에게 필요한 정보를 뽑아다 쓰면 된다. 위 주소값은 location의 hash에서 뽑아다 쓸 수 있다.

```react
import { useLocation } from 'react-router-dom';

...

  const location = useLocation();

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    console.log(token);
  };

  useEffect(() => {
    initializeNaverLogin();
    getNaverToken();
  }, []);
```

함수를 추가해주고 useEffect를 조금 수정해 주었다.

<img src="https://i.ibb.co/5RGnjsY/2021-01-14-7-42-53.png" style="zoom:50%;" />

콘솔에 네이버로부터 발급받은 엑세스 토큰이 찍히는 모습!

이제 이 토큰을 가지고 백엔드와 통신하여 네이버 소셜로그인 기능을 완성하면 되겠다.
