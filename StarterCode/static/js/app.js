//read in json file and display to console
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then((data) => {
    console.log(data);
});


function init() {
    let dropDown = d3.select("#selDataset");

    d3.json(url).then((data) => {
    
        let names = data.names;

        names.forEach((id) => {
            console.log(id);

            dropDown.append("option")
            .text(id)
            .property("value", id);
        });

        firstSample = 940

        console.log(firstSample);

        createChart(firstSample);
    });
};

function createChart(sample) {
    d3.json(url).then((data) => {
        let samples = data.samples;
        let sampleValues = samples.filter(object => object.id == sample);
        let sampleData = sampleValues[0]

        let ids = sampleData.otu_ids;
        let labels = sampleData.otu_labels;
        let values = sampleData.sample_values;

        let trace1 = {
            x: values.slice(0, 10).reverse(),
            y: ids.map(id => `OTU ${id}`)
            .slice(0,10)
            .reverse(),
            text: labels.slice(0,10).reverse(),
            type: 'bar',
            orientation:'h'
        };

        let traceData1 = [trace1];

        let layout = {
            title: "Top Ten OTUs per Sample"
        };

        Plotly.newPlot("bar", traceData1, layout)
    });
};

function optionChanged(value) {
    console.log(value);

    createChart(value);
}



/*function getData() {
    let dropdown = d3.select("#selDataset");
    let dataset = dropdown.property("value");
    let data = [];
    for(i=0; i<dropdown.options.length; i++) {
        if (dataset == dropdown.options[i]) (
             data = this.values(data.i)
        );
    };
    updatePlotly(data);
};

function updatePlotly(newdata) {
    Plotly.restyle("bar", "values", [newdata]);
};
*/
init()
