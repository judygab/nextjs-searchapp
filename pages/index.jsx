import Head from 'next/head'
import {useEffect, useState} from 'react'
import Link from 'next/link'
import getConfig from 'next/config'
import Movie from '../src/components/Movie'
import { Button, Container, Row, Col } from 'react-bootstrap'

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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
          integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
          crossorigin="anonymous"
        />
      </Head>

      <h1>Search results for: {searchTerm}</h1>
      <Row>
        <Col md={6} className="m-auto">
          <form onSubmit={search} className="search-form">
            <input className="search" name="searchTerm" value={searchTerm} onChange={handleInputs} type="text" required />
            <button className="btn-search">
              <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" xmlSpace="preserve" width="512px" height="512px">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
              </svg>
            </button>
          </form>
        </Col>
      </Row>

      <p>Share this search with others:</p>

      <Link
            href="/search/[pid]"
            as={`/search/${searchTerm}`}>
              <a>
                {`http://localhost:3000/search/${searchTerm}`}
              </a>
      </Link>

      <Container>
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
       </Container>
    </div>
  )
}

export async function getServerSideProps() {
  let trendingMovies = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${serverRuntimeConfig.apiKey}`)
  trendingMovies = await trendingMovies.json()
  return {props: {trendingMovies: trendingMovies}}
}
