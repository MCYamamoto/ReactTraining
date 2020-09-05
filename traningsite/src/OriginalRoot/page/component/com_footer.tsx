import React, { FC, useState, useEffect} from 'react'
import {Button} from "semantic-ui-react"

import {ComFooterReduxState, ComFooterReduxAction} from "./com_footer_container"

//CSS
import "./../../css/com_footer.scss"

interface OwnProps
{
    testflag?:boolean;
    topPage?:boolean;
}

type ComHeaerProps = OwnProps & ComFooterReduxState & ComFooterReduxAction;

 const ComFooter:FC<ComHeaerProps> = ((props:ComHeaerProps)=>{
    const [test1, setTest1] = useState(1);
    const [test2, setTest2] = useState(10);
    
    useEffect(() => {
        if(props.testflag === true){
            document.title = `You clicked ${test1} ${test2} times`;
        } 
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
                {props.topPage===false?
                    (<li>
                        {props.login?props.user:"not login"}
                    </li>)
                    :
                    (<div></div>)
                }
                {props.testflag===true?
                    <li>
                        {test1},{test2}
                        <Button onClick={onClickTest}>testButton</Button>
                    </li>
                    :<div></div>
                } 
            </ul>
        </div>    
    );
 }
);

// // Propsのデフォルト値
ComFooter.defaultProps = {
    testflag:false,
    topPage:false
}

export default ComFooter;
