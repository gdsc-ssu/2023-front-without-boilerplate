# 패키지매니저

## 📌 서론

### 📚 하는 것들

- 메타데이터 처리 및 쓰기 (package.json)
- 스크립트 관리 (사용자 지정 스크립트)
- 보안 검사
- 의존성 관리 (node_modules)
  - NPM에 올라온 노드 모듈들(패키지)들이 있으며, <br />
    해당 패키지들 서로서로 의존관계를 가질 수 있다. <br />
    만약 A패키지와 B패키지 둘 다, <br />
    C패키지에 의존하고 있다면 어떻게 관리해야할까 <br />
    ![depend.png](src/depend.png)

## 📌 NPM

- 가장 기본적인 Node Package Module
- NPM V2 와 V3 가 패키지의 의존성 문제를 해결하는 방법은 달라
  ![npm.png](./src/npm.png)
  - NPM2 에서는 의존 관계에 있는 모듈을 해당 모듈 아래에 둠
    - 이 경우, 동일한 패키지에 대한 여러 중복 폴더가 생겨버릴 수 있음
  - NPM3 에서는 모든 모듈을 Flat 하게 두지만 (호이스팅),<br />
    특정 모듈에서 이미 설치된 모듈과 다른 버전이 필요하면,<br />
    그 모듈 아래에 둠<br />
    ⇒ 해당 방식에서는 “내컴되, 니컴안 “ 현상이 발생할 수 있음 (에러 찾기 어려움)<br />
    ⇒ 모듈을 설치하는 순서에 따라, 의존성 구조가 달라지는 문제가 생김

## 📌 YARN Classic

### 1. 소개 및 특징

2010년 npm 출시 이후, 2016년에 페이스북에서는 또 다른 자원 협상자(Yet Another Resource Negotiator)를 의미하는 Yarn을 발표하였다.

Yarn의 아키텍처 설계는 npm이 수립한 많은 개념과 프로세스를 기반으로 하면서, 당시 npm이 가지고 있던 일관성, 보안 및 성능 문제를 해결하였다.

> [당시 Yarn 발표 게시물](https://engineering.fb.com/2016/10/11/web/yarn-a-new-package-manager-for-javascript/)

<br>

#### 속도

npm은 패키지를 한 번에 하나씩 순차적으로 설치하는 반면, Yarn은 여러 패키지를 동시에 가져오고 설치하는 **작업 병렬화**를 통해 패키지 설치 속도를 최적화하였다.

<br>

#### 보안

기존의 npm은 자동으로 패키지에 포함된 다른 패키지 코드를 실행하여 보안 시스템에 몇가지 취약성이 발생하고 이로 인해 문제가 발생할 수 있었다.

그래서 Yarn은 `yarn.lock` 에 지정된 체크섬을 활용하여 각 패키지의 무결성을 확인하고, `package.json` 내부에 선언되지 않은 패키지가 존재하면 설치를 중단하는 방식을 사용하여 보안성을 높였다.

> 추가적으로 Yarn berry는 package.json에서 명시한 의존성의 바이너리 파일만 실행할 수 있다.

<br>

#### 새로운 개념 도입

Yarn은 DX(개발자 경험), 보안 및 성능에 대한 기준을 높였으며, 이외에도 아래와 같은 개념들을 패키지 매니저에 도입하였다.

- native 모노레포 지원
- cache-aware 설치
- 오프라인 캐싱
- lock files

<br>

#### 프로젝트 구조

`$ yarn` 을 실행하면 `package.json`과 yarn 옵션을 기반으로 아래와 같은 구조로 파일 및 폴더들이 생성된다.

(`yarn.lock`과 `node_modules`는 기본으로 생성되며, 나머지 폴더 및 파일들은 옵셔널하게 생성된다.)

```docker
.
├── .yarn/
│   ├── cache/
│   └── releases/
│       └── yarn-1.22.17.cjs
├── node_modules/
├── .yarnrc
├── package.json
└── yarn.lock
```

<br>

### 2. 의존성을 관리하는 법

npm과 마찬가지로 모든 의존성을 node_modules 폴더에서 flat하게 관리한다.

<br>

### 3. 문제점

#### 레거시

Yarn(Yarn classic)은 2020년부터 유지보수 모드로 전환되었다. 그리고 1.x 버전은 모두 레거시로 간주하고 Yarn classic으로 이름이 바뀌었다. 현재는 Yarn berry에서 개발과 개선이 이루어지고 있다.

<br>

#### 의존성 관리

위에서 말했듯이 Yarn classic은 node_modules 폴더에서 flat하게 패키지를 설치하여 관리한다.

이러한 방식으로 의존성을 관리하면 node_modules 내부에서 패키지(의존성)를 **중복 저장**하게 되고, 이로 인해 불필요한 디스크 공간을 낭비하게 된다.

> Yarn berry에서 pnp방식을 도입하여 의존성 관리 문제를 해결하였다.

<br>



## 📌 PNPM

## 📌 YARN BERRY

## 📌 참고자료

- [패키지-매니저-그것이-궁금하다](https://medium.com/zigbang/%ED%8C%A8%ED%82%A4%EC%A7%80-%EB%A7%A4%EB%8B%88%EC%A0%80-%EA%B7%B8%EA%B2%83%EC%9D%B4-%EA%B6%81%EA%B8%88%ED%95%98%EB%8B%A4-5bacc65fb05d)
- [pnpm-a-manager-what-is-not-flat](https://imch.dev/posts/pnpm-a-manager-what-is-not-flat/)
- [fe-package-mono-with-storybook](https://github.com/itjustbong/fe-package-mono-with-storybook)
- https://doppelmutzi.github.io/packageManagers/
- https://yceffort.kr/2022/05/npm-vs-yarn-vs-pnpm

<hr />
