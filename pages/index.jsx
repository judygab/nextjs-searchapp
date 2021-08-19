import Head from 'next/head'
import {useEffect, useState} from 'react'
import Link from 'next/link'
import getConfig from 'next/config'
import Movie from '../src/components/Movie'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default function Home(initialData) {
  const [formInputs, setFormInputs] = useState({})
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(()=>{
    setSearchResults(initialData.trendingMovies.results)
  }, [initialData])

  const handleInputs = (event) => {
    let {name, value} = event.target
    setFormInputs({ ...formInputs, [name]: value });
    setSearchTerm(event.target.value);
  }

  const search = async (event) => {
    event.preventDefault()
    let movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${formInputs.searchTerm}&page=1&include_adult=false`)
    movies = await movies.json()
    setSearchResults(movies.results)
}

  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css"/>
      </Head>

      <h1>Search results for: {searchTerm}</h1>

      <form onSubmit={search}>
        <input className="search" name="searchTerm" value={searchTerm} onChange={handleInputs} type="text" required />
        <button>Search</button>
      </form>

      <p>Share this search with others:</p>

      <Link
            href="/search/[pid]"
            as={`/search/${searchTerm}`}>
              <a>
                {`http://localhost:3000/search/${searchTerm}`}
              </a>
      </Link>

       <div className="movie-search-results-grid">
         {searchResults.map((each, index) => {
           return(
            <Movie
              index={index}
              title={each.title}
              poster_path={each.poster_path}
              overview={each.overview}
              />
           )
         })}
       </div>
    </div>
  )
}

export async function getServerSideProps() {
  let trendingMovies = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${serverRuntimeConfig.apiKey}`)
  trendingMovies = await trendingMovies.json()
  return {props: {trendingMovies: trendingMovies}}
}
