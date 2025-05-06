// assets
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

const icons = {
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  PeopleOutlinedIcon: PeopleOutlinedIcon,
  DonutSmallOutlinedIcon: DonutSmallOutlinedIcon,
  BusinessOutlinedIcon: BusinessOutlinedIcon
};

// ==============================|| MENU ITEMS ||============================== //

// eslint-disable-next-line
export default {
  items: [
    {
      id: 'main',
      title: '',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: icons['HomeOutlinedIcon'],
          url: '/dashboard/default'
        },
        {
          id: 'sample-page',
          title: 'Sample Page',
          type: 'item',
          url: '/sample-page',
          icon: icons['ChromeReaderModeOutlinedIcon']
        },
        {
          id: 'users',
          title: 'Users',
          type: 'item',
          url: '/users',
          icon: icons['PeopleOutlinedIcon']
        },
        {
          id: 'charts',
          title: 'Charts',
          type: 'item',
          url: '/charts',
          icon: icons['DonutSmallOutlinedIcon']
        },
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: icons['SecurityOutlinedIcon'],
          children: [
            {
              id: 'login-1',
              title: 'Login',
              type: 'item',
              url: '/auth/login',
              target: true
            },
            {
              id: 'register',
              title: 'Register',
              type: 'item',
              url: '/auth/register',
              target: true
            },
            {
              id: 'forgot-password',
              title: 'Forgot Password',
              type: 'item',
              url: '/auth/forgot-password',
              target: true
            },
            {
              id: 'change-password',
              title: 'Change Password',
              type: 'item',
              url: '/auth/change-password',
              target: true
            }
          ]
        }
      ]
    }
  ]
};
