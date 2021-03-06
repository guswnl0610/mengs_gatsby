---
title: 'Web 프로젝트가 배포되는 과정'
category: 'Web'
tags:
  - Web
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2021-01-03
---

우리가 힘들게 만들어낸 웹 프로젝트! 이제 세상에 내보이려고 한다.

지금까지는 개발 서버 (예를들면 localhost:3000)를 사용하며 개발자인 우리는 언제든 우리의 서비스를 이용할 수 있었지만

다른 사람들은 그렇지 않다. 다른 사람들도 우리가 피땀눈물흘려가며 만든 프로젝트를 이용할 수 있게 하려면 배포하는 과정을 거쳐야 한다.

일단 현재 프로젝트에서 사용중인 React / Django 기준으로 설명하도록 하겠다~

## FrontEnd

### S3

웹 브라우저가 알아들을 수 있는 코드는 단 3가지이다. HTML, CSS 그리고 JavaScript.

하지만 우리의 React 프로젝트는..? 크흠... 브라우저가 알아듣게 하기 위해서는 프로젝트를 build해주어야 할 필요가 있다.

npm build 나 yarn build같은 명령어를 사용해서 빌드된 프로젝트를 AWS S3에 띄운다.

S3는 프로젝트 폴더를 서비스로 띄운다고 생각하면 된다.

![](https://i.ibb.co/4Y6fgx0/2021-01-03-5-32-23.png)

이제 유저가 브라우저에서 우리가 구입한 도메인... 예를 들면 hello.com에 접근하면

DNS에서 우리의 S3의 ip 주소를 알려주고, 그 ip주소로 이동하면서 우리가 작성한 frontend 코드를 화면에 띄운다.

### CDN

하지만 이 형태에도 문제가 있다. S3 서버를 만약 서울에서 띄웠다면 미국에서 우리 사이트에 접속했을 때 데이터를 받아오기 까지 엄청나게 오래 걸린다.

이를 해결하기 위해서는 CDN을 이용해야 한다.

AWS에서는 이를 Cloud front라고 하는데, 쉽게 말해서 우리의 S3 서버의 복사본을 만들어서(캐싱해서) 세계 여기저기에 뿌리는 것이다.

<img src="https://i.ibb.co/FhRnthc/2021-01-03-5-43-36.png" style="zoom:67%;" />

이렇게 하면 해외에서 우리 서비스에 접속할 때 속도가 빨라지는 것 뿐만 아니라, 만약 우리 프로젝트에 업데이트가 생겼을 때,

기존의 S3 단일 서버일 때에는 잠깐 서비스를 멈췄어야 했는데, 이런 식으로 구성하면 죽지 않는 서버를 만들 수 있다.

업데이트 할 때에도 캐시만 refresh 해주면 모든 cloud front가 업데이트 된다.

<img src="https://i.ibb.co/fDJKwtb/front.jpg" style="zoom:50%;" />

## BackEnd

### EC2

백엔드에서는 기존의 장고 프로젝트에서 runserver를 했을 때는 단일스레드로 작동했었다.

하지만 실제로 배포될 프로젝트에서 단일스레드로는 모자람이 많기 때문에 Gunicorn을 이용해서 스레드를 늘리고,

nginx를 이용해서 느린 파이썬 코드 -> 빠른 C 코드로 변환하며 속도를 늘린다.

<img src="https://i.ibb.co/1m0sGBR/back.jpg" style="zoom:67%;" />

### Docker

하지만 이 상태로도 문제가 있다. 수많은 사용자의 요청을 하나의 EC2 서버에서 받아들이고 있기 때문이다.

이럴때 scale-up이나 scale-out을 하게 되는데, scale up은 더 좋은 서버 컴퓨터를 사는 것이고, scale-out은 서버 컴퓨터를 늘리는 것이다.

보통은 확장성이나 비용을 생각해서 scale-out을 많이 한다.

서버를 늘린다는 것은 기존의 EC2서버와 똑같은 환경을 가진 서버를 하나 더 늘린다는 것인데, 저 서버 자체를 복사할 때 유용한 도구가 바로 docker다.

docker는 서버를 이미지로 관리하면서 여러개의 EC2환경을 쉽게 구축할 수 있도록 해준다.

새로운 EC2 컴퓨터가 생겼을 때 docker 이미지만 받으면 똑같은 환경의 서버가 하나 탄생하는 것이다!!

### Load balancer

<img src="https://i.ibb.co/hKNRRjh/2.jpg" style="zoom:50%;" />

이렇게 새로운 EC2서버를 만들었다. 하지만 문제가 생겼다. 기존의 EC2 서버와 새로운 EC2 서버는 ip주소가 다르다.

프론트에서 각각 다른 ip주소로 요청을 보낼 수도 없는 노릇인데... 이를 해결하기 위해 load balancer가 필요하다.

요청이 들어오면 요청을 잘 분배해서 각각의 EC2 서버에 도달하도록 해준다. 그림에선 빠졌는데 AWS에서는 로드밸런서를 ELB라고 한다.

### RDS와 S3

하지만 위 형태에도 문제가 있다..(문제의 끝은 대체 어디/...?)

그림에서 각각의 EC2 서버가 media 폴더와 db를 갖고 있는게 보이는가..?

그러면 어떤 유저 정보는 A EC2 서버에는 있는데 B EC2 서버에는 존재하지 않는 불상사가 발생할 수도 있다.

따라서 db나 미디어폴더같은 친구들은 각각 RDS와 S3에 따로 저장해주어야 한다.

<img src="https://i.ibb.co/BBV2DkF/132.jpg" style="zoom:50%;" />
