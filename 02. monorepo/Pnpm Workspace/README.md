# Mono Repo with "Pnpm Workspace"

모노레포(Monorepo)란 버전 관리 시스템에서 두 개 이상의 프로젝트 코드가 동일한 저장소에 저장되는 소프트웨어 개발 전략이다. pnpm workspace를 이용하여 이러한 모노레포 방식을 구축할 수가 있다.

## 1. pnpm 프로젝트 생성

pnpm을 설치하지 않았다면 이를 설치한다.

```bash
npm install -g pnpm
```

pnpm을 통해 프로젝트를 초기화하면 `package.json` 이 생성된다.

```bash
pnpm init
```

우리는 모노레포를 생성할 것이므로 이에 맞게 `package.json` 을 수정해준다.

```json
{
	...
	"workspaces":["projects/*"],
	"packageManager": "pnpm@7.27.1",
  "devDependencies": {
    "pnpm": "^7.27.1"
  }
}
```

`pnpm-workspace.yaml` 파일을 새로 생성한 후 다음과 같이 선언해준다.

```yaml
packages:
	- 'projects/*'
```

이는 projects 디렉토리 하단에 있는 것들이 모노레포의 독립적인 프로젝트가 됨을 의미한다.

## 2. projects 구축

`projects` 폴더 내에 `pc-web` 와 `mobile-web` 이라는 각각 pc 버전과 mobile 버전의 간단한 리액트 웹 애플리케이션을 만드는 프로젝트를 생성하고, 두 프로젝트가 공유하는 코드를 담을 `common` 폴더를 만들어보자.

먼저 `pc-web` 과 `mobile-web` 프로젝트를 구축한다. vite를 이용하여 리액트 앱을 빠르게 설치해보자.

```bash
pnpm vite create pc-web --template react-ts
pnpm vite create mobile-web --template react-ts
```

`common` 폴더에서 pnpm init 을 통해 `package.json` 을 생성한다.

<br />

이후 `common` 폴더에 `constants/color.ts` 생성하여 두 프로젝트에서 공통으로 사용할 색상 변수를 만든다. 이를 마치 자바스크립트 패키지에서 불러오듯 사용하기 위해 `common/src/index.ts` 에서 export 해준다.

```js
// constants.ts
export { COLORS } from './color';
```

```js
// src/index.ts
export * from './constants';
```

`pc-web` 의 `package.json` 에서 `common`에 대한 dependency를 정의해준다.

```js
"dependencies": {
  "@pnpm-monorepo/common": "1.0.0",
},
```

`mobile-web` 도 마찬가지로 dependency를 정의해준다.

<br />

수정을 반영하기 위해 `pnpm install` 을 실행해주면 common 폴더에 정의된 색상 변수들을 pc-web, mobile-web 에서 사용할 수 있다.

```jsx
import { COLORS } from '@pnpm-monorepo/common';
...
<h1 style={{ color: COLORS.primary }}>this is pc-web</h1>
```

<br />

## 3. 프로젝트 실행

프로젝트의 package.json 내 특정 스크립트를 한번에 실행하고 싶다면 `--stream -r` 옵션을 사용하면 된다.

```
pnpm --stream -r start
```

<img width="604" alt="스크린샷 2023-02-23 13 19 44" src="https://user-images.githubusercontent.com/67703882/220820581-c02e7365-3617-4b91-a36c-62a99fde2b20.png">

특정 프로젝트의 package.json 내 스크립트만 실행하고 싶다면 `--filter` 옵션을 사용하면 된다.

```bash
pnpm --filter pc-web run start
```

<img width="728" alt="스크린샷 2023-02-23 13 19 54" src="https://user-images.githubusercontent.com/67703882/220820596-2b4dc073-1b78-445d-9621-087f1f3106e2.png">

혹은 특정 프로젝트에만 패키지를 추가해주고 싶을 때에도 `--filter` 옵션을 사용할 수 있다.

```bash
pnpm --filter pc-web add <package-name>
```

<br />

루트 폴더에서 스크립트를 바로 실행하기 위해 다음과 같이 package.json을 지정해줄 수도 있다.

```json
"scripts": {
  "start": "pnpm --stream -r start",
  "start:pc": "pnpm --filter pc-web start",
  "start:mobile": "pnpm --filter mobile-web start"
},
```

## 참고 자료

- [pnpm과 함께하는 Frontend 모노레포 세팅](https://jasonkang14.github.io/react/monorepo-with-pnpm)

- [우리는 하나다! 모노레포 with pnpm](https://woowacon.com/ko/2022/detailVideo/26)

- https://pnpm.io/workspaces

- https://blog.logrocket.com/managing-full-stack-monorepo-pnpm/#sharing-types-typescript
