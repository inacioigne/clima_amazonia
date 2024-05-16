import { GiRiver } from "react-icons/gi";
// import { lusitana } from '@/app/ui/fonts';

export default function ClimateLogo() {
  return (
    <div
      className={`flex flex-row gap-1 items-center leading-none text-white`}
    >
      <GiRiver className="h-12 w-12" />
      <p className="text-[17px]">Clima Amazônia</p>
    </div>
  );
}
