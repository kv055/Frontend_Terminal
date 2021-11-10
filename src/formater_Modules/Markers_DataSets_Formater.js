let creator = (array)=>{
    console.log(array);

        let DataSetCrossings ={
            x : array.Time, 
            y : array.AssetValue,
            mode : 'markers',
            type : 'scatter',
            name: 'Indicator',
        }


    return DataSetCrossings
}
export default creator