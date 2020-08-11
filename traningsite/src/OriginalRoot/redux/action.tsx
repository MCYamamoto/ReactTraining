//処理種別
export enum ActionType{
    SAMPLE = "SAMPLE",
    HEADER_HEIGHT_CHG = "HEADER_HEIGHT_CHG",
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

// ヘッダーの高さを更新
export function HeaderHeightChangeAction(value:number):ReduxAction
{
    return {type:ActionType.HEADER_HEIGHT_CHG, data:value};
}

// ログイン状態を更新(true:ログイン、false:未ログイン)
export function LoginAction(value:boolean):ReduxAction
{
    return {type:ActionType.LOGIN, login:value};
}
