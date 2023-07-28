---
title: NestJS를 배워보자
date: "2023-07-20T13:57:56.284Z"
description: "NestJS는 자바스크립트나 타입스크립트로 서버 애플리케이션을 개발할 수 있는 백엔드 웹 프레임워크(Web framework)입니다."
category: "backend"
tags:
  - "NestJS"
  - "Express"
---

## NestJS란?

[NestJS](https://nestjs.com/)는 Node.js를 기반으로 한 서버 어플리케이션을 개발하기 위한 프레임워크 입니다.

Node.js의 표준 웹서버 프레임워크로 불리는 Express 대신 왜 NestJS를 선택해야 할까요?

> 최근 몇 년 동안 Node.js 덕분에 자바스크립트는 백엔드, 프론트엔드 애플리케이션 모두의 웹 공통 언어가 되었습니다.<br/>
> 이로 인해 Angular, React, Vue가 나오게 되었으며, 해당 프로젝트를 통해 생산성을 향상하고 빠르게 만들 수 있으며, 테스트 가능하고 확장성이 있는 프론트엔드 애플리케이션을 만들 수 있게 되었습니다.
> 그러나 서버 측 Node.js에서는 뛰어난 라이브러리, 툴이 존재하지만 아키텍처, 즉 프로젝트 구조에 있어서 주요 문제를 효과적으로 해결하는 것은 없었습니다.<br/>
> 
> Nest는 개발자와 팀이 테스트 가능하고 확장이 가능하며, 느슨한 결합과 유지보수성이 뛰어난 애플리케이션을 만들 수 있도록 아키텍처를 제공합니다.

즉, **NestJS는 서버 측 애플리케이션 개발에 있어 아키텍처의 문제를 해결하기 위해 등장**한 것입니다.

기존의 Express는 사용하기도 쉽고 성능도 뛰어나지만 아키텍처에 관한 정의나 기능을 제공해주고 있진 않습니다.<br/>
실제로 팀 또는 사람마다 아키텍처가 다르면 이를 이해하기 위한 비용 또는 개발 전에 아키텍처를 선정하는 커뮤니케이션 비용이 증가합니다.<br/>

NestJS는 아키텍처에 대한 정의를 제공하기 때문에 동일한 아키텍처에서 다른 개발자가 작성한 코드를 쉽게 이해할 수 있다는 장점이 있습니다.

그럼 NestJS를 설치해보면서 같이 시작해 봅시다! 🤗

## NestJS CLI 설치

NestJS는 개발자가 좀 더 편리하게 NestJS 프로젝트를 개발하고 설정할 수 있도록 강력한 CLI(명령줄 인터페이스) 도구를 제공하고 있습니다.

터미널을 열고 다음 명령어를 실행하여 NestJS CLI 도구를 전역(global)에 설치해 봅시다!

```shell
$ npm i -g @nestjs/cli
added 251 packages, and audited 252 packages in 11s

41 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

이제 터미널에서 `nest`라는 명령어를 사용할 수 있습니다.
단순히 `nest` 명령어를 실행해보면 간단한 설명서를 확인할 수 있습니다.

```shell
$ nest
nest
Usage: nest <command> [options]

Options:
  -v, --version                                   Output the current version.
  -h, --help                                      Output usage information.

Commands:
  new|n [options] [name]                          Generate Nest application.
  build [options] [app]                           Build Nest application.
  start [options] [app]                           Run Nest application.
  info|i                                          Display Nest project details.
  add [options] <library>                         Adds support for an external library to your project.
  generate|g [options] <schematic> [name] [path]  Generate a Nest element.
    Schematics available on @nestjs/schematics collection:
      ┌───────────────┬─────────────┬──────────────────────────────────────────────┐
      │ name          │ alias       │ description                                  │
      │ application   │ application │ Generate a new application workspace         │
      │ class         │ cl          │ Generate a new class                         │
      │ configuration │ config      │ Generate a CLI configuration file            │
      │ controller    │ co          │ Generate a controller declaration            │
      │ decorator     │ d           │ Generate a custom decorator                  │
      │ filter        │ f           │ Generate a filter declaration                │
      │ gateway       │ ga          │ Generate a gateway declaration               │
      │ guard         │ gu          │ Generate a guard declaration                 │
      │ interceptor   │ itc         │ Generate an interceptor declaration          │
      │ interface     │ itf         │ Generate an interface                        │
      │ middleware    │ mi          │ Generate a middleware declaration            │
      │ module        │ mo          │ Generate a module declaration                │
      │ pipe          │ pi          │ Generate a pipe declaration                  │
      │ provider      │ pr          │ Generate a provider declaration              │
      │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
      │ service       │ s           │ Generate a service declaration               │
      │ library       │ lib         │ Generate a new library within a monorepo     │
      │ sub-app       │ app         │ Generate a new application within a monorepo │
      │ resource      │ res         │ Generate a new CRUD resource                 │
      └───────────────┴─────────────┴──────────────────────────────────────────────┘
```

## NestJS 프로젝트 구성

다음으로 NestJS CLI를 이용해서 새로운 NestJS 프로젝트를 구성해 봅시다!

`nest new` 명령어 뒤에 프로젝트 명을 작성하면 해당 이름의 디렉토리가 생기고 그 안에 NestJS 프로젝트가 자동으로 구성이 될 것입니다.<br/>
저는 `nest-app`을 프로젝트 이름으로 사용하였습니다.

```shell
$ nest new nest-app
⚡  We will scaffold your app in a few seconds..

✔ Installation in progress... ☕

🚀  Successfully created project our-nestjs
👉  Get started with the following commands:

$ cd nest-app
$ npm run start
```

`npm run start`로 NestJS 애플리케이션을 구동한 후, `http://localhost:3000`에 접속해보면 Hello World!가 응답되는 것을 확인할 수 있을 것입니다.

## main.ts

자동으로 생성된 파일 중에서 제일 먼저 살펴볼 파일은 `src` 디렉토리 안에 있는 `main.ts` 파일입니다.<br/>
이 파일은 NestJS 애플리케이션이 시작되는 진입 지점(entry point)이 되는데요. 파일을 열어보면 매우 짧은 코드가 들어있습니다.

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

코드의 마지막 줄에는 `bootstrap()`이라는 함수를 호출하고 있는데요. 
`bootstrap()` 함수 안에서는 `app.module` 파일로부터 `AppModule`을 불러와서 `NestFactory`가 애플리케이션 객체를 생성하고 3000 포트로 HTTP 요청을 받고 있습니다.

## 모듈(Module)

`main.ts` 파일에서 불러오고 있는 `app.module.ts` 파일을 열어보면 `AppModule` 클래스를 찾을 수 있습니다.

```typescript
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

이 클래스 위에는 `@Module()`이라는 데코리이터(decorator)가 호출되고 있습니다.

NestJS에서 데코레이터는 일반적으로 클래스나 메서드에 어떤 정보를 추가해줄 때 활용이 됩니다.<br/>
`@Module()` 데코레이터는 `imports`, `controllers`, `providers` 속성으로 이루어진 객체를 인자로 받는데요.
`controllers` 속성에는 HTTP 요청을 받아서 응답을 보내는 컨트롤러 클래스를 나열해줄 수 있고, `providers` 속성에는 컨트롤러가 사용하는
다양한 일반 클래스(주로 서비스 클래스)를 나열해줄 수 있습니다. 여기서 비어있는 `imports` 속성에는 해당 모듈이 의존하고 있는 다른 모듈을 나열해줄 수 있습니다.

모듈(module)은 NestJS에 매우 중요한 개념이라서 잘 이해하고 있어야 하는데요. 하나의 NestJS 애플리케이션은 보통 여러 개의 모듈로 이루어지는데 
기능 단위로 애플리케이션을 쪼개 놓은 단위라고 생각할 수 있습니다.

여기서 중요한 것은 모듈은 서로 의존할 수 있다는 것인데요. 바로 `Module()` 데코리에터에 인자로 넘기는 객체의 `imports` 속성을 통해서 이 의존 관계를 명시하도록 되었습니다.

`nestjs new` 명령어로 NestJS 프로젝트를 생성하면 기본적으로 최상위 모듈인 `AppModule` 하나 밖에 없지만, 프로젝트 규모가 점점 커지게 되면 
다른 모듈을 작성한 후 `AppModule`이 불러올 수 있도록 `@Module()` 데코레이터를 호출할 때 `imports` 속성을 사용하게 됩니다.

정리하면 NestJS는 일종의 IoC(Inversion of Control) 컨테이너의 역할을 하면서 여러 모듈을 DI(의존성 주입)을 통해서 엮어준다고 보시면 됩니다.
어떻게 엮어야 하는지는 개발자가 각 모듈에 `@Module()` 데코레이터의 `imports` 속성으로 NestJS에 알려줘야 하고요.

## 컨트롤러(Controller)

다음으로 NestJS에서 하나의 축을 담당하고 있는 컨트롤러에 대해서 알아보겠습니다.

컨트롤러는 HTTP 요청을 받아서 처리하고 응답을 해주는 역할을 담당하고 있는 클래스입니다.<br/>
`src` 디렉토리 안에 있는 `app.controller.ts` 파일을 열어서 컨트롤러가 어떻게 생겼는지 확인해 보겠습니다.

```typescript
// src/app.controller.ts

import {Controller, Get} from "@nestjs/common";
import {AppServie} from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

위와 같이 클래스 위에다가 `@Controller()` 데코레이터를 호출해주면 NestJS가 해당 클래스는 컨트롤러로 인식을 하게 되는데요.
클래스 내의 각 메서드에는 `@Get()`, `@Post()`, `@Delete()`와 같은 HTTP 방식(method)에 해당하는 데코레이터를 붙여주게 됩니다.

또한 이러한 데코레이터들은 URL 경로를 나타내는 문자열을 인자로 받는데요. NestJS는 데코레이터로 명시된 HTTP 방식과 URL 경로를 기준으로 부합하는 클래스의 메서드를 호출해줍니다.

예를 들어, `@Controller("aaa")`가 붙어있는 클래스의 `@Post("bbb")`가 붙어있는 메서드가 있었다면, POST 방식으로 `http://localhost:3000/aaa/bbb` 에 요청했을 때 해당 메서드가 호출되었을 것입니다.

이를 통해 아까 전에 위에서 `http://localhost:3000`에 요청했을 때, `AppController` 클래스의 `getHello()` 함수가 이를 받아서 `Hello World!`라는 응답을 해줬다는 것을 알 수 있습니다.

## 서비스(Service)

마지막으로 살펴볼 서비스 클래스는 일반적으로 비즈니스 로직을 수행하는 역할을 담당합니다.

`src` 디렉토리 안에 있는 `app.service.ts`를 열어보면 `AppController` 클래스가 사용하고 있던 `AppService` 클래스를 확인할 수 있는데요.

```typescript
// src/app.service.ts

import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!"
  }
}
```

이 클래스 위에는 `@Injectable()` 데코레이터가 사용되고 있죠? `@Injectable()` 데코레이터가 붙어있는 클래스는 NestJS가 인스턴스를 생성하여 다른 클래스에 생성자를 통해서 주입을 해줄 수 있습니다.

`AppModule`에서 `@Module()` 데코레이터를 호출할 때 `providers` 속성에 `AppService` 클래스를 명시해줬었죠? 그렇기 때문에 `AppController` 클래스의 생성자의 인자로 `AppService` 클래스의 인스턴스가 주입이 되었고, `AppController` 클래스의 `getHello` 메서드 내에서 `AppService` 클래스의 `getHello` 메서드를 호출할 수 있었던 것입니다.

이렇게 컨트롤러의 역할과 서비스의 역할을 분리함으로써 좀 더 유지보수가 용이한 애플리케이션을 개발할 수가 있는 것입니다.



