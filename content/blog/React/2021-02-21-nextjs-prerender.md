---
title: '[React] Next.js의 pre-rendering'
category: 'React'
draft: false
date: 2021-02-21
---

## pre-render란?

Next.js 특) 이자 Next.js에서 가장 중요한 개념 중 하나이다

Next.js에서는 페이지마다 HTML을 만들어주면서

CSR 방식의 단점이었던 first painting이 느리다는 것과 SEO가 좋지 않다는 점을 상쇄시킨다

Next.js가 만드는 HTML들은 그 페이지에 필요한 최소한의 JS 코드만을 포함하고,

브라우저에 페이지가 로드되면 나머지 JS를 받아오면서 페이지가 완전히 interactive해지도록 만든다. (이 과정을 hydration이라고 한다) 

![](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)

![](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)

이미지 출처 : Next.js 공식문서



<br>

## Static Generation / Server-side Rendering

Next.js에서 제공하는 프리 렌더링의 방식은 두가지이다. 

바로 static generation과 server-side rendering인데

`static generation` 은 프로젝트를 빌드할 당시에 HTML 파일들을 만들어서 request가 들어올 때 해당 요청에 맞는 HTML들을 보여주는 방식이고

`server-side rendering` 은 빌드할 당시에 HTML을 만드는 게 아니라 request가 들어올 때 그에 맞는 HTML을 생성하는 방식이다.

Next.js에서는 페이지마다 이 프리렌더 종류를 다르게 할 수도 있다.

어떤 페이지에서는 static generation을 쓰고, 어디서는 server-side rendering을 하고...어떤 페이지에서는 그냥 CSR을 하고... 마음대로 선택할 수 있다.

<br>

## 그럼 어떨때 뭘 써야 하나요?🤔

공식문서 왈,

> You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended).
> On the other hand, [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.
> In that case, you can use **[Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering)**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.

한줄요약 - 미리 페이지를 만들어 둘 수 있으면 더 빠른 static generation, 실시간으로, 요청마다 매번 달라지는 페이지를 그리고 싶다면 SSR



<br>

## Pre-render하면서 data fetch하기

Next.js에서는 아주 간단하게 API 서버나 파일에서 데이터를 가져오고 그 데이터를 프리렌더링 된 페이지에 띄워줄 수도 있다.

먼저 static generation으로 생성 될 페이지의 경우, `getStaticProps` 함수를 export 해주면 된다.

`getStaticProps` 함수 안의 내용은 클라이언트 서버 단계에서 실행되며, 함수 내에서 props 객체를 리턴해주면

해당 페이지의 Component에서 props로 받아올 수 있게 된다. 



```jsx
***index.js***


export default function Main ({allPostsData}) {} // 하단의 getStaticProps에서 리턴한 props 객체를 받음

...

export async function getStaticProps() {
  const allPostsData = getSortedPostsData(); // 데이터 받아오는 함수
  return {
    props: {
      allPostsData,
    },
  }; //props 객체를 리턴한다
}
```

만약 static generation이 아니라 server-side rendering 방식을 사용하고 싶다면

`getStaticProps` 함수가 아닌 `gerServersideProps` 함수를 export 하면 된다.

위 두 함수 내부에서 실행되는 코드들은 브라우저가 아니라 서버 단에서 실행되는 것이기 때문에 WebSocket같은 브라우저 전용 API들은 사용할 수 없다는 점을 유의해야 한다!(경험담)

그리고 공식문서 왈, `getStaticProps` 함수는 개발서버 환경에서는 모든 request마다 실행된다. 

> In development (`next dev`), `getStaticProps` will be called on every request.



`#wecode`  `#위코드` 