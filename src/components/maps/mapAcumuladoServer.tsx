import fs from 'fs';
import path from 'path';
import MapAcumulado from "./acumulado";
import { FeatureCollection, Feature, Geometry, Point } from 'geojson';

interface PropertiesBacias {
    label: string;
}

interface Props {
    bacias: FeatureCollection<Geometry, PropertiesBacias>;
    countries: FeatureCollection<Geometry>;
}

async function getAcumulado() {
    const filePath = path.join(process.cwd(), 'public', 'data/acumulado/data.geojson');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const acumulado = JSON.parse(jsonData);
    if (!acumulado) {
        throw new Error('Failed to fetch data')
    }
    return acumulado
}

export default async function MapAcumuladoServer({ countries, bacias }: Props) {
    const acumulado = await getAcumulado()
    return <MapAcumulado bacias={bacias} countries={countries} preciptation={acumulado} />
}