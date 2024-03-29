---
title: 노개북 - 클린코드 Assignment 07
date: "2024-02-06T22:12:03.284Z"
description: "노마드코더 개발자북클럽 클린코드 일곱번째 과제입니다."
category: "노개북"
tags:
  - "노개북"
  - "노마드코더"
  - "개발자북클럽"
  - "cleancode"
---


> 📌 **2주차 - Assignment #07**
> #### 📚 TIL (2024.02.06) - 6장. 객체와 자료 구조

### 🎈 책에서 기억하고 싶은 내용을 써보세요.

변수를 비공개로 정의하는 이유가 있다. 남들이 변수에 의존하지 않게 만들고 싶어서다.

##### 자료 추상화

변수 사이에 함수라는 계층을 넣는다고 구현이 저절로 감춰지지는 않는다. 
구현을 감추려면 추상화가 필요하다!

```
// 구체적인 Point 클래스
public class Point {
    public double x;
    public double y;
}

// 추상적인 Point 클래스
public interface Point {
    double getX();
    double getY();
    void setCartesian(double x, double y);
    double getR();
    double getTheta();
    void setPolar(double r, double theta);
}
```

첫번째 예시는 변수를 private로 선언하더라도 각 값마다 조회 함수와 설정 함수를 제공한다면 구현을 외부로 노출하는 셈이다.
변수 사이에 함수라는 계층을 넣는다고 구현이 저절로 감춰지지는 않는다. 구현을 감추려면 추상화가 필요하다!
추상 인터페이스를 제공해 사용자가 구현을 모른 채 자료의 핵심을 조작할 수 있어야 진정한 의미의 클래스다.

```
// 구체적인 Vehicle 클래스
public interface Vehicle {
    double getFuelTankCapacityInGallons();
    double getGallonsOfGasoline();
}

// 추상적인 Vehicle 클래스
public interface Vehicle {
    double getPercentFuelRemaining();
}
```

자료를 세세하게 공개하기보다는 추상적인 개념으로 표현하는 편이 좋다.
인터페이스나 조회/설정 함수만으로는 추상화가 이뤄지지 않는다.
개발자는 객체가 포함하는 자료를 표현할 가장 좋은 방법을 심각하게 고민해야 한다.

##### 자료/객체 비대칭
객체는 추상화 뒤로 자료를 숨긴 채 자료를 다루는 함수만 공개한다.
자료 구조는 자료를 그대로 공개하며 별다른 함수는 제공하지 않는다.

> (자료 구조를 사용하는) 절차적인 코드는 기존 자료 구조를 변경하지 않으면서 새 함수를 추가하기 쉽다.
> 반면, 객체 지향 코드는 기존 함수를 변경하지 않으면서 새 클래스를 추가하기 쉽다.

> 절차적인 코드는 새로운 자료 구조를 추가하기 어렵다.
> 그러려면 모든 함수를 고쳐야 한다. 객체 지향 코드는 새로운 함수를 추가하기 어렵다.
> 그러려면 모든 클래스를 고쳐야 한다.

다시 말해, 객체 지향 코드에서 어려운 변경은 절차적인 코드에서 쉬우며, 절차적인 코드에서 어려운 변경은 객체 지향 코드에서 쉽다!

복잡한 시스템을 짜다 보면 새로운 함수가 아니라 새로운 자료 타입이 필요한 경우가 생긴다.
이때는 클래스와 객체 지향 기법이 가장 적합하다. 반면,
새로운 자료 타입이 아니라 새로운 함수가 필요한 경우도 생긴다. 이때는 절차적인 코드와 자료 구조가 좀 더 적합하다.


##### 디미터 법칙

> 메소드가 반환하는 객체의 메소드를 사용하면 안된다.

모듈은 자신이 조작하는 객체의 속사정을 몰라야 한다. 객체는 자료를 숨기고 함수를 공개한다. <br/>
→ 객체는 조회 함수로 내부 구조를 공개하면 안 된다는 의미다.
그러면 내부 구조를 (숨기지 않고) 노출하는 셈이니까.

```
final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();
```

**기차 충돌** 위와 같은 코드를 기차 충돌이라 부른다.
여러 객차가 한줄로 이어진 기차처럼 보이기 때문이다. 일반적으로 이 방식은 피하는 편이 좋다.

위 코드는 다음과 같이 나누는 편이 좋다.

```
Options opts = ctxt.getOptions();
File scratchDir = opts.getScratchDir();
final String outputDir = scratchDir.getAbsolutePath();
```

위 예제가 디미터 법칙을 위반하는지 여부는 ctxt, Options, ScratchDir이 객체인지 아니면 자료 구조인지에 달렸다.
객체라면 내부 구조를 숨겨야 하므로 확실히 디미터 법칙을 위반한다. 반면, 자료 구조라면 당연히 내부 구조를 노출하므로 디미터 법칙이 적용되지 않는다.

##### 잡종 구조
이런 혼란으로 때때로 절반은 객체, 절반은 자료 구조인 잡종 구조가 나온다.
이는 양쪽 세상에서 단점만 모아놓은 구조다. 그러므로 잡종 구조는 되도록 피하는 편이 좋다.

**구조체 감추기**

```
ctxt.getAbsolutePathOfScratchDirectoryOption();

ctxt.getScratchDirectoryOption().getAbsolutePath();
```

첫번째 방법은 ctxt 객체에 공개해야 하는 메서드가 너무 많아진다.

두번째 방법은 getScratchDirectoryOption()이 객체가 아니라 자료 구조를 반환한다고 가정한다.

ctxt가 객체라면 뭔가를 하라고 말해야지 속을 드러내라고 말하면 안 된다. 

ctxt 객체에 임시 파일을 생성하라고 시키면 어떨까?

```
BufferedOutputStream bos = ctxt.createScratchFileStream(classFileName);
```

ctxt는 내부 구조를 드러내지 않으며, 모듈에서 해당 함수는 자신이 몰라야 하는 여러 객체를 탐색할 필요가 없다.
따라서 디미터 법칙을 위반하지 않는다.

##### 자료 전달 객체

자료 구조체의 전형적인 형태는 공개 변수만 있고 함수가 없는 클래스다.
이런 자료 구조체를 때로는 자료 전달 객체(Data Transfer Object, DTO)라 한다.
DTO는 굉장히 유용한 구조체다. 특히 데이터베이스와 통신하거나 소켓에서 받은 메시지의 구문을 분석할 때 유용하다.
특히 DTO는 데이터베이스에 저장된 가공되지 않은 정보를 애플리케이션 코드에서 사용할 객체로 변환하는 일련의 단계에서 가장 처음으로 사용하는 구조체다.


> **결론**
> 
> 객체는 동작을 공개하고 자료를 숨긴다. 그래서 기존 동작을 변경하지 않으면서 새 객체 타입을 추가하기는 쉬운 반면,
> 기존 객체에 새 동작을 추가하기는 어렵다.
> 자료 구조는 별다른 동작 없이 자료를 노출한다.
> 그래서 기존 자료 구조에 새 동작을 추가하기는 쉬우나, 기존 함수에 새 자료 구조를 추가하기는 어렵다.


### 🎈 오늘 읽은 소감은? 떠오르는 생각을 가볍게 적어보세요.

객체는 동작을 공개하고 자료를 숨긴다. 자료 구조는 별다른 동작 없이 자료를 노출한다.

새로운 자료 타입 추가에 대한 유연성이 필요할 때는 **객체**, 새로운 동작에 대한 유연성이 필요하면 **자료 구조**와 **절차적인 코드**를 사용하자.

굳이 OOP에 집착할 필요 없이 그때 그때 상황에 맞는 방법을 선택하면 된다.

### 🎈 궁금한 내용이나, 잘 이해되지 않는 내용이 있다면 적어보세요.

책의 예시는 Java여서, Javascript 환경에서 객체 지향 프로그래밍에 대해 정리해 보려고 한다.

Javascript에서 정보 은닉을 구현하는 방법은 여러 가지가 있다. 주로 클로저(Closure)나 프로토타입을 활용하여 구현된다.
예를 들어, 클로저를 사용하여 private 멤버를 정의하고 public 메서드를 통해 접근할 수 있도록 하는 방법이다.
ES6부터 도입된 클래스(class) 문법을 활용하여 정보 은닉을 구현할 수도 있다.

```javascript
function Counter() {
  // private 변수
  let count = 0;
  
  // public 메서드
  this.increment = function() {
    count++;
  }
  
  this.decrement = function() {
    count--;
  }
  
  this.getCount = function() {
    return count;
  }
}

// Counter 객체 생성
let counter = new Counter();

// 외부에서는 getCount 메서드를 통해서만 count에 접근할 수 있음
console.log(counter.getCount());  // 출력: 0

counter.increment();
counter.increment();

console.log(counter.getCount());  // 출력: 2
```

이 예시에서는 **count** 변수를 클로저 내부에 선언하여 외부에서 접근할 수 없도록 만들었다.
대신에 `increment`, `decrement`, `getCount` 메서드를 통해서만 **count** 변수에 접근할 수 있다.
이를 통해 정보 은닉이 구현되었다.
