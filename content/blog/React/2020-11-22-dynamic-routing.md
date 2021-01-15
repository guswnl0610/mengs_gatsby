---
title: 'React의 동적 라우팅 (feat. react-router-dom)'
category: 'React'
tags:
  - JavaScript
  - React
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-11-22
---

## 동적 라우팅

[react의 routing]: https://guswnl0610.github.io/react/react-router-dom/

[react의 routing] 포스트에서 리액트에서 어떻게 react router dom을 사용해서 라우팅을 하는 지 알아보았습니다.

```react
class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/list" component={ProductList} />
        </Switch>
      </Router>
    );
  }
}
```

지금까지 우리가 해왔던 라우팅은 해당 url로 접근했을 때 해당 컴포넌트를 보여줍니다.

그런데 만약 리스트 페이지에서 어떤 상품을 클릭 했을 때 해당 상품에 대한 자세한 정보를 알려주고 싶은데,

클릭한 상품이 어떤 상품인지는 어떻게 알 수 있을까요? 일단 실제 서비스되고 있는 웹페이지에 가봅시다!

![](https://user-images.githubusercontent.com/26221261/99897144-61c93100-2cda-11eb-84de-1254b88559d3.png)

위 링크는 g마켓의 감귤 상품 페이지입니다.

링크 뒤에 goodsCode=숫자가 붙는 것이 보이시죠? 이런 url을 통해 상품을 특정할 수 있습니다.

근데 이런 url을 통해 이동하는 건 대체 어떻게 하냐면... react-router-dom을 통해서 할 수 있습니다!

## react-router-dom을 사용해 동적라우팅 해보기

위의 Routes.js에 연결된 컴포넌트인 Main 컴포넌트에서 props를 콘솔로그로 찍어보겠습니다.

![](https://user-images.githubusercontent.com/26221261/99897147-64c42180-2cda-11eb-8eac-0f7accf3bff9.png)

이렇게 props로 history, location, match가 들어옵니다. 이것들이 들어오는 이뉴는 Main 컴포넌트가 Routes.js에 연결되어 있는 컴포넌트이기 때문입니다.

우리는 이 props들을 이용하여 현재 url에 접근할 수 있습니다.

### query parameter를 이용하는 방법

```react
<div className={`categorySide ${isCategoryToggled ? 'toggled': ''}`}>
  { categories && categories.map((item) =>
    (<div key={item.id} className="categoryItem">
      <Link to={`/list?category=${item.id}`}>
         <span className={currentCategoryId === item.id ? "selected" : ""}>
           {item.name}
         </span>
      </Link>
     </div>))}
</div>
```

위 코드는 해당 Link 태그를 클릭 했을 때 ProductList 컴포넌트가 연결된 /link 주소로 보내면서

/list 뒤에 ?를 붙여줌으로써 쿼리스트링을 추가했습니다. 이제 클릭을 해보겠습니다.

![](https://user-images.githubusercontent.com/26221261/99897276-7c4fda00-2cdb-11eb-9e26-36c6501cdd2b.png)

우리가 지정한 url로 정상적으로 이동하는 모습을 볼 수 있습니다.

이제 ProductList 컴포넌트에서 this.props를 찍어보겠습니다.

![](https://user-images.githubusercontent.com/26221261/99898402-ae196e80-2ce4-11eb-890a-521ef7234c09.png)

location의 search 에 우리가 지정한 쿼리스트링이 들어오고 있죠!?

```js
const currentCategoryId = parseInt(this.props.location.search.split('=')[1])
```

이제 이런 방법으로 카테고리 Id를 가져다 쓸 수 있게 되었습니다

### path variable를 사용하는 방법

이 방법을 사용하기 위해서는 우선 Routes.js로 이동해야 합니다.

```react
class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/list" component={ProductList} />
          <Route exact path="/detail/:id" component={ProductDetail} />
        </Switch>
      </Router>
    );
  }
}
```

detail 페이지 뒤에 :id라는 이상한 것이 달려있죠?

이것은 라우팅에서 변수를 사용하겠다는 의미입니다. 저는 id라고 해놨지만 여러분이 원하는 이름으로 바꾸셔도 상관없습니다.

```react
<Route exact path="/detail/:mengs" component={ProductDetail} />
```

이런식으로요!

이제 디테일 페이지로 이동을 하기 위해서는 /detail/어쩌구 이런식으로 접근해야합니다.

![](https://user-images.githubusercontent.com/26221261/99898257-6a723500-2ce3-11eb-9a36-0258f4ea1765.png)

위와 같은 형식의 url로 접근하자 디테일 페이지가 나타납니다.

이제 디테일 페이지의 Props를 살펴보면

![](https://user-images.githubusercontent.com/26221261/99898349-1ae03900-2ce4-11eb-8898-bd1233968517.png)

이제 props.match.url에 우리가 입력한 url에 접근할 수 있게 되었습니다.
