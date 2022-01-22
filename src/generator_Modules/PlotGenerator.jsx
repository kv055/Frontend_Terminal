import Plot from 'react-plotly.js';
// import { Container,Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

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