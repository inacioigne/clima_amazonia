"use client"
import { useRef, useEffect, useState } from "react";
import * as d3 from 'd3';
import { FeatureCollection, Feature, Geometry, GeometryCollection } from 'geojson';
import { Suspense } from 'react';

const width = 800
const height = 600
interface PropertiesPrec {
    color: string;
}
interface PropertiesBacias {
    label: string;
}
interface Prpos {
    limits: FeatureCollection<Geometry>;
    // prec: FeatureCollection<Geometry, PropertiesPrec>
    countries: FeatureCollection<Geometry>;
    bacias: FeatureCollection<Geometry, PropertiesBacias>;

}


export default function RainAnomaly({ limits, countries, bacias }: Prpos) {
    const [suspense, setSuspense] = useState(false)
    const [prec, setPrec] = useState<FeatureCollection<Geometry, PropertiesPrec> | null>(null)
    const canvasRef = useRef(null);

    async function fetchData() {
        const res = await fetch('data/prec.geojson');
        const result = await res.json();
        setPrec(result);
    }

    useEffect(() => {
        const canvas = d3.select(canvasRef.current)
        const node = canvas.node() as HTMLCanvasElement | null;
        const projection = d3.geoEquirectangular()
            .fitExtent([[0, 0], [width, height]], limits);
        if (node !== null) {
            const context = node.getContext('2d');
            if (context !== null) {
                setSuspense(true)
                const path = d3.geoPath()
                    .projection(projection)
                    .context(context)
                    .pointRadius(width * 0.002);
                context.clearRect(0, 0, width, height);
                context.fillStyle = `rgba(17, 90, 246, 0.1)`;
                // Precipitação
                const fetchGeoData = async () => {
                    try {
                        const response = await fetch('data/prec.geojson');
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const data: FeatureCollection<Geometry, PropertiesPrec> = await response.json();
                        data.features.forEach(feature => {
                            context.beginPath(),
                                path(feature),
                                (context.fillStyle = feature.properties.color),
                                context.fill();
                        });
                        // countries
                        countries.features.forEach(feature => {
                            context.beginPath();
                            path(feature);
                            context.strokeStyle = 'black';
                            context.lineWidth = 1;
                            context.stroke();
                        });
                        // bacias
                        bacias.features.forEach(feature => {
                            const centroid = path.centroid(feature);
                            context.beginPath();
                            path(feature);
                            context.strokeStyle = 'black';
                            context.lineWidth = 2;
                            context.stroke();
                            context.font = "bold 14px Arial";
                            context.fillStyle = "black";
                            context.textAlign = "center";
                            context.fillText(feature.properties.label, centroid[0], centroid[1])
                        });
                    } catch (error) {
                        console.error('Error fetching GeoJSON data:', error);
                    }
                };

                fetchGeoData()




            }
        }
    }, [])

    return (
        <>
            {!suspense && <div role="status" className="max-w-sm animate-pulse">
                <div className="h-96 bg-gray-200 dark:bg-gray-400 mb-4" style={{ width: width }}></div>
            </div>}
            <div style={suspense ? { display: 'block', width: width, height: height } : { display: 'none' }}>
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                />
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

        </>


    )


}