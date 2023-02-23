# MonoRepo with Yarn Berry
Yarn Berry(yarn v2)를 사용해 MonoRepo 구축 실습을 위한 레포지토리입니다.   

## ✅ MonoRepo with Yarn Berry 구축
우선 MonoRepo를 구축할 폴더 하나를 생성해줍니다.   

### 1️⃣ yarn 설치
yarn을 설치해줍니다.    
(만약 yarn이 설치되어 있다면 본 과정은 생략해도 좋습니다.)   
```cmd
npm install -g yarn
```

### 2️⃣ yarn berry 환경 셋팅
yarn classic(yarn v1)과 yarn berry(yarn v2)는 버전 차이가 많이 나기에,    
yarn berry로 설정해줍니다.   
```cmd
yarn set version berry
```

yarn berry로의 설정이 마무리되었다면,   
하기 명령어를 통해 yarn 2.0 이상의 버전이 설치되었는지 확인합니다.   
(본인의 경우 `yarn@3.4.1`이 설치되었습니다.)   
```cmd
yarn -v
```

알맞게 버전 설치가 완료되었다면 아래 명령어로 프로젝트 설정을 마무리합니다.   
```cmd
yarn init
```
위 명령어 실행 시 `package.json`을 비롯한 `yarn` 설정 파일들이 생성됩니다.   

### 3️⃣ package.json - workspace 셋팅
다음으로 `package.json` 파일에 아래와 같이 작업할 모노레포의 name과 workspace를 추가해줍니다.   
(name은 자유롭게 설정이 가능하며, 본인의 경우 monorepo로 명명하였습니다.)   
```json
{
  "name": "monorepo",
  "private": true,
  "workspaces": {
    "packages": [
      "package/*"
    ]
  },
  "packageManager": "yarn@3.4.1",
}
```
위와 같이 작성을 마친 뒤, `package`폴더를 생성합니다.   
```json
  "workspaces": {
    "packages": [
      "package/*"
    ]
  },
```
위 명령어로 `package` 내부의 모든 폴더는 workspace에 속하도록 설정됩니다.   

### 4️⃣ project 생성
지금부터 생성할 project 코드들은 모두 `package` 폴더 내부에서 관리됩니다.   
따라서 터미널 명령어를 통해 package 폴더로 이동해줍니다.   
```cmd
cd package
```

기호에 맞게 CRA 또는 vite로 프로젝트를 생성해줍니다.   
- create-react-app
```cmd
npx create-react-app front-mono
```
- vite
```cmd
yarn create vite
```
본인의 경우 vite가 빌드 속도가 빠르고 번들러 사이즈가 작은 vite를 선택해 프로젝트를 구축하였습니다.   
(vite 설정 : `front-mono(name)` → `react` → `Typescript` 설정)    

다음으로 `package` 폴더 내부에 `common` 폴더를 생성해줍니다.   
생성이 완료되었다면, 현재 폴더 구조가 다음과 같은지 확인한 뒤 step 5️⃣를 진행합니다.   
```markdown
📦MonoRepo-with-YarnBerry
 ┣ 📂.git
 ┣ 📂.yarn
 ┣ 📂package
 ┃ ┣ 📂common
 ┃ ┗ 📂front-mono
 ┣ 📜.editorconfig
 ┣ 📜.gitignore
 ┣ 📜.yarnrc.yml
 ┣ 📜README.md
 ┣ 📜package.json
 ┗ 📜yarn.lock
```

### 5️⃣ front-mono 프로젝트 서버 구동 확인
step 4️⃣에서 생성한 프로젝트 파일이 정상적으로 실행되는지 확인합니다.   
생성한 폴더로 이동해 `yarn`(yarn install)과 `yarn dev`(vite 개발 서버 실행) 명령어를 입력합니다.   
```cmd
$ cd front-mono
$ yarn && yarn dev
```
정상적으로 프로젝트가 실행된다면 모노레포 구축을 위한 프로젝트 서버 셋팅이 완료된 것입니다.   

### ▶️ TypeScript 에러 수정
`package/front-mono/src/App.tsx`에 접근해보면,   
`typescript`가 적용되지 않아 에러가 발생한 것을 확인하실 수 있습니다.   

본 문제는 패키지매니저 yarn berry에서와 npm에서 모듈을 불러오는 방식의 차이가 있기에 발생하는 오류입니다.   

따라서 typescript와 eslint, prettier를 설치해준 뒤,   
vscode를 사용 중인 경우에 한해 sdk를 설치해줍니다.   

