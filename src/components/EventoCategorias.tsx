import { useSelector, useDispatch } from "react-redux";
import { Evento } from './Evento'
import { Nav } from './Nav';
import { useHistory } from "react-router-dom";
import Foot from './Foot';
import { getEvents, filtroPrecio, getFavorites } from "../actions/actions"
import React, { useEffect, useState } from "react";
import MapaHome from './MapaHome';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './styles/categoria.css'


interface Iprops {
    eventos: any;
    categoria: string;
    search: any;
    favoritos: any;
  }

const responsive = {
superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1500 },
    items: 5,
    slidesToSlide: 5,    
  },
  LargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 1500, min: 1250  },
    items: 4,    
    slidesToSlide: 4,
  } ,
   desktop: {
    breakpoint: { max: 1250, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 700, min: 630 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 630, min: 0 },
    items: 1,
    slidesToSlide: 1,
  }
};

export const EventoCategoria = (props: Iprops) => {
    
    const{eventos, categoria, search, favoritos} = props

    return(
        <div className="row_events">
            <h2>{categoria}</h2>
            <Carousel  
                swipeable={false}
                draggable={false}                
                responsive={responsive}
                infinite={true}       
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"                           
                itemClass="carousel-item-padding-0-px">
            {eventos.filter((val: any) => {
                    if (search === '') {
                        return val
                    } else if (val.nombreDelEvento.toLowerCase().includes(search.toLocaleLowerCase())) {
                        return val
                    }
                }).map((i: any) => (

                    <div className="row_event">
                    <Evento  _id={i._id} imagen={i.imagen} fecha={i.fecha} nombreDelEvento={i.nombreDelEvento} precio={i.precio} favoritos={favoritos} />    
                    </div>
                ))
                }
                </Carousel>
             </div>
    )
}