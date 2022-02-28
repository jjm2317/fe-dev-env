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

```js
const path = require('path');
  // 함수로 export 할 수도 있다. --env 뒤의 인자값이 들어온다.
// module.exports = {
  module.exports = function(webpackEnv) {
    return {
  mode: webpackEnv.production? 'production' : 'development',
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.resolve('./dist'), // 절대 경로를 계산해준다.
    filename: '[name].js',
  },
};
```

### 로더

웹팩은 이미지, 폰트 css 모두를 모듈로 바라본다. 그렇기 때문에 웹팩으로 빌드하는 js 파일에서는 js 파일이외의 파일도 import 구문으로 로드할 수 있다.
웹팩의 로더가 하는 역할이다.

- 각 파일을 처리한다.
  - 각파일의 패턴을 명시하고, 패턴에 매치되는 파일들은 로더함수를 통해 처리한다.

webpack config 파일에서, module.rules key에서 처리할 파일마다 작성할 수 있다.

자주 사용하는 로더

css-loader
css를 모듈로 만들어 js 파일에서도 import 할 수 있게 모든 css파일에 대해 처리한다.
css-loader 만사용해서는 css 를 dom 에 적용할 수 없다. html 에 직접 적용되어 cssom을 만들어야하기 때문이다.

style-loader
js 로 변경된 css 코드를 html에 넣어준다.

css 를 처리할 때 위 두개 로더가 필요하며, use key 로 일괄 처리가능하다.

file-loader
이미지 파일도 적용할 수 있다.
css 파일에서 img 파일도 가져올 수 있다.

웹팩은 빌드할때마다 unique한 해시값을 생성한다. 파일 이름이 같고 내용이 달라지면 cashe busting 이 발생하기 때문이다.

publicPath는 경로앞에 추가되는 문자열을 명시한다. dist 파일에 저장된 이미지파일을 사용하려고 할때 사용한다.
name은 파일아웃풋을 만들때의 파일형식을 명시한다. hash 값을 추가해 cache busting 을 방지할 수 있다.

url loader
한페이지에서 사용하는 이미지가 많으면 요청횟수가 많아져 사이트 성능이 낮아질 수 있다.
작은파일의 경우 base64 로 인코딩해서 문자열 형태로 소스코드에 넣을 수 있다.
limit 키를 통해 파일 사이즈 기준을 잡을 수 있다.
limit 값 이상의 파일에 대한 처리는 file loader 에 위임한다.

### 플러그인

로더가 파일단위로 처리하는 반면 플러그인은 번들된 결과물을 처리한다. 자바스크립트 난독화, 텍스트 추출에 사용

플러그인은 클래스로 작성한다.

- apply method 를 호출하면 웹팩은 complier 객체를 주입한다.

- emit 이벤트를 통해 번들링된 결과물에 접근할 수 있다.
  - compilation, callback 중 compliation 인자로 번들링 결과물에 접근할 수 있다.
- config 파일에서, plugins 키 배열에 넣어준다.
- 번들파일에 대해서 단 한번 실행된다.
- compilation.assets[key].source 함수를 재정의 함으로서, 번들링 결과물 내용을 바꿀 수 있다.

**BannerPlugin**
웹팩이 기본적으로 제공하는 빌트인 플러그인
번들링 결과물에 추가적인 정보를 주석으로 작성할 수 있다.빌드 정보, 커밋 버전 등을 추가한다.

```js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.BannerPlugin({
      // banner: 'banner~~',
      // 번들이 컴파일되는 시점, 즉 빌드 시점을 얻기 위해 함수 표현식으로 전달가능하다.
      banner: () => `build time: ${new Date().toLocaleString()}`, // 함수 블록은 호출되는 시점에 실행되기 때문에 빌드 시점을 기록가능하다.
    }),
  ],
};
```

**DefinePlugin**

어플리케이션의 환경의존적인 정보를 제공한다.
예를들어 프론트엔드 소스코드는 api 주소를 포함한다. 개발환경과 운영환경에서 주솟값이 다르므로 이러한 값들은 각 환경에서 다른 값들을 갖게 해야한다. Define Plugin 은 환경의존적인 값을 곤리할 수 있도록 해주므로 동적으로 환경에따라 다른 값을 주입해줄 수 있다.

