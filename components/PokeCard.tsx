import { useState } from "react"
import Image from "next/image";

import { PokemonProps } from "@/types"
import { CustomButton } from ".";

interface PokeCardProps {
    pokemon: PokemonProps;
}

const PokeCard = ( { pokemon } : PokeCardProps) => {

    const { form, pokemon_id, pokemon_name, type } = pokemon

  return (
    <div className="poke-card group">
        <div className="poke-card__content">
            <h2 className="poke-card__content-title">
                {pokemon_name} {"#" + pokemon_id}
            </h2>
        </div>

        <p className="flex mt-6 text-[16px] font-extrabold">
            <span>
                {type.join(', ')}
            </span>
        </p>

        <div className="poke-card__image">
            <a href="https://pokemondb.net/pokedex/pikachu">
                <Image src="https://img.pokemondb.net/sprites/x-y/normal/pikachu-f.png" alt="Pikachu" fill priority className="object-contain" />
            </a>
        </div>

        <div className="relative flex 2-full mt-2">
            <div className="poke-card__icon-container">
                <div className="poke-card__icon">
                    <Image src="/star.svg" width={20} height={20} alt="rarity" />
                    <p className="text-[14px]">
                        {form}
                    </p>
                </div>
            </div>

        </div>

    </div>
  )
}

export default PokeCard