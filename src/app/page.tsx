import fs from 'fs';
import path from 'path';

import MapAnomalySvg from "@/components/maps/mapAnomalySvg"


async function getCountries() {
  const filePath = path.join(process.cwd(), 'public', 'data/countries.geojson');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const countries = JSON.parse(jsonData);
  if (!countries) {
    throw new Error('Failed to fetch data')
  }
  return countries
}

async function getBacias() {
  const filePath = path.join(process.cwd(), 'public', 'data/bacias.geojson');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const bacias = JSON.parse(jsonData);
  if (!bacias) {
    throw new Error('Failed to fetch data')
  }
  return bacias
}

export default async function Home() {
  const countries = await getCountries()
  const bacias = await getBacias()

  return (
    <div className="border-4 border-red-500 h-full w-full container mx-auto py-4 grid gap-3 grid-cols-5">
      <div className='col-span-5 2xl:col-span-3' >
        <MapAnomalySvg bacias={bacias} countries={countries} />

      </div>
      <div className="col-span-5 2xl:col-span-2 grid gap-3">
        <div className='bg-lime-500'>Map acumulado</div>
        <div className='bg-blue-500'>Map mediana</div>
      </div>

    </div>
  )
}
