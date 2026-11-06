export default function LayoutHeader({ layoutName }) {
    return <header className="flex justify-between items-center mb-1">
        <h1 className="text-2xl font-semibold text-couleur1" >{layoutName}</h1>
    </header>
}