```js
const webpack = require('webpack');

export default {
  plugins: [
    new webpack.DefinePlugin({
      JIMAN: '123 + 123', // 표현식을 문자열 형태로 전달하면 표현식이 평가된 값이 주입된다.
      JIMAN2: JSON.stringify('123 + 123'), // 코드가 아닌 문자열 자체를 전달하고 싶으면 JSON.stringify 메서드를 사용한다.
      'api.domain': JSON.stringify('dev.api.domain.com'), // 객체형태(키와 값)로도 전달할 수 있다.
    }),
  ],
};
```

노드 환경정보는 기본값으로 제공한다.
웹팩 설정의 mode 값에 설정한 값이 들간다.

```js
process.env.NODE_ENV; // 'development'
```

**HtmlWebpackPlugin**
html 파일을 후처리하는데 사용된다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>타이틀<%= env %></title>
  </head>
  <body></body>
</html>
```

위 `<%= env %>` 에 HtmlWebpackPlugin은 빌드 타임에 env 에 입력된 값을 주입해준다. 즉, 빌드 타임에 동적으로 html 에 값을 입력할 수 있다.
env는 전달받은 env 변수 값을 출력한다.

추가로, 빌드 결과물을 로딩하는 코드를 생성해준다.

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // html 에 번들을 로드하는 script 태그가 없어도 자동으로 주입해준다. html 을 덜 의존적인 코드로 만들어준다.
      // html에 동적으로 값을 넣어줄 수 있다. <% = env %> 와 같이 사용할 수 있다.
      templateParameters: {
        env: process.env.NODE_ENV
      },
      minify: {
        collapseWhitespace: true, // 빈칸을 제거한다.
        removeComments: true, // 주석을 제거한다.
      },
      hash: true
    })
  ]
}
```

**CleanWebpackPlugin**
빌드 이전 결과물을 제거할 수 있다. 파일을 덮어쓰는 경우 업데이트가 되겠지만, 그렇지 않은 경우 재빌드시 쓰이지 않지만 남아있는 파일이 있을 수 있다.
재빌드 시 이전 결과물을 제거한 후 번들을 생성하는 역할을 한다.

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [new CleanWebpackPlugin()],
};
```

**MiniCssExtractPlugin**
브라우저에서 하나의 큰파일을 다운로드하는것보다 여러개의 작은 파일을 동시에 다운로드하는 것이 빠르다.
css 를 별도 파일로 뽑아낼 수 있다.

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    // 개발환경에서는 자바스크립트 파일 하나로 빌드하는것이 빠르게 빌드된다.
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
      : []),
  ],
};
```

</details>

<details>
<summary>Babel<summary>

## basic

ES6+ 로 작성된 코드를 모든 브라우저에서 동작하게 해준다.

- javascript 최신 문법을 이해하지 못하는 브라우저도 있다.
  - ie
- 타입스크립트, jsx 등도 브라우저가 이해할 수 있게 트랜스파일링해준다.

```
// babel core 와, terminal 에서 사용하기위한 babel/cli 를 설치한다.
npm install -D @babel/core @babel/cli
```

```js
// ie 는 인식하지 못하는 코드다. arrow func, const
const alert = (msg) => window.alert(msg);
```

```
node_modules/.bin/babel app.js
//or
npx babel app.js
```

**트랜스파일 순서**

1. Parsing

코드를 읽고 AST 로 변환한다.

> AST(abstract syntax tree)
> 소스코드 텍스트에서 컴파일러에 의해 번역된 계층적 프로그램 표현이다.
> 컴파일러의 lexical, syntax analyzer 가 그역할을 담당한다.
> 어휘분석된 토큰목록이 구문검증 후 트리구조로 변환된다.

2. Transforming
   es6문법으로 작성된 토큰을 es5문법으로 변환한다.
3. Printing

## 플러그인

바벨의 플러그인이 Transforming(변환)을 담당한다.

다음과 같이 터미널에서 실행가능하다.

```
npx babel app.js --plugins './my-babel-plugin.js'
```

```js
module.exports = function myBabelPlugin() {
  return {
    visitor: {
      // AST 에서 식별자들을 순회한다.
      Identifier(path) {
        const name = path.node.name;

        console.log(name);

        path.node.name = name.split('').reverse().join('');
      },
      // 변수 선언 키워드를 순회한다.
      VariableDeclaration(path) {
        console.log('VariableDeclaration() kind:', path.node.kind); // const

        if (path.node.kind === 'const') {
          path.node.kind = 'var';
        }
      },
    },
  };
};
```

### 커스텀 플러그인

</details>
