import Image from 'next/image'

import { Hero, SearchBar, CustomFilter, PokeCard } from '@/components'
import { fetchPokemonByType } from '@/utils'

export default async function Home() {
  const waterTypes = await fetchPokemonByType("Water");

  // console.log(waterTypes);
  
  const isDataEmpty = !Array.isArray(waterTypes) || waterTypes.length < 1 || !waterTypes;

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Library</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, esse.</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="type" />
            <CustomFilter title="gen" />
          </div>
        </div>

        {!isDataEmpty ? (
        <section>
            <div className="home__pokemons-wrapper">
              {waterTypes?.map((pokemon) => (
                <PokeCard pokemon={pokemon} />
              ))}
            </div>
        </section>
        ) : 
        (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">
              No Results
            </h2>
          {/* <p>{waterTypes?.message}</p> */}
          </div>
        )}

      </div>
    </main>
  )
}
