import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Tableau de bord',
    icon: 'home',
    link: '/admin/dashboard'
  },
  {
    label: 'RSE',
    isTitle: true
  },
  {
    label: 'Projets',
    icon: 'briefcase',
    link: '/admin/rse/projets'
  },
  {
    label: 'Objectifs',
    icon: 'target',
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
    icon: 'user-check',
    link: '/admin/election/candidats'
  },
  {
    label: 'Employes',
    icon: 'user',
    link: '/admin/election/employes'
  },
  {
    label: 'Departements',
    icon: 'settings',
    link: '/admin/election/services'
  },
];
