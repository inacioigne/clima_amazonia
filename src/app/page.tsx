import fs from 'fs';
import path from 'path';
import Image from "next/image"
import { Container } from '@mui/material';

async function getLegenda() {
  const filePath = path.join(process.cwd(), 'public', 'data/legenda.json')
  const jsonData = fs.readFileSync(filePath, 'utf8')
  const legenda = JSON.parse(jsonData)
  return legenda

}

interface Legenda {
  id: number
  nome: string
  cor: string
}


export default async function Home() {
  const legendas: Legenda[][] = await getLegenda()
  // console.log(legenda)

  return (
    <Container >
      <div className="flex gap-5 flex-col sm:flex-row py-5">
        <div className="">
          <h1 className="text-lg">Anomalia de chuva categorizada</h1>
          <h3>Período: 07/05/2024 - 05/06/2024</h3>
          <Image
            src="/image/anomaly.png"
            alt={"anomaly"}
            width={600}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className={"flex  flex-col gap-3"}>
          <Image
            src="/image/acumulado.png"
            alt={"anomaly"}
            width={400}
            height={200}
            className="rounded-lg shadow-lg"
          />
          <Image
            src="/image/mediana.png"
            alt={"anomaly"}
            width={400}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
        <div className="flex gap-3 flex-col sm:flex-row justify-center items-center">
          {legendas.map((table, id) => (
            <table className="table-auto w-56 border-separate border-spacing-2 border border-slate-500" key={id}>
              <tbody>
                {
                  table.map((bacia, index) => (
                    <tr key={index}>
                      <td className="border border-slate-600 px-1">{bacia.id}</td>
                      {bacia?.cor === 'bg-blue-500' &&
                      <td className={`border border-slate-600 px-1 bg-blue-500`}>{bacia.nome}</td> }
                      {bacia?.cor === 'bg-amber-500' &&
                      <td className={`border border-slate-600 px-1 bg-amber-500`}>{bacia.nome}</td> }
                      {bacia?.cor === 'bg-neutral-50' &&
                      <td className={`border border-slate-600 px-1 bg-neutral-50`}>{bacia.nome}</td> }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          ))}
        </div>
    </Container>
    
  )
}
