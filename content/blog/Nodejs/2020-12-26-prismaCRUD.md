---
title: 'Prisma로 간단한 CRUD 구현해보기'
category: 'Nodejs'
tags:
  - JavaScript
  - Nodejs
  - Prisma
  - TIL
comments: true
toc: true
toc_sticky: true
draft: false
date: 2020-12-26
---

[prisma 공식문서]: https://www.prisma.io/docs/concepts/components/prisma-client/crud

> [Prisma 공식문서]를 참고한 포스트입니다

<br>

블로그 서비스를 만든다고 했을때 글(Articles)에 대한 간단한 CRUD를 prisma를 이용해서 구현해보겠습니다!

```js
model articles {
  id         Int             @id @default(autoincrement())
  user_id    Int
  title      String
  body       String
  status     articles_status @default(DRAFT)
  created_at DateTime?       @default(now())
  updated_at DateTime?
  deleted_at DateTime?
  users      users           @relation(fields: [user_id], references: [id])
  comments   comments[]

  @@index([user_id], name: "user_id")
}
```

Articles 테이블의 스키마입니다! users 테이블의 id를 fk로 가지고 있습니다.

그리고 status 필드는 enum으로 default값은 DRAFT이고, PUBLISHED, DELETED가 있습니다.

```js
const app = express()

app.post('/articles', createArticle)
app.get('/articles', getArticles)
app.get('/articles/:id', getArticle)
app.put('/articles/:id', updateArticle)
app.delete('/articles/:id', deleteArticle)
```

우선 endpoint는 위와 같이 연결되어있습니다

## CREATE

```js
const createArticle = async (req, res) => {
  try {
    const { user_id, title, body } = req.body // request의 body에서 user_id, title, body를 받음
    if (!user_id || !title || !body) {
      // 셋 중 req의 body에 들어오지 않은 것이 있다면 error!
      const error = new Error('invalid input')
      error.status = 400
      throw error
    }

    const foundUser = await prisma.users.findUnique({ where: { id: user_id } }) // user_id를 이용하여 users 테이블에서 user를 찾음

    if (!foundUser) {
      // 만약 user_id가 존재하지 않는 user의 id라면 error!
      const error = new Error('user not found')
      error.status = 404
      throw error
    }

    const createdArticle = await prisma.articles.create({
      // articles 테이블에 새로운 row 생성
      data: {
        users: {
          connect: { id: user_id }, // users 테이블의 id가 fk로 연결되어 있어서 이런식으로 작성해주어야 함
        },
        title,
        body,
        status: 'PUBLISHED',
      },
    })

    res.status(201).json({ createdArticle })
  } catch (error) {
    res.status(error.status).json({ message: error.message })
  }
}
```

### findUnique

> The `findUnique` query lets you retrieve a single database record by _ID_ or another _unique_ attribute. You can use the `select` and `include` options to determine which properties should be included on the returned object.

findUnique는 where로 들어온 조건으로 db에서 해당 조건에 해당하는 하나의 record를 찾아서 반환합니다. 리턴타입은 null이거나 js object입니다.

<br>

### create

> The `create` query creates a new database record. You can use the `select` and `include` options to determine which properties should be included on the returned object.

create는 db에 새로운 record를 추가합니다. data에 어떤 내용이 들어가야 하는지 적어주면 됩니다.

Table 설정 중 not null인 값들을 적어주면 되겠네요!

create는 새로 생성된 데이터의 js object를 리턴합니다.

## READ

```js
const getArticles = async (req, res) => {
  // articles 테이블의 모든 row 조회
  try {
    const articles = await prisma.articles.findMany({
      where: {
        // 해당 조건에 해당하는 모든 데이터를 찾음
        OR: [
          {
            status: 'DRAFT',
          },
          {
            status: 'PUBLISHED',
          },
        ],
      },
    })
    res.status(200).json({ articles })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
```

### findMany

