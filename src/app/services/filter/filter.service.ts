import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private selectedFilters = {
    platforms: [],
    genres: [],
    developers: [],
    order: ''
  };

  private filtersSubject = new BehaviorSubject(this.selectedFilters);
  filters$ = this.filtersSubject.asObservable();

  updateFilters(newFilters: any) {
    this.selectedFilters = { ...newFilters };
    console.log('filter from filerS:', this.selectedFilters)
    this.filtersSubject.next(this.selectedFilters);
  }
}
