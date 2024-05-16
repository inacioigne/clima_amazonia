'use client'
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import coordLimite from '@/data/coordLimite.json'
import countries from "@/data/countries.json"
import new_prec from "@/data/new_prec.json"
import bacias from "@/data/bacias.json"
import "../app/globals.css";

const width = 800
const height = 600

export default function MapAnomalia() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", zoomed);
        const canvas = d3.select(canvasRef.current).call(zoom);
        const context = canvas.node().getContext('2d');


        const projection = d3.geoEquirectangular()
            // .fitSize([width, height], baciasLimites)
            .fitExtent([[0, 0], [width, height]], coordLimite);

        const path = d3.geoPath()
            .projection(projection)
            .context(context)
            .pointRadius(width * 0.002)
        // .call(zoom)


        function zoomed(event) {
            // console.log(event)
            context.clearRect(0, 0, width, height);
            context.save();
            context.translate(event.transform.x, event.transform.y);
            context.scale(event.transform.k, event.transform.k);

            new_prec.features.forEach(f => {
                context.beginPath(),
                    path(f),
                    (context.fillStyle = f.properties.color),
                    context.fill();
            });
            countries.features.forEach(feature => {
                context.beginPath();
                path(feature);
                context.strokeStyle = 'black';
                context.lineWidth = 1;
                context.stroke();
            });
            bacias.features.forEach(feature => {
                const centroid = path.centroid(feature);
                // console.log(feature.properties.label, centroid)
                context.beginPath();
                path(feature);
                context.strokeStyle = 'black';
                context.lineWidth = 1;
                context.stroke();
                context.font = "12px Arial";
                context.fillStyle = "black";
                context.textAlign = "center";
                context.fillText(feature.properties.label, centroid[0], centroid[1])
            });

            context.restore();
        }

        context.clearRect(0, 0, width, height);
        context.fillStyle = `rgba(17, 90, 246, 0.1)`;

        new_prec.features.forEach(f => {
            context.beginPath(),
                path(f),
                (context.fillStyle = f.properties.color),
                context.fill();
        });

        countries.features.forEach(feature => {
            context.beginPath();
            path(feature);
            context.strokeStyle = 'black';
            context.lineWidth = 1;
            context.stroke();
        });

        bacias.features.forEach(feature => {
            const centroid = path.centroid(feature);
            // console.log(feature.properties.label, centroid)
            context.beginPath();
            path(feature);
            context.strokeStyle = 'black';
            context.lineWidth = 2;
            context.stroke();
            context.font = "12px Arial";
            context.fillStyle = "black";
            context.textAlign = "center";
            context.fillText(feature.properties.label, centroid[0], centroid[1])
        });



    }, [])


    return (
        <div style={{ width: width, height:  height}}>
            <div className="pb-4">
                <h3>Anomalia de chuva categorizada</h3>
                <p className="font-serif">Período: 26/03/2024 - 24/04/2024</p>
            </div>
            <canvas
                ref={canvasRef}
                width={width} height={height}
            />
            <div className="flex flex-wrap justify-center pt-2" >
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