import Image from 'next/image'

import { Hero, SearchBar, CustomFilter, PokeCard, ShowMore } from '@/components'
import { fetchPokemon } from '@/utils'
import { generations, rarity } from '@/constants';

export default async function Home({ searchParams }) {

  const pokemons = await fetchPokemon({
    type: searchParams.type || 'all',
    name: searchParams.name || '',
    generation: searchParams.gen || '',
    rarity: searchParams.rarity || '',
    limit: searchParams.limit || 24
  });
  
  const isDataEmpty = !Array.isArray(pokemons) || pokemons.length < 1 || !pokemons;

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Library</h1>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="gen" options={generations}/>
            <CustomFilter title="rarity" options={rarity}/>
          </div>
        </div>

        {!isDataEmpty ? (
        <section>
            <div className="home__pokemons-wrapper">
              {pokemons?.map((pokemon) => (
                <PokeCard pokemon={pokemon} />
              ))}
            </div>
            
            <ShowMore
              pageNumber={(searchParams.limit || 24) / 24} 
              isNext={(searchParams.limit || 24) > pokemons.length}
            />
        </section>
        ) : 
        (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">
              No Results
            </h2>
          </div>
        )}

      </div>
    </main>
  )
}
