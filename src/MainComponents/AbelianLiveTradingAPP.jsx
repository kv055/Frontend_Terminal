//  import {useState} from 'react';
import { Col, Row  
    // ,Alert, Spinner
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

//  Plot Generator Modules
// import Plot from './generator_Modules/PlotGenerator'

import AbelianHeader from './visualizer/Abelian_Header'
import HeaderLiveDeployment from './visualizer/HeaderLiveDeployments'
// import HeaderIndicator from './visualizer/HeaderIndicatorFetcher'
import HeaderNewDeployment from './visualizer/DeployNewStrategy'
// import TradesHistory from './visualizer/TradesHistory'

// //Import and configure Environement variables
// let baseURL = process.env.NODE_ENV === 'production' ?
//   process.env.REACT_APP_DEPLOY_URL:
//   process.env.REACT_APP_DEV_URL

function LiveTesting(props) {
    //  const [CurrentyExecuting, setCurrentyExecuting] = useState({TradesListReadyToRender: false})
    //  const [PlotDataTraces, setPlotDataTraces] = useState([])
    //  const [PlotLayout, setPlotLayout] = useState([])
    //  const [SeparatePlot,setSeperatePlot] = useState({readyToRender: false})
    //  const [RedayToRenderSeperatePlot,setRedayToRenderSeperatePlot] = useState({readyToRender: false})
    //  const [SeparatePlotLayout,setSeparatePlotLayout] = useState([])

    // let OHLCChart = 2>1 === false ? 
    // <Alert variant='light'> <Row className='row justify-content-center'> <h4 style={{textAlign: 'center'}}>Loading Graph</h4> <Spinner animation="border" /> <Spinner animation="border" /> <Spinner animation="border" /> </Row> </Alert>  : 
    // <Plot 
    //     // dataSet={PlotDataTraces}
    //     // layoutSet={ PlotLayout.Layout }
    // />

//   let TradesList = 2>1 === false ?
//   <Alert variant='light'> <Row className='row justify-content-center'> <h4 style={{textAlign: 'center'}}>Loading Simulation</h4><Spinner animation="border" /> <Spinner animation="border" /> <Spinner animation="border" /> </Row> </Alert> :
    // <TradesHistory 
    //   dataSet={SimulationData.Simulation}
    //   config={SimulationData.config}
    // />

    return (
        <div className='LiveTesting'>
            <Row>
                <Col>
                 {<AbelianHeader SetBackend={props.Callback}/>}  
                 </Col>
                <Col>
                    <HeaderLiveDeployment />
                </Col>
                <Col>
                    <HeaderNewDeployment />
                </Col>
                 
            </Row>
             {/* <Row>
                 {OHLCChart}
                {SeperaterPlotToRender}
             </Row>
             <Row>
                 <Col>
                 <HeaderIndicator 
                //  childData={CallbackIndicatorFetch} traces={PlotDataTraces} deleteTraces={deleteDataTraces}
                />
                 </Col>
                 <Col>
                    <HeaderNewDeployment />
                 </Col>
            </Row> */}
             {/* {TradesList} */}
       </div>
    )
}

export default LiveTesting