> The `findMany` query returns a list of records. You can use the `select` and `include` options to determine which properties the returned objects should include. You can also paginate, [filter](https://www.prisma.io/docs/concepts/components/prisma-client/filtering/), and order the list.

where절을 사용해서 위 코드처럼 조건을 걸 수도 있지만 만약 아무런 조건을 걸고 싶지 않은 경우

```js
const articles = await prisma.articles.findMany()
```

이렇게 할 수 있겠습니다. 제가 저렇게 조건을 걸어준 이유는 뭔가 articles의 필드를 봤을 때 status에 DELETED 가 있기 때문에

db에서 직접 row를 삭제하지 않고 status를 변경해주는 식으로 구현했기 때문입니다.

```js
const getArticle = async (req, res) => {
  //path parameter로 입력된 id에 해당하는 article 조회
  try {
    const { id } = req.params // path parameter로 들어온 id
    const foundArticle = await prisma.articles.findUnique({
      // 해당 article이 존재하는지 확인
      where: {
        id: Number(id),
      },
    })
    if (!foundArticle || foundArticle.status === 'DELETED') {
      // 만약 존재하지 않거나 DELETED 상태면 error
      const error = new Error('invalid id')
      error.status = 400
      throw error
    }
    console.log(foundArticle)
    res.status(200).json({ foundArticle })
  } catch (error) {
    res.status(error.status).json({ message: error.message })
  }
}
```

따라서 article의 목록이 아닌 하나의 article을 조회하는 함수도 위와 같이 구현했습니다.

## UPDATE

```js
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params // 수정하길 바라는 article의 id
    const { title, body } = req.body
    if (!title || !body) {
      // title, body가 입력으로 들어오지 않은 경우 error
      const error = new Error('invalid input')
      error.status(400)
      throw error
    }

    const foundArticle = await prisma.articles.findUnique({
      // 해당 article이 존재하는지 확인
      where: {
        id: Number(id),
      },
    })

    if (!foundArticle || foundArticle.status === 'DELETED') {
      // article이 존재하지 않거나 DELETED면 error
      const error = new Error('invalid id')
      error.status = 400
      throw error
    }

    const updatedArticle = await prisma.articles.update({
      // article 내용 수정
      where: {
        id: Number(id),
      },
      data: {
        title,
        body,
      },
    })

    res.status(200).json({ updatedArticle })
  } catch (error) {
    res.status(error.status).json({ message: error.message })
  }
}
```

### Update

> The `update` query updates an existing database record. You can use the `select` and `include` options to determine which properties should be included on the returned object.

where에 어떤 데이터를 수정할건지 필터링 하는 옵션을 명시해주고, data에는 변경할 내용을 적어주면 됩니다.

## DELETE

```js
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params // 삭제하길 바라는 article의 id

    const foundArticle = await prisma.articles.findUnique({
      // 해당 id를 가진 article이 있는지 확인
      where: {
        id: Number(id),
      },
    })

    if (!foundArticle) {
      const error = new Error('invalid id')
      error.status = 400
      throw error
    }

    const deletedArticle = await prisma.articles.update({
      // 해당 id를 가진 article의 status를 DELETED로 변경
      where: {
        id: Number(id),
      },
      data: {
        status: 'DELETED',
      },
    })
    res.status(200).json({ deletedArticle })
  } catch (error) {
    res.status(error.status).json({ message: error.message })
  }
}
```

사실 제가 구현한 delete는 delete의 탈을 쓴 update입니다 (...)
만약 prisma의 delete 함수를 사용해서 구현한다면 아래와 같은 모습이겠네요!

### delete

> The `delete` query deletes an existing database record. Even though the record is being deleted, `delete` still returns the object that was deleted. You can use the `select` and `include` options to determine which properties should be included on the returned object.

```js
const deletedArticle = await prisma.articles.delete({
  where: {
    id: Number(id),
  },
})
```
