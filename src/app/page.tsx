import Map from "@/components/map"
import { Suspense } from 'react';

export default function Home() {
  return (
    <main>
      <Suspense fallback={<h1>Carregando...</h1>}>
        <Map />
      </Suspense>

    </main>
  );
}
