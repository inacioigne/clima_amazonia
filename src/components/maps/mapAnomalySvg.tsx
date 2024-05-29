"use client"
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { FeatureCollection, Feature, Geometry, GeometryCollection, Point, Position } from 'geojson';

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

    const svgRef = useRef<SVGSVGElement | null>(null);
    const width = 800;
    const height = 600;

    function safeProjection(geometry: Feature<Geometry>, projection: d3.GeoProjection): [number, number] {
        const centroid = d3.geoCentroid(geometry);
        if (centroid) {
            const projected = projection(centroid as [number, number]);
            if (projected) {
                return projected;
            }
        }
        console.error('Projection or centroid is null');
        return [0, 0]; // Valor padrão em caso de erro
    }

    useEffect(() => {
        if (svgRef.current) {
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

                    bacias.features.forEach(feature => {
                        const [x, y] = safeProjection(feature, projection);
                        const group = svg.append('g').attr('transform', `translate(${x}, ${y})`);
                        const text = group.append('text')
                            .text(feature.properties.label || '')
                            .attr("font-size", "10px")
                            .attr('text-anchor', 'middle') // Centraliza o texto
                            .attr('dy', '.35em'); // Ajusta a posição vertical
                        // Verifique se o nó de texto existe antes de obter seu tamanho
                        const textNode = text.node();
                        if (textNode) {
                            const bbox = textNode.getBBox();

                            // Adicione um retângulo de fundo
                            group.insert('rect', 'text')
                                .attr('x', bbox.x - 2) // Pequena margem
                                .attr('y', bbox.y - 2)
                                .attr('width', bbox.width + 4) // Ajuste para a margem
                                .attr('height', bbox.height + 4)
                                .attr('fill', 'lightgrey'); // Cor de fundo

                            // Reposicione o texto para estar acima do retângulo de fundo
                            text.raise();
                        } else {
                            console.error('Text node is null');
                        }
                    })
                


                } catch (error) {
                    console.error('Error fetching GeoJSON data:', error);
                }
                setLoading(false)

            };
            loadData();

        }






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