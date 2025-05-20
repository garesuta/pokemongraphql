// app/(root)/pokemon/[id]/page.tsx
import PokemonDetailsClient from "@/components/PokemonDetailsClient";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function PokemonDetailsPage({ params }: Props) {
    const { id } = await params;
    return <PokemonDetailsClient id={id} />;
}