import Plot from 'react-plotly.js';

const Generator = (props) => {
    console.log(props.dataSet);
    return(
        // <p>Test</p>
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