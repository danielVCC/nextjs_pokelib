import { PokemonProps, PokemonStatsProps, PokemonTypeProps } from "@/types";
require('dotenv').config();

const API_URL = 'https://pokemon-go1.p.rapidapi.com/pokemon_types.json';
const POKEMON_STATS_API_URL = 'https://pokemon-go1.p.rapidapi.com/pokemon_stats.json';

const API_HEADERS = {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': 'pokemon-go1.p.rapidapi.com',
};

export async function fetchPokemonByType(type: string): Promise<PokemonProps[]> {
    try {
        const response = await fetch(API_URL, { method: 'GET', headers: API_HEADERS });
        const pokemonDataList: PokemonTypeProps[] = JSON.parse(await response.text());

        const filteredPokemon = pokemonDataList.filter((pokemon) => {
            return pokemon.type.includes(type) && pokemon.pokemon_id <=62 && pokemon.form==='Normal';
        });

        const pokemonPromises = filteredPokemon.map(async (pokemon) => {
            const [ base_attack, base_defense, base_stamina ] = await fetchPokemonStats(pokemon.pokemon_id);
            const pokemon_with_added_attributes: PokemonProps = {
                ...pokemon,
                base_attack,
                base_defense,
                base_stamina
            }
            return pokemon_with_added_attributes;
        });

        const pokemon_with_stats = await Promise.all(pokemonPromises);

        return pokemon_with_stats;

    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        throw error;
    }
}

export async function fetchPokemonStats(pokemon_id: number): Promise<number[]> {
    const response = await fetch(POKEMON_STATS_API_URL, { method: 'GET', headers: API_HEADERS });
    const pokemonDataList: PokemonStatsProps[] = JSON.parse(await response.text());

    const pokemonData = pokemonDataList.find((pokemon) => pokemon.pokemon_id === pokemon_id);

    if (pokemonData) {
        const { base_attack, base_defense, base_stamina } = pokemonData;
        return [base_attack, base_defense, base_stamina];
    } else {
        throw new Error("Error fetching pokemon stats");
    }
}
