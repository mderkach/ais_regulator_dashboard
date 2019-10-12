/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    // Relative to /src/views
    view: 'Map',
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile',
  },
  {
    path: '/monitor-car',
    name: 'Доступные трнаспортные стредства',
    view: 'Monitoring--Car',
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList',
  },
  {
    path: '/typography',
    view: 'Typography',
  },
  {
    path: '/icons',
    view: 'Icons',
  },
  {
    path: '/dashboard',
    view: 'Dashboard',
  },
  {
    path: '/notifications',
    view: 'Notifications',
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade',
  },
]
