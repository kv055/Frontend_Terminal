import {useState, useEffect} from 'react';
import DataFetch from './fetch_Modules/DataFetch'

//DataSet Formater modules
import LineFormater  from './formater_Modules/Line_Formater'

//Plot Generator Modules
import LinePlot from './generator_Modules/LinePlotGenerator'
import OHLCPlot from './generator_Modules/OHLCPlotGenerator'
import BarPlot from './generator_Modules/BarPlotGenerator'
import LineTest from './generator_Modules/lineTest'

function App() {

  // Get OHLC Data, formate it for Plotly and write it into a State-Variable
  //Fetch and save Indicator Data
  const [Indicator, setIndicator] = useState({
    isLoading: true
  })

  useEffect(() => {
    let asyncRuntime = async () => {
      let setter = await DataFetch('http://127.0.0.1:5000/Indicators')
      let newIndicator = {
        isLoading: false,
        data: setter
      }
      setIndicator(newIndicator)
    }
    asyncRuntime()
  },[])

  //Fetch and save OHLC Data
  const [OHLC, setOHLC] = useState({
    isLoading: true
  })
  
  useEffect(() => {
    let asyncRuntime = async () => {
      let setter = await DataFetch('http://127.0.0.1:5000/OHLC')
      // console.log('setter: ',setter);
      let newOHLC = {
        isLoading: false,
        data: setter
      }
      setOHLC(newOHLC)
    }
    asyncRuntime()
  },[])  

  //Fetch and save Simulator Data
  const [Simulation, setSimulation] = useState({
    isLoading: true
  })

  useEffect(() => {
    let asyncRuntime = async () => {
      let setter = await DataFetch('http://127.0.0.1:5000/Simulation')
      // console.log('Simulation: ',setter);
      let newSimulaton = {
        isLoading: false,
        data: setter
      }
      setSimulation(newSimulaton)
    }
    asyncRuntime()
  },[])

  // Conditional Rendering Varables

  let OHLCChart = OHLC.isLoading === true ? 
    <p>Loading</p>  : 
    <OHLCPlot plotlyObj={OHLC.data.OHLC} />

  let SimulationChart = Simulation.isLoading === true ? 
    <p>Loading</p>  : 
    <BarPlot plotlyObj={Simulation.data.Simulation} />

  let LineChart = Indicator.isLoading === true ? 
    <p>Loading</p>  : 
    <LinePlot plotlyObj={Indicator.data.Indicators}/>

  let Lin = Indicator.isLoading === true ? 
  <p>Loading</p>  : 
  <LineTest plotlyObj={LineFormater(Indicator.data.Indicators)}/>


  return (
    <div className="App">
      {[OHLCChart]}
      {[SimulationChart]}
      {LineChart}
      {Lin}
    </div>
  );
}

export default App;