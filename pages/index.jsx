import Head from 'next/head'
import {useEffect, useState} from 'react'
import Link from 'next/link'
import getConfig from 'next/config'

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
  }

  const search = async (event) => {
    event.preventDefault()
    let movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1f6d5f7ad0f4eb427ec7134856eff45a&language=en-US&query=${formInputs.searchTerm}&page=1&include_adult=false`)
    movies = await movies.json()
    setSearchResults(movies.data)
    setSearchTerm(formInputs.searchTerm)
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
        <input name="searchTerm" onChange={handleInputs} type="text" required />
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

       <div className="giphy-search-results-grid">
         {searchResults.map((each, index) => {
           return(
             <div key={index}>
               <h3>{each.title}</h3>
               {/*<img src={each.images.original.url} alt={each.title}/>*/}
             </div>
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
