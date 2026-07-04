import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonApp, IonContent } from '@ionic/angular/standalone';
import {
  B2cNavbarComponent, B2cFooterComponent,
  B2cAlertComponent, B2cAvatarComponent, B2cStatusIndicatorComponent,
  B2cBreadcrumbComponent, B2cCardComponent, B2cCounterComponent,
  B2cProgressBarComponent, B2cStepperComponent, B2cTabListComponent,
  B2cTilesComponent, B2cPaginationComponent, B2cAccordionComponent,
  B2cDropdownComponent, B2cLoadingComponent, B2cDividerComponent,
  B2cTooltipComponent, B2cToastComponent, B2cRadioButtonComponent,
  B2cEmptyStateComponent,
} from '../../components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, IonApp, IonContent,
    B2cNavbarComponent, B2cFooterComponent,
    B2cAlertComponent, B2cAvatarComponent, B2cStatusIndicatorComponent,
    B2cBreadcrumbComponent, B2cCardComponent, B2cCounterComponent,
    B2cProgressBarComponent, B2cStepperComponent, B2cTabListComponent,
    B2cTilesComponent, B2cPaginationComponent, B2cAccordionComponent,
    B2cDropdownComponent, B2cLoadingComponent, B2cDividerComponent,
    B2cTooltipComponent, B2cToastComponent, B2cRadioButtonComponent,
    B2cEmptyStateComponent,
  ],
  templateUrl: './home.page.html',
})
export class HomePage {
  navItems = [
    { label: 'Início', url: '/', active: true },
    { label: 'Componentes', url: '/components' },
    { label: 'Documentação', url: '/docs' },
  ];

  breadcrumbs = [
    { label: 'Início', url: '/' },
    { label: 'Componentes', url: '/components' },
    { label: 'Gallery' },
  ];

  counterVal = 1;
  steps = ['Dados Pessoais', 'Endereço', 'Pagamento', 'Confirmação'];

  tabs = [
    { id: 'all',     label: 'Todos' },
    { id: 'active',  label: 'Ativos',   icon: 'checkmark-circle-outline' },
    { id: 'pending', label: 'Pendentes', icon: 'time-outline' },
  ];
  activeTab = 'all';

  tileItems = [
    { id: 'pix',    label: 'Pix',    icon: 'flash-outline' },
    { id: 'boleto', label: 'Boleto', icon: 'document-text-outline' },
    { id: 'card',   label: 'Cartão', icon: 'card-outline' },
    { id: 'wire',   label: 'Transferência', icon: 'swap-horizontal-outline' },
  ];
  selectedTile = 'pix';

  page = 1;

  ddOptions = [
    { label: 'São Paulo', value: 'SP' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Minas Gerais', value: 'MG' },
  ];
  ddValue = 'SP';

  radioOpts = [
    { label: 'Opção A', value: 'a' },
    { label: 'Opção B', value: 'b' },
    { label: 'Opção C (desabilitada)', value: 'c', disabled: true },
  ];
  radioVal = 'a';

  footerCols = [
    { title: 'Produto', links: [{ label: 'Recursos', url: '#' }, { label: 'Pricing', url: '#' }] },
    { title: 'Empresa', links: [{ label: 'Sobre', url: '#' }, { label: 'Blog', url: '#' }] },
    { title: 'Suporte', links: [{ label: 'Contato', url: '#' }, { label: 'FAQ', url: '#' }] },
  ];
}
