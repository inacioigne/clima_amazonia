import fs from 'fs';
import path from 'path';
import Image from "next/image"
import { Container } from '@mui/material';
import Link from 'next/link';

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
  href: string
}


export default async function Home() {
  const legendas: Legenda[][] = await getLegenda()
  // console.log(legenda)

  return (
      <div className='py-5'>
        <h3 className='text-lg font-bold text-stone-950'>Condições atuais</h3>
        <p className='indent-8 text-justify'>Mapas das condições observadas de precipitação e gráficos individuais por bacias
          são produzidos a partir dos dados MERGE/GPM gerados pelo INPE/CPTEC,
          considerando como climatologia o período de 2000 a 2023. Entre os dias 7 de maio e
          5 de junho de 2024, permanece o quadro de chuvas abaixo da climatologia em grande parte
          da área monitorada com deficit de precipitação sobre bacias hidrográficas dos rios Aripuanã,
          Beni, Coari, Guaporé, Içá, Iriri, Japurá, Javari, Ji-Paraná, Juruá, Juruena, Jutaí, Madeira,
          Mamoré, Marañon, Napo, Purus, Tapajós, Teles Pires, Ucayali, Xingu e curso principal do Rio
          Solimões. Nas últimas semanas observou-se maiores volumes de precipitação sobre o norte
          e noroeste da área monitorada, neste momento o curso do Amazonas em território brasileiro
          e peruano, bacias dos rios Branco, bacias hidrográficas da margem esquerda do rio
          Amazonas no nordeste e noroeste do Estado do Pará caracterizadas com anomalias positivas
          de precipitação. Bacias dos rios Abacaxis, Curuá Una, Negro Tefé e bacias da margem
          esquerda do rio Amazonas no nordeste do Estado do Amazonas, alternando áreas com
          anomalias positivas e negativas, foram consideradas com precipitação observada próxima da
          climatologia do período. O multimodelo de previsão subsazonal indica predomínio de chuvas
          abaixo da climatologia em grande parte da área monitorada com predomínio de chuvas acima
          da climatologia apenas ao oeste da região sobre as bacias dos rios Abacaxis, Japurá, Jutaí e
          curso principal do Rio Solimões.</p>
        <div className="flex gap-5 flex-col sm:flex-row py-3">
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
                        <td className={`border border-slate-600 px-1 bg-blue-500`}>
                          <Link href={bacia.href} >{bacia.nome}</Link>
                        </td>}
                      {bacia?.cor === 'bg-amber-500' &&
                        <td className={`border border-slate-600 px-1 bg-amber-500`}>
                          <Link href={bacia.href} >{bacia.nome}</Link></td>}
                      {bacia?.cor === 'bg-neutral-50' &&
                        <td className={`border border-slate-600 px-1 bg-neutral-50`}>
                          <Link href={bacia.href} >{bacia.nome}</Link></td>}

                    </tr>
                  ))
                }
              </tbody>
            </table>
          ))}
        </div>

      </div>
  )
}
