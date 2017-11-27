import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Item} from '../models/Item';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {of} from 'rxjs/observable/of';

@Injectable()
export class DataService {
  private url = './assets/api/data.json';
  constructor(private http: Http) { }

  getData(): Observable<Item[]> {
    return this.http.get(this.url).map(data => data.json().data as Item[]);
  }
  getFilteredData(val: string | number): Observable<Item[]> {
    return this.getData().map(items => {
      return items.filter(item => {
        if (Number(val)) {
          return item.id === val;
        } else {
          return item.name.indexOf(<string>val) !== -1 || item.description.indexOf(<string>val) !== -1;
        }
      });
    });
  }
  getMatchedData(val: string): Observable<Item[]> {
    if (val.trim()) {
      val = val.toLowerCase();
      return this.getData().map(items => {
        return items.filter(item => {
          return item.name.toLowerCase().indexOf(val) !== -1 || item.description.toLowerCase().indexOf(val) !== -1;
        });
      });
    } else {
      return of([]);
    }
  }
}
