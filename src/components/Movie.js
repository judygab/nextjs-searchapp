const Movie = ({title, index, overview, poster_path}) => {
  const IMAGES_API = 'https://image.tmdb.org/t/p/w500/';

  return (
    <div className="movie" key={index}>
      <img src={IMAGES_API + poster_path} alt={title}/>
      <div className="movie-overview">{overview}</div>
    </div>
  )
}

export default Movie;
