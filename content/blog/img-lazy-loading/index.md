---
title: 웹 성능 최적화를 위한 Lazy Loading 기법
date: "2023-11-01T22:12:03.284Z"
description: " Lazy Loading은 페이지 안에 있는 실제 이미지들이 실제로 화면에 보여질 필요가 있을 때 로딩을 할 수 있도록 하는 테크닉입니다."
category: "web"
tags:
  - "web"
  - "lazy loading"
  - "렌더링"
  - "최적화"
---

### Lazy Loading이란 무엇일까?

레이지 로딩(Lazy Loading)은 페이지를 읽어들이는 시점에 중요하지 않은 리소스 로딩을 추후에 할 수 있게 하는 기술입니다.
페이지를 로드하자마자 리소스를 로딩하는 일반적인 방식 대신, 실제로 사용자 화면에 보여질 필요가 있을 때까지 이러한 로딩을 지연하는 것입니다.

레이지 로딩의 목적은 **(1) 최초 페이지 로딩 시간을 개선**하고 당장 화면에 표시되지 않는 이미지, 영상 등의 리소스를 나중에 로딩하면서 **(2) 최초 데이터 전달 양을 감소시키는 것**입니다.

웹페이지를 로딩하는 기존 방식은 모든 리소스들을 한번에 받는 것입니다.
이렇게하면 최초 로딩 시간이 더 커지게 되는데, 이러한 로딩 시간 증가는 인터넷 연결 속도가 느린 지역이나 디바이스를 사용할 때 특히 더 두드러지게 체감됩니다.

이러한 문제를 해결하기 위해 사용할 수 있는 테크닉이 레이지 로딩인 것입니다. 
레이지 로딩을 적용하면, 화면에 당장 보여지지 않거나 아직 유저의 인터렉션이 일어나지 않은 특정 리소스들의 로딩을 딜레이시킬 수 있습니다.
이러한 방식을 적용하면, 당장 필요한 컨텐츠들이 먼저 로딩되고, 다른 리소스들은 필요해질 때 로딩되기 때문에 웹 페이지의 퍼포먼스를 눈에 띄게 개선할 수 있습니다.

레이지 로딩은 주로 이미지와 영상들에 적용됩니다. 
하지만 이미지나 영상 뿐만 아니라, 다이나믹 컴포넌트, 방대한 양의 스크립트, 외부 위젯 등 다른 컨텐츠에도 적용될 수 있습니다.
이렇듯 용량이 큰 컨텐츠들을 추후 필요해질 때 추가 로딩하도록 개발을 진행한다면 최초 페이지 로딩 시간을 줄이고 사용자 경험을 개선할 수 있습니다.

이제 레이지 로딩이 무엇인지 알았으니, 어떻게 적용하면 되는지 살펴보도록 합시다!✨

### loading="lazy" 태그 속성 사용

HTML의 img 태그에 loading='lazy'를 추가해주면 image의 lazy 로딩이 가능합니다.

`<img src="./image.jpg" loading="lazy" width="200" height="200" />`

해당 속성을 사용하면 요소가 웹 브라우저 뷰포트에 들어오는 시점에 해당 컨텐츠의 다운로드 및 화면 표시가 이루어집니다.
대부분의 웹 브라우저에서 지원되고 사용이 간편하지만, 기능적으로는 지연 로딩 여부만 가능하기 때문에 지연 로딩되는 대상에 대한 세세한 제어는 할 수 없습니다.
세세한 제어를 하려면 자바스크립트로 구현하는 Intersection Observer API를 사용해야 합니다.

그리고 반드시 **이미지의 크기 속성 값**이 있어야만 loading="lazy" 속성이 적용되어 동작합니다.
명시적으로 크기를 표시하지 않은 이미지는 지연 로딩이 적용되지 않습니다.
크기를 표시할 때는 꼭 스크롤하는 방향에 대한 크기를 정해야 합니다. 
세로로 스크롤하는 웹페이지면 높이값이 있어야 지연 로딩이 적용됩니다.


### 자바스크립트 Intersection Observer API 이용

정기적으로 업데이트가 되고 있는 모던 웹 브라우저에서는 모두 지원되는 자바스크립트 API 기능입니다.
이 API는 지연 로딩을 위한 API라기 보다는 웹페이지의 특정 요소가 뷰포트 영역과 교차를 하는지(뷰포트 영역 안에 들어왔는지)를 감시하는 모니터링 API입니다.
웹페이지 요소가 뷰포트 영역 안에 들어오면, 해당 요소를 표시하거나, 또는 다른 특정 동작을 하도록 하는 트리거를 발생시켜 콜백 함수의 코드를 실행합니다.

Intersection Observer API 기능은 자바스크립트를 통해 기능을 구현하며, 웹 브라우저 뷰포트 안으로 들어오는 요소의 동작을 세밀하게, 또 선택적으로 제어할 수 있어서 트래픽을 더 효율적으로 제어할 수 있습니다.

#### Intersection Observer 생성하기

```js
let observer = new IntersectionObserver(callback, options)
```

IntersectionObserver 생성자를 사용하여 옵저버를 만들 수 있습니다.
인자로는 **(1)콜백함수**와 **(2)옵션들**이 들어가는데, 먼저 옵션들을 살펴봅시다.

