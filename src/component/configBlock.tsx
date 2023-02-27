import React, { useRef, useState } from "react";

import { ConfigFolder } from "./configFolder";
import { ConfigEditor } from "./configEditor";


export function ConfigBlock(props){
    const { configType } = props
    const [opened , setOpened] = useState(null) 
    return (
        <>
            <ConfigFolder configType={configType} opened={opened} setOpened={setOpened}/>
            {opened?<ConfigEditor configType={configType} opened={opened}/>:null}
        </>
    )
}