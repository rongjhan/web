import React, { useState } from "react";
import run from "../asset/run.png"
import confirm from "../asset/confirm.png"
import style from "./css/configEditor.css"
import { api } from "../store/endpoint";

export function ConfigEditor(props){
    const { configType, opened } = props
    const [changed,setChanged] = useState(false)
    const {data} = api.endpoints.getConfig.useQuery({configType,configName:opened})
    console.log(data)
    return(
        <div className={style.editorHead}>
            <span style={{marginRight:"8px",cursor:"pointer"}}>
                <img src={run} style={{width:"20px"}} />
            </span>
            <span className={changed?style.shine:null} 
                style={{marginRight:"8px",cursor:"pointer"}}
            ><img src={confirm} style={{width:"20px"}}/>
            </span>
            
        </div>
    )
}