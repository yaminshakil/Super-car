import { CarData } from '../types';
import { CARS_SPECS_DATABASE } from './cars-specs';
import bugattiImg from '../assets/images/bugatti_tourbillon_1784039418756.jpg';
import koenigseggImg from '../assets/images/koenigsegg_jesko_1784039446820.jpg';
import paganiImg from '../assets/images/pagani_utopia_1784039432478.jpg';

export const CARS_DATABASE: CarData[] = CARS_SPECS_DATABASE.map(car => {
  if (car.id === 'bugatti-tourbillon') {
    return {
      ...car,
      image: bugattiImg,
      gallery: [
        bugattiImg,
        'https://images.unsplash.com/photo-1600706432502-75a0e2e21eed?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=800'
      ]
    };
  }
  if (car.id === 'koenigsegg-jesko-absolut') {
    return {
      ...car,
      image: koenigseggImg,
      gallery: [
        koenigseggImg,
        'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800'
      ]
    };
  }
  if (car.id === 'pagani-utopia') {
    return {
      ...car,
      image: paganiImg,
      gallery: [
        paganiImg,
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&q=80&w=800'
      ]
    };
  }
  return car;
});
