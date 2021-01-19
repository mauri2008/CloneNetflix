import React, { useEffect, useState } from 'react';

import Tmdb from './Tmdb';
import MovieRow from './components/MovieRows';
import Header from './components/Header';
import './App.css'

import FeaturedMovie from './components/FeaturedMovie';

export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setfeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async()=>{
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.slug ==='originals');
      let ramdomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));

      let chosen = originals[0].items.results[ramdomChosen];

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv');
      setfeaturedData(chosenInfo);
    }

    loadAll();
  },[]);

  useEffect(()=>{
    const scrollListerner = ()=>{
      if(window.scrollY >10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListerner);
    return () =>{
      window.removeEventListener('scroll',scrollListerner);
    }
  },[]);

  return(
    <div className="page">
        
        <Header black={blackHeader} />

        {featuredData &&
          <FeaturedMovie item={featuredData}/>
        }
      
        <section className="lists">
          {movieList.map((item, key)=>(
            <MovieRow key={key} title={item.title} items = {item.items}/>
          ))}
        </section>
        {movieList.length <= 0 &&
          <div className="loading">
            <img src="https://blog.ecadauma.com.br/wp-content/uploads/2020/04/netflix-loading.gif" alt="Carregando"/>
          </div>
        }
    </div>
  )
}