import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

export interface TileItem { id: string; label: string; icon?: string; description?: string; disabled?: boolean; }

@Component({
  selector: 'b2c-tiles',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './b2c-tiles.component.html',
  styleUrls: ['./b2c-tiles.component.scss'],
})
export class B2cTilesComponent {
  @Input() tiles: TileItem[] = [];
  @Input() selectedId = '';
  @Input() columns = 2;
  @Output() selectionChange = new EventEmitter<string>();

  select(id: string) { this.selectedId = id; this.selectionChange.emit(id); }
}
