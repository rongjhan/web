
function loadModule (moduleName){
    return import(
        /* webpackMode: "lazy-once" */
        /* webpackChunkName: "mod_source" */
        `./${moduleName}.mjs`)
        
}



export {
    loadModule as loadCrawler
}
