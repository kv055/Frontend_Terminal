import Plot from 'react-plotly.js';

const Generator = (props) => {
    for (let index in props){   
        return( 
            <Plot 
                data={props[index].dataSet}
                config = {{
                    responsive: true,
                    scrollZoom: true
                }}
            />
        ) 
    }
}
export default Generator