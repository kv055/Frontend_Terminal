let creator = (array)=>{
    console.log(array);

        let DataSetCrossings ={
            x : array.Time, 
            y : array.AssetValue,
            mode : 'marker',
            type : 'scatter',
            name: 'Indicator',
        }


    return DataSetCrossings
}
export default creator