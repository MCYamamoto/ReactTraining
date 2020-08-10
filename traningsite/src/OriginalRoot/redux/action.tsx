//処理種別
export enum ActionType{
    SAMPLE = "SAMPLE",
    HEADER_HEIGHT_CHG = "HEADER_HEIGHT_CHG"
}

export interface ReduxAction{
    type:ActionType;
    data?:number;
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
