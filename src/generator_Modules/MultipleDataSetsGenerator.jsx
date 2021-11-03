import Plot from 'react-plotly.js';

const Generator = (props) => {
    console.log(props);
    return( 
        <div style={{
            borderStyle: 'solid',
            borderWidth: '2px'
        }}>
            <Plot 
                data={props.dataSet}
                config = {{
                    responsive: true,
                    scrollZoom: true
                }}
            />
        </div>
    )
}
export default Generator