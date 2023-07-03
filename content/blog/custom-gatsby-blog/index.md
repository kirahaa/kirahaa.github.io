---
title: Gatsby 블로그 꾸미기
date: "2023-07-01T22:12:03.284Z"
description: "Gatsby 블로그 꾸미기"
category: "gatsby"
---

자, 이제 본격적으로 나만의 블로그를 예쁘게 꾸며볼 시간입니다!😆

개츠비에는 워낙 다양한 플러그인들이 많아서 잘 활용해서 사용하면 많은 것들을 할 수 있습니다!<br/>
여러 테크 블로그들을 돌아다니면서 블로그 구조, 폰트, 코드 블록 등 다양한 디자인들을 참고해서 나에게 맞는 기능들만 쏙쏙 골라서 꾸며봅시다!✨


## 1. 코드 블록

다양한 테마의 코드 블록들 중에서 저는 iOS UI의 vsCode를 고대로 옮겨놓은 듯한 코드 블록들이 눈길이 가더라구요!


### 설치하기

몇가지 방법이 있는 것 같은데, 가장 간단하게 [해당 페이지](https://docs.deckdeckgo.com/?path=/docs/components-highlight-code--highlight-code)를 참고하면 손쉽게 예쁜 코드 블록을 불러올 수 있습니다! 


```shell
$ npm install @deckdeckgo/highlight-code
```

이제 `layout.js`에서 해당 패키지를 불러오면 됩니다!

```js
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"

// ... 생략

deckDeckGoHighlightElement()
```



