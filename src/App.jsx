import { useState, useEffect } from "react";
import { csv, arc, pie} from 'd3'

//had cors problems with my github gist, so used curran's
const csvUrl = "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv" 

const App = () => {
    //global variables and states
    const [data, setData] = useState(null)
    const [svgWidth, setSvgWidth] = useState(window.innerWidth) //for responsivity
    const [svgHeight, setSvgHeight] = useState(window.innerHeight) //for responsivity
    const centerX = svgWidth / 2
    const centerY = svgHeight / 2

    //for responsivity
    const handleResize = () => {
        setTimeout(() => setSvgWidth(window.innerWidth), 10)
        setTimeout(() => setSvgHeight(window.innerHeight), 10)
    }
    window.addEventListener('resize', handleResize)    

    //fetch data
    useEffect(() => {
        csv(csvUrl).then(setData)
    }, [])

    // render no data
    if (!data) {
        return <pre>Loading...</pre>
    }    

    //pie only variables
    const pieArc = arc().innerRadius(0).outerRadius(svgWidth / 5)
    const colorPie = pie().value(1)
    
    // render pie colors
    return (
        <svg width={svgWidth} height={svgHeight}>
            <g transform={`translate(${centerX}, ${centerY})`}>
                {colorPie(data)
                .map((d, i) => (
                    <path
                        key={i}
                        fill={d.data['RGB hex value']}
                        d={pieArc(d)}
                    />
                ))}
            </g>
        </svg>
    );
}

export default App;
