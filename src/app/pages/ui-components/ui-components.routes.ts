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
import { AppAjoutPiecesComponent } from './ajout_pieces/ajout_pieces.component';
import { AppReparationMecanicienComponent } from './reparation_mecanicien/reparation_mecanicien.component';
import { AppListsReparationMecanicienComponent } from './lists_reparation_mecanicien/lists_reparation_mecanicien.component';
import { AppCommencerDiagComponent } from './commencer_diag/commencer_diag.component';
import { AppStatusReparationMecanicienComponent } from './status_reparation_mecanicien/status_reparation_mecanicien.component';
import { AppListsRdvManagerComponent } from './lists_rdv_manager/lists_rdv_manager.component';
import { AppConfirmationRdvManagerComponent } from './confirmation_rdv_manager/confirmation_rdv_manager.component';
import { AppListsDiagMecanicienComponent } from './lists_diag_mecanicien/lists_diag_mecanicien.component';
import { AppListsDiagManagerComponent } from './lists_diag_manager/lists_diag_manager.componen';
import { AppListsReparationManagerComponent } from './lists_reparation_manager/lists_reparation_manager.component';
import { AppDisponibiliteComponent } from './disponibilite/disponibilite.component';
import { PageDiagnosticComponent } from './diagnostic/faire-diagnostic.component';
import { AppDetailReparationManagerComponent } from './detail_reparation_manager/detail_reparation_manager.component';
import { AppDetailReparationClientComponent } from './detail_reparation_client/detail_reparation_client.component';
import { AppMarqueComponent } from './marque/marque.component';
import { AppModelComponent } from './model/model.component';
import { AppPieceMmComponent } from './piece_mm/piece_mm.component';
import { AppNiveauComponent } from './niveau/niveau.component';
import { AppListsClientsComponent } from './lists_clients/lists_clients.component';
import { AppListsMecaniciensComponent } from './lists_mecaniciens/lists_mecaniciens.component';
import { AppTypeReparationComponent } from './type_reparation/type_reparation.component';
import { AppUpdateModelComponent } from './update_model/update_model.component';
import { AppUpdatePieceComponent } from './update_piece/update_piece.component';
import { AppUpdateNiveauComponent } from './update_niveau/update_niveau.component';


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
        path: 'lists_reparation/:id',
        component: AppListsReparationComponent
      },
      {
        path: 'facture/:id',
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
        path: 'paiement/:id',
        component: AppPaiementComponent
      },
      {
        path: 'liste_facture',
        component: AppListeFactureComponent
      },
      {
        path: 'lists_diag_mecanicien',
        component: AppListsDiagMecanicienComponent
      },
      {
        path: 'ajout_pieces',
        component: AppAjoutPiecesComponent
      },
      {
        path: 'reparations/:id',
        component: AppReparationMecanicienComponent
      },
      {
        path: 'listes_reparation',
        component: AppListsReparationMecanicienComponent
      },
      {
        path: 'commencer_diag',
        component: AppCommencerDiagComponent
      },
      {
        path: 'status_reparation',
        component: AppStatusReparationMecanicienComponent
      },
      {
        path: 'lists_rdv_manager',
        component: AppListsRdvManagerComponent
      },
      {
        path: 'confirmation_rdv_manager/:id',
        component: AppConfirmationRdvManagerComponent
      },
      {
        path: 'lists_diag_manager',
        component: AppListsDiagManagerComponent
      },
      {
        path: 'lists_reparation_manager/:id',
        component: AppListsReparationManagerComponent
      },
      {
        path: 'disponibilite',
        component: AppDisponibiliteComponent
      },
      {
        path: 'diagnostic/:id', 
        component: PageDiagnosticComponent
      },
      {
        path: 'detail_reparation', 
        component: AppDetailReparationManagerComponent
      },
      {
        path: 'detail_reparation_client', 
        component: AppDetailReparationClientComponent
      },
      {
        path: 'marque',
        component: AppMarqueComponent
      },
      {
        path: 'model',
        component: AppModelComponent
      },
      {
        path: 'piece_mm',
        component: AppPieceMmComponent
      },
      {
        path: 'niveau',
        component: AppNiveauComponent
      },
      {
        path: 'lists_clients',
        component: AppListsClientsComponent
      },
      {
        path: 'lists_mecaniciens',
        component: AppListsMecaniciensComponent
      },
      {
        path: 'type_reparation',
        component: AppTypeReparationComponent
      },
      {
        path: 'update_model/:id',
        component: AppUpdateModelComponent
      },
      {
        path: 'update_piece/:id',
        component: AppUpdatePieceComponent
      },
      {
        path: 'update_niveau/:id',
        component: AppUpdateNiveauComponent
      }
      
    ],
  },
];
