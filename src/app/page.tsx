import fs from 'fs';
import path from 'path';

import MapAnomalySvg from "@/components/maps/mapAnomalySvg"
import MapAcumulado from '@/components/maps/acumulado';
import MapAcumuladoServer from "@/components/maps/mapAcumuladoServer"


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

async function getPreciptation() {
  const filePath = path.join(process.cwd(), 'public', 'data/preciptation.geojson');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const preciptation = JSON.parse(jsonData);
  if (!preciptation) {
    throw new Error('Failed to fetch data')
  }
  return preciptation
}

// async function getAcumulado() {
//   const filePath = path.join(process.cwd(), 'public', 'data/acumulado/data.geojson');
//   const jsonData = fs.readFileSync(filePath, 'utf8');
//   const acumulado = JSON.parse(jsonData);
//   if (!acumulado) {
//     throw new Error('Failed to fetch data')
//   }
//   return acumulado
// }

export default async function Home() {
  const countries = await getCountries()
  const bacias = await getBacias()
  const preciptation = await getPreciptation()
  // const acumulado = await getAcumulado()

  return (
    <div className="h-full w-full container mx-auto py-4 grid gap-3 grid-cols-5">
      <div className='col-span-5 2xl:col-span-3' >
        <MapAnomalySvg bacias={bacias} countries={countries} preciptation={preciptation} />

      </div>
      <div className="grid col-span-5 2xl:col-span-2  gap-3">
        <div>
        {/* <MapAcumulado bacias={bacias} countries={countries} preciptation={acumulado} /> */}
        <MapAcumuladoServer bacias={bacias} countries={countries} />
        <div className='bg-blue-500'>Map mediana</div>

        </div>
        
      </div>

    </div>
  )
}
