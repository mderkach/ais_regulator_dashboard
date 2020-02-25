/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

export default [
  {
    path: '',
    // Relative to /src/views
    view: 'Client',
    name: 'Клиент',
  },
  {
    path: '/login',
    view: 'Login',
    name: 'Вход',
  },
  {
    path: '/monitor-car',
    name: 'Доступные транспортные стредства',
    view: 'Monitoring--Car',
  },
  {
    path: '/monitor-path',
    name: 'Маршруты',
    view: 'Monitoring--Path',
  },
  {
    path: '/monitor-ct',
    name: 'Управление контрольными точками',
    view: 'Monitoring--CT',
  },
  {
    path: '/classifiers',
    name: 'Классификаторы',
    view: 'Classifiers',
  },
  {
    path: '/geozones',
    name: 'Геозоны',
    view: 'Geozones',
  },
]
