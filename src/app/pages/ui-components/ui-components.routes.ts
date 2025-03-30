import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { AppListsDiagComponent } from './lists_diag/lists_diag.component';
import { AppListsReparationComponent } from './lists_reparation/lists_reparation.component';
import { AppFactureComponent } from './facture/facture.component';
import { AppEtatVoitureComponent } from './etat_voiture/etat_voiture.component';
import { AppHistoriqueComponent } from './historique/historique.component';
import { AppPaiementComponent } from './paiement/paiement.component';
import { AppListeFactureComponent } from './liste_facture/liste_facture.component';
import { AppListsDiagManagerComponent } from './lists_diag_manager/lists_diag.component_manager';
import { AppAjoutPiecesComponent } from './ajout_pieces/ajout_pieces.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
      {
        path: 'lists_diag',
        component: AppListsDiagComponent,
      },
      {
        path: 'lists_reparation',
        component: AppListsReparationComponent
      },
      {
        path: 'facture',
        component: AppFactureComponent
      },
      {
        path: 'etat_voiture',
        component: AppEtatVoitureComponent
      },
      {
        path: 'historique',
        component: AppHistoriqueComponent
      },
      {
        path: 'paiement',
        component: AppPaiementComponent
      },
      {
        path: 'liste_facture',
        component: AppListeFactureComponent
      },
      {
        path: 'lists_diag_manager',
        component: AppListsDiagManagerComponent
      },
      {
        path: 'ajout_pieces',
        component: AppAjoutPiecesComponent
      }
    ],
  },
];
