import React, { FC, useState, useEffect} from 'react'
import {Button} from "semantic-ui-react"

import {ComFooterReduxState, ComFooterReduxAction} from "./com_footer_container"

//CSS
import "./../../css/com_footer.scss"

interface OwnProps
{
}

type ComHeaerProps = OwnProps & ComFooterReduxState & ComFooterReduxAction;

 const ComFooter:FC<ComHeaerProps> = ((props:ComHeaerProps)=>{
    const [test1, setTest1] = useState(1);
    const [test2, setTest2] = useState(10);
    
    useEffect(() => {
        document.title = `You clicked ${test1} ${test2} times`;
    });
    const onClickTest = ()=>
    {
        setTest1(test1*2);
        setTest2(test2*2);
    }    
    
    return (
        <div className="naviFoot">
            <ul>
                <li>
                    <a href="http://moltocarina.co.jp/">株式会社モルトカリーナ</a>                    
                </li>
                <li>
                    {props.login?props.user:"not login"}
                </li>
                <li>
                    {test1},{test2}
                    <Button onClick={onClickTest}>testButton</Button>
                </li>
            </ul>
        </div>    
    );
 }
);

export default ComFooter;
