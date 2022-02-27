let creator = (array,config)=>{
        let DataSetCrossings ={
            x : array.Time, 
            y : array.AssetPrice,
            mode : 'markers',
            type : 'scatter',
            name: config.Indicator1.symbol+' '+config.Period1+' '+config.Indicator2.symbol+' '+config.Period2,
            id: config.id
        }

    return DataSetCrossings
}
export default creator