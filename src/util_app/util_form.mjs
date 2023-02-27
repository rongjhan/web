function validateForms(formSelectors){
    //browser would validate inputs when form is submiited by normal way
    //this function is suitable for get formdata not by triggering submmited event

    //https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation
    var message = "invalid Value"

    for( let formSelector of formSelectors){

        var formElement = document.querySelector(formSelector)
        //this formElment can be any element not only HTMLFormELement

        if(formElement instanceof HTMLFormElement){

            if(!formElement.checkValidity()){formElement.reportValidity();throw message}

        }else{
            var inputs = formElement.querySelectorAll("input,select,textarea")
            for (var input of inputs){
                if(!input.checkValidity()){input.reportValidity();throw message}
            }
        }
    }

}


function getFormsData(formSelectors){
    //using FormData() constructor,formElement should be HTMLFormELement
    var formDatas=[]

    for(let formSelector of formSelectors){

        var formElement = document.querySelector(formSelector)
        //this formElment can be any element not only HTMLFormELement
        if(formElement instanceof HTMLFormElement){
            console.time()
            var formData = Object.fromEntries(new FormData(formElement))
            console.timeEnd()
            formDatas.push(formData)
        }else{ //以下為模仿new FormData(formElement)行為,效能甚至更好
            console.time()
            var formData = {}
            var inputs = formElement.querySelectorAll("input,select,textarea")
            for (var input of inputs){
                if(input.type=="checkbox"){
                    if(!input.checked){continue} 
                    formData[input.name]="on" 
                    //若去讀checkbox的value永遠為"on",上面這才是form表單對於checkbox取值的行為
                }else{
                    formData[input.name]=input.value
                }
                
            }
            console.timeEnd()
            formDatas.push(formData)
            
        }
    }

    return formDatas
}

function getMultiCheckBoxesData({formSelector,returnType="trueArray"}){
    //returnType can be one of ["trueArray","falseArray","object"]

    var formElement = document.querySelector(formSelector)
    //this formElment can be any element not only HTMLFormELement

    var checkboxes = formElement.querySelectorAll("input[type='checkbox']")

    switch(returnType){
        case "trueArray":
            var data = [] //inlcude  any checked checkboxe name
            checkboxes.forEach((box)=>{box.checked&&(data.push(box.name))})
            return data
        case "falseArray":
            var data = [] //inlcude  any unchecked checkboxe name
            checkboxes.forEach((box)=>{!box.checked&&(data.push(box.name))})
            return data
        case "object":
            var data = {} //inlcude all checkboxe {name:value}
            checkboxes.forEach((box)=>{objectData[box.name]=box.checked})
            return data
    }

}


function validateCheckBoxesRequired(MultiCheckBoxesForms,{config={required:"1",must:[]}}){
    //required include must, it means if must = ["a","b"] ,required 2 as minimun 
}


export  {getFormsData,getMultiCheckBoxesData,validateForms}