터미널에서 루트 디렉토리로 이동한 후, 아래와 같은 명령어를 **순서에 맞게** 입력해줍니다.    
```cmd
yarn add -D typescript prettier eslint
yarn dlx @yarnpkg/sdks vscode
```
※ sdk부터 설치할 경우 문제가 발생할 가능성이 높습니다.    
※ 반드시 typescript와 같이 1️⃣ 문법에 영향을 주는 package를 먼저 설치한 뒤 2️⃣ sdk를 설치해줍니다.     

### ▶️ Typescript SDK 설정
`command + shift + p`를 통해 typescript 버전을 선택하는 창을 열어,   
`Use Workspace Version(sdk)`을 선택합니다.   

<img width="720" alt="image" src="https://user-images.githubusercontent.com/66112716/220808539-d59c4845-7b93-4624-8272-97bbdfe53d69.png">

### 6️⃣ project 간 설정 공유 (common ↔️ front-mono)
monorepo를 통해 프로젝트 간 코드를 공유할 수 있는 동시에,    
step 5️⃣ 에서 진행하였던 개발 환경 설정 내용 역시 공유할 수 있습니다.   

최상위 폴더(본인의 경우 `MonoRepo-with-YarnBerry`) 바로 아래에 `tsconfig.base.json`파일을 생성해줍니다.   
다음 `tsconfig.base.json` 파일의 내용을 아래와 같이 작성해줍니다.   
```json
{
    "compilerOptions": {
        "target": "ESNext",
        "useDefineForClassFields": true,
        "lib": ["DOM", "DOM.Iterable", "ESNext"],
        "allowJs": false,
        "skipLibCheck": false,
        "esModuleInterop": false,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "module": "ESNext",
        "moduleResolution": "Node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react"
    },
}
```

다음으로 `package/front-mono` 폴더 내에 위치하는 `tsconfig.json`의 내용을 아래와 같이 수정해줍니다.   
```json
{
  "compilerOptions": {
    ...
  },
  "include": ["./src"],
  "extends": "../../tsconfig.base.json",
}
```
위와 같이 수정해줌으로써 `tsconfig.base.json`에서 설정한 내용을 extends해 사용할 수 있습니다.   

### 7️⃣ 프로젝트 간 코드 공유
현재 `package/common`폴더는 비어있는 상태입니다.   
따라서 `common` 폴더로 이동한 뒤,   
```cmd
yarn init
```
명령어를 통해 `package.json` 파일을 생성합니다.   

생성된 `package.json` 파일의 내용을 아래와 같이 수정 및 추가해줍니다.   
```json
{
  "name": "@monorepo/common",
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "author": "",
  "license": "ISC"
}
```

`package/common` 폴더의 `package.json` 파일 수정이 완료되었다면,   
프로젝트간 공유하게 될 코드인 `index.ts`를 생성해줍니다.   

`index.ts` 파일에는 `front-mono`와 `common` 프로젝트에서 코드를 공유할 수 있음을 간단하게 확인하기 위해,   
임의의 변수를 선언해주겠습니다.   
```ts
const str: string = "monorepo를 통해 공유할 변수입니다.";

export default str;
```

- common 폴더 구조
```md
📦common
 ┣ 📜README.md
 ┣ 📜index.ts
 ┗ 📜package.json
```

다음으로는 `package/common`폴더에 공유할 코드를 만들어 주었으니,   
`package/front-mono`폴더에서 이를 가져와 사용할 수 있도록 `package.json`파일을 수정해주어야 합니다.   

- package/front-mono/package.json
```json
...
  "dependencies": {
    "@monorepo/common": "*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
...
```
dependencies 부분에 `common`의 package명을 입력해주며, 버전의 경우 `*`로 설정합니다.   

그 다음, 터미널에서 루트 또는 front-mono로 이동해 하기 명령어로 project 간 연결을 해줍니다.   
```cmd
yarn
```

### 8️⃣ package 내 타 프로젝트에서 common의 변수 import하기
- package/front-mono/src/App.tsx
```tsx
import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import str from '@monorepo/common'

function App() {
  const [count, setCount] = useState(0)
  console.log(str)
...
  return (
    <div className="App">
        ...
      <h1>{str}</h1>
        ...
    </div>
    )
}
```
위와 같이 `@monorepo/common`으로부터 선언해준 변수 `str`을 import해 사용할 경우,   

<img src="https://user-images.githubusercontent.com/66112716/220810509-2084819a-3bc6-46d8-9b67-5cd0aac1b4ba.png" width="800" />

프로젝트 간 코드의 공유가 자유롭게 이루어짐을 확인할 수 있습니다.   

- 참고 자료 : https://minify.tistory.com/40
