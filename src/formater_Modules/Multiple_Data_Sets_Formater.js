let creator = (array)=>{
    let plotlyDataSet = []
    for (let index in array){   
        let DataSet ={
            x : array[index].time, 
            y : array[index].value,
            mode : 'lines',
            type : 'scatter'
        }
        plotlyDataSet.push(DataSet)
    }
    return plotlyDataSet
}
export default creator