```js
const options = {
  root: ...,
  rootMargin: ...,
  threshold: ...
}
```

IntersectionObserver 생성자에 전달하는 두 개의 인자 중 두번째 옵션엔, 세 가지 필드가 있습니다.

(1) root:
- 타겟 엘리먼트와의 교차 정도를 체크할 상대방입니다. 꼭 타겟의 윗 조상님들 중 하나여야 합니다. 만약 따로 지정하지 않거나, 명확하게 null이라고 표기할 경우엔 디폴트로 브라우저의 뷰포트가 root로 지정됩니다.
- VanillaJS로 할 때는 document.queryselector ~~ 와 같이 작성하면 됩니다.

(2) rootMargin:
- 루트를 감싸고 있는 마진을 뜻합니다. CSS margin 속성이랑 비슷한 모양으로 값을 넣을 수 있습니다. (예를 들어, CSS에서 10px 10px 10px 10px이라고 쓰면 top, right, bottom, left인 것과 같이 저 순서대로 값을 넣을 수 있습니다.) 이 값은 %로 작성될 수도 있습니다.
- 이 값들은 교차를 계산하기 전에 루트 엘리먼트의 바운딩 박스의 양 분의 늘어남/줄어남을 담당합니다. 디폴트는 모두 0입니다.

(3) threshold:
- 타겟 엘리먼트가 몇 % 정도 보여줘야 IntersectionObserver의 첫번째 인자로 전달된 콜백이 실행되어야 하는지를 정하는 값입니다.
- 그냥 일반 숫자 또는 배열로 표기합니다. 만약 "내 타겟이 50%정도 노출되었을 때 콜백을 실행시켜!"라고 명령하고 싶다면 0.5를 넣어주면 됩니다. 이것보다 조금 더 복잡하게, 노출도(?)가 25% 늘어날때마다 콜백이 실행되게 하고 싶다면 배열 값을 넣어주면 됩니다. [0, 0.25, 0.5, 0.75, 1].
- 디폴트값은 0이며, 이는 즉 내 타겟의 픽셀 한 개만 보이더라도 콜백을 실행해버리겠다는 의미입니다. 반대로, 1.0으로 설정하면 내 타겟을 이루는 모든 픽셀이 보여져야만 콜백이 실행된다는 것을 뜻합니다.

#### 관찰 대상, 타겟 지정하기

```js
let myTarget = document.querySelector('.lazy');
observer.observe(myTarget);
```

관찰자인 Observer를 만들었으니 그 관찰자의 관심 대상인 관찰 대상, target element도 만들어주어야 합니다.
타겟은 observer(타겟) 메소드를 통해 지정할 수 있습니다.

#### 콜백이 실행되면...

지정된 threshold를 만나는 순간 콜백이 실행됩니다. 콜백이 실행되면, 콜백은 IntersectionObserverEntry 객체와 우리의 관찰자 observer를 전달받게 됩니다.

```js
let callback = (entries, observer) => {
  entries.forEach(entry => {
    ...
  })
}
```

콜백함수가 받게 되는 entry list는 각 타겟당 하나의 엔트리를 포함하고 있습니다. 
이 엔트리는 Intersection Observer API의 인터페이스로, 특정 시점에서의 타겟 엘리먼트와 루트의 교차 여부를 보여줍니다.
메소드는 없고, read-only인 속성 7개를 가지고 있는데 그 중에서 isIntersection 속성에 대해 알아봅시다.

isIntersection 속성은 Boolean으로 true/false 값을 갖는데, true일 경우엔 엔트리의 주인공인 타겟이 루트와 현재 교차하고 있다는 것을 의미합니다.

```js
const myElement = useRef();

// ...


const handleScrolling = useCallback(( [entry] ) => {
  if (entry.isIntersecting) {
    // 만약 지금 타겟이 루트랑 교차중이라면, 이 곳을 실행!
  }
}, [...]) 

useEffect(() => {
  let observer;
  const {current} = myElement;
  
  if (current) {
    observer = new IntersectionObserver(handleScrolling, {threashold: 0.7})
    observer.observe(current)
    
    return () => observer && observer.disconnect()
  }
}, [handleScrolling])
```

**++ 바닐라JS 예시 코드**

```js
window.onload = function () {
  const imgs = document.querySelectorAll('.img');

  const options = {
    root: null,
    threshold: 0.5
  };

  const callback = function(entries, Observer) {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        Observer.unobserve(entry.target);
        entry.target.src = entry.target.dataset.src;
      }
    })
  }

  let observer = new IntersectionObserver(callback, options);

  for(let i = 0; i < imgs.length; i++) {
    observer.observe(imgs[i]);
  }
}
```

#### 마치며

프론트엔드 개발자가 되고 싶었던 가장 큰 이유 중 하나가 바로 보기 좋고 재미있는 각종 인터랙션과 애니메이션 등을 많이 만들어보고 싶었기 때문인데, 
이번에 INtersection Observer API를 공부해보니 너무 재미있었습니다! 꼭 다음 프로젝트에서 써먹을 수 있길 바라며,,, 그럼 틀린 부분이 있다면 댓글 부탁드리고 다음에 또 만나욥+_+

