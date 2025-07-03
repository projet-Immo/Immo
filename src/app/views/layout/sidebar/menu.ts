import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Tableau de bord',
    icon: 'home',
    link: '/admin/rse'
  },
  {
    label: 'RSE',
    isTitle: true
  },
  {
    label: 'Projets',
    icon: 'user',
    link: '/admin/rse/projets'
  },
  {
    label: 'Objectifs',
    icon: 'users',
    link: '/admin/rse/objectifs'
  },
  {
    label: 'ELECTIONS',
    isTitle: true
  },
  {
    label: 'Elections',
    icon: 'users',
    link: '/admin/election'
  },
  {
    label: 'Candidats',
    icon: 'users',
    link: '/admin/election/candidats'
  },
  {
    label: 'Employes',
    icon: 'users',
    link: '/admin/election/employes'
  },
  {
    label: 'Service',
    icon: 'building',
    link: '/admin/election/services'
  },
];
