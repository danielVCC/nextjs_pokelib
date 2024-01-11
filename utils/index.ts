import { PokemonTypeProps } from "@/types";
require('dotenv').config();

const API_URL = 'https://pokemon-go1.p.rapidapi.com/pokemon_types.json';

const API_HEADERS = {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': 'pokemon-go1.p.rapidapi.com',
};

export async function fetchPokemonByType(type: string): Promise<PokemonTypeProps[]> {
    try {
        const response = await fetch(API_URL, { method: 'GET', headers: API_HEADERS });
        const pokemonData: PokemonTypeProps[] = JSON.parse(await response.text());

        const filteredPokemon = pokemonData.filter((pokemon) => {
            return pokemon.type.includes(type) && pokemon.pokemon_id <=62 && pokemon.form==='Normal';
        });

        return filteredPokemon;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        throw error;
    }
}