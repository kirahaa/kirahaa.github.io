---
title: Gatsby 블로그 꾸미기
date: "2023-07-01T22:12:03.284Z"
description: "Gatsby 블로그 꾸미기"
category: "gatsby"
tags:
  - "Gatsby"
  - "blog"
---

자, 이제 본격적으로 나만의 블로그를 예쁘게 꾸며볼 시간입니다!😆

개츠비에는 워낙 다양한 플러그인들이 많아서 잘 활용해서 사용하면 많은 것들을 할 수 있습니다!<br/>
여러 테크 블로그들을 돌아다니면서 블로그 구조, 폰트, 코드 블록 등 다양한 디자인들을 참고해서 나에게 맞는 기능들만 쏙쏙 골라서 꾸며봅시다!✨


## 1. 코드 블록

다양한 테마의 코드 블록들 중에서 저는 iOS UI의 vsCode를 고대로 옮겨놓은 듯한 코드 블록들이 눈길이 가더라구요!


### 설치하기

가장 간단한 방법은 [해당 페이지](https://docs.deckdeckgo.com/?path=/docs/components-highlight-code--highlight-code)를 참고하면 손쉽게 예쁜 코드 블록을 불러올 수 있습니다! 


```shell
$ npm install @deckdeckgo/highlight-code
```

### 적용하기

이제 `layout.js`에서 해당 패키지를 불러오면 됩니다!

```js
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"

// ... 생략

deckDeckGoHighlightElement()
```


## 2. 폰트

[gatsby-omni-font-loader](https://www.gatsbyjs.com/plugins/gatsby-omni-font-loader/) 플러그인을 통해 웹폰트나 커스텀 폰트를 적용할 수 있습니다!

### 설치하기

```shell
$ npm install gatsby-omni-font-loader react-helmet
```

### 적용하기

잘 설치가 되었다면, `gatsby-config.js` 파일에 사용하고 싶은 폰트들을 가져오면 됩니다.

```js
plugins: [
    {
      resolve: `gatsby-omni-font-loader`,
      options:{
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Inter`,
            file: `https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap`,
          },
          {
            name: `Pretendard`,
            file: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css`,
          },
        ]
      }
    },
]
```

저는 **Inter**, **Pretendard** 폰트를 불러왔는데요, 적용해본 결과 **Pretendard** 폰트가 더 깔끔하니 마음에 들어서 해당 폰트를 추가해 주었습니다!

이제 css 파일로 가서, 해당 폰트를 적용해 주면 됩니다.

```css
--fontFamily-pretendard: Pretendard, -apple-system, BlinkMacSystemFont, "Noto Sans", ...;
--font-body: var(--fontFamily-pretendard);

body {
    font-family: var(--font-body);
    font-size: var(--fontSize-1);
    color: var(--color-text);
}
```

