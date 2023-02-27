const chartPath = {
    connectDot:"./otherChart/connectDot.mjs",
    stack:"./axisChart/stack.mjs",
    gannt:"./axisChart/gannt.mjs",
    candleStick:"./axisChart/candleStick.mjs",
    tree:"./treeChart/tree.mjs",
    scatter:"./axisChart/scatter.mjs",
    line:"./axisChart/line.mjs",
    relation:"./axisChart/relation.mjs",
    geoTaiwan:"./geoChart/geoTaiwan.mjs",
    geoUS:"./geoChart/geoUS.mjs",
    geoWorld:"./geoChart/geoWorld.mjs"
}




function loadModule (moduleName){
    return import(
        /* webpackMode: "lazy-once" */
        /* webpackChunkName: "mod_visualize" */
                `${chartPath[moduleName]}`)
}


export {
    loadModule as loadChart
}