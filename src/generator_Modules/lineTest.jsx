import Plot from 'react-plotly.js';


let Generator = (props) => {
    // This Data gets ddirectly passed into the Plotly Component
    console.log(props.plotlyObj);
    return( 
        <Plot data={props.plotlyObj}/>
    )
}
export default Generator