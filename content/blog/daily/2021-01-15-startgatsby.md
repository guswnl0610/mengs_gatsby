---
title: 'gatsby blog를 생성하며...'
category: 'daily'
draft: false
date: 2021-01-15
---



<img src="https://i.ibb.co/zhVBQLB/2021-01-15-5-36-02.png" style="zoom:30%; align:center;  " />

도당체 블로그 이사가 몇번째인지 모르겠다. 티스토리1 -> 티스토리2 -> jekyll -> gatsby ㅎㅎ...

일단 gatsby 블로그로 갈아타게 된 계기는 기존에 사용하고 있던 블로그가 jekyll로 만든 거였고, 고것은 ruby 기반이었다.

그런데 react 기반으로 정적 페이지를 만드는 gatsby가 있다는 것을 알게 되었고, 언젠가는 갈아타야겠다는 생각은 하고 있었다.

그런데 점점 블로그에 글은 쌓여만 가고 있었고, 바꿀거면 빨리 바꿔버리는게 낫겠다 싶어서 이참에 갈아타버렸다.

블로그를 갈아타면서 세팅했던 것들을 A to Z 글로 작성해보고자 한다!

## 블로그 시작하기

우선 gatsby cli를 글로벌로 설치한다.

```bash
npm install -g gatsby-cli
```

개츠비 블로그를 시작하는 데에는 여러 방법이 있는데, 그 중 다른 개발자분들이 만들어 놓은 템플릿을 이용하는 방법도 있다.

[gatsby starter]: https://www.gatsbyjs.com/starters/?v=2
[bee starter]: https://github.com/JaeYeopHan/gatsby-starter-bee

[gatsby starter]에 가보면 많은 템플릿들이 있는데, 그중에서 내가 적용한 것은 [bee starter]다. 

JaeYeopHan님이 만드신 템플릿이고, 무려 한국어 readme가 있다... 😇🇰🇷펄-럭

```bash
gatsby new 블로그폴더명 템플릿주소

or

git clone 템플릿주소
cd 레포명
yarn
```

위 두 방법중 하나를 선택해서 하면 된다. 

필요한 패키지를 다 받고 나서 

```bash
yarn dev
```

명령어를 입력하고, localhost 8000번 포트에 접속해보면 

<img src="https://i.ibb.co/TDXGq7y/2021-01-15-8-32-48.png z" style="zoom:30%; align:center" />

이렇게 기본 템플릿 화면이 나타난다. 이제 세팅을 바꿔줄 차례!

<br>

## config 수정

```js
module.exports = {
  title: `Mengs blog`,
  description: `개발새발이 되지 않으려 노력하는 블로그`,
  author: `Mengkki`,
  introduction: `common fangirl`,
  ...
}
```

보통 readme에 설정하는 법에 대한 설명이 써져 있을 것이고, 

bee-starter의 경우 gatsby-meta-config.js 파일을 수정하면 된다.,,,

그리고 대부분의 설정은 gatsby-config.js 파일에서 해줄 수 있다. 

이후에 구글 검색 설정할 때 다시 돌아올 것이다!

<br>

## Netlify에 배포

gatsby 블로그는 netlify 서비스를 이용해서 정말 쉽게 배포가 가능하다!

일단 우리의 블로그 코드들을 github repository에 푸시하자.

<img src="https://i.ibb.co/z5MkRnF/2021-01-15-9-17-37.png z" style="zoom:50%;" />

그 후 

```text
https://app.netlify.com/start/deploy?repository=repository주소

ex) https://app.netlify.com/start/deploy?repository=https://github.com/guswnl0610/mengs_blog
```

위 주소로 접속하여 설정을 마친다.

이때 repository 이름을 입력하라고 하는데, 설정을 마치고 나면 우리가 입력했던 이름으로 새로운 repository가 생성이 되어있을 것이다.

이 repository 코드를 받아와서, 포스팅을 하거나, 설정을 수정한 후 push하면 netlify에서 다시 build해서 배포해준다. 어메이징~

초기에는 배포 주소가 요상한...dazzling 어쩌구로 설정이 되어있을 텐데

<img src="https://i.ibb.co/rcPVphy/2021-01-15-9-23-52.png" style="zoom:50%;" />

change site name을 눌러서 도메인을 귀엽게 변경 가능하다!!

<br>

## 구글 검색 설정

이대로 블로그 세팅을 마칠수도 있지만, 구글 검색에 블로그 글들이 노출된다면 더 좋을것 같다!!

우선 우리의 블로그가 검색 엔진에 의해 크롤링 되게 도와줄 sitemap.xml이 필요하다.

```bash
yarn add gatsby-plugin-sitemap
```

위 명령어를 입력하여 패키지를 설치해 주고 gatsby-config.js 파일을 수정해준다.

```js
module.exports = {
  ...
  plugins: [
    ...
    `gatsby-plugin-sitemap`,
    ...
  ],
}

```

그 후 프로젝트를 빌드해주면 public 폴더 내에 sitemap.xml 파일이 생성된다.

```bash
yarn build
or 
gatsby build
```

yarn dev나 gatsby develop 명령어를 사용하여 로컬 서버를 띄우고 

[http://localhost:8000/sitemap.xml]: http://localhost:8000/sitemap.xml

[http://localhost:8000/sitemap.xml]에 정상적으로 xml 파일이 나타난다면 성공이다!

[google search console]: https://search.google.com/search-console?hl=ko

이제 [google search console]에 우리의 배포된 블로그를 연결하면 된다.

<img src="https://i.ibb.co/wpM0GrL/2021-01-15-9-41-30.png z" style="zoom:40%;" />

url 접두어를 선택 후 우리의 블로그 url을 입력한다.

<img src="https://i.ibb.co/s6Bjq0M/2021-01-15-9-43-08.png z" style="zoom:50%;" />

소유권을 증명하기 위한 여러 방법이 있는데, 제 블로그 탬블릿에 개츠비 플러그인 중 react-helmet이 세팅되어 있어

 HTML 태그를 추가하는 방식을 선택했다. 

Helmet 태그에 위 태그를 넣어주거나,

```js
<Helmet
					  ....
            meta={[

              {
                name: `google-site-verification`,
                content: `어쩌구저쩌구`,
              },
            ]
```

이런식으로 추가해주면 된다. 

푸시 후 확인 버튼을 눌러주면 세팅 끝!

개츠비 블로그 시작하고 나의 성공시대 시작됐다~

