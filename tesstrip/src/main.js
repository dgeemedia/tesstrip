import './styles/global.css'; // required for Vite to inject styles

import { initFeaturedRotation } from './featured.js';
import { initPlanner } from './planner.js';
import { initGalleryScroll } from './galleryTicker.js';
import { initAdScroll } from './adTicker.js';
import { initBooking } from './booking.js';
import { fetchWeather } from './weather.js';

initFeaturedRotation();
initPlanner();
initGalleryScroll();
initAdScroll();
initBooking();
fetchWeather();
