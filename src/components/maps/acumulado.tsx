"use client"
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { FeatureCollection, Feature, Geometry, Point } from 'geojson';

interface PropertiesBacias {
    label: string;
}

interface PropertiesPrec {
    color: string;
}

interface Props {
    preciptation: FeatureCollection<Geometry, PropertiesPrec>;
    bacias: FeatureCollection<Geometry, PropertiesBacias>;
    countries: FeatureCollection<Geometry>;
}

export default function MapAcumulado({ preciptation, countries, bacias }: Props) {
    // console.log(preciptation.features[0])
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [loading, setLoading] = useState(true)
    const width = 400;
    const height = 300;
    useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current).attr('viewBox', [0, 0, width, height])
                .attr('preserveAspectRatio', 'xMidYMid meet');
            const projection = d3.geoMercator().fitExtent([[10, 10], [width, height - 10]], bacias)
            const pathGenerator = d3.geoPath(projection)
            // preciptation
            svg.selectAll("circle")
                .data(preciptation.features)
                .enter().append("circle")
                .attr("cx", d => {
                    const coordinates = (d.geometry as Point).coordinates;
                    const projected = projection(coordinates as [number, number]);
                    return projected ? projected[0] : 0;
                })
                .attr("cy", d => {
                    const coordinates = (d.geometry as Point).coordinates;
                    const projected = projection(coordinates as [number, number]);
                    return projected ? projected[1] : 0;
                })
                .attr("r", 1)
                .style("fill", d => d.properties.color)
            // countries
            svg.selectAll("path.countries")
                .data(countries.features).enter().append("path")
                .attr("d", pathGenerator)
                .attr('fill', 'none')
                .attr('stroke', 'black')
            // // Bacias
            svg.selectAll("path.bacia")
                .data(bacias.features).enter().append("path")
                .attr("d", pathGenerator)
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .style("stroke-width", 2)
            setLoading(false)
        }
    }, [ bacias, countries.features, preciptation.features])
    return (
        <div className="border-4 h-fit" >
            <div className="px-4 pb-4">
                <h3>Acumulado 2024</h3>
            </div>
            {loading && <div role="status" className="animate-pulse p-4" >
                <div className="bg-gray-200 dark:bg-gray-400" style={{ width: '100%', height: height }}></div>
            </div>}
            <svg ref={svgRef} />
        </div>
    )
}