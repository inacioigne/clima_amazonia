interface Props {
    width: number | undefined
    height: number | undefined

}
export default function Acumulado({ width, height }: Props) {
    return (
        <div className="border-4" style={{ width: width}}>Acumulado {width}</div>
    )
}