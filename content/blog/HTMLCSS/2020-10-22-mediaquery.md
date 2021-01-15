---
title: 'HTML&CSS Media query'
category: 'HTML/CSS'
tags:
  - HTMLCSS
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-10-22
---

## Media query?

> **Media queries** are useful when you want to modify your site or app depending on a device's general type (such as print vs. screen) or specific characteristics and parameters (such as screen resolution or browser [viewport](https://developer.mozilla.org/en-US/docs/Glossary/viewport) width).

미디어 쿼리는 단말의 유형(출력물 vs 화면)이나, 화면 해상도나 뷰포트 너비 등에 따라 웹 사이트나 앱의 스타일을 수정할 때 유용합니다.

반응형 웹이라고 불리는 pc와 모바일 환경같은 디스플레이의 크기가 다른 환경에서

그 디스플레이의 크기에 맞게 유동적으로 반응하는 웹을 구현하기 위해 사용합니다.

미디어쿼리를 사용하면 특정 조건에서는 어떤 CSS를 적용하라는 규칙을 줄 수 있습니다.

CSS에 @media 문법을 사용하여 작성할 수 있습니다. 예시를 보시죠!

```css
@media screen and (min-width: 800px) {
  .result-section {
    width: 70%;
  }
}
```

이 코드는 스크린으로 페이지를 보고 있을 때, 화면의 너비가 800픽셀 이상이면

result-section을 클래스로 가지는 element의 너비를 70%로 바꿔줍니다.

## 미디어 유형 특정하기

미디어 유형에서는 주어진 장치의 일반적인 분류를 설명합니다.

웹사이트는 보통 screen을 염두에 놓고 디자인하지만, 프린터를 대상으로 하는 스타일을 만들고 싶을 떼도 있습니다.

```css
@media print {
  ...;
} //프린트를 특정

@media print, screen {
  ...;
} //다수의 장치 특정 가능
```

## 미디어 기능 특정하기

미디어 기능에서는 주어진 장치의 특정한 특징(?)을 설명합니다.

min-이나 max-를 앞에 붙여서 각각 최소 조건과 최대 조건을 걸어줄 수 있습니다.

위 예제에서는 브라우저의 너비가 800픽셀 이상일때만 CSS가 적용됩니다.

```css
@media (hover: hover) {
  ...;
} //마우스가 요소 위에 호버할 수 있는 경우

@media (max-width: 1200px) {
  ...;
} // 너비가 1200픽셀 이하인 경우
```

## 유형과 기능 조합하기

미디어 쿼리에서는 논리연산을 할 수 있습니다!

not, and, only, 그리고 쉼표를 사용하면 되는데요, 그 중 and를 사용해서 여러 조건을 조합할 수 있습니다.

### And

and연산자를 사용할 때에는 모든 쿼리 구성이 참을 반환해야 작동합니다. 미디어 특성과 미디어 유형을 같이 사용할때도 쓰입니다.

```css
@media screen and (min-width: 30em) {
  ...;
}

@media screen and (min-width: 30em) and (orientation: landscape) {
  ...;
}
```

### , (쉼표)

쉼표를 사용해서도 조합할 수 있습니다. 이 경우에는 or 연산이라고 생각하시면 될 것 같습니다.

조건들 중 하나라도 맞는다면 CSS를 적용합니다.

```css
@media (min-height: 680px), screen and (orientation: portrait) {
  ...;
}
```

### not

not은 쿼리의 뜻을 반전시킵니다. not 이 붙는다면 쿼리의 내용이 거짓이 될때 CSS가 적용됩니다.

```css
@media not all and (monochrome) {
  ...;
}
//위 코드는 아래와 같이 동작합니다.
@media not (all and (monochrome)) {
  ...;
}
```

### Only

Only 연산자는 전체 쿼리가 일치할 때만 스타일을 적용할 때 사용하며,

오래 된 브라우저가 스타일을 잘못 적용하지 못하도록 방지할 때 주로 쓰입니다.

```css
@media screen and (max-width: 50em) {
  ...;
}
```

위 코드에서는 only를 사용하지 않았죠! 만약 구형 브라우저에서 이 미디어 쿼리를 적용할 경우

screen만 읽고 뒷부분은 무시한 채 스타일을 적용해버리는 문제가 발생할 수 있습니다.

only를 사용할 경우 반드시 미디어 유형도 지정해야 합니다!
