"use client";

import { useState } from "react";
import Image from "next/image";

import { PokemonProps } from "@/types";
import { CustomButton, PokemonDetails } from ".";

interface PokeCardProps {
    pokemon: PokemonProps;
}

const PokeCard = ( { pokemon } : PokeCardProps) => {

    const { form, pokemon_id, pokemon_name, type, base_attack, base_defense, base_stamina } = pokemon;

    const [isOpen, setIsOpen] = useState(false);
    // const [imageError, setImageError] = useState(false)

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
            <a href={`https://pokemondb.net/pokedex/${pokemon_name.toLowerCase()}`}>
                <Image src={`https://img.pokemondb.net/sprites/x-y/normal/${pokemon_name.toLowerCase()}.png`}
                    alt={pokemon_name} fill priority className="object-contain" />
            </a>
        </div>

        <div className="relative flex w-full mt-2">
            <div className="poke-card__icon-container">
                <div className="poke-card__icon">
                    <Image src="/attack.svg" width={30} height={30} alt="rarity" />
                    <p className="poke-card__icon-text text-yellow-600">
                        {base_attack}
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/defense.svg" width={28} height={28} alt="rarity" />
                    <p className="poke-card__icon-text text-blue-700">
                        {base_defense}
                    </p>
                </div>
                <div className="poke-card__icon">
                    <Image src="/heart.svg" width={27} height={27} alt="rarity" />
                    <p className="poke-card__icon-text text-red-700">
                        {base_stamina}
                    </p>
                </div>               
            </div>

            <div className="poke-card__btn-container">
                <CustomButton 
                    title="More Details"
                    containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                    textStyles="text-white text-[14px] leading-[17px] font-bold"
                    rightIcon="right-arrow.svg"
                    handleClick={() => setIsOpen(true)}
                />
            </div>
        </div>

        <PokemonDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} pokemon={pokemon}/>

    </div>
  )
}

export default PokeCard