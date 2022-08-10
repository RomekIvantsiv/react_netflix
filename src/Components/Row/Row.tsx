/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import './row.scss';
import YouTube from 'react-youtube';
// @ts-ignore
import movieTrailer from 'movie-trailer';
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
  const [trailerUrl, setTrailerUrl] = useState<string | null>('');

  useEffect(() => {
    const fetchMoviesFromServer = async () => {
      const request: ResponseNetflixOriginals = await axios.get(fetchUrl);
      setMovies(request.data.results);

      return request;
    };

    fetchMoviesFromServer();
  }, [fetchUrl]);

  const opts = {
    heigth: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovieClick = (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || movie?.original_title || '').then((url: string) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      }).catch((error: string) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2 className="row__title">
        {title}
      </h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleMovieClick(movie)}
            src={getMovieImg(isLargeRow ? movie.poster_path : movie.backdrop_path
                || movie.poster_path)}
            className={`row__poster ${isLargeRow && 'row__poster-large'}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
