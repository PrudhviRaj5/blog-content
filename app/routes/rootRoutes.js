import TopNavLayout from 'containers/Layouts/TopNavLayout/TopNavLayout';

export default [
  {
    path: '',
    key: 'top_nav',
    component: TopNavLayout,
    exact: false,
    isProtected: true, // logic in Root.jsx
  },
];
