# ReactTraining
React学習用  
案件の番号を発行するサイトを作成する。  
SPAにする。

## 作業内容
### 2020/08/08
- 作成開始
- 環境構築  
  create-app-react  
  semantic-ui  
  scss  
  Router    
  Redux  

## 使用している技術
- JavaScript
- TypeScript
- React
- Redux
- React Developer Tools - Chrome
- Semantic-ui-react
- ReactRouter
- SCSS
- git

## これから使用する予定の技術
- Nodejs
- AWS or FireBase

## メモ
[React]
下記でプロジェクト作成して開始

<pre>
npx create-react-app traningsite --typescript
</pre>

できたら下記で動かせる。
<pre>
cd traningsite
yarn start
</pre>

デバッグには、React Developer Tools - Chromeを使用する。
ChromeのアドオンでChrome用かFireFox用、StandAlone用がある。


[semantic-ui-react]  

React用の見た目モダンにしてくれるもの  

### insatll方法
<pre>
yarn add semantic-ui-react semantic-ui-css
</pre>

### 使用方法
index.tsxに下記インポートしといてあとは下記URL参照して使う。

<pre>
import 'semantic-ui-css/semantic.min.css'
</pre>

下記参照。  

https://react.semantic-ui.com/usage/

[SCSS]  
CSSを書きやすくしたもの

### install方法
Reactに追加する方法は下記。
<pre>
yarn add -D node-sass
</pre>

後は拡張子をscssにすればscssになる。

[ReactRouter]  
SPAサイトにするためのもの

### install方法
<pre>
yarn add react-router react-router-dom
yarn add @types/react-router @types/react-router-dom
※typescript用のものもインストールする必要あり。
</pre>


[Redux]   
Component間でデータを共有するもの(グローバル変数のイメージ)

### install方法
<pre>
yarn add redux react-redux
yarn add @types/redux @types/react-redux
※typescript用のものもインストールする必要あり。
</pre>

