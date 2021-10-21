import {useState, useEffect} from 'react';

import DataFetch from './fetchModules/DataFetch'

//Plot Generator Modules
import LinePlot from './fetchModules/LinePlotGenerator'
import OHLCPlot from './fetchModules/OHLCPlotGenerator'
import BarPlot from './fetchModules/BarPlotGenerator'

function App() {

  // Get OHLC Data, formate it for Plotly and write it into a State-Variable
  //Fetch and save Indicator Data
  const [Indicator, setIndicator] = useState({
    isLoading: true
  })

  useEffect(() => {
    let asyncRuntime = async () => {
      let setter = await DataFetch('http://127.0.0.1:5000/Indicators')
      // console.log('setter: ',setter);
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
  let LineChart = Indicator.isLoading === true ? 
    <p>Loading</p>  : 
    <LinePlot plotlyObj={Indicator.data.Indicators} />

  let OHLCChart = OHLC.isLoading === true ? 
    <p>Loading</p>  : 
    <OHLCPlot plotlyObj={OHLC.data.OHLC} />

  let SimulationChart = Simulation.isLoading === true ? 
    <p>Loading</p>  : 
    <BarPlot plotlyObj={Simulation.data.Simulation} />


  console.log(OHLCPlot);
  return (
    <div className="App">
      {[LineChart]}
      {[OHLCChart]}
      {[SimulationChart]}
    </div>
  );
}

export default App;