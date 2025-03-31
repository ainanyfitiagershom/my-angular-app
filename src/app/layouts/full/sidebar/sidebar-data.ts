import { NavItem } from './nav-item/nav-item';

export function getNavItems(role: string): NavItem[] {

  console.log("Rôle reçu dans getNavItems :", role); 

  if (role === 'Client') {
    return [
  //start
  {
    navCap: 'Maison',
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
    route: '/ui-components/liste_facture',
  },
  {
    displayName: 'Etat voiture',
    iconName: 'solar:chart-2-line-duotone',
    route: '/ui-components/etat_voiture',
  },
  {
    displayName: 'Historique',
    iconName: 'solar:database-line-duotone',
    route: '/ui-components/historique',
  },
  {
    navCap: 'Paiement',
    divider: true
  },
  {
    displayName: 'Paiement',
    iconName: 'solar:feed-line-duotone',
    route: '/ui-components/paiement',
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
  }
  else if (role === 'Mécanicien') {
    return [
  {
    navCap: 'Mecanicien',
    divider: true,
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    displayName: 'Listes des diagnostiques',
    iconName: 'solar:layers-minimalistic-line-duotone',
    route: '/ui-components/lists_diag_mecanicien',
  },
  {
    displayName: 'Formulaire de reparation',
    iconName: 'solar:password-minimalistic-input-line-duotone',
    route: '/ui-components/reparations',
  },
  {
    displayName: 'Listes des reparations',
    iconName: 'solar:align-left-line-duotone',
    route: '/ui-components/listes_reparation',
  },
  {
    displayName: 'Ajouter pieces',
    iconName: 'solar:settings-line-duotone',
    route: '/ui-components/ajout_pieces',
  },
  {
    displayName: 'Commencer reparation',
    iconName: 'solar:restart-bold-duotone',
    route: '/ui-components/commencer_diag',
  },
  {
    displayName: 'Liste reparation',
    iconName: 'solar:bolt-circle-line-duotone',
    route: '/ui-components/status_reparation',
  },
];
  }
  else if (role === 'Manager') {
    return [
  {
    navCap: 'Manager',
    divider: true,
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    displayName: 'Les rendez-vous',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/lists_rdv_manager',
  },
  {
    displayName: 'Disponibilité',
    iconName: 'solar:calendar-mark-line-duotone',
    route: '/ui-components/disponibilite',
  },
  {
    displayName: 'Confirmer rendez-vous',
    iconName: 'solar:round-alt-arrow-right-line-duotone',
    route: '/ui-components/confirmation_rdv_manager',
  },
  {
    displayName: 'Listes des diagnostiques',
    iconName: 'solar:layers-minimalistic-line-duotone',
    route: '/ui-components/lists_diag_manager',
  },
  {
    displayName: 'Liste reparation / pieces',
    iconName: 'solar:settings-line-duotone',
    route: '/ui-components/lists_reparation_manager',
  }
] ;
  }

  return [];
} //end