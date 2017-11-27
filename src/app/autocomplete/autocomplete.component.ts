import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Subject} from 'rxjs/Subject';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Item} from '../models/Item';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  items;
  showMatchedResult: boolean;
  matchedItems: Item[];
  searchText: string;
  searchField = new Subject<string>();
  searchListLength: number;
  activeIndex = 0;

  constructor(private dataService: DataService) { }

  /* Set initial data or restore initial data state */
  setData(): void {
    this.dataService.getData().subscribe(items => this.items = items);
  }
  private _filterData(id: number) {
    this.dataService.getFilteredData(id).subscribe(items => this.items = items);
  }

  /* On keyup method to launch Autocomplete dropdown  */
  autocomplete(event: KeyboardEvent, searchText: string): void {
    if (this.searchText.trim().length > 0) {
      this.showMatchedResult = true;
      this.searchField.next(searchText);
      if (event.keyCode === 38) {                             // Navigation by Arrows: 38 - UP, 40 - DOWN
        this._prevActiveMatch();
      } else if (event.keyCode === 40) {
        this._nextActiveMatch();
      } else if (event.keyCode === 13) {                       // Select Matched Result by Enter
        const selectedItem = this.matchedItems[this.activeIndex];
        this.searchText = selectedItem.name;
        this.activeIndex = 0;
        this.searchField.next(this.searchText);
        this._filterData(selectedItem.id);
        this.showMatchedResult = false;
      }
    } else {
      this.showMatchedResult = false;
      this.setData();
    }
  }

  /* Navigation between matched results by increasing / decreasing active Index */
  private _nextActiveMatch(): void {
    this.activeIndex = this.activeIndex < this.searchListLength ? ++this.activeIndex : 0;
  }
  private _prevActiveMatch(): void {
    this.activeIndex = this.activeIndex > 0 ? --this.activeIndex : 4;
  }

  /* Select Matched Item by mouse click */
  selectSearchSuggestion(id: number, name: string): void {
    this.searchText = name;
    this.activeIndex = 0;
    this.showMatchedResult = false;
    this._filterData(id);
  }

  /* Mouse hover on matched result */
  suggestionHover(i: number) {
    this.activeIndex = i;
  }

  /* Click outside of input */
  hideMatchedResult(): void {
    setTimeout(() => {
      this.showMatchedResult = false;
    }, 150);
  }

  ngOnInit() {
    this.setData();
    this.showMatchedResult = false;
    this.searchField.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((val: string) => this.dataService.getMatchedData(val))
    ).subscribe(items => {
      this.searchListLength = items.length >= 5 ? 4 : items.length - 1;
      this.matchedItems = items;
    });

  }
}
