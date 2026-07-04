import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ComponentMeta {
  name: string;
  selector: string;
  category: 'navigation' | 'feedback' | 'data-display' | 'input' | 'layout';
  description: string;
  inputs: { name: string; type: string; default: string; description: string }[];
  outputs: { name: string; type: string; description: string }[];
}

@Injectable({ providedIn: 'root' })
export class B2cComponentsService {
  private readonly _registry: ComponentMeta[] = [
    {
      name: 'B2cAccordion', selector: 'b2c-accordion', category: 'data-display',
      description: 'Exibe conteúdo expansível com animação.',
      inputs:  [{ name: 'title', type: 'string', default: "''", description: 'Título do painel' }],
      outputs: [],
    },
    {
      name: 'B2cAlert', selector: 'b2c-alert', category: 'feedback',
      description: 'Mensagem contextual com variantes info, success, warning, error.',
      inputs: [
        { name: 'type',        type: 'AlertType', default: "'info'",  description: 'Variante visual' },
        { name: 'title',       type: 'string',    default: "''",       description: 'Título opcional' },
        { name: 'message',     type: 'string',    default: "''",       description: 'Texto da mensagem' },
        { name: 'dismissible', type: 'boolean',   default: 'false',    description: 'Exibe botão de fechar' },
      ],
      outputs: [],
    },
    {
      name: 'B2cAvatar', selector: 'b2c-avatar', category: 'data-display',
      description: 'Representa usuário com imagem ou iniciais.',
      inputs: [
        { name: 'src',  type: 'string', default: "''",   description: 'URL da imagem' },
        { name: 'name', type: 'string', default: "''",   description: 'Nome para gerar iniciais' },
        { name: 'size', type: "'sm'|'md'|'lg'|'xl'", default: "'md'", description: 'Tamanho' },
      ],
      outputs: [],
    },
    {
      name: 'B2cBreadcrumb', selector: 'b2c-breadcrumb', category: 'navigation',
      description: 'Navegação hierárquica de páginas.',
      inputs:  [{ name: 'items', type: 'BreadcrumbItem[]', default: '[]', description: 'Lista de itens' }],
      outputs: [],
    },
    {
      name: 'B2cCard', selector: 'b2c-card', category: 'data-display',
      description: 'Contêiner de conteúdo com suporte a imagem e ações.',
      inputs: [
        { name: 'variant',  type: "'elevated'|'outlined'", default: "'elevated'", description: 'Estilo visual' },
        { name: 'title',    type: 'string', default: "''", description: 'Título' },
        { name: 'subtitle', type: 'string', default: "''", description: 'Subtítulo' },
        { name: 'clickable', type: 'boolean', default: 'false', description: 'Torna o card clicável' },
      ],
      outputs: [{ name: 'cardClick', type: 'EventEmitter<void>', description: 'Emitido ao clicar' }],
    },
    {
      name: 'B2cCounter', selector: 'b2c-counter', category: 'input',
      description: 'Controle numérico com incremento e decremento.',
      inputs: [
        { name: 'value', type: 'number', default: '0',  description: 'Valor atual' },
        { name: 'min',   type: 'number', default: '0',  description: 'Mínimo' },
        { name: 'max',   type: 'number', default: '99', description: 'Máximo' },
      ],
      outputs: [{ name: 'valueChange', type: 'EventEmitter<number>', description: 'Emitido a cada mudança' }],
    },
    {
      name: 'B2cDatePicker', selector: 'b2c-date-picker', category: 'input',
      description: 'Seletor de data/hora baseado em IonDatetime.',
      inputs: [
        { name: 'label',        type: 'string',                         default: "''",     description: 'Rótulo' },
        { name: 'value',        type: 'string',                         default: "''",     description: 'Valor ISO' },
        { name: 'presentation', type: "'date'|'time'|'date-time'",       default: "'date'", description: 'Modo de exibição' },
        { name: 'errorMessage', type: 'string',                         default: "''",     description: 'Mensagem de erro' },
      ],
      outputs: [{ name: 'valueChange', type: 'EventEmitter<string>', description: 'Emitido ao selecionar data' }],
    },
    {
      name: 'B2cDialog', selector: 'b2c-dialog', category: 'feedback',
      description: 'Modal de diálogo com cabeçalho, corpo e rodapé opcionals.',
      inputs: [
        { name: 'isOpen',       type: 'boolean', default: 'false',       description: 'Controla visibilidade' },
        { name: 'title',        type: 'string',  default: "''",           description: 'Título' },
        { name: 'confirmLabel', type: 'string',  default: "'Confirmar'",  description: 'Rótulo do botão confirmar' },
        { name: 'cancelLabel',  type: 'string',  default: "'Cancelar'",   description: 'Rótulo do botão cancelar' },
        { name: 'showFooter',   type: 'boolean', default: 'true',         description: 'Exibe rodapé com botões' },
      ],
      outputs: [
        { name: 'confirm', type: 'EventEmitter<void>', description: 'Emitido ao confirmar' },
        { name: 'cancel',  type: 'EventEmitter<void>', description: 'Emitido ao cancelar' },
        { name: 'closed',  type: 'EventEmitter<void>', description: 'Emitido ao fechar' },
      ],
    },
    {
      name: 'B2cDivider', selector: 'b2c-divider', category: 'layout',
      description: 'Separador visual horizontal ou vertical.',
      inputs: [
        { name: 'label',    type: 'string',  default: "''",     description: 'Texto central opcional' },
        { name: 'vertical', type: 'boolean', default: 'false',  description: 'Modo vertical' },
        { name: 'spacing',  type: 'string',  default: "'16px 0'", description: 'Margem CSS' },
      ],
      outputs: [],
    },
    {
      name: 'B2cDropdown', selector: 'b2c-dropdown', category: 'input',
      description: 'Select customizado com busca de opções.',
      inputs: [
        { name: 'options',      type: 'DropdownOption[]', default: '[]',            description: 'Lista de opções' },
        { name: 'value',        type: 'string',           default: "''",            description: 'Valor selecionado' },
        { name: 'label',        type: 'string',           default: "''",            description: 'Rótulo' },
        { name: 'placeholder',  type: 'string',           default: "'Selecione...'", description: 'Placeholder' },
        { name: 'errorMessage', type: 'string',           default: "''",            description: 'Mensagem de erro' },
      ],
      outputs: [{ name: 'valueChange', type: 'EventEmitter<string>', description: 'Emitido ao selecionar' }],
    },
    {
      name: 'B2cEmptyState', selector: 'b2c-empty-state', category: 'feedback',
      description: 'Tela vazia com ícone, título e descrição.',
      inputs: [
        { name: 'icon',        type: 'string', default: "'file-tray-outline'",         description: 'Nome do ícone Ionicon' },
        { name: 'title',       type: 'string', default: "'Nenhum resultado encontrado'", description: 'Título' },
        { name: 'description', type: 'string', default: "''",                           description: 'Texto auxiliar' },
      ],
      outputs: [],
    },
    {
      name: 'B2cFooter', selector: 'b2c-footer', category: 'navigation',
      description: 'Rodapé com colunas de links e copyright.',
      inputs: [
        { name: 'columns',   type: 'FooterColumn[]', default: '[]', description: 'Colunas de links' },
        { name: 'copyright', type: 'string',         default: 'ano atual', description: 'Texto de copyright' },
      ],
      outputs: [],
    },
    {
      name: 'B2cLoading', selector: 'b2c-loading', category: 'feedback',
      description: 'Indicador de carregamento inline ou overlay.',
      inputs: [
        { name: 'visible',  type: 'boolean', default: 'true',      description: 'Controla visibilidade' },
        { name: 'overlay',  type: 'boolean', default: 'false',     description: 'Modo overlay tela cheia' },
        { name: 'message',  type: 'string',  default: "''",        description: 'Mensagem opcional' },
        { name: 'spinner',  type: 'string',  default: "'circular'", description: 'Estilo do spinner Ionic' },
      ],
      outputs: [],
    },
    {
      name: 'B2cNavbar', selector: 'b2c-navbar', category: 'navigation',
      description: 'Barra de navegação superior com logo e links.',
      inputs: [
        { name: 'logoUrl',   type: 'string',    default: "''",    description: 'URL do logotipo' },
        { name: 'brandName', type: 'string',    default: "'B2C'", description: 'Nome da marca' },
        { name: 'navItems',  type: 'NavItem[]', default: '[]',    description: 'Itens de navegação' },
        { name: 'compact',   type: 'boolean',   default: 'false', description: 'Modo mobile com hamburger' },
      ],
      outputs: [{ name: 'menuToggle', type: 'EventEmitter<void>', description: 'Emitido ao clicar no hamburger' }],
    },
    {
      name: 'B2cPagination', selector: 'b2c-pagination', category: 'navigation',
      description: 'Navegação entre páginas com ellipsis inteligente.',
      inputs: [
        { name: 'currentPage', type: 'number', default: '1', description: 'Página ativa' },
        { name: 'totalPages',  type: 'number', default: '1', description: 'Total de páginas' },
      ],
      outputs: [{ name: 'pageChange', type: 'EventEmitter<number>', description: 'Página selecionada' }],
    },
    {
      name: 'B2cProgressBar', selector: 'b2c-progress-bar', category: 'feedback',
      description: 'Barra de progresso determinada ou indeterminada.',
      inputs: [
        { name: 'value',         type: 'number',  default: '0',     description: 'Valor de 0 a 100' },
        { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Modo indeterminado' },
        { name: 'showLabel',     type: 'boolean', default: 'false', description: 'Exibe percentual' },
      ],
      outputs: [],
    },
    {
      name: 'B2cRadioButton', selector: 'b2c-radio-button', category: 'input',
      description: 'Grupo de botões radio customizados.',
      inputs: [
        { name: 'options',    type: 'RadioOption[]', default: '[]',          description: 'Lista de opções' },
        { name: 'value',      type: 'string',        default: "''",          description: 'Valor selecionado' },
        { name: 'groupLabel', type: 'string',        default: "''",          description: 'Rótulo do grupo' },
        { name: 'horizontal', type: 'boolean',       default: 'false',       description: 'Layout horizontal' },
      ],
      outputs: [{ name: 'valueChange', type: 'EventEmitter<string>', description: 'Valor selecionado' }],
    },
    {
      name: 'B2cSheet', selector: 'b2c-sheet', category: 'feedback',
      description: 'Bottom sheet com breakpoints configuráveis.',
      inputs: [
        { name: 'isOpen',           type: 'boolean',  default: 'false',          description: 'Controla visibilidade' },
        { name: 'title',            type: 'string',   default: "''",             description: 'Título do sheet' },
        { name: 'breakpoints',      type: 'number[]', default: '[0, 0.5, 1]',   description: 'Pontos de parada' },
        { name: 'initialBreakpoint', type: 'number',  default: '0.5',           description: 'Breakpoint inicial' },
      ],
      outputs: [{ name: 'closed', type: 'EventEmitter<void>', description: 'Emitido ao fechar' }],
    },
    {
      name: 'B2cStatusIndicator', selector: 'b2c-status-indicator', category: 'data-display',
      description: 'Indicação visual de status com ponto ou pill.',
      inputs: [
        { name: 'status', type: 'StatusType', default: "'active'", description: 'Estado' },
        { name: 'label',  type: 'string',     default: "''",       description: 'Rótulo' },
        { name: 'pill',   type: 'boolean',    default: 'false',    description: 'Modo pill' },
      ],
      outputs: [],
    },
    {
      name: 'B2cStepper', selector: 'b2c-stepper', category: 'navigation',
      description: 'Indica progresso em múltiplos passos.',
      inputs: [
        { name: 'steps',       type: 'string[]', default: '[]', description: 'Rótulos de cada passo' },
        { name: 'currentStep', type: 'number',   default: '0',  description: 'Índice do passo ativo' },
      ],
      outputs: [],
    },
    {
      name: 'B2cTabList', selector: 'b2c-tab-list', category: 'navigation',
      description: 'Lista de abas com suporte a ícones.',
      inputs: [
        { name: 'tabs',      type: 'TabItem[]', default: '[]', description: 'Lista de abas' },
        { name: 'activeTab', type: 'string',    default: "''", description: 'ID da aba ativa' },
      ],
      outputs: [{ name: 'tabChange', type: 'EventEmitter<string>', description: 'ID da aba selecionada' }],
    },
    {
      name: 'B2cTiles', selector: 'b2c-tiles', category: 'input',
      description: 'Grade de tiles selecionáveis.',
      inputs: [
        { name: 'tiles',      type: 'TileItem[]', default: '[]', description: 'Lista de tiles' },
        { name: 'selectedId', type: 'string',     default: "''", description: 'ID do tile selecionado' },
        { name: 'columns',    type: 'number',     default: '2',  description: 'Número de colunas' },
      ],
      outputs: [{ name: 'selectionChange', type: 'EventEmitter<string>', description: 'ID selecionado' }],
    },
    {
      name: 'B2cToast', selector: 'b2c-toast', category: 'feedback',
      description: 'Notificação temporária com auto-dismiss.',
      inputs: [
        { name: 'type',     type: 'ToastType', default: "'info'", description: 'Variante visual' },
        { name: 'message',  type: 'string',    default: "''",     description: 'Texto da mensagem' },
        { name: 'duration', type: 'number',    default: '4000',   description: 'Duração em ms (0 = permanente)' },
      ],
      outputs: [],
    },
    {
      name: 'B2cTooltip', selector: 'b2c-tooltip', category: 'data-display',
      description: 'Dica flutuante ao hover com 4 posições.',
      inputs: [
        { name: 'text',     type: 'string',                          default: "''",    description: 'Conteúdo do tooltip' },
        { name: 'position', type: "'top'|'bottom'|'left'|'right'",   default: "'top'", description: 'Posição' },
      ],
      outputs: [],
    },
  ];

  private readonly _selected$ = new BehaviorSubject<ComponentMeta | null>(null);
  readonly selected$ = this._selected$.asObservable();

  getAll(): ComponentMeta[] { return this._registry; }
  getByCategory(cat: ComponentMeta['category']): ComponentMeta[] {
    return this._registry.filter(c => c.category === cat);
  }
  select(name: string): void {
    this._selected$.next(this._registry.find(c => c.name === name) ?? null);
  }
}
