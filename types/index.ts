import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    buttonType?: "button" | "submit";
}

export interface SearchTypeProps {
    type: string;
    setType: (type: string) => void;
}

export interface PokemonTypeProps {
    form?: string;
    pokemon_id: number;
    pokemon_name: string;
    type: string[];
}

export interface PokemonProps {
    form?: string;
    pokemon_id: number;
    pokemon_name: string;
    type: string[];
}