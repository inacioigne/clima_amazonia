"use client"
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { FeatureCollection, Feature, Geometry, GeometryCollection } from 'geojson';

interface PropertiesBacias {
    label: string;
}

interface PropertiesPrec {
    color: string;
}

interface Props {
    bacias: FeatureCollection<Geometry, PropertiesBacias>;
    countries: FeatureCollection<Geometry>;
}

export default function MapAnomalySvg({ bacias, countries, }: Props) {
    const [loading, setLoading] = useState(false)

    const svgRef = useRef();
    const width = 800;
    const height = 600;

    useEffect(() => {
        const svg = d3.select(svgRef.current).attr('viewBox', [0, 0, width, height])
            .attr('preserveAspectRatio', 'xMidYMid meet');
        const projection = d3.geoMercator().fitExtent([[40, 10], [width, height - 20]], bacias)
        const pathGenerator = d3.geoPath(projection)
        svg.selectAll('*').remove();

        const loadData = async () => {
            setLoading(true)
            try {
                const response = await fetch('data/preciptation.geojson');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: FeatureCollection<Geometry, PropertiesPrec> = await response.json();

                svg.selectAll("circle")
                    .data(data.features)
                    .enter().append("circle")
                    .attr("cx", d => projection(d.geometry.coordinates)[0])
                    .attr("cy", d => projection(d.geometry.coordinates)[1])
                    .attr("r", 2)
                    .style("fill", d => d.properties.color)

                svg.selectAll("path.country")
                    .data(countries.features).enter().append("path")
                    .attr("d", pathGenerator)
                    .attr('fill', 'none')
                    .attr('stroke', 'black')

                svg.selectAll("path.bacia")
                    .data(bacias.features).enter().append("path")
                    .attr("d", pathGenerator)
                    .attr('fill', 'none')
                    .attr('stroke', 'black')
                    .style("stroke-width", 2)

                svg.selectAll("text")
                    .data(bacias.features)
                    .enter().append("text")
                    .attr("x", d => projection(d3.geoCentroid(d))[0])
                    .attr("y", d => projection(d3.geoCentroid(d))[1])
                    .attr("dy", ".35em")
                    .attr("font-size", "10px")
                    .attr("text-anchor", "middle")
                    .text(d => d.properties.label);


            } catch (error) {
                console.error('Error fetching GeoJSON data:', error);
            }
            setLoading(false)

        };

        loadData();
    }, [])

    return (
        <div >
            <div className="px-4 pb-4">

                <h3>Anomalia de chuva categorizada</h3>
                <p className="font-serif">Período: 26/03/2024 - 24/04/2024</p>
            </div>
            {loading && <div role="status" className="animate-pulse p-4" >
                <div className="bg-gray-200 dark:bg-gray-400 " style={{ width: '100%', height: height }}></div>
            </div>}
            <svg ref={svgRef} style={loading ? { display: "none" } : { width: '100%', height: 'auto' }} />

            <div className="border-black flex flex-wrap justify-center pt-2" >
                <div>
                    <div className="w-8 h-4" style={{ backgroundColor: '#8C1F28' }} />
                    <div className={"text-xs text-center"}>
                        -3
                    </div>
                </div>
                <div>
                    <div className="w-8 h-4" style={{ backgroundColor: '#F23030' }} />
                    <div className={"text-xs text-center"}>
                        -2.5
                    </div>
                </div>
                <div>
                    <div className="w-8 h-4" style={{ backgroundColor: '#F28705' }} />
                    <div className={"text-xs text-center"}>
                        -2
                    </div>
                </div>
                <div>
                    <div className="w-8 h-4" style={{ backgroundColor: '#F29F05' }} />
                    <div className={"text-xs text-center"}>
                        -1.5
                    </div>
                </div>
                <div>
                    <div className="w-8 h-4" style={{ backgroundColor: '#F2CB05' }} />
                    <div className={"text-xs text-center"}>
                        -1
                    </div>
                </div>
                <div>
                    <div className="w-8 h-4" style={{ backgroundColor: '#F2E3D5' }} />
                    <div className={"text-xs text-center"}>
                        -0.5
                    </div>
                </div>
                <div>
                    <div className="w-8 h-4 bg-slate-50" />
                </div>
                <div>
                    <div className="w-8 h-4" style={{ backgroundColor: '#9BDAF2' }} />
                    <div className={"text-xs text-center"}>
                        0.5
                    </div>
                </div>
                <div>
                    <div className="w-8 h-4" style={{ backgroundColor: '#8dd5f0' }} />
                    <div className={"text-xs text-center"}>
                        1
                    </div>
                </div>
                <div>
                    <div className="w-8 h-4" style={{ backgroundColor: '#79BED9' }} />
                    <div className={"text-xs text-center"}>
                        1.5
                    </div>
                </div>
                <div>
                    <div className="w-8 h-4" style={{ backgroundColor: '#6CAFD9' }} />
                    <div className={"text-xs text-center"}>
                        2
                    </div>
                </div>
                <div>
                    <div className="w-8 h-4" style={{ backgroundColor: '#418FBF' }} />
                    <div className={"text-xs text-center"}>
                        2.5
                    </div>
                </div>
                <div>
                    <div className="w-8 h-4" style={{ backgroundColor: '#0A6AA6' }} />
                    <div className={"text-xs text-center"}>
                        3
                    </div>
                </div>
            </div>

        </div>



    )

}