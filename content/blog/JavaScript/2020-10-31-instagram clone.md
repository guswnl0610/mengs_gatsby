---
title: 'Vanilla JS로 인스타그램 클론해보기'
category: 'JavaScript'
tags:
  - JavaScript
  - HTMLCSS
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-10-31
---

## 전체 뷰

![](https://i.ibb.co/3vBxyhS/2020-10-30-9-41-54.png)

로그인 페이지

<br>

![](https://i.ibb.co/yXvRzTj/2020-10-30-6-28-17.png)

메인 페이지

<br>

## 기술 스택

- just JavaScript

<br>

## 구현 기능

### 로그인 페이지

- 아이디와 패스워드 각각 1글자 이상 입력해야 버튼 색 활성화
- 아이디와 패스워드 형식 감지

<img src="https://i.ibb.co/xDBtswV/login-page.gif" style="zoom:50%;" />

한 글자 이상 입력했는지 확인하는 기능은 각 input에 keyup 이벤트리스너를 달아주어 value의 length를 체크하면서

아래 로그인 버튼의 classlist에 background-color를 적용한 클래스를 add하고 remove하게 하여 구현했습니다.

```js
function is_valid_email(value) {
  if (!value) return true
  let email_format = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  return email_format.test(value)
}

function is_valid_password(value) {
  if (!value) return true
  let pw_format = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,16}$/
  return pw_format.test(value)
}
```

이메일 형식과 비밀번호 형식을 체크하는 기능은 정규표현식을 사용하여 구현했습니다.

정규표현식...아무래도 이걸 외우는건 쫌 오바인것 같고... 그 때 그 때 검색해가면서 사용하는 게 답일 것 같습니다.. 물론 외우면 정말정말 좋겠지만요..^^

<br>

### 네비게이션 바

- 우측 상단 프로필사진을 눌렀을 때 메뉴바 생성

<img src="https://i.ibb.co/gDs4s8z/navbarprofile.gif z" style="zoom:50%;" />

메뉴바 element 바깥을 클릭했을 때 창이 사라지게 해야했는데 어떻게 구현해야 할 지 검색해보다가 발견한 방법입니다

```js
document.addEventListener('click', evt => {
  const menubar = document.querySelector('.navbar-profile-container')
  if (menubar.contains(evt.target)) {
    //메뉴바 안을 클릭함
  } else {
    //메뉴바 밖을 클릭함
  }
})
```

Document 전체에 click event를 걸어주고 menubar.contains(evt.target)을 이용해 메뉴바 안을 클릭했는지, 바깥을 클릭했는지 알 수 있었습니다!

<br>

- 검색 기능

![](https://i.ibb.co/hdxmYr3/search.gif)

```js
const my_data = [
  { user_id: 'chaelinCL', profile_pic: 'img/profile/chaelinCL.jpg' },
  { user_id: 'daraxxi', profile_pic: 'img/profile/daraxxi.jpg' },
  { user_id: 'kendalljenner', profile_pic: 'img/profile/kendalljenner.jpg' },
  { user_id: 'kimkardashian', profile_pic: 'img/profile/kimkardashian.jpg' },
  { user_id: 'kyliejenner', profile_pic: 'img/profile/kyliejenner.jpg' },
  { user_id: 'meng', profile_pic: 'img/profile/meng.jpeg' },
  ...
];

...

const filtered_data = my_data.filter((user) => user.user_id.includes(input_value));
```

[mockaroo]: https://mockaroo.com/

이런 식으로 직접 mock data를 만들어서 filter와 include로 검색창에 입력된 id를 검색하도록 만들었습니다.

이런 mock data를 랜덤하게 만들어주는 사이트도 있습니다 [mockaroo] 앞으로 애용하게 될 듯..!

~~진작 저걸로 할걸... 검색 좀 해볼걸....ㅠㅠ~~

<br>

### 메인 페이지

- 피드의 내용이 너무 길면 더 보기 / 숨기기 기능 활성화

  ![](https://i.ibb.co/6ZyF6NP/content-show.gif)

피드의 내용이 기준으로 설정해둔 길이보다 길다면 뒷 텍스트를 잘라 숨기고,

더 보기 버튼을 나타나게 하여 숨겨진 텍스트를 볼 수도 있고, 숨길 수도 있게 만들었습니다.

<br>

- 댓글 좋아요 / 추가 / 삭제

  ![](https://i.ibb.co/fFDHCB9/add-comment.gif)

새로운 댓글을 입력하면 아래에 추가되고, 댓글 각각을 좋아요, 삭제 할 수 있게 했습니다.

여기서 DOM의 불편함을 뼈저리게 느꼈습니다...ㅠㅠ..parentNode와 childNodes의 향연...

이벤트의 타겟 element에서 변경돼야 할 element를 찾는 과정이 조금 번거로워서,,,

이래서 사람들이 프레임워크나 라이브러리를 사용하는구나,,~~를,,느꼈습니다

<br>

- 나름의 반응형

<img src="https://i.ibb.co/y8rnSSf/image.gif" />

먼저 우측의 프로필이 사라지고, 피드의 크기가 창에 맞춰서 줄어들고, 더 작아지면 네비게이션 바의 검색창이 사라지게 했습니다.

breakpoint는 980px, 640px로 정했습니다. 모바일 화면은 가로 640픽셀이 가장 많이 쓰이는 것 같더라구요(맞나요..? 쭈글,,,)

<br>

## 후기(?)

<img src="https://i.ibb.co/KF8W6Vd/2020-10-31-4-40-14.png" style="zoom:90%;" />

난생 처음 코드 리뷰를 받아보면서 한 프로젝트였습니다

지금까지 팀 프로젝트를 하더라도 딱히 서로 코드 리뷰를 해가면서 하진 않았었거든요 (왜냐면... 거기서 거기라고 생각했기 때문...또륵..😂)

코드 리뷰를 받아본 후기는...!! 너무 좋았습니다.. 확실히 피드백을 직접 받으면서 하다보니 와닿는 느낌도 달랐습니다

피드백 받은 내용을 수정하고 리팩토링 하다보니 다음부터는 실수하지 않을 것 같다는 이유모를 자신감이 생기는 느낌쓰..!!

<br>

[github link]: https://github.com/guswnl0610/Instagram-clone

[github link]
