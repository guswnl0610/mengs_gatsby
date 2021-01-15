---
title: 'git 명령어 모음'
category: 'git'
tags:
  - git
  - gitbash
comments: true
description: 맨날 까먹어서 기록용으로 작성해두는 포스트
toc: true
toc_sticky: true
draft: false
date: 2020-10-02
---

### git init

```
git init
//현재 위치를 로컬저장소로 설정

git clone 주소
//github에서 가져오기 ex) git clone https://github.com/guswnl0610/sample
```

### git add

```
git add 파일명
//파일명에 해당하는 파일을 staging area에 추가

git add .
//현재 디렉토리 내 모든 파일 staging area에 추가
```

### git status

```
git status
//현재 상태를 볼 수 있음
```

### git commit

```
git commit -m "커밋 메세지"
//커밋 메세지와 함께 커밋

git log
//커밋 이력 조회
```

### git remote

```
git remote add origin 원격저장소주소
//로컬저장소를 github 원격저장소와 연결함

git remote -v
//연결된 저장소 확인
```

```
git push origin 브랜치이름
//커밋한 코드 원격저장소로 보내기 ex) git push origin main

git fetch
//최신 코드 가져오기

git pull
//최신 코드 가져와서 merge하기
```

### 브랜치 관련

```
git checkout 브랜치이름
//브랜치 선택

git branch 브랜치이름
//브랜치 생성

git branch -r
//원격 브랜치 목록

git branch -a
//로컬 브랜치 목록

git branch -d 브랜치이름
//브랜치 삭제

git branch -M main
//default branch를 master에서 main으로 변경

git merge 브랜치이름
//현재 브랜치로 선택한 브랜치를 합친다.
```

### git stash

```
git stash
//변경사항을 임시저장 (stash 생성)

git stash list
//stash 리스트 확인

git stash apply
//가장 최근의 stash 적용

git stash apply [stash이름]
//선택한 stash 적용. ex) git stash apply stash@{1}

git stash pop
//가장 최근의 stash를 적용하면서 스택에서 제거

git stash drop
//가장 최근의 stash 제거
```

아마도 꾸준히 업데이트 될 예정입니다
