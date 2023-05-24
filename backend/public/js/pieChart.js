// chart.js to show the chart
import {queryMastodonCoffee,queryMastodonNega,queryCoffeeForMast,queryNegaForMast} from "/api/axios.js"

setInterval(realMastodonPie,1000)
setInterval(realMastodonBar,1000)
// fetch mastodon data from the couchdb 
// use to compare the volumen of coffee posts and negative work in all twitter
async function realMastodonPie() {
  // require coffee, negative data from mastodon
    let coffee = await queryMastodonCoffee()
    let negative = await queryMastodonNega() 
    let date = new Date()
    var data = [{
      values: [coffee*100,100-coffee*100,],
      labels: ['Coffee-related posts', 'Non-coffee-related'],
      domain: {column: 0},
      hoverinfo: 'label+percent',
      hole: .4,
      type: 'pie',
      automargin: true
      
    },{
      values: [negative*100,100-negative*100],
      labels: ['Negative work posts', 'Non-negative work posts'],
      text: 'Work attitude',
      textposition: 'inside',
      domain: {column: 1},
      hoverinfo: 'label+percent',
      hole: .4,
      type: 'pie',
      automargin: true,
      marker:{
        colors:['#89d6e6','#9198e5']
      }
    }];
  
    // set the layout for map to better adjust 
    var layout = {
      title: `Percentage of toots for each scenario from Mastodon at ${date.toLocaleString()}`,
      titlefont: {size:15},
      annotations: [
        {
          font: {
            size: 10
          },
          showarrow: false,
          text: 'Coffee',
          x: 0.175,
          y: 0.5
        },
        {
          font: {
            size: 10
          },
          showarrow: false,
          text: 'Work Attitude',
          x: 0.85,
          y: 0.5
        }
      ],
      height: 400,
      width:700,
      showlegend: true,
      grid: {rows: 1, columns: 2},

    };
    Plotly.newPlot('pie', data, layout);
    
  };

// fetch mastodon data from the couchdb 
// use to compare the volumen of coffee posts and negative work in all twitter

  async function realMastodonBar() {
    // get data from the mastdon
    let coffeeTwitter = await queryCoffeeForMast()
    let negativeTwitter = await queryNegaForMast()
    let coffeeMast = await queryMastodonCoffee()
    let negativeMast = await queryMastodonNega() 
    let date = new Date()
    var trace1 = {
      y: ["Coffee","Negative Work Attitude"],
      x: [coffeeTwitter,negativeTwitter],
      name: 'Twitter',
      type: 'bar',
      orientation:'h',
  };

    var trace2 = {
      y: ["Coffee","Negative Work Attitude"],
        x: [coffeeMast,negativeMast],
        name: 'Mastodon',
        type: 'bar',
        orientation :'h',
    };
    var data = [trace1, trace2];
    var layout = {
        barmode: 'group',
        title:`Comparsion between Twitter and Mastodon Data at ${date.toLocaleString()}` ,
        autosize: true,
        height: 400,
        width: 700,
        xaxis:{
            title:'Percentage',
            titlefont: { size:15 },
        },
        yaxis: {
        title: 'Scenario',
        automargin: true,
        titlefont: { size:15 },
    },
    };

    Plotly.newPlot('bar', data, layout);

  }