import Plot from 'react-plotly.js';

const Generator = (props) => {
    console.log(props);
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