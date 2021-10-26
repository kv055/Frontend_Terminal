import Plot from 'react-plotly.js';

const Generator = (props) => {
    return(
        <Plot 
            data={props.dataSet}
            layout={props.layoutSet}
            config = {{
                responsive: true,
                scrollZoom: true
            }}
        />
    )
}
export default Generator