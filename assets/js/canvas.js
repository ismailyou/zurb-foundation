

// Data
let chart_data = {
        "cases" : 0,
        "deaths" : 0,
        "recovered" : 0
    };

// Draw charts
function draw_chart(data , cases = true, deaths = true, recovered = false){
    let points = [];
    if(cases) points.push({
        type: "splineArea",
        showInLegend: true,
        name: "Cas actifs",
        yValueFormatString: "#,##0",
        xValueFormatString: "DD MMM",
        dataPoints: data.cases
    });

    if(deaths) points.push({
        type: "splineArea",
        showInLegend: true,
        name: "décès",
        yValueFormatString: "#,##0",
        dataPoints: data.deaths
    });

    if(recovered) points.push({
        type: "splineArea",
        showInLegend: true,
        name: "récupéré",
        yValueFormatString: "#,##0",
        dataPoints: data.recovered
    });

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        axisY: {
            includeZero: false,
            prefix: "+"
        },
        toolTip: {
            shared: true
        },
        legend: {
            fontSize: 13
        },
        data: points
    });
    chart.render();
}


// Shart data
function format_chart(info){
    let first = 0, counter = true;
    let cases = [], deaths=[], recovered=[];
    for (const key in info.cases) {
        if(counter == true) {
            counter = false;
            first = info.cases[key];
            continue;
        }
        cases.push({
            x: new Date(key),
            y: info.cases[key] - first
        });
        first = info.cases[key];
    }
    first = 0, counter = true;
    for (const key in info.deaths) {
        if(counter == true) {
            counter = false;
            first = info.deaths[key];
            continue;
        }
        deaths.push({
            x: new Date(key),
            y: info.deaths[key] - first
        });
    }
    first = 0, counter = true;
    for (const key in info.recovered) {
        if(counter == true) {
            counter = false;
            first = info.recovered[key]
            continue;
        }
        recovered.push({
            x: new Date(key),
            y: info.recovered[key] - first
        });
    }
    return {
        "cases" : cases,
        "deaths" : deaths,
        "recovered" : recovered
    };
}