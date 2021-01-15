---
title: 'HTML&CSS display 속성'
category: 'HTML/CSS'
tags:
  - HTMLCSS
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-10-20
---

## Display : inline? block?

#### inline vs block

```html
<p>this is</p>
<p>sample text</p>

<span>this is</span>
<span>sample text</span>
```

![](https://i.ibb.co/5FDFTn7/2020-10-20-2-20-41.png)

p 태그와 span 태그로 입력하면 위 그림과 같이 출력됩니다.

p태그로 감쌌을때 한 줄이 띄워지는 이유는

![](https://i.ibb.co/MCPMVR6/2020-10-20-2-21-02.png)

브라우저에서 p 태그의 display에 block 속성을 부여하기 때문인데요!

p처럼 한개의 element가 한 줄을 쓰는 것은 block,

span 처럼 여러 개의 element가 한 줄을 쓰는 것은 inline이라고 합니다.

p태그도 css에서 display: inline; 해주면 span처럼 바뀝니다!

```css
p {
  display: inline;
}
```

![](https://i.ibb.co/HYftZR0/2020-10-20-3-21-24.png)

#### inline vs inline-block

```css
p {
  display: inline-block;
  background-color: greenyellow;
}
```

```css
p {
  display: inline;
  background-color: greenyellow;
}
```

Display 에 inline 값을 주는 방법이 아닌 inline-block을 주어도 아래와 같은 결과가 나오게 됩니다.

![](https://i.ibb.co/0ZnQP5X/2020-10-20-3-27-13.png)

그렇다면 둘은 뭐가 다른가요?! 둘중 뭘 써야하죠?!

네...둘의 가장 큰 차이점은 inline-block에는 width height값을 줄 수 있지만, inline은 그럴 수 없다는 것이 되겠습니다.

```css
p {
  display: inline;
  background-color: greenyellow;
  width: 100px;
  height: 100px;
}
```

![](https://i.ibb.co/0ZnQP5X/2020-10-20-3-27-13.png)

Display : inline일 때에는 width와 height값을 주어도 변화가 없습니다.

그런데...inline-block일 때는? 짜잔~

```css
p {
  display: inline-block;
  background-color: greenyellow;
  width: 100px;
  height: 100px;
}
```

![](https://i.ibb.co/YhThWLG/2020-10-20-3-34-22.png)

이렇게 변하게 됩니다. Width,height 외에도 padding margin값을 줄 수 있다는 차이도 있습니다!!

둘 중 필요한 용도에 맞게 사용하면 될 것 같습니다!
