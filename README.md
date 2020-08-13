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
### 2020/08/13
- データ登録、表示できるようにした

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
- AWS S3(静的配置、DB)
- query-string
- FireBase

## これから使用する予定の技術
- Nodejs

## 確認する必要があること
- テストの方法
- その他必要なこと

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

[AWS S3]
下記を参考に環境＋デプロイまで実施した。

https://joppot.info/2018/11/26/4303

Windowsだったので、Keyの登録の所は下記を参考にした。

https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-quickstart.html

Windows10では、下記にキーの情報が保存されていた。
<pre>
C:\Users\{username}\.aws
</pre>

[FireBase]
メールアドレスでの認証とDBサーバはFireBaseで行う

### 環境構築手順
- FireBaseにログイン
- プロジェクト作成
- DB作成
- 認証メールアドレス追加
- アプリ作成を選択し、config情報出力

### install方法
<pre>
yarn add firebase
yarn add @types/firebase
</pre>

### 認証部分

https://qiita.com/zaburo/items/801bd288cec47bd28764

### 登録参照部分

https://qiita.com/zaburo/items/353524e4f54671c8eace

[query-string]  
urlからクエリパラメータを取り出してくれる。

### install方法
<pre>
yarn add query-string
yarn add @types/query-string
</pre>
