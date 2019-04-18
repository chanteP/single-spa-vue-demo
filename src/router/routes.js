export default [
  {
    path: '/',
    name: 'database',
    component: () => import(/* webpackChunkName: "database" */ '../pages/database/index.vue'),
  },
  {
    path: '/collection/:dbName/:collectionName',
    name: 'collection',
    component: () => import(/* webpackChunkName: "collection" */ '../pages/collection/index.vue'),
  },
];
