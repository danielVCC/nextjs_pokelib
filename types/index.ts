import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    buttonType?: "button" | "submit";
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
}

export interface SearchTypeProps {
    type: string;
    setType: (type: string) => void;
}

export interface filterProps {
    type: string;
    name: string;
    generation: number;
    rarity: string;
    limit: number;
}

export interface OptionProps {
    title: string;
    value: string;
  }
  
  export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
  }

export interface PokemonBaseProps {
    form?: string;
    pokemon_id: number;
    pokemon_name: string;
}

export interface PokemonStatsProps extends PokemonBaseProps {
    base_attack: number;
    base_defense: number;
    base_stamina: number;
}

export interface PokemonRarityProps extends PokemonBaseProps {
    rarity: string;
}

export interface PokemonRarityListProps {
    legendary: PokemonRarityProps[];
    mythic: PokemonRarityProps[];
    standard: PokemonRarityProps[];
    ultra_beast: PokemonRarityProps[];
}

export interface PokemonTypeProps extends PokemonBaseProps {
    type: string[];
}

export interface PokemonProps extends PokemonTypeProps, PokemonStatsProps, PokemonRarityProps {
}
