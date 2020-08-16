import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage"
import "firebase/auth";

//ローカル・AWSデプロイ用
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID,
//     measurementId: process.env.REACT_APP_MEASUREMENT_ID
// };
// const app = firebase.initializeApp(firebaseConfig);

// Firebaseへデプロイ用。認証情報だが、隠す必要は無いらしい。
// <script src="/__/firebase/init.js"></script>でも同じものが見れる

const firebaseConfig_FirebaseDeploy = {
    apiKey: "AIzaSyD73zvERaHSP_oZQb9fvntm7R_aepuVPGI",
    authDomain: "traingsite-e5161.firebaseapp.com",
    databaseURL: "https://traningsite-e5161.firebaseio.com",
    projectId: "traningsite-e5161",
    storageBucket: "traningsite-e5161.appspot.com",
    messagingSenderId: "69336295506",
    appId: "1:69336295506:web:68899a86f4de6d47d2578b",
    measurementId: "G-T5MLQWTR9J"
};
const app = firebase.initializeApp(firebaseConfig_FirebaseDeploy);

export const db = firebase.firestore();

export interface ProjectDataObj {
    number:number,          // 案件番号
    name:string,            // 案件名
    srcCompany:string,      // 発注元会社名
    startDate:string,       // 開始日
    endDate:string,         // 期限
    logCreateUser:string,   // 作成者
    logCreateDate:string,   // 作成日時
    logUpdateUser:string,   // 更新者
    logUpdateDate:string,   // 更新日時
}

export interface getProjectDataObj {
    docID:string;
    data:ProjectDataObj;
};

export const dbInfo = {
    ProjectListCollection:"projectlist",
    ProjectListDoc:"list"
}

export const dbColRef = db.collection(dbInfo.ProjectListCollection);

// Firebaseからのデータ取得
export function getDBProjectList(OrderKey:string, Orderby:"desc" | "asc" | undefined, Offset:number, limit:number, whereParam:string, whereValue:string,resolvAction:(docsize:number,getdata:getProjectDataObj[])=>void, errAction:(erro:any)=>void):void
{
    let docsize = 0;
    // let colRef = dbColRef.orderBy(OrderKey, Orderby);
    let colRef;
    //条件有の場合
    if(whereParam != "" && whereValue != "")
    {
        // colRef = dbColRef.orderBy(whereParam).startAt(whereValue).endAt(whereValue + '\uf8ff');
        colRef = dbColRef.where(whereParam, "==", whereValue);
    }
    //条件無の場合
    else
    {
        colRef = dbColRef;
    }

    colRef.get().then((res)=>{
        docsize = res.docs.length;
        //データなければ、空を返す。
        if(docsize === 0)
        {
            resolvAction(0, []);
            return;
        }
        //データがあってもおかしな状態野場合、エラーを返す。
        if(Offset > docsize)
        {
            errAction("データ不正です。リロードしてください。");
            return;
        }
        return res.query.orderBy(OrderKey, Orderby).get();
    }).then((res)=>{
        if(res == null)
        {
            resolvAction(0, []);
            return;
        }
        console.log(res.docs.length)
        //取得位置と上限数決めて再取得
        return res.query.startAt(res.docs[Offset]).limit(limit).get();
    }).then(res => {
        if(res == null)
        {
            resolvAction(0, []);
            return;
        }
        //正常終了時
        const getdata = res.docs.map(doc=>{
                    return{
                        docID:doc.id,
                        data:doc.data()
                    }
                }
            )
        resolvAction(docsize, getdata as getProjectDataObj[]);
    })
    .catch((err)=>{
        errAction(err)
    })
}

// Firebaseからのデータ取得
async function NumberDuplicationCheck(number:Number)
{
    let colRef = dbColRef.where("number","==", number);
    return colRef.get();
}

// FirebaseからのdocIDを指定してデータ取得
export function getDBProjectData(docID:string, resolvAction:(getdata:ProjectDataObj)=>void, errAction:(erro:any)=>void):void
{
    let colRef = dbColRef.doc(docID);
    const doc = colRef.get()
    .then(res => {
        //正常終了時
        resolvAction(res.data() as ProjectDataObj);
    })
    .catch(error => {
        //異常終了時
        errAction(error);
    });
}

//Firebaseへデータ追加
export function AddDBProjectList(add_data:ProjectDataObj,resolvAction:(res:any)=>void, errAction:(err:any)=>void)
{
    //numberの重複チェック
    NumberDuplicationCheck(add_data.number).then(res => {
        //重複あり
        if(res.docs.length > 0)
        {
            errAction("Numberが重複しています。");
        }
        else{
            //重複なし
            dbColRef.add({
                number:add_data.number,
                name: add_data.name,
                srcCompany:add_data.srcCompany,
                startDate: add_data.startDate,
                endDate:add_data.endDate,
                logCreateUser:add_data.logCreateUser,
                logCreateDate:new Date(),   // 作成日時
                logUpdateUser:add_data.logUpdateUser,
                logUpdateDate:new Date(),   // 更新日時                            
            }).then((res)=>{
                resolvAction(res);
            }).catch((err)=>{
                errAction(err);
            });
        }
    })
    .catch(error => {
        errAction(error);
    });
}

//Firebaseのデータ更新
export function updateDBProjectList(docID:string, add_data:ProjectDataObj,resolvAction:(res:any)=>void, errAction:(err:any)=>void)
{
    //numberの重複チェック
    NumberDuplicationCheck(add_data.number).then(res => {
        //重複あり
        if(res.docs.length == 1)
        {
            //ただし、同じドキュメントIDのみ変更可能
            if(res.docs[0].id == docID)
            {
                //重複なし
                dbColRef.doc(docID).set({
                    number:add_data.number,
                    name: add_data.name,
                    srcCompany:add_data.srcCompany,
                    startDate: add_data.startDate,
                    endDate:add_data.endDate,
                    logCreateUser:add_data.logCreateUser,
                    logCreateDate:add_data.logCreateDate,
                    logUpdateUser:add_data.logUpdateUser,
                    logUpdateDate:new Date(),   // 更新日時                            
                    }).then((res)=>{
                    resolvAction(res);
                }).catch((err)=>{
                    errAction(err);
                });
            }
            else
            {
                errAction("Numberが重複しています。");
            }
        }
        else{
        //重複なし
            dbColRef.doc(docID).set({
                number:add_data.number,
                name: add_data.name,
                srcCompany:add_data.srcCompany,
                startDate: add_data.startDate,
                endDate:add_data.endDate,
                logCreateUser:add_data.logCreateUser,
                logCreateDate:add_data.logCreateDate,
                logUpdateUser:add_data.logUpdateUser,
                logUpdateDate:new Date(),   // 更新日時                            
            }).then((res)=>{
                resolvAction(res);
            }).catch((err)=>{
                errAction(err);
            });
        }
    })
    .catch(error => {
        errAction(error);
    });
}

//Firebaseのデータ削除
export function deleteDBProjectList(docID:string,resolvAction:(res:any)=>void, errAction:(err:any)=>void)
{
    dbColRef.doc(docID).delete()
    .then((res)=>{
        resolvAction(res);
    }).catch((err)=>{
        errAction(err);
    });    
}

export const Provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
