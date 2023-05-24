import {queryObesityForInfo,queryCoffeeForAnalysis,queryNegativeForAnalysis,queryEntertainmentForAnalysis,queryTotBForAnalysis} from "/api/axios.js"
const coffee = 1
const negative = 2
const entertainment = 3

logJSONData()
// load analysis between sudo (busniess level ) vs twitter 

async function logJSONData() {
    queryObesityForInfo()
    // get the scenario id
    let id = document.querySelector('#analysis').getAttribute('value')
    let business  = await queryTotBForAnalysis()

    //  reconstuct the data to object
    let businessArray = business.map(obj => ({ [obj.key]: obj.value.toFixed(2) }));
    let businessMerge = businessArray.reduce((result, obj) => {
        Object.entries(obj).forEach(([key, value]) => {
            result[key] = value;
        });
        return result;
        }, {});
    let response;
    let mergedObject
    //  show different result accoridng to scneraio id
    if(id == coffee){
        response = await queryCoffeeForAnalysis()
        const responseArray = response.map(obj => ({ [obj.key]: obj.value.toFixed(2) }));
        mergedObject = responseArray.reduce((result, obj) => {
        Object.entries(obj).forEach(([key, value]) => {
            result[key] = value;
        });
        return result;
        }, {});
        
        
    }
    else if(id ==negative){
        response = await queryNegativeForAnalysis()
        const responseArray = response.map(obj => ({ [obj.key]: obj.value.toFixed(2) }));
        mergedObject = responseArray.reduce((result, obj) => {
        Object.entries(obj).forEach(([key, value]) => {
            result[key] = value;
        });
        return result;
        }, {});
    }
    else if(id ==entertainment){
        response = await queryEntertainmentForAnalysis()
        const responseArray = response.map(obj => ({ [obj.key]: obj.value.toFixed(2) }));
        mergedObject = responseArray.reduce((result, obj) => {
        Object.entries(obj).forEach(([key, value]) => {
            result[key] = value;
        });
        return result;
        }, {});
    }
    // plot the bar cahrt  
    var trace1 = {
        y: Object.keys(businessMerge),
        x: Object.values(businessMerge),
        name: 'SUDO',
        type: 'bar',
        orientation:'h',
    };

    var trace2 = {
        y: Object.keys(mergedObject),
        x: Object.values(mergedObject),
        name: 'Twitter',
        type: 'bar',
        orientation :'h',
    };

    var data = [trace1, trace2];
    var layout = {
        barmode: 'group',
        title:"Scenario " +id ,
        autosize: true,
        height: 500,
        width: 650,
        xaxis:{
            title:'percentage',
            titlefont: { size:15 },
        },
        yaxis: {
        title: 'state',
        automargin: true,
        titlefont: { size:15 },
    },
    };

    Plotly.newPlot('myDiv', data, layout);
}