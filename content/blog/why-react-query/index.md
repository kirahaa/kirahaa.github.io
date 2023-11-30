---
title: 리액트 쿼리(React Query)를 사용하는 이유
date: "2023-11-20T13:57:56.284Z"
description: "API 통신 및 비동기 상태 관리를 위한 라이브러리 React-query에 대해 알아봅시다"
category: "react"
tags:
- "react"
- "react-query"
- "library"
- "frontend"
---

> 세줄 요약
> 1. React Query는 React Application에서 서버 상태를 불러오고, 캐싱하며, 지속적으로 동기화하고 업데이트하는 작업을 도와주는 라이브러리입니다.
> 2. 복잡하고 장황한 코드가 필요한 다른 데이터 불러오기 방식과 달리 React Component 내부에서 간단하고 직관적으로 API를 사용할 수 있습니다.
> 3. 더 나아가 React Query에서 제공하는 캐싱, Window Focus Refetching 등 다양한 기능을 활용하여 API 요청과 관련된 번잡한 작업 없이 "핵심 로직"에 집중할 수 있습니다.


### React Query란?


React Query는 React Application에서 서버의 상태를 불러오고, 캐싱하며, **지속적으로 동기화**하고 업데이트 하는 작업을 도와주는 라이브러리입니다.
React Query는 우리에게 친숙한 Hook을 사용하여 React Component 내부에서 자연스럽게 서버(또는 비동기적인 요청이 필요한 Source)의 데이터를 사용할 수 있는 방법을 제안합니다.

다음은 리액트 쿼리를 적용하기 전과 후의 API 통신 방법입니다.

```ts
// React query 사용 전
import {useEffect, useState} from "react";

const [coins, setCoins] = useState<ICoin[]>([])
const [loading, setLoading] = useState(true);

useEffect(() => {
  (async() => {
    const response = await fetch("https://api.coinpaprika.com/v1/coins")
    const json = await response.json()
    setCoins(json)
    setLoading(false)
  })()
}, [])
```

```ts
// React query 사용 후
// api.ts
export const fetchCoins = async () => {
  const response = await fetch("https://api.coinpaprika.com/v1/coins")
  return await response.json()
}

// Coins.ts
const {isLoading, data} = useQuery<ICoin[]>({ queryKey: ['allCoins'], queryFn: fetchCoins })

```

길고 거창한 설명 없이도 해당 코드를 보면 React Query를 사용한 API 요청과 상태 관리가 얼마나 쉽고 자연스러운지 알 수 있습니다.

### React Query의 Query 요청

```ts
// 가장 기본적인 형태의 React Query useQuery Hook 사용 예시
const { data } = useQuery(
  queryKey,  // 이 Query 요청에 대한 응답 데이터를 캐시할 때 사용할 Unique Key (required)
  fetchFn,   // 이 Query 요청을 수행하기 위한 Promise를 Return하는 함수 (required)
  options,   // useQuery에서 사용되는 Option 객체 (optional)
) 
```

`useQuery` Hook으로 수행되는 Query 요청은 HTTP METHOD **GET** 요청과 같이 서버에 저장되어 있는 "상태"를 불러와 사용할 때 사용합니다.

> React Query는 다양한 UI에 유연하게 적용할 수 있도록 `useQueries`, `useInfiniteQuery` 같은 Hook들도 제공합니다.

React Query의 `useQuery` Hook은 요청마다(API마다) 구분되는 **Unique Key (aka. Query Key)**를 필요로 합니다.
React Query는 이 Unique Key로 서버 상태 (aka. API Response)를 로컬에 캐시하고 관리합니다.

```ts
const Coins = () => {
  const {isLoading, data} = useQuery<ICoin[]>({ queryKey : ['allCoins'], queryFn: fetchCoins })
  // 'allCoins'를 Key로 사용하여 데이터 캐싱
  // 다른 컴포넌트에서 'allCoins'를 QueryKey로 사용한 useQuery Hook이 있다면 캐시된 데이터를 우선 사용합니다.

  // FYI, `data === undefined`를 평가하여 로딩 상태를 처리하는 것이 더 좋습니다.
  // React Query는 내부적으로 stale-while-revalidate 캐싱 전략을 사용하고 있기 때문입니다.
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? <Loader>Loading</Loader> : (
        <CoinsList>
          {data?.slice(0, 100).map(coin => <Coin key={coin.id}>
          <Link to={coin.id} state={coin}>
          <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt={coin.name}/>
            {coin.name} &rarr;
          </Link>
        </Coin>)}
      </CoinsList>)} 
    </Container>
  )
}
```

> **stale-while-revalidate**란?<br/><br/>
> `stale-while-revalidate`는 개발자가 캐싱된 콘텐츠를 즉시 로드하는 즉시성과 객싱된 최신 콘텐츠가 향후에 사용되도록 보장하는 최신성 간의 균형을 유지하는데 도움을 주는 HTTP Cache-Control 확장 디렉티브입니다.
>
> 브라우저는 Cache-Control의 max-age를 기준으로 캐싱된 컨텐츠의 최신 상태 여부를 판단하게 되는데, swr은 캐싱된 낡은 컨텐츠에 대한 확장된 지시를 표현합니다.
> react-query를 사용함으로써 swr은 낡은 캐시로부터 빠르게 컨텐츠를 반환하고, 백그라운드에서 요청을 통해 캐싱된 컨텐츠의 재검증을 진행하여 캐싱 레이어에서 최신화된 대이터를 보장할 수 있도록 swr 캐싱 전략을 취하고 있습니다.


### React Query를 쓰면 이런 게 편해진다

#### - Boilerplate 코드의 감소

Redux를 사용할 경우 Redux의 기본 원칙 준수를 위한 다양한 Boilerplate 코드들이 필요합니다.
더 나아가 다음 예시 코드를 보면 API 상태 관리를 위해 하나의 API 요청을 3가지 Action을 사용해 처리하고 있고, 
후에 기능이 추가되어 API 개수가 많아진다면 이런 상용구적인 코드도 함께 늘어나게 됩니다.

> API 상태를 Redux를 사용하여 관리하는 부분의 코드

```ts
// features/todos/todos.slice.ts
// API 상태를 관리하기 위한 Redux State
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoItem } from 'types/todo';

export interface TodoListState {
  data?: TodoItem[];
  isLoading: boolean;
  error?: Error;
}

const initialState: TodoListState = {
  data: undefined,
  isLoading: false,
  error: undefined,
}

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    requestFetchTodos: (state) => {
      state.isLoading = true;
    },
    successFetchTodos: (state, action: PayloadAction<TodoItem[]>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = undefined;
    },
    errorFetchTodos: (state, action: PayloadAction<string>) => {
      state.data = undefined;
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { requestFetchTodos, successFetchTodos, errorFetchTodos } = todoListSlice.actions;

export default todoListSlice.reducer;
```
---

> React Query로 API 상태를 관리하는 부분의 코드

```ts
// quries/useTodosQuery.ts
// API 상태를 불러오기 위한 React Query Custom Hook
import axios from 'axios';
import { useQuery } from 'react-query';
import { TodoItem } from 'types/todo';

// useQuery에서 사용할 UniqueKey를 상수로 선언하고 export로 외부에 노출합니다.
// 상수로 UniqueKey를 관리할 경우 다른 Component (or Custom Hook)에서 쉽게 참조가 가능합니다.
export const QUERY_KEY = '/todos';

// useQuery에서 사용할 `서버의 상태를 불러오는데 사용할 Promise를 반환하는 함수`
const fetcher = () => axios.get<TodoItem[]>('/todos').then(({ data }) => data);

const useTodosQuery = () => {
  return useQuery(QUERY_KEY, fetcher);
};

export default useTodosQuery;
```

단순히 비교해봐도 **Redux를 사용한 비동기 데이터 관리** 코드와 **React Query를 사용한 비동기 데이터 관리** 코드의 분량이 크게 차이남을 알 수 있습니다.
코드의 분량이 적어졌다는 것은 개발자에게 불필요한 작업이 필요 없어짐을 뜻하기도 하지만, 소스코드의 복잡도를 낮추어 유지보수의 용이성을 높이고 작업 간에 발생할 수 있는 사이드 이펙트나 휴먼 에러를 사전에 더 
잘 막을 수 있다는 의미도 갖게 될 것입니다.

#### - API 요청 수행을 위한 규격화된 방식 제공

React Query는 `React에서 비동기 데이터를 관리하기 위해 만들어진 라이브러리`입니다. React Query는 API 요청 및 상태 관리를
위해 (상당히 잘 만들어진!) 규격화된 방식을 제공합니다.

