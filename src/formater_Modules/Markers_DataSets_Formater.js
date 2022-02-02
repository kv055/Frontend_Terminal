let creator = (array,config)=>{
        let DataSetCrossings ={
            x : array.Time, 
            y : array.AssetPrice,
            mode : 'markers',
            type : 'scatter',
            name: config.Strategy
        }

    return DataSetCrossings
}
export default creator