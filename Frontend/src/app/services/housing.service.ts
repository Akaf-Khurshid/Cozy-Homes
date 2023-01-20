import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IPropertyBase } from '../model/Ipropertybase';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getAllProperties(SellRent: number): Observable<IPropertyBase[]> {
    return this.http.get('data/properties.json').pipe(
      map(data => {
      const propertiesArray: Array<IPropertyBase> = [];

      for (const id in data) {
        if (data.hasOwnProperty(id) && (data as IPropertyBase[])[<any>id].SellRent === SellRent) {
          propertiesArray.push((data as IPropertyBase[])[<any>id]);
        }
      }
      return propertiesArray;
      })
    );
  }
}
