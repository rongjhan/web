import React from "react";
import { api } from "../store/endpoint"
import style from "./css/configFolder.css"
import close from "../asset/Close.png"

function ConfigFile(props) {
    const {configType,name,opened,setOpened} = props
    let fileState = {
        boxShadow : opened?"0px 0px 3px 2px #f1c40f":"none",
        backgroundColor : undefined
    }
    const [delConfig] = api.endpoints.delConfig.useMutation()
    return (
        <div className={style.configFile} style={fileState} onClick={()=>{setOpened(name)}}>
            <span>{name}</span>
            <span className={style.delete} style={{boxShadow:fileState.boxShadow}}
                onClick={(e)=>{
                    if(!opened){delConfig({configType,configName:name})}
                    e.stopPropagation()
            }}
            >
                <img src={close}/>
            </span>
        </div>
    )
}


export function ConfigFolder(props) {
    const { configType, opened, setOpened } = props
    const {data:allConfigs,isSuccess} = api.endpoints.getConfigs.useQuery({configType})
    const [addConfig] = api.endpoints.addConfig.useMutation()
    console.log("allConfigs:",allConfigs)
    return (
        <div className={style.folder}>
            <div className={style.header}>
                <div style={{alignSelf:"center",fontSize:17}}>Config List:</div>
                <div style={{flexGrow:1}}></div>
                <div className={style.add} onClick={()=>{addConfig({configType})}}>Add</div>
            </div>
            <div className={style.content}>
                {isSuccess?allConfigs.map((config) => {
                    return <ConfigFile key={config} opened={opened==config} name={config} setOpened={setOpened} configType={configType}/>
                }):null}
            </div>
        </div>
    )

}