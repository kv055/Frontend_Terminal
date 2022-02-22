let creator = (array,config)=>{
    console.log(config);
    let plotlyDataSet = []
    for (let index in array){   
        let DataSet ={
            x : array[index].time, 
            y : array[index].value,
            mode : 'lines',
            type : 'scatter',
            name : (config.selectedIndicator.name +' '+ config.selectedPeriod),
            id: config.id
        }
        plotlyDataSet.push(DataSet)
    }
    return plotlyDataSet
}
export default creator