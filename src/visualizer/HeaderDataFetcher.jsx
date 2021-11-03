let dataFetcherHeader = () => {
    // const listDataSources = props.DataSources.map((element) => {

    // })
    // const listAssetPairs = props.AssetPairs.map((element) => {

    // })

    return(
        <div style={{
            borderBottom: 'solid',
            borderWidth: '2px'
        }}>
            <h2 style={{}}>Data Fetcher</h2>
            <ul>
                <li>
                    <p style={{
                        textAlign: 'left'
                }}>
                        Data-Source:
                    </p>
                </li>
                <li>
                    <p style={{textAlign: 'center'}}>Asset-Pair:</p>
                </li>
                <li>
                    <p style={{textAlign: 'right'}}>Configuration:</p>
                </li>
            </ul>
        </div>
    )
}

export default dataFetcherHeader