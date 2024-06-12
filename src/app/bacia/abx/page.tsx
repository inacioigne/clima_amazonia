import { Container, Typography } from '@mui/material';
import Image from 'next/image';

export default function Bacia() {
    // const params = useParams()
    return (
        <Container className='py-5' >
            <Typography variant="h6" gutterBottom>
                Bacia do Rio Abacaxis
            </Typography>
            <div className='grid grid-cols-2'>
                <div>
                    <Image
                        src={'/data/bacias/abx/quantil.png'}
                        alt={''}
                        width={600}
                        height={200} />
                    <Image
                        src={'/data/bacias/abx/previsto.png'}
                        alt={''}
                        width={600}
                        height={200} />

                </div>

                <Typography variant="body1" gutterBottom>
                    A climatologia do período em análise indica chuvas com
                    registros variando entre 134 e 160 mm sendo
                    considerados normais (referência quantis 42.5% e
                    57.5%). Em 5 de junho de 2024, foram observados
                    152 mm de precipitação média acumulada sobre a bacia
                    em 30 dias, no cálculo da média do índice de anomalia
                    categorizada na área da bacia o valor de -0.2, classifica a
                    bacia em condição de normalidade. Nas próximas
                    semanas o comportamento climático indica redução dos
                    volumes de chuva, o modelo de prognóstico subsazonal
                    sugere um comportamento chuvoso ou tendência a
                    chuvoso.

                </Typography>

            </div>



        </Container>

    )
}