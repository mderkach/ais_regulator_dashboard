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
    name: 'Демо',
  },
  {
    path: '/monitor-car',
    name: 'Доступные трнаспортные стредства',
    view: 'Monitoring--Car',
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
