<details><summary>npm</summary>

## NODE

node 가 어플리케이션에 직접사용되진않지만, 개발환경에 적지않게 영향을 준다.

**최신 스펙으로 개발**
최신 스펙으로 개발할 수 있다.
브라우저는 지원속도가 느린데, babel 가 webpack 을 통해 지원하는 것이 필요하다. node 위에서 돌아가는 툴이다.

**빌드 자동화**

브라우저에는 압축되고, 난독화되고 포리필이 추가된 코드가 올라간다. 일련의 빌드과정을 이해하는데 node 가 필요하며, 라이브러리 의존성을 해결하고 테스트 자동화에도 사용된다.

**개발환경 커스터마이징**
cra 등의 자동화된 환경을 사용할 수도 있지만 커스터마이징이 필요한 경우도 있다.

## NPM

package.json

기본으로 제공하는 커멘드
start, install 등의 기본제공 커멘드가 있고, npm start 와 같이 사용가능하다. 이외 별도의 커멘드 추가시, npm run ~~ 와 같이 사용가능하다.

## 패키지 설치

### CDN

script 태그와 함께 외부 라이브러리를 다운하여 사용할 수 있다.
CDN 서비스에 장애가 나면 프로그램이 삑나는 단점이 있다.

### 직접 다운

라이브러리 주소에서 직접 다운 해서 프로젝트에 추가할 수도 있다.
CDN 서버 장애에 대응은 가능하지만, 라이브러리 업데이트 시 수작업으로 다운하는 것이 귀찮다.

### npm

npm install ~~ 시 라이브러리 설치를 설치가능하다.
dependency에 라이브러리와 버전정보가 추가된다.

### 버전

패키지 버전을 엄격하게 제한한다면 업그레이드가 힘들고, 느슨하게 제한한다면 코드관리작업이 필요하다.

**semantic version**

- major: 기존 버전과 호환 x
- minor: 호환 및 기능 추가
- patch: 호환 및 버그 수정

```
// 특정 버전
1.2.3

// 높거나 낮은 경우
>1.2.3
>=1.2.3
<1.2.3
<=1.2.3

// 틸드 캐럿
~1.2.3 // 1.2.3 부터 1.3 미만 마이너가 없으면 갱신
^1.2.3 // 1.2.3 부터 2.0.0, 0.x 버전은 패치만 갱신
```

정식 릴리즈 전에는 패키지 하위호환성을 지키지 않는 경우도 많으므로 캐럿을 사용하여 하위호환성을 유지할 수 있다.

</details>

<details>

<summary>webpack</summary>
script 태그를 사용하여 js 를 로딩하는 방식은 전역스코프를 공유하기때문에 네임스페이스가 오염되는 문제가 있다.

IIFE

## 모듈

### commonJS 방식

exports 키워드로 모듈을 만들고 require 빌트인 함수로 다른 스코프에서 불러들인다.

```js
// math.js
exports function sum(a,b) {return a+b}

//app.js
const sum = require('./math.js');
sum(1,2)
```

### AMD

비동기로 로딩되는 환경에서 모듈을 사용

### UMD

AMD 기반으로 CommonJs 방식까지 지원

## es6 표준 모듈

```html
<script type="module"></script>
```

모던 브라우저는 대부분 지원한다.

## webpack

하나의 자바스크립트 모듈에서 다른 모듈을 import 하면 의존관계가 생긴다
모듈로 연결된 여러개의 자바스크립트 파일을 하나의 파일로 합쳐주고, 그파일을 번들이라고한다. webpack 을 번들러라고 한다.

옵션
mode: development production none / 개발환경, 운영환경인지에 따라 옵션부여
entry: 의존관계 모듈이 시작되는 부분, entry를 통해 모듈을 합침.
output: 모듈을 저장하는 부분

```
node_modules/.bin/webpack --mode development --entry ./src/app.js --output-path dist
```

config: webpack 설정파일을 지정할 수 있다.
npm script 사용시, 설치된 webpack 을 찾아서 명령어를 실행하며, 기본적으로 webpack.config.js 설정파일을 읽어서 번들링을 진행한다.

### entry, output

entry에서는 모듈이 시작되는 파일을 지정할 수 있다.
output 에서는 번들이 올라갈 경로를 지정하고 파일이름을 지정가능하다.

```
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.resolve('./dist'), // 절대 경로를 계산해준다.
    filename: '[name].js',
  },
};

```

</details>
