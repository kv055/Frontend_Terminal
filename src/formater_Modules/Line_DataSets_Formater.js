let creator = (array)=>{
    console.log(array);

        let DataSetCrossings ={
            x : array.time, 
            y : array.value,
            mode : 'lines',
            type : 'scatter',
            name: 'Indicator',
        }


    return DataSetCrossings
}
export default creator