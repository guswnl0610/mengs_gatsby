---
title: 'HTML&CSS CSS selector'
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

## CSS selector

[w3school]: https://www.w3schools.com/cssref/css_selectors.asp
[mdn]: https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Selectors

그동안 css 파일에서 보았던 무수한 .과 #의 요청들...

그 .과 #들은 모두 css selector의 일부였습니다!

가장 많이 쓰일 것 같은?? selector를 정리해보는 포스트입니다.

### .class #id

```css
.myclass {
  // class에 myclass가 포함된 모든 element를 선택합니다.
}

.myclass1.myclass2 {
  // class에 myclass1과myclass2을 모두 포함하는 element를 선택합니다.
}

.myclass1 .myclass2 {
  // myclass1을 가진 element의 자식 중 myclass2를 가진 모든element를 선택합니다.
}

#myid {
  //id='myid'인 모든 element를 선택합니다.
}
```

### Element

```css
* {
  //모든 element를 선택합니다
}

div {
  //모든 div element를 선택합니다.
}

div.class1 {
  // div 이면서 class 에 class1을 포함하는 모든 element를 선택합니다.
}

div,
p {
  // 모든 div element들과 p element들을 선택합니다.
}

div p {
  // div element 안에 있는 모든 p element를 선택합니다.
}

div > p {
  // div element의 바로 아래 자식으로 있는 모든 p element를 선택합니다.
}

div + p {
  // div element 바로 뒤에 있는 모든 p element를 선택합니다.
}

div ~ p {
  // div element를 뒤따르면서 같은 부모를 가진 모든 p element를 선택합니다.
}
```

~~정리하면서도 헷갈리네요... @.@ 좀 더 알아봐야될것같은 느낌적인 느낌...~~

### attributes

```css
input[type='text'] {
  // input 중 type이 text인 모든 element를 선택합니다.
}

input[type~='text'] {
  //input 중 type이 text를 포함하는 모든 element를 선택합니다.
}

input[type|='text'] {
  //input 중 type이 text로 시작하는 모든 element를 선택합니다.
}

a[href^='https'] {
  // href가 https로 시작하는 모든 a element를 선택합니다.
}

a[href$='.txt'] {
  // href가 txt로 끝나는 모든 a element를 선택합니다.
}

a[href*='github'] {
  // href가 github를 포함하는 모든 a element를 선택합니다.
}
```

Html 태그의 attribute값을 이용해서도 요소를 선택할 수 있습니다.

### : & ::

```css
input:checked {
  // 체크되어있는 모든 input element를 선택합니다.
}

input:focus {
  // 현재 focus되어 있는 input element를 선택합니다.
}

div:first-child {
  // 부모의 첫번째 자식인 모든 div를 선택합니다.
}

div:last-child {
  // 부모의 마지막 자식인 모든 div를 선택합니다.
}

div:nth-child(3) {
  // 부모의 3번째 자식인 모든 div를 선택합니다.
}

div:hover {
  // 현재 마우스가 위에 올려져있는 div를 선택합니다.
}
```

[w3school]

[MDN]
