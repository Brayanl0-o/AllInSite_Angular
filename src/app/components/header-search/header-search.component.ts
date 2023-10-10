import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent {
  @Input() games: Game[] = [];
  @Output() searchValueChanged = new EventEmitter<string>();

  searchTerm: string = '';

  onSearchInputChange() {
    this.searchValueChanged.emit(this.searchTerm);
  }
}
