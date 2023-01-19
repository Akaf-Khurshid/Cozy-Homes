import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IProperty } from '../property/IProperty.interface';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getAllProperties(SellRent: number): Observable<IProperty[]> {
    return this.http.get('data/properties.json').pipe(
      map(data => {
      const propertiesArray: Array<IProperty> = [];

      for (const id in data) {
        if (data.hasOwnProperty(id) && (data as IProperty[])[<any>id].SellRent === SellRent) {
          propertiesArray.push((data as IProperty[])[<any>id]);
        }
      }
      return propertiesArray;
      })
    );

    return this.http.get<IProperty[]>('data/properties.json');
  }
}
