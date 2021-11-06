let creator = (array)=>{
    console.log(array);

        let DataSetMax ={
            x : array.Time, 
            y : array.MAMax.Value,
            mode : 'lines',
            type : 'scatter',
            name: 'Indicator',
        }
        let DataSetMin ={
            x : array.Time, 
            y : array.MAMin.Value,
            mode : 'lines',
            type : 'scatter',
            name: 'Indicator',
        }

    console.log([DataSetMax,DataSetMin]);
    return [DataSetMax,DataSetMin]
}
export default creator