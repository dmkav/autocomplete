import { Component, OnInit } from '@angular/core';

import {DataService} from '../services/data.service';
import {Subject} from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Item} from '../models/Item';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  items;
  list;
  showMatchedResult: boolean;
  matchedItems: Observable<Item[]>;
  searchText: string;
  searchField = new Subject<string>();
  searchListLength: number;
  activeIndex = 0;

  setData(): void {
    this.dataService.getData().subscribe(items => this.items = items);
  }
  private _nextActiveMatch(): void {
    this.activeIndex = this.activeIndex < this.searchListLength ? ++this.activeIndex : 0;
  }
  private _prevActiveMatch(): void {
    this.activeIndex = this.activeIndex > 0 ? --this.activeIndex : 4;
  }
  autocomplete(event: KeyboardEvent, searchText: string): void {
    console.log(this.showMatchedResult);
    this.showMatchedResult = true;
    console.log(this.showMatchedResult);
    this.searchField.next(searchText);
    if (event.keyCode === 38) {
      this._prevActiveMatch();
    } else if (event.keyCode === 40) {
      this._nextActiveMatch();
    } else if (event.keyCode === 13) {
      this.searchText = this.list[this.activeIndex].name;
      this.activeIndex = 0;
      this.showMatchedResult = false;
    }
  }
  selectSearchSuggestion(name: string): void {
    this.searchText = name;
    this.activeIndex = 0;
    this.showMatchedResult = false;
  }

  suggestionHover(i: number) {
    this.activeIndex = i;
  }
  hideMatchedResult(): void {
    setTimeout(() => {
      this.showMatchedResult = false;
    }, 150);
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.setData();
    this.showMatchedResult = false;
    this.matchedItems = this.searchField.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((val: string) => this.dataService.getMatchedData(val).map(items => {
          this.searchListLength = items.length >= 5 ? 4 : items.length - 1;
          this.list = items;
          return items;
        })
      )
    );

  }
}
