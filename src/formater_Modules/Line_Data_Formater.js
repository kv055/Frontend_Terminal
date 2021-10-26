let creator = (element)=>{
    // For input dataset(multiple indicators) Object
    // let plotlyDataSet =[]
    // for element create
    // let dataset = {}
    // givepack.push(dataset)
    
    let plotlyDataSet ={
        x : element.time, 
        y : element.value,
        mode : 'lines',
        type : 'scatter' 
    }
    return [plotlyDataSet]
}
export default creator