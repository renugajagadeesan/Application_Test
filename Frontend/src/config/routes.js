// Frontend/src/config/routes.js
export const navRoutes = [
  {
    id: 1,
    label: 'Home',
    path: '#home',
    type: 'hash' // hash anchor on current page
  },
  {
    id: 2,
    label: 'Destinations',
    path: '/hotels',
    type: 'page' // full page navigation
  },
  {
    id: 3,
    label: 'Deals',
    path: '#deals',
    type: 'hash'
  },
  {
    id: 4,
    label: 'About',
    path: '#about',
    type: 'hash'
  },
  {
    id: 5,
    label: 'Contact',
    path: '/contact',
    type: 'page'
  }
];
