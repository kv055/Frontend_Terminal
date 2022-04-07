import {useState} from 'react';
import { Col, Row  
    ,Alert, Spinner
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import POST from './fetch_Modules/DataFetchPOST'
//  Plot Generator Modules
import Plot from './generator_Modules/PlotGenerator'
import ModelsFormater from './formater_Modules/Models_Data_Set_Formater'
// import OHLC_Data_Formater from './formater_Modules/OHLC_Data_Formater'
// import OHLC_Layout from './formater_Modules/OHLC_Layout_Formater'
import AbelianHeader from './visualizer/Abelian_Header'
import HeaderDataAnalytics from './visualizer/HeaderDataAnalytics'
import HeaderModelsFetcher from './visualizer/HeaderModelsFetcher'

//Import and configure Environement variables
let baseURL = process.env.NODE_ENV === 'production' ?
  process.env.REACT_APP_DEPLOY_URL:
  process.env.REACT_APP_DEV_URL

function AnalyticsModule(props) {

  const [OHLCData, setOHLCData] = useState({OHLCChartReadyToRender: false})
  const [PlotDataTraces, setPlotDataTraces] = useState([])
  const [PlotLayout, setPlotLayout] = useState([])
  const [OHLCtoFetch, setOHLCtoFetch] = useState([])
  const [ModelsToRender,setModelsToRender] = useState([])

  // const [SeparatePlot,setSeperatePlot] = useState({readyToRender: false})
  // const [RedayToRenderSeperatePlot,setRedayToRenderSeperatePlot] = useState({readyToRender: false})
  // const [SeparatePlotLayout,setSeparatePlotLayout] = useState([])

  const CallbackOHLC = async (childData) =>{
    console.log(childData);
    setOHLCtoFetch(childData)
    
    // setOHLCData({
    //   OHLCChartReadyToRender: true
    // })
    // setPlotLayout({Layout: OHLC_Layout(ohlcFetched.OHLC, ohlcFetched.config)})
    // setPlotDataTraces([...PlotDataTraces, OHLC_Data_Formater(ohlcFetched.OHLC, ohlcFetched.config)])
  }

  const CallbackModelsFetch = async (childData) => {
    let ModelFetched = await POST(baseURL+'/Statistics', {
      'ModelConfig':childData,
      'OHLCConfig': OHLCtoFetch
    })
    // setModelsToRender(ModelFetched)
    let Formate2DataSet = ModelsFormater(ModelFetched)
    setPlotDataTraces(Formate2DataSet)
    setOHLCData({
      OHLCChartReadyToRender: true
    })
  }

  const deleteDataTraces = (id) => {
    console.log(id)
    let filtered = PlotDataTraces.filter(function(traceElement){
        return traceElement.id !== id})
    setPlotDataTraces(filtered)
  }
  console.log(PlotDataTraces);


  let ModelsChart = OHLCData.OHLCChartReadyToRender === false ? 
  <Alert variant='light'> <Row className='row justify-content-center'> <h4 style={{textAlign: 'center'}}>Loading Graph</h4> <Spinner animation="border" /> <Spinner animation="border" /> <Spinner animation="border" /> </Row> </Alert>  : 
    <Plot 
      dataSet={PlotDataTraces}
      // layoutSet={ PlotLayout.Layout }
    />

  
  return(
      <div className="App">
    <Row>
      <Col>
        {<AbelianHeader SetBackend={props.Callback}/>}  
      </Col>
      <Col>
        {<HeaderDataAnalytics childData={CallbackOHLC} traces={PlotDataTraces} deleteTraces={deleteDataTraces}/>}
      </Col>
    </Row>
    <Row>
      {ModelsChart}
      {/* {SeperaterPlotToRender} */}
    </Row>
    <Row>
      <Col>
        <HeaderModelsFetcher childData={CallbackModelsFetch} traces={ModelsToRender} deleteTraces={deleteDataTraces}/>
      </Col>
      {/* <Col>
        <HeaderSimulation childData={CallbackSimulationFetch} traces={PlotDataTraces} deleteTraces={deleteDataTraces}/>
      </Col> */}
    </Row>
  </div>
  )
}

export default AnalyticsModule;