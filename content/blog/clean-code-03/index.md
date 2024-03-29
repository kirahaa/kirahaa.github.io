---
title: 노개북 - 클린코드 Assignment 03
date: "2024-01-28T22:12:03.284Z"
description: "노마드코더 개발자북클럽 클린코드 세번째 과제입니다."
category: "노개북"
tags:
  - "노개북"
  - "노마드코더"
  - "개발자북클럽"
  - "cleancode"
---


> 📌 **1주차 - Assignment #03**
> #### 📚 TIL (2024.01.28) - 2장. 의미있는 이름

### 책에서 기억하고 싶은 내용을 써보세요.

#### 이름을 잘 짓는 간단한 규칙

##### 의도를 분명히 밝혀라
좋은 이름을 지으려면 시간이 걸리지만 좋은 이름으로 절약하는 시간이 훨씬 더 많다.
변수나 함수 그리고 클래스 이름은 다음과 같은 굵직한 질문에 모두 답해야 한다.
변수의 존재 이유는? 수행 기능은? 사용 방법은? 따로 주석이 필요하다면 의도를 분명히 드러내지 못했다는 말이다.

##### 그릇된 정보를 피하라
그릇된 단서는 코드 의미를 흐린다.
예를 들어 hp, aix, sco는 변수 이름으로 적합하지 않다.<br/>
여러 계정을 그룹으로 묶을 때, 실제 List가 아니라면, accountList라 명명하지 않는다.
accountGroup, bunchOfAccounts, 아니면 단순히 Accounts라 명명한다.<br/>
서로 흡사한 이름을 사용하지 않도록 주의한다.
XYZControllerForEfficientHandlingOfStrings, XYZControllerForEfficientStorageOfStrings라는 이름을 사용한다면?
일관성이 떨어지는 표기법은 그릇된 정보다.

##### 의미있게 구분하라
불용어(noise word, stop word): 분석에 큰 의미가 없는 단어 <br/>
ex) the, a, an, is, I, my 등과 같이 문장을 구성하는 필수 요소지만 문맥적으로 큰 의미가 없는 단어

연속된 숫자를 덧붙이거나 불용어를 추가하는 방식은 적절하지 못하다.<br/>
Product라는 클래스가 있다고 가정할 때, 다른 클래스를 ProductInfo 혹은 ProductData라 부른다면 개념을 구분하지 않은 채 이름만 달리한 경우다.
그렇다고 a나 the와 같은 접두어를 사용하지 말라는 소리가 아니다. 의미가 분명히 다르다면 사용해도 무방하다.

불용어는 중복이다. moneyAmount는 money와 구분이 안 된다.<br/>
customerInfo는 customer와, accountData는 account와, theMessage는 message와 구분이 안된다. 
읽는 사람이 차이를 알도록 이름을 지어라.

##### 발음하기 쉬운 이름을 사용하라

발음하기 어려운 이름은 토론하기도 어렵다.

##### 검색하기 쉬운 이름을 사용하라

상수나 영어에서 많이 쓰이는 문자를 변수 이름에 사용할 경우 검색이 어렵다.
이름 길이는 범위 크기에 비례해야 한다. 변수나 상수를 코드 여러 곳에서 사용한다면 검색하기 쉬운 이름이 바람직하다.

##### 인코딩을 피하라

유형이나 범위 정보까지 인코딩에 넣으면 그만큼 이름을 해독하기 어려워진다.
인코딩한 이름은 거의가 발음하기 어려우며 오타가 생기기도 쉽다.

##### 자신의 기억력을 자랑하지 마라

프로그래머들은 일반적으로 똑똑하기에 자신의 정신적 능력을 과시하고 싶어한다.
똑똑한 프로그래머와 전문가 프로그래머 사이에서 나타나는 차이점 하나만 들자면, 전문가 프로그래머는 **명료함이 최고**라는 사실이다.

##### 클래스 이름
클래스 이름과 객체 이름은 명사나 명자구가 적합하다.
Customer, WikiPage, Account, AddressParser 등이 좋은 예다.

##### 메서드 이름
메서드 이름은 동사나 동사구가 적합하다. postPayment, deletePage, save 등이 좋은 예다.

##### 기발한 이름은 피하라

특정문화에서만 사용하는 농담은 피하는 편이 좋다. 재미난 이름보다 명료한 이름을 선택하라.

##### 한 개념에 한 단어를 사용하라

추상적인 개념 하나에 단어 하나를 선택해 이를 고수한다.
일관성 있는 어휘는 코드를 사용할 프로그래머가 반갑게 여길 선물이다.

##### 말장난을 하지 마라
한 단어를 두 가지 목적으로 사용하지 마라. 다른 개념에 같은 단어를 사용한다면 그것은 말장난에 불과하다.

##### 해법 영역에서 가져온 이름을 사용하라
모든 이름을 문제 영역(domain)에서 가져오는 정책은 현명하지 못하다.<br/>
프로그래머들에게 익숙한 기술 개념은 아주 많다. 기술 개념에는 기술 이름이 가장 적합한 선택이다.

##### 문제 영역에서 가져온 이름을 사용하라
적절한 '프로그래머 용어'가 없다면 문제 영역에서 이름을 가져온다.
우수한 프로그래머와 설계자라면 해법 영역과 문제 영역을 구분할 줄 알아야 한다.

##### 의미 있는 맥락을 추가하라

예를 들어, firstName, lastName, street, houseNumber, city, state, zipcode라는 변수가 있다.
변수를 훑어보면 주소라는 사실을 금방 알아차릴 수 있다.
하지만 어느 메서드가 state라는 변수 하나만 사용한다면? 변수 state가 주소 일부라는 사실을 금방 알아챌까?

addr라는 접두어를 추가해 addrFirstName, addrLastName, addrState라 쓰면 맥락이 좀 더 분명해진다.

##### 불필요한 맥락을 없애라
'고급 휘발유 충전소(Gas Station Deluxe)'라는 애플리케이션을 짠다고 가정하자.
모든 클래스 이름을 GSD로 시작하겠다는 생각은 전혀 바람직하지 못하다. 
일반적으로 짧은 이름이 긴 이름보다 좋다. 단, 의미가 분명한 경우에 한해서다. 이름에 불필요한 맥락을 추가하지 않도록 주의한다.



### 오늘 읽은 소감은? 떠오르는 생각을 가볍게 적어보세요.

이름을 잘 짓는 방법에 이렇게나 많은 항목이 존재하는 지 몰랐다.<br/>
특히 ProductInfo 혹은 ProductData 같은 변수 이름을 많이 사용했던 것 같은데, 나한테 얘기하는 것 같아 찔렸다ㅎㅎ

그럼에도 불구하고 이름 짓는 것은 가장 어렵다. 그래도 이름 잘 짓는 습관을 잘 들여놔야 겠다!

### 궁금한 내용이나, 잘 이해되지 않는 내용이 있다면 적어보세요.

문제 영역(domain)이라는 용어를 처음 알게 됐다.

> 사전적 의미<br/>
> **domain** : 영역, 범위
> 
> 사용자가 사용하는 것, 소프트웨어로 해결하고자 하는 문제 영역 (=비즈니스 영역)

###### 애매모호한 코드
```
public enum OrderState {
    STEP1, STEP2, STEP3, STEP4, STEP5, STEP6
}
```

###### 도메인 용어를 사용한 코드
```
public enum OrderState {
    PAYMENT_WAITING, PREPARING, SHIPPED, DELIVERING, DELIVERY_COMPLETED, CANCELED
}
```

=> 코드의 가독성을 높여서 코드를 분석하고 이해하는데 시간을 줄여준다.

전문가, 관계자, 개발자가 도메인과 관련된 공통의 언어를 만들고 이를 대화, 문서, 도메인 모델, 코드, 테스트 등 모든 곳에서 같은 용어를 사용한다.
이렇게 하면 소통 과정에서 발생하는 용어의 모호함을 줄일 수 있고 개발자는 도메인과 코드 사이에서 불필요한 해석 과정을 줄일 수 있다.