```ts
interface ApiState {
  data?: Data;
  isLoading: boolean;
  error?: Error;
}

interface ApiState {
  data?: Data;
  status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
  error?: Error;
}
```

> Redux로 API 상태를 관리하는 경우 프로젝트 환경에 따른 설계와 구현이 요구되었습니다.

React Query는 API 상태와 관련된 다양한 데이터를 제공하여 복잡한 구현과 설계 없이도 개발자가 효율적으로 화면을 구성할 수 있게끔 도와줍니다.

```ts
const {
  data,
  dataUpdatedAt,
  error,
  errorUpdatedAt,
  failureCount,
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isIdle,
  isLoading,
  isLoadingError,
  isPlaceholderData,
  isPreviousData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  refetch,
  remove,
  status,
} = useQuery(queryKey, queryFn);
```

> React Query는 다양한 형태의 데이터를 제공하여 복잡한 작업 없이도 효율적으로 화면을 구성할 수 있다. (참고: [React Query 공식 홈페이지](https://react-query.tanstack.com/reference/useQuery))

#### - 사용자 경험 향상을 위한 기능 제공

이전에는 비동기 데이터 관리를 위해 직접 구현하고 사용했던 기능들을, React Query는 자체적으로 제공하는 다양한 기능이 있어 이를 사용자 경험 향상에 손쉽게 사용할 수 있습니다.

```ts
// ex)
// quires/useTodosQuery.ts
// API 상태를 불러오기 위한 React Query Custom Hook

const useTodosQuery = () => {
  return uesQuery(QUERY_KEY, fetcher, { refetchOnWindowFoucs: true });
}

export default useTodosQuery;
```

React Query를 사용할 경우 단순한 옵션 부여만으로 **Window Focus 이벤트 발생 시 서버 상태 동기화** 시나리오를 달성할 수 있습니다.
다루는 API가 많아지고 컴포넌트 구조가 복잡해질수록 이전의 **직접 Event Binding**하는 방식보다 유지보수하기 좋은 코드가 될 것입니다.

React Query와 함께라면 [Refetch on window focus](https://tanstack.com/query/latest/docs/react/guides/window-focus-refetching?from=reactQueryV3&original=https%3A%2F%2Ftanstack.com%2Fquery%2Fv3%2Fdocs%2Fguides%2Fwindow-focus-refetching)외에
[API Caching](https://tanstack.com/query/latest/docs/react/guides/caching?from=reactQueryV3&original=https%3A%2F%2Ftanstack.com%2Fquery%2Fv3%2Fdocs%2Fguides%2Fcaching), [API Retry](https://tanstack.com/query/latest/docs/react/guides/query-retries?from=reactQueryV3&original=https%3A%2F%2Ftanstack.com%2Fquery%2Fv3%2Fdocs%2Fguides%2Fquery-retries), [Optimistic Update](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates?from=reactQueryV3&original=https%3A%2F%2Ftanstack.com%2Fquery%2Fv3%2Fdocs%2Fguides%2Foptimistic-updates), [Persist Caching](https://tanstack.com/query/latest/docs/react/plugins/persistQueryClient?from=reactQueryV3&original=https%3A%2F%2Ftanstack.com%2Fquery%2Fv3%2Fdocs%2Fplugins%2FpersistQueryClient) 등 사용자 경험 향상을 위한 다양한 기법들을 손쉽게 프로젝트에 포함시킬 수 있습니다.

React Query에서 제공하는 이러한 기능들은 우리 개발자들로 하여금 제품과 직접적으로 연관되지 않는 작업에 투입해야 하는 리소스를 경감시켜 더 중요한 비즈니스 로직에 집중할 수 있게끔 도와줍니다.
이러한 환경은 우리가 더 견고한 제품을 만들 수 있는 바탕이 되어주고 있습니다.


### 마치며

React Query를 사용하면, **'불필요한 코드의 감소', '업무와 협업의 효율성을 위한 규격화된 방식 제공', '사용자 경험 향상을 위한 다양한 Built-in 기능'** 이라는 장점들을 정리해 볼 수 있겠네요~<br/>
저도 React Query를 사용하면서 큰 매력을 느끼고 있었는데요!<br/>
이렇게 정리해 보니 더더욱 쓸 이유가 확실해 보입니다!👍

그럼 다음 포스팅에서 또 만나요!~😉

---

#### 참고 링크
- https://tech.kakaopay.com/post/react-query-1/
- https://youthfulhps.dev/web/stale-while-ravalidate/