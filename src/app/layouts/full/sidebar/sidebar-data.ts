import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    navCap: 'A propos',
    divider: true
  },
  {
    displayName: 'Prendre rendez-vous',
    iconName: 'solar:clapperboard-edit-line-duotone',
    route: '/ui-components/forms',
  },
  {
    displayName: 'Votre rendez-vous',
    iconName: 'solar:document-text-line-duotone',
    route: '/ui-components/tables',
  },
  {
    displayName: 'Liste de diagnostique',
    iconName: 'solar:layers-minimalistic-line-duotone',
    route: '/ui-components/lists_diag',
  },
  {
    displayName: 'Liste reparation / pieces',
    iconName: 'solar:settings-line-duotone',
    route: '/ui-components/lists_reparation',
  },
  {
    navCap: 'Facture',
    divider: true
  },
  {
    displayName: 'Facture',
    iconName: 'solar:bill-list-line-duotone',
    route: '/ui-components/facture',
  },
  {
    displayName: 'Sample Page',
    iconName: 'solar:planet-3-line-duotone',
    route: '/ui-components/y',
  },
  {
    divider: true,
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Login',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/login',
      },
      {
        displayName: 'Side Login',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: 'https://matdash-angular-main.netlify.app/authentication/boxed-login',
        external: true,
        chip: true,
        chipClass: 'bg-secondary text-white',
        chipContent: 'PRO',
      },
    ],
  },
  {
    displayName: 'Register',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Register',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/register',
      },
    ],
  },
 
 
];
