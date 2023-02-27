function loadModule (moduleName){
    return import(
        /* webpackMode: "lazy-once" */
        /* webpackChunkName: "mod_transform" */
    `./${moduleName}.mjs`)
}



export {
    loadModule as loadEngine
}
