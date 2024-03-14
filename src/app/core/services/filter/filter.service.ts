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
    order: '',
    startDate: '',
    endDate: ''
  };

  private filtersSubject = new BehaviorSubject(this.selectedFilters);
  filters$ = this.filtersSubject.asObservable();

  updateFilters(newFilters: any) {
    this.selectedFilters = { ...newFilters };
    this.filtersSubject.next(this.selectedFilters);
  }
}
