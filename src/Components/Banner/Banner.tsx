/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import './banner.scss';
import axios from '../../axios';
import { Movie } from '../../react-app-env.d';
import { getMovieImg, requests } from '../../requests';

export const Banner:React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMoviesFromServer = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
    };
    fetchMoviesFromServer();
  }, []);

  const truncate = (n: number, str = '') => {
    return str?.length > n ? `${str.substring(0, n - 1)}...` : str;
  };

  return (
    <div
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${getMovieImg(movie?.backdrop_path)})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button type="button" className="banner__button">Play</button>
          <button type="button" className="banner__button">My list</button>
        </div>

        <p className="banner__description">
          {truncate(150, movie?.overview)}
        </p>
      </div>

      <div className="banner--fade-bottom" />
    </div>
  );
};
