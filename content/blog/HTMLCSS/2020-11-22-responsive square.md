---
title: '우당탕탕 반응형 정사각형 이미지 도전기'
category: 'HTML/CSS'
tags:
  - HTMLCSS
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-11-22
---

내가 원했던 것

![](https://i.ibb.co/526rKqp/2020-11-22-5-26-52.png)

<br>

<br>

내 화면

![](https://i.ibb.co/3yZn9sS/2020-11-22-8-39-09.png)

지금은 그래도 다 같은 이미지라서 괜찮아 보이지만.... 가로가 긴 이미지와 세로가 긴 이미지가 섞여서 나오면 엉망진창이 되어버립니다.

나름의 반응형으로 만들어보겠다고 하다가 이런 사달이 났는데... 일단 반응형으로 움직이는 이미지를 담는 틀을 만드는 방법을 구글링을 통해 알아냈습니다.

width를 100%를 주고 padding-bottom을 100%를 주면 됩니다!

```scss
.imageContainer {
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;

  img {
    width: 100%;
  }
}
```

이전의 코드

```scss
.imageContainer {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: 20px;
  overflow: hidden;

  img {
    width: 100%;
    position: absolute;
    top: 0;
  }
}
```

수정 후 코드

![](https://i.ibb.co/ZdnYk46/2020-11-22-8-58-09.png)

이제 세로가 길쭉한 이미지들은 예쁘게 나옵니다.

하지만 문제는...

![](https://i.ibb.co/hfYCKVx/2020-11-22-9-01-35.png)

가로가 길쭉한 이미지가 나오면.... 😇

그래서 찾아본것이 object-fit 속성이었는데

검색을 해 본 결과 image 태그에 width와 height 값을 지정해줘야 제대로 먹히는 것 같습니다.

```scss
.imageContainer {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: 20px;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    width: 42vh;
    height: 42vh;
    object-fit: cover;
  }
}
```

이미지 태그에 vh로 크기 값을 지정해주면 그래도 아래와 같이 나타납니다.

![](https://i.ibb.co/ydd7zsZ/2020-11-22-9-29-02.png)

근본적인 문제가 해결이 되진 않았지만 일단 이대로 두기로 했습니다...

CSS의 세계란.........
