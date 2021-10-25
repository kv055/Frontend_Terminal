let creator = (element)=>{
    // For input dataset(multiple indicators) Object
    // let giveback =[]
    // for element create
    // let dataset = {}
    // givepack.push(dataset)
    
    let giveBack ={
        x : element.time, 
        y : element.value,
        mode : 'lines',
        type : 'scatter' 
    }
    return [giveBack]
}
export default creator