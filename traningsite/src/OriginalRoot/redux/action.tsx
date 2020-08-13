//処理種別
export enum ActionType{
    SAMPLE = "SAMPLE",
    LOGIN = "LOGIN"
}

export interface ReduxAction{
    type:ActionType;
    data?:number;
    login?:boolean;
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
export function LoginAction(value:boolean):ReduxAction
{
    return {type:ActionType.LOGIN, login:value};
}
