import Home from 'containers/MainLayout/Home';
import About from 'containers/MainLayout/About';
import Archives from 'containers/MainLayout/Archives';
import ContactMe from 'containers/MainLayout/ContactMe';

import SomeLogo from 'assets/images/zylo-logo.svg';

export default {
  leftLink: {
    path: '/home',
    name: 'Home',
    logoImg: SomeLogo,
    exact: false,
  },
  centerLinks: [
    {
      path: '/home',
      name: 'Home',
      key: 'home',
      icon: 'home',
      component: Home,
      exact: false,
    },
    {
      path: '/about',
      name: 'About',
      key: 'about',
      icon: 'info',
      component: About,
      exact: false,
    },
    {
      path: '/archives',
      name: 'Archives',
      key: 'archives',
      icon: 'folder',
      component: Archives,
      exact: false,
    },
    {
      path: '/contact_me',
      name: 'Contact Me',
      key: 'contact_me',
      icon: 'email',
      component: ContactMe,
      exact: false,
    },
  ],
  rightMenuLinks: [
    {
      name: 'User Settings',
      key: 'user_settings',
      icon: 'account_circle',
      children: [
        {
          path: '/admin',
          name: 'Administration',
          key: 'admin',
          component: Home,
          exact: false,
        },
        {
          path: '/settings',
          name: 'Settings',
          key: 'settings',
          component: Home,
          exact: false,
        },
        {
          path: '/logout',
          name: 'Logout',
          key: 'logout',
          component: Home,
          exact: false,
        },
      ],
    },
  ],
};
