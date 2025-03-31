import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BrandingComponent } from './branding.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { getNavItems } from './sidebar-data';
import { NavItem } from './nav-item/nav-item'; 
@Component({
  selector: 'app-sidebar',
  imports: [BrandingComponent, TablerIconsModule, MaterialModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems: NavItem[] = []; // ✅ Ajout du type explicite

  constructor(private authService: AuthService) {}
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  ngOnInit(): void {
    const userRole = this.authService.getRole(); // Récupère uniquement le rôle

    if (userRole) {
      this.navItems = getNavItems(userRole); // ✅ Utilise le rôle pour récupérer les éléments du menu
    } else {
      console.error('Rôle manquant');
    }
  }
}