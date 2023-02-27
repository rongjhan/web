import * as d3 from "d3"
import axisChart from "./_axisChart.mjs"
import cloneDeep from "lodash.cloneDeep" 
import excelToJsDate from "../../util_excel/excelToJsDate.mjs"


var TimeUnit = {
    week: d3.timeWeek,
    fourDay: d3.timeDay.every(4),
    day: d3.timeDay,
    halfDay: d3.timeHour.every(12),
    hour: d3.timeHour,
    minute: d3.timeMinute,
    second: d3.timeSecond
};


var descriptor = {
    data:{required:true,multi:false},
    config:{
        width:{type:"number",defaultValue:800},
        height:{type:"number",defaultValue:300},
        padding:{type:"text",defaultValue:"30,100,30,100"},
        dateType:{type:"selection",options:["excelValue", "jsValue"],defaultValue:"excelValue"},
        extendUnit:{type:"selection",options:["week","fourDay", "day", "hour"],defaultValue:"week"},
        axisUnit:{type:"selection",options:["week","fourDay","day", "halfDay", "hour", "minute", "second"],defaultValue:"week"},
        axisLine:{type:"checkbox",defaultValue:true},
        fontSize:{type:"number",defaultValue:15},
        xOrigin:{type:"number",defaultValue:undefined},
        svgBGC:{type:"color",defaultValue:"#ffffff"},
        chartBGC:{type:"color",defaultValue:"#ffffff"},
    }
}




function gannt({datas,config}){

    for (var item in config){
        var confValue = config[item];
        !(confValue=== undefined) &&(this[item]=confValue)
    }

    this.xScale = d3.scaleTime()
    this.yScale = d3.scaleBand().paddingInner(0.1).paddingOuter(0.2);
    this.colorScale = d3.scaleOrdinal(d3.schemeSet2)
    // .domain(["project1", "project2", "project3"]);

    this.extendUnit = TimeUnit[this.extendUnit]
    this.xTicks = TimeUnit[this.axisUnit] 

    axisChart.call(this,datas)    
}

gannt.prototype = Object.create(axisChart.prototype)
gannt.prototype.constructor = gannt

for(let config in descriptor.config){
    var confValue = descriptor.config[config].defaultValue;
    gannt.prototype[config]=confValue
}

gannt.prototype.transData = function (datas) {
    var data = datas[0].slice(1) //only support one dataSet
    var copyData = cloneDeep(data)
    var transData;

    switch(this.dateType) {
        case"excelValue":
            transData = copyData.map(function (d) {
                d[1] = excelToJsDate(d[1]);
                d[2] = excelToJsDate(d[2]);
                return d;
            });break;
        case"jsValue":
            transData = copyData.map(function (d) {
                d[1] = new Date(d[1])
                d[2] = new Date(d[2]);
                return d;
            });break;
    }
    return transData
};

gannt.prototype.setDomain = function () {

    var minDay = d3.min(this.data, function (d) {
        return d[1];
    });
    var maxDay = d3.max(this.data, function (d) {
        return d[2];
    });
    var projectList = this.data.map(function (d) {
        return d[0];
    });
    // console.log(minDay,maxDay)
    this.xScale.domain([minDay, maxDay]).nice(this.extendUnit);
    //nice以一周的星期天為擴展基準,也有timeSecond timeDay和timeMonday timeMonth等等
    this.yScale.domain(projectList);
};

gannt.prototype.renderBody = function () {
    // console.log(usedData)
    var g = this.svg
        .append("g")
        .attr("class", "barGroup")
        .attr("transform", `translate(${this.padLeft},${this.padTop})`);
    var selection = g.selectAll(".bar").data(this.data);
    selection
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => {
            return this.xScale(d[1]);
        })
        .attr("y", (d) => {
            return this.yScale(d[0]);
        })
        .attr("width", (d) => {
            return this.xScale(d[2]) - this.xScale(d[1]);
        })
        .attr("height", (d) => {
            return this.yScale.bandwidth();
        })
        .attr("fill", (d) => {
            return this.colorScale(d[0]);
        })
        .attr("rx","8");
};

gannt.prototype.xTickFormat = function(x,i,a){
    if (i % 2) {return} //偶數tick不顯示
    return d3.timeFormat("%-m/%-d")(x);
}

gannt.prototype.styleAxis = function(coordinate){
    coordinate.select(".yAxis").select(".domain").remove()
}




export {
    gannt as produce,
    descriptor
}