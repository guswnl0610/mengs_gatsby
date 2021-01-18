---
title: '[React] scroll 이벤트 throttle로 최적화 시키기'
category: 'React'
draft: false
date: 2021-01-13
---

## Scroll 이벤트

이번 프로젝트 진행 중 스크롤을 어느정도 했느냐에 따라 네비게이션 바가 나타나고, 사라지게 하는 기능이 필요했다.

이를 위해서 일단 scroll 이벤트를 걸어주어야 했는데, scroll 이벤트의 특성 상 사용자가 스크롤을 아주 조금만 하더라도 이벤트가 트리거 된다.

```js
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
    };
  }, []);

  const handleScroll = () => {
    console.log('scrolled');
  };
```

## ![](https://i.ibb.co/w4Vkp9v/scroll.gif)

아래 콘솔에 scrolled가 왕창 찍힌다. 스크롤은 실상 얼마 하지도 않았는데 몇백개가 찍힌다.

이제 여기에 setstate가 들어간다면..?

## 그리고 set state

```js
  const handleScroll = () => {
    console.log('스크롤 이벤트');
    if (window.scrollY > 500) {
      console.log('state변경');
      setIsTabnavOn(true);
      return;
    }
    console.log('state변경');
    setIsTabnavOn(false);
    return;
  };
```

코드를 이와같이 수정해주었다.

![](https://i.ibb.co/Cwd0zYC/scroll2.gif)

원하는 대로 작동하긴 한다. 스크롤 단계에 따라서 네비게이션 바가 사라지고 나타난다.

하지만 함수 최상단에 콘솔에 찍게 해둔 스크롤 이벤트도 계속 찍히고 state변경 콘솔도 계속 찍힌다.

수백개의 스크롤 이벤트마다 setstate함수를 호출하고 있는 것이다.

이게 마음에 들지 않아 setstate함수가 실행되기 전에 조건을 걸어주었다.

## 조건을 추가한 set state

```js

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTabnavOn]);

  const handleScroll = () => {
    console.log('스크롤 이벤트');
    if (window.scrollY > 500 && !isTabnavOn) {
      console.log('키기', window.scrollY, isTabnavOn);
      setIsTabnavOn(true);
      return;
    }
    if (window.scrollY <= 500 && isTabnavOn) {
      console.log('끄기', window.scrollY, isTabnavOn);
      setIsTabnavOn(false);
      return;
    }
  };
```

![](https://i.ibb.co/RNv0vjr/scroll3.gif)

스크롤 이벤트 자체는 아직도 엄청나게 일어나고 있지만... 일단 해당하는 조건에만 setstate함수를 호출하고 있게 됐다.

사실 이전 프로젝트에서는 이정도까지만 했었다. 그래도 콘솔에 찍히는 저 수많은 스크롤 이벤트가 마음에 들지 않았다...

저걸 줄일 수 있는 방법이 없을까 싶어서 검색을 했고, throttle을 이용하면 된다는 글을 봤다.

## throttle

throttle이란 어떤 시간을 정해두고,

지정해 둔 시간 내에 같은 이벤트가 여러번 일어나지 않도록 블로킹 해주는 것이다.

그렇게 최종 완성된 코드

```js
import { throttle } from 'lodash';

  const throttledScroll = useMemo(
    () =>
      throttle(() => {
        console.log('스크롤 이벤트');
        if (!tabSelectorRef.current) return;
        const nextTabnavOn = window.scrollY > tabSelectorRef.current.offsetTop + 100;
        if (nextTabnavOn !== isTabnavOn) setIsTabnavOn(nextTabnavOn);
      }, 300),
    [isTabnavOn]
  );

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [throttledScroll]); // 여기에 throttledScroll 대신 isTabnavon을 넣어줘도 정상작동한다
```

![](https://i.ibb.co/Qc8dyfS/scroll4.gif)

useMemo를 이용해서 throttledScroll 함수를 메모이제이션 해준다(useCallback이나 useRef를 사용하는 방법도 있다)

만약 throttledScroll 내에서 state로 사용하고 있는 변수를 사용하고 있다면(제 경우 isTabnavOn) 의존배열에 추가해주어야 한다.

그리고 그 함수를 scroll이벤트의 콜백으로 넘겨주었다.

throttle 해주는 시간을 0.3초로 해두었음에도 콘솔에 찍히는 스크롤 이벤트가 확연히 줄어들었다.

그러면서 기능도 정상적으로 작동하는 모습! 이렇게 뿌듯할수가~
