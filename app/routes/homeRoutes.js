import BlogsList from 'containers/Screens/Home/BlogsList/BlogsList';
import BlogPage from 'containers/Screens/Home/BlogPage/BlogPage';


export default [
  {
    path: '/blog_page',
    key: 'blog_page',
    component: BlogPage,
    exact: false,
  },
  {
    path: '',
    key: 'blogs_list',
    component: BlogsList,
    exact: true,
  },
];
