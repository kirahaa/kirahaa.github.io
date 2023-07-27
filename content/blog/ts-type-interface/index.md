---
title: Typescript - type과 interface 차이
date: "2023-07-22T13:57:56.284Z"
description: "typescript의 type alias과 interface의 차이점에 대해 알아봅시다."
category: "typescript"
tags:
- "typescript"
- "type"
- "interface"
---

**typescript**를 공부해보셨다면 `type`과 `interface`의 차이점에 대해 궁금증을 가져보셨을 텐데요!<br/>
이번 기회에 확실히 정리해 봅시다! 🙌

### 📌 상속 받는 법

**interface**는 `extends`를 **type**은 `&`를 이용해 상속을 통한 확장을 진행합니다.

```typescript
// ✅ interface
interface IString1 {
  a: string;
}

interface IString2 extends IString2 {
  b: string;
}

const interfaceConst: interface2 = {
  a: 'a',
  b: 'b'
}

// ✅ type
type type1 = {
  a: string;
}

type type2 = type1 & {
  b: string;
}

const typeConst: type2 = {
  a: 'a',
  b: 'b'
}
```

### 📌 선언적 확장 / 자동 확장

**interface**는 같은 이름의 객체를 다시 한번 선언하면 자동으로 확장이 됩니다. 하지만 **type**은 불가능 합니다.<br/>
따라서 외부에 공개되어야 하는 library 같은 경우에는 타입 객체의 확장성을 위해 **interface**를 사용하는 것을 추천한다고 합니다.

```typescript
// ✅
interface interface1 {
  a: string;
}

interface interface1 {
  b: string;
}

const interfaceConst: interface1 = {
  a: 'a',
  b: 'b'
}


// ❌ Duplicate identifier 'type1'.
type type1 = {
  a: string;
}

type type1 = {
  b: string;
}
```

### 📌 computed property name

> computed property name은 **표현식(변수, 함수 등)을 이용해 객체의 key 값을 지정하는 문법**입니다.

**type**의 경우, computed property name을 사용한 타입 선언이 가능하지만, **interface**의 경우는 불가능합니다.

```typescript
type keyType = 'a' | 'b'

type type1 = {
  [key in keyType]: string
}

const typeA: type1 = { a: 'a', b: 'b' }

interface interface1 {
  // ❌ error
  [key in keyType]: string
}
```

### 📌 원시 타입이나 튜플, 유니온 타입의 타입 선언의 경우에는 type 사용, interface는 객체의 타입 정의에 사용

#### 원시 타입(Primitive Types)

```typescript
type CustomType = string;
const str: CustomType = '';

// ❌ 
interface CustomInterface = string;
```

#### 유니온 타입(Union Types)

> 유니온 타입이란 자바스크립트의 OR 연산자(||)와 같이 A이거나 B이다 라는 의미의 타입입니다.

```typescript
type Fruit = 'apple' | 'lemon'
type Vegetable = 'patato' | 'tomato'

type Food = Fruit | Vegetable

const apple: Food = 'apple'
```

#### 튜플 타입(Tuple Types)

> tuple은 자바스크립트에서는 지원하지 않는 데이터 타입이지만, 타입스크립트에서는 **배열 타입을 보다 특수한 형태로 사용할 수 있는 타입**입니다.
> tuple에 명시적으로 지정된 형식에 따라 아이템 순서를 설정해야 되고, 추가되는 아이템 또한 tuple에 명시된 타입만 사용 가능합니다.

```typescript
type Animal = [name: string, age: number];

const cat: Animal = ['kitty', 1];
```

---

### 결론

공식문서에서는 특별한 경우를 제외하고는 **type보단 interface를 사용하는 것이 더 좋다**고 하네요!<br/>
프로젝트를 설계하기 전에 type을 쓸지 interface를 쓸지 통일을 하면 좋을 것 같습니다!

**결론적으로는 팀 내 컨벤션이 있다면 그에 따르고, type과 interface의 쓰임새에 맞게 사용해주는게 좋다고 생각합니다. 😉**
 