let creator = (array)=>{
    console.log(array);

        let DataSetCrossings ={
            x : array.time, 
            y : array.assetValue,
            mode : 'markers',
            type : 'scatter',
            name: 'Indicator',
        }

    console.log(DataSetCrossings)
    return DataSetCrossings
}
export default creator