// import {useState} from 'react';

let CheckIfSeperateGraphNeedsToBeRendered = (config) => {
    // const [RenderGraph, setRenderGraph] = useState(['false'])
    const lol = []
    let ListofIndicatorsWhereSeperateGraphNeedsToBeRendered = [
        'ADX',
        'ADXR',
        'AROONOSC',
        'BOP',
        'CCI',
        'RSI'
    ]
    ListofIndicatorsWhereSeperateGraphNeedsToBeRendered.forEach(Indicator => {
        if (config.selectedIndicator.symbol === Indicator) {
            lol.push(true)
        }
    })

    return lol[lol.length -1]
}
export default CheckIfSeperateGraphNeedsToBeRendered