let creator = (object)=>{
    let plotlyDataSet = []

    object.StatisticsModel.forEach(element => {
        let DataSet ={
            x : element.Time, 
            y : element.Value,
            mode : 'lines',
            type : 'scatter',
            name : element.Asset,
            id: object.Config.id
        }
        plotlyDataSet.push(DataSet)
    });

    return plotlyDataSet
}
export default creator