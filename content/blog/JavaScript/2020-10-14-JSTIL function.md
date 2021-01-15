---
title: 'JavaScript - functions'
category: 'JavaScript'
tags:
  - JavaScript
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-10-14
---

### Parameter

- default parameters

함수를 선언할 때 parameter의 기본값을 지정해줄 수 있습니다

```javascript
//default parameters
function foo(param1 = 'hello', param2 = 'world!') {
  console.log(`${param1} ${param2}`)
}
foo() //hello world!
```

- rest parameters

다수의 parameter들을 배열 형태로 받을 수 있습니다

```javascript
// rest parameters
function foo(...args) {
  //parameter가 배열 형태로 들어옴
  args.forEach(arg => console.log(arg))
}
foo('A', 'B', 'C')
// A
// B
// C
```

### 함수 표현식 function expression

- 함수 표현식?

함수 선언과 주요 차이점은 함수 이름으로,

함수 표현식으로 익명함수를 만들 경우 이 이름을 생략할 수 있습니다.

```javascript
const myfunction = function() {
  //익명함수로 함수이름 생략가능
  console.log('this is my function')
}
myfunction() // this is my function
const hello = myfunction
hello() // this is my function
```

- 함수 표현식은 Hoisting 되지 않는다

함수 선언으로 함수를 정의할 경우,

함수 선언문보다 윗줄에 함수를 호출해도 문제가 없지만

함수 표현식으로 정의한 경우

함수 선언문보다 윗줄에 함수를 호출하게되면 에러가 발생합니다.

아래의 코드에서는 에러가 발생합니다.

```javascript
console.log(notHoisted) // undefined
notHoisted(2, 3) //error
const notHoisted = function(a, b) {
  console.log(a + b)
}
```

하지만 아래의 코드에서는 에러가 발생하지 않습니다.

```js
const notHoisted = function(a, b) {
  console.log(a + b)
}
console.log(notHoisted)
notHoisted(2, 3)
```

### 화살표 함수 arrow function

화살표함수는 항상 익명 함수이며, function표현에 비해 짧고

this, arguments, super, new.target을 바인딩하지 않습니다.

```js
const sum = (a, b) => a + b
const sum = function(a, b) {
  return a + b
}
//위 둘은 같은의미를 가짐.
```

- parameter가 1개인 경우

```js
//parameter가 1개인 경우 괄호는 선택사항
singleparam => {
  console.log('single-param')
}
singleparam => {
  console.log('single-param')
}
```

- parameter가 없는 경우

```
//parameter가 없는 함수는 괄호가 필요
() => {console.log('zero-param');};
```

- default parameter, rest parameter

```js
//위의 rest parameter와 default parameter도 지원
;(param1, param2, ...params) => {
  console.log('rest-param')
}
;(param1 = 'mo', param2 = 'ha') => {
  console.log(`${param1} ${param2}`)
}
```

### IIFE (Immediately Invoked Function Expression)

IIFE는 함수를 선언함과 동시에 실행하는 자바스크립트 함수입니다.

```js
;(function momo() {
  console.log('mo ha')
})()
//mo ha

let momo = (() => {
  console.log('mo ha~')
})() //mo ha~
```
