# ReactTraining
React学習用  
案件管理用のサイトを作成する。
SPAにする。

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
- ~~AWSS3(デプロイ)~~ Firebaseの方が無料枠が多かったので、デプロイしたが後でFirebaseに変更した
- query-string
- FireBase(デプロイ、DB)

## 作業進捗
### 2020/08/08
- 作成開始
- 環境構築  
  create-app-react  
  semantic-ui  
  scss  
  Router    
  Redux  
### 2020/08/13
- データ登録、表示、削除できるようにした
### 2020/08/13
- デザイン整えた
### 2020/08/14
- リスト表示時に15個毎に次の頁とかできるようにする。
### 2020/08/15
- だれでもログインできるようにGoogleアカウントでも認証できるように追加した
- DBに作成ユーザと更新ユーザを保存するようにした。
- データリストのソート機能を追加
### 2020/08/16
  検索機能も実装。ただ、FirebaseだとOR検索や前方一致検索とソートができなかったり、複合インデックスの登録が必要だったりと、不便に感じた。

### 残件
- 案件の検索
  
## 確認する必要があること
- テストの方法
- その他必要なこと

## 開発時メモ
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

[AWS-S3]
下記を参考に環境＋デプロイまで実施してみたが、Firebaseでデプロイする方が単純に安いので切り替える。

https://joppot.info/2018/11/26/4303

Windowsだったので、Keyの登録の所は下記を参考にした。

https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-quickstart.html

Windows10では、下記にキーの情報が保存されていた。
<pre>
C:\Users\{username}\.aws
</pre>

※AWSよりFirebaseの方が

[FireBase]
Googleアカウントでの認証、メールアドレスでの認証とDBサーバ、ホスティング、全てFireBaseで行う

### 環境構築手順
- FireBaseにログイン
- プロジェクト作成
- DB作成
- 認証メールアドレス追加
- アプリ作成を選択し、config情報出力

### DB環境のinstall方法
<pre>
yarn add firebase
yarn add @types/firebase
</pre>

### メールでの認証部分
下記を参考に作成した
https://qiita.com/zaburo/items/801bd288cec47bd28764

### Googleアカウントでの認証部分
下記を参考に作成した
https://firebase.google.com/docs/auth/web/google-signin?hl=ja

### ホスティング部分

Firebaseでhostingを選択すると手順が表示されるので、その通りでできる。
create-react-appの場合、index.htmlがpublicではなく、buildフォルダにあるので、
対象フォルダを変更する必要がある。

また、環境変数が.envファイルから読み込まれないので、下記を参考に設定する必要があった。
firebase.tsxに直書きにした。
下記で取得できるらしく。隠す必要がある情報ではないとのこと。
<script src="/__/firebase/init.js"></script>

### 登録参照部分

https://qiita.com/zaburo/items/353524e4f54671c8eace

[query-string]  
urlからクエリパラメータを取り出してくれる。

### install方法
<pre>
yarn add query-string
yarn add @types/query-string
</pre>
