import Plot from 'react-plotly.js';

let Generator = (props) => {
    // This Data gets ddirectly passed into the Plotly Component
    return( 
        <Plot 
            data={props.dataSet}
            config = {{
                responsive: true,
                scrollZoom: true
            }}
        />
    )
}
export default Generator