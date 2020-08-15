//処理種別
export enum ActionType{
    SAMPLE = "SAMPLE",
    LOGIN = "LOGIN"
}

export interface ReduxAction{
    type:ActionType;
    data?:number;
    login?:boolean;
    user?:string;
}

export function SampleAction(value?:number):ReduxAction
{
    if(value == null)
    {
        return {type:ActionType.SAMPLE};
    }
    else{
        return {type:ActionType.SAMPLE, data:value};
    }
}

// ログイン状態を更新(true:ログイン、false:未ログイン)
export function LoginAction(login:boolean, user:string):ReduxAction
{
    return {type:ActionType.LOGIN, login:login, user:user};
}
