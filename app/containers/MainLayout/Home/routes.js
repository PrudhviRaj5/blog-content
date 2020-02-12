import BlogList from './BlogList';
import BlogPage from './BlogPage/index';


export default [
  {
    path: '/blog_page',
    key: 'blog_page',
    component: BlogPage,
    exact: false,
  },
  {
    path: '',
    key: 'blog_list',
    component: BlogList,
    exact: true,
  },
];
