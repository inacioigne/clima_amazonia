import fs from 'fs';
import path from 'path';
import RainAnomaly from './rainAnomaly';
// import { Suspense } from 'react';

export async function fetchRevenue() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

async function getData() {
  const filePath = path.join(process.cwd(), 'public', 'data/coordLimite.geojson');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  if (!data) {
    throw new Error('Failed to fetch data')
  }
  return data
}

// async function getPrec() {
//   const filePath = path.join(process.cwd(), 'public', 'data/prec.geojson');
//   const jsonData = fs.readFileSync(filePath, 'utf8');
//   const prec = JSON.parse(jsonData);
//   if (!prec) {
//     throw new Error('Failed to fetch data')
//   }
//   return prec
// }

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



export default async function Map() {
  // const revenue = await fetchRevenue()
  const limits = await getData()
  // const prec = await getPrec()
  const countries = await getCountries()
  // console.log(countries)
  const bacias = await getBacias()

  return (
    <div>
      <div className="pb-4">
        <h3>Anomalia de chuva categorizada</h3>
        <p className="font-serif">Período: 26/03/2024 - 24/04/2024</p>
      </div>

      <RainAnomaly
        limits={limits}
        // prec={prec} 
        countries={countries} bacias={bacias} />
    </div>
  )
}
