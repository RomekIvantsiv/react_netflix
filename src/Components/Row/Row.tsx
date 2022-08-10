import React, { useState, useEffect } from 'react';
import './row.scss';
import axios from '../../axios';
import { Movie, ResponseNetflixOriginals } from '../../react-app-env.d';
import { getMovieImg } from '../../requests';

interface Props {
  title : string,
  fetchUrl: string,
  isLargeRow?: string
}

export const Row:React.FC<Props> = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMoviesFromServer = async () => {
      const request: ResponseNetflixOriginals = await axios.get(fetchUrl);
      setMovies(request.data.results);

      return request;
    };

    fetchMoviesFromServer();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2 className="row__title">
        {title}
        <div className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              src={getMovieImg(isLargeRow ? movie.poster_path : movie.backdrop_path
                || movie.poster_path)}
              className={`row__poster ${isLargeRow && 'row__poster-large'}`}
              alt={movie.name}
            />
          ))}
        </div>
      </h2>
    </div>
  );
};
