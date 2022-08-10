import React, { useState, useEffect } from 'react';
import './nav.scss';

export const Nav:React.FC = () => {
  const [topShade, setTopShade] = useState(false);

  useEffect(() => {
    const test = () => {
      if (window.scrollY > 100) {
        setTopShade(true);
      } else setTopShade(false);
    };

    window.addEventListener('scroll', test);

    return () => {
      window.removeEventListener('scroll', test);
    };
  }, []);

  return (
    <div className={`nav ${topShade && 'nav__black'}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="netflix_logo"
      />
      <div className="nav__buttons">
        <button
          type="button"
          className="nav__buttons-in"
        >
          Sing In
        </button>
        <button
          type="button"
          className="nav__buttons-up"
        >
          Sing Up
        </button>

      </div>
    </div>
  );
};
