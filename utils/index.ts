import { PokemonProps, PokemonRarityListProps, PokemonRarityProps, PokemonStatsProps, PokemonTypeProps, filterProps } from "@/types";
require('dotenv').config();

export const updateSearchParams = (type: string, value: string) => {
    // Get the current URL search params
    const searchParams = new URLSearchParams(window.location.search);
  
    // Set the specified search parameter to the given value
    searchParams.set(type, value);
  
    // Set the specified search parameter to the given value
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
    return newPathname;
  };

const API_URL = 'https://pokemon-go1.p.rapidapi.com/pokemon_types.json';
const POKEMON_STATS_API_URL = 'https://pokemon-go1.p.rapidapi.com/pokemon_stats.json';
const POKEMON_RARITY_API_URL = 'https://pokemon-go1.p.rapidapi.com/pokemon_rarity.json';

const API_HEADERS = {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': 'pokemon-go1.p.rapidapi.com',
};

function checkGeneration(gen: number, id: number): boolean {
    if(gen){
        const generation = Number(gen);
        switch (generation) {
            case 1:
                return id >= 1 && id <= 151;
            case 2:
                return id >= 152 && id <= 251;
            case 3:
                return id >= 252 && id <= 386;
            case 4:
                return id >= 387 && id <= 493;
            case 5:
                return id >= 494 && id <= 649;
            default:
                return false;
        }
    }
    return true;
}

export async function fetchPokemon(filters : filterProps): Promise<PokemonProps[]> {
    try {
        const response = await fetch(API_URL, { method: 'GET', headers: API_HEADERS });
        const pokemonDataList: PokemonTypeProps[] = JSON.parse(await response.text());

        let filteredPokemon = pokemonDataList.filter((pokemon) => {
            return pokemon.form === 'Normal' && pokemon.pokemon_id <=649 && checkGeneration(filters.generation, pokemon.pokemon_id);
        });

        if (filters.type !== "all") {
            filteredPokemon = filteredPokemon.filter((pokemon) => {
                return pokemon.type.map(type => type.toLowerCase()).includes(filters.type) 
            });
        }
        if (filters.name !== "") {
            filteredPokemon = filteredPokemon.filter((pokemon) => {
                return pokemon.pokemon_name.toLowerCase().includes(filters.name);
            });
        }
        if(filteredPokemon.length > filters.limit) {
            filteredPokemon = filteredPokemon.slice(0, filters.limit);
        }

        const sts_response = await fetch(POKEMON_STATS_API_URL, { method: 'GET', headers: API_HEADERS });
        const pokemonStatsList: PokemonStatsProps[] = JSON.parse(await sts_response.text());

        const rarity_response = await fetch(POKEMON_RARITY_API_URL, { method: 'GET', headers: API_HEADERS });
        const pokemonRarityList: PokemonRarityListProps = JSON.parse(await rarity_response.text());

        const pokemonPromises = filteredPokemon.map(async (pokemon) => {
            const [ base_attack, base_defense, base_stamina ] = await fetchPokemonStats(pokemon.pokemon_id, pokemonStatsList);
            const rarity = await fetchPokemonRarity(pokemon.pokemon_id, pokemonRarityList);
            const pokemon_with_added_attributes: PokemonProps = {
                ...pokemon,
                base_attack,
                base_defense,
                base_stamina,
                rarity
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

async function fetchPokemonStats(pokemon_id: number, pokemonDataList: PokemonStatsProps[]): Promise<number[]> {

    const pokemonData = pokemonDataList.find((pokemon) => pokemon.pokemon_id === pokemon_id && pokemon.form === "Normal");

    if (pokemonData) {
        const { base_attack, base_defense, base_stamina } = pokemonData;
        return [base_attack, base_defense, base_stamina];
    } else {
        throw new Error("Error fetching pokemon stats");
    }
}

async function fetchPokemonRarity(pokemon_id: number, pokemonDataList: PokemonRarityListProps): Promise<string> {
    // const findPokemonInCategory = (category: PokemonRarityProps[]): string | null => {
    //     const foundPokemon = category.find(pokemon => pokemon.pokemon_id === pokemon_id);
    //     return foundPokemon ? foundPokemon.rarity : null;
    // };

    // const legendaryRarity = findPokemonInCategory(pokemonDataList.legendary);
    // if (legendaryRarity) {
    //     return legendaryRarity;
    // }

    // const mythicRarity = findPokemonInCategory(pokemonDataList.mythic);
    // if (mythicRarity) {
    //     return mythicRarity;
    // }

    // const standardRarity = findPokemonInCategory(pokemonDataList.standard);
    // if (standardRarity) {
    //     return standardRarity;
    // }

    // const ultraBeastRarity = findPokemonInCategory(pokemonDataList.ultra_beast);
    // if (ultraBeastRarity) {
    //     return ultraBeastRarity;
    // }
    // Se o Pokémon não foi encontrado em nenhuma categoria
    return "Standard";
}
