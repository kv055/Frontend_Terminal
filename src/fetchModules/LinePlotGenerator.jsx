import Plot from 'react-plotly.js';

const Generator = (props) => {
    // console.log('props: ',props);
    return(
        // <p>Test</p>
        <Plot
            data={[{
                x: props.plotlyObj[1],
                y: props.plotlyObj[0],
                mode: "lines",
                type: "scatter"
            }]}
            
            config = {{
                responsive: true,
                scrollZoom: true
            }}

        /> 

    )
}
export default Generator