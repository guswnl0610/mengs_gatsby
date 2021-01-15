---
title: 'JavaScript - Array Method 정리'
category: 'JavaScript'
tags:
  - JavaScript
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-10-27
---

자주 사용하는 array method들을 총 정리해놓은 포스트입니다!

### 배열 만들기

```js
let animals = ['🐶', '🐱']
```

### 배열 끝에 항목 추가하기 - push

```js
animals.push('🐭')
console.log(animals) // [ '🐶', '🐱', '🐭' ]
```

### 배열 끝의 항목 제거하기 - pop

```js
animals.pop()
console.log(animals) // [ '🐶', '🐱' ]
```

### 배열 앞에 항목 추가하기 - unshift

```js
animals.unshift('🐹')
console.log(animals) // [ '🐹', '🐶', '🐱' ]
```

### 배열 앞의 항목 제거하기 - shift

```js
animals.shift()
console.log(animals) // [ '🐶', '🐱' ]
```

### 배열 안 항목의 인덱스 찾기 - indexOf

```js
let animals = ['🐶', '🐱']
console.log(animals.indexOf('🐱')) // 1 있으면 인덱스
console.log(animals.indexOf('🐻')) // -1 없으면 -1
```

### 배열 정렬하기 - sort

```js
const umbrella_academy = [
  'Luther',
  'Diego',
  'Allison',
  'Klaus',
  'Five',
  'Ben',
  'Vanya',
]

const numbers = [1, 10, 100, 4, 2, 5, 20]

console.log(umbrella_academy.sort())
// ['Allison', 'Ben', 'Diego', 'Five', 'Klaus', 'Luther', 'Vanya']
console.log(numbers.sort())
// [ 1, 10, 100, 2, 20, 4, 5 ]
console.log(numbers)
// [ 1, 10, 100, 2, 20, 4, 5 ] -> 정렬된 상태로 변함
```

Sort 안에 아무런 compare function을 주지 않으면 유니코드 순으로 정렬됩니다.

그리고 sort 함수를 실행하면 실행된 배열은 정렬된 상태로 변합니다.

```js
const numbers = [1, 10, 100, 4, 2, 5, 20]

numbers.sort((a, b) => {
  if (a < b) return -1
  //아무튼 음수가 나오면 a가 앞으로 가고
  else if (a > b) return 1
  //아무튼 양수가 나오면 a가 뒤로 간다
  else return 0 //아무튼 0이 나오면 a랑 b랑 순서가 같다
})
// numbers : [ 1, 2, 4, 5, 10, 20, 100 ];
```

sort 안에 compare function을 만들어주면 원하는 대로 정렬할 수 있습니다.

```js
//응용
numbers.sort(() => 0.5 - Math.random()) //배열을 랜덤하게 섞어줌

const umbrella_academy = [
  { name: 'Luther', number: 1 },
  { name: 'Five', number: 5 },
  { name: 'Diego', number: 2 },
  { name: 'Allison', number: 3 },
  { name: 'Vanya', number: 7 },
  { name: 'Klaus', number: 4 },
  { name: 'Ben', number: 6 },
]

umbrella_academy.sort((a, b) => {
  return b.number - a.number //객체의 number 역순 정렬
})
/* 결과
[
  { name: 'Vanya', number: 7 },
  { name: 'Ben', number: 6 },
  { name: 'Five', number: 5 },
  { name: 'Klaus', number: 4 },
  { name: 'Allison', number: 3 },
  { name: 'Diego', number: 2 },
  { name: 'Luther', number: 1 }
]
*/
```

### 배열 합치기 - concat

```js
const arr1 = ['a', 'b', 'c']
const arr2 = ['d', 'e', 'f']
const arr3 = arr1.concat(arr2)

console.log(arr1) // [ 'a', 'b', 'c' ]
console.log(arr2) // [ 'd', 'e', 'f' ]
console.log(arr3) // [ 'a', 'b', 'c', 'd', 'e', 'f' ]

console.log(arr1.concat(1, [2, 3])) // [ 'a', 'b', 'c', 1, 2, 3 ]
```

### 배열 잘라서 떼내기 - slice

배열의 begin 인덱스부터 end 인덱스까지(end는 미포함) 복사본을 만들어서 리턴합니다.

```js
const animals = ['🐶', '🐱', '🐭', '🐹', '🐰']

console.log(animals.slice(2)) // [ '🐭', '🐹', '🐰' ]
console.log(animals.slice(2, 5)) // [ '🐭', '🐹', '🐰' ]
console.log(animals.slice(0, 2)) // [ '🐶', '🐱' ]
console.log(animals.slice(2, 0)) // []
```

### 배열의 항목들 순환하기 - forEach

```js
animals.forEach((value, index, array) => {
  console.log(value, index, array)
})
// '🐶' 0 [ '🐶', '🐱' ]
// '🐱' 1 [ '🐶', '🐱' ]
```

### 인덱스 위치에서부터 여러개의 항목 제거하기 - splice

```js
let animals = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻']

animals.splice(2, 1) //인덱스 2부터 1개 제거
console.log(animals) // [ '🐶', '🐱', '🐹', '🐰', '🦊', '🐻' ]

animals.splice(2, 2) //인덱스 2부터 2개 제거
console.log(animals) // [ '🐶', '🐱', '🦊', '🐻' ]

animals.splice(1) //인덱스 1부터 싹 제거
console.log(animals) // [ '🐶' ]
```

### 배열 안의 모든 요소가 판별 함수 통과하는지 체크 - every

```js
let fruits = [
  'apple',
  'banana',
  'melon',
  'watermelon',
  'orange',
  'grape',
  'pear',
]

fruits.every(fruit => fruit.length >= 3) // true
fruits.every(fruit => fruit.length >= 5) // false
```

### 배열 안의 어떤 요소라도 판별 함수 통과하는지 체크 - some

```js
let fruits = [
  'apple',
  'banana',
  'melon',
  'watermelon',
  'orange',
  'grape',
  'pear',
]

fruits.some(fruit => fruit.length >= 11) // false
fruits.some(fruit => fruit.length >= 10) // true
```

### 필터링하기 - filter

```js
let fruits = [
  'apple',
  'banana',
  'melon',
  'watermelon',
  'orange',
  'grape',
  'pear',
]

let filtered_fruits = fruits.filter(val => {
  return val.length > 5
})

console.log(filtered_fruits)
// [ 'banana', 'watermelon', 'orange' ]
console.log(fruits)
// [ 'apple', 'banana', 'melon', 'watermelon', 'orange', 'grape', 'pear' ]
// filter를 호출한 array는 변경되지 않음
```

return 에 true를 반환하면 filtered_fruits에 val이 들어갑니다.

### 맵핑(?)하기 - map

```js
const oddNumbers = [1, 3, 5, 7, 9, 11, 13]

const evenNumbers = oddNumbers.map(val => {
  return val + 1
})

console.log(evenNumbers) // [ 2, 4, 6, 8, 10, 12, 14 ]
console.log(oddNumbers) // [ 1, 3, 5, 7, 9, 11, 13 ]
```

return 에 반환 된 값을 모은 새로운 배열을 만듭니다.

### 끝판왕(?) - reduce

reduce는 4가지의 인자를 가지는callback함수와 initial value를 인자로 받습니다.

```js
arr.reduce((acc, curval, curidx, array) => {}, initval)
```

initval이 지정된 경우 acc에 initval이 처음 들어가고, 지정되지 않은 경우 acc에 arr의 첫번째 값이 들어갑니다.

reduce는 빈 요소를 제외하고 배열 내에 존재하는 각 요소에 대해 콜백함수를 실행합니다.

acc인자에서는 콜백함수에서 리턴된 값을 누적해서 담고 있습니다.

콜백의 첫번째 호출이면 초기값(initval이나 배열의 첫번째 값)을, 아니라면 이전 콜백의 리턴 값을 가지고 있습니다.

**여기서 initval을 지정해주지 않을 경우, reduce는 arr의 인덱스 1부터 순환합니다.**

initval을 지정해주었다면 reduce는 arr의 인덱스 0부터 순환합니다.

따라서 length가 5인 array에 initval을 주지 않고 reduce를 호출한다면, 콜백함수는 4번 실행됩니다.

아무래도 initval을 지정해주는게 더 안전할 것 같습니다 ☺️

```js
const nums = [1, 2, 3, 4, 5]

const sum = nums.reduce((acc, curval) => {
  return acc + curval
}, 0)

console.log(sum) // 15
```
