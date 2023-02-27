import {validateForms} from "./util_form.mjs"
import {shallowEqual} from "react-redux"

function confirmEditor(configType,configNow,configEditorData,dispatch){

    return (e)=>{
        if(configNow===configEditorData){return}//means there aren't any change

        var reTest = true
    
        if(configNow.producerType===configEditorData.producerType){ 
            // var sameDepend , maybe find other way to check depend is the same
    
            var sameConf = (
                shallowEqual(configNow.producerConfig,configEditorData.producerConfig)
            )
            if(sameConf){
                reTest = false
                console.log("producerConfig unchange")
            }
        }
            
        var configFormId = `#${configType}ConfigForm`
        var producerConfigFormId = `#${configType}ProducerConfigForm`
        
        validateForms([configFormId,producerConfigFormId])//if not pass would show error
    
        //do validate required depend config
        var newConfig = {...configEditorData}
        reTest&& (newConfig.passTest =undefined)
    
        // console.log(newConfig.passTest)
        dispatch({
            type:`${configType}SaveConfig`,
            configNow:configNow,
            config:newConfig,
        })
        dispatch({type:`${configType}ChangeConfigNow`,config:newConfig})
        // dispatch({type:`${configType}CreateNew`})
    }

}


export {confirmEditor}