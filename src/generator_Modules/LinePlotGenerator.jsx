import Plot from 'react-plotly.js';
import LineFormater from '../formater_Modules/Line_Formater'

let Generator = (props) => {
    //The Data that has been fetche from the backend gets passed into the formater function
    let formated = LineFormater(props.plotlyObj)
    // This Data gets ddirectly passed into the Plotly Component
    // console.log(formated);
    return( 
        <Plot data={formated}/>
    )
}

// let Generator = (props) => {
//     // This Data gets ddirectly passed into the Plotly Component
//     console.log(props.plotlyObj);
//     return( 
//         <Plot data={props.plotlyObj}/>
//     )
// }
export default Generator