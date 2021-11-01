let creator = (array)=>{

    let plotlyDataSet = []
   
    // array.forEach(element => {
    //     let DataSet ={
    //         x : element.time, 
    //         y : element.value,
    //         mode : 'lines',
    //         type : 'scatter' 
    //     }
    //     plotlyDataSet.push(DataSet)
    // });
    
    for (let index in array){   
        let DataSet ={
            x : array[index].time, 
            y : array[index].value,
            mode : 'lines',
            type : 'scatter',
            name: 'Indicator',
        }
        plotlyDataSet.push(DataSet)
    }
    
    return plotlyDataSet
}
export default creator