import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IPropertyBase } from '../model/Ipropertybase';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5149/api/city');
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map(data => {
      const propertiesArray: Array<Property> = [];
      const localProperties = JSON.parse(localStorage.getItem('newProp') as string);

      if(localProperties) {
        for (const id in localProperties) {
          if (SellRent){
            if (localProperties.hasOwnProperty(id) && (localProperties as Property[])[<any>id].SellRent === SellRent) {
              propertiesArray.push((localProperties as Property[])[<any>id]);
            } else{
              propertiesArray.push((localProperties as Property[])[<any>id]);
            }
          }
        }
      }

      for (const id in data) {
        if(SellRent){
          if (data.hasOwnProperty(id) && (data as Property[])[<any>id].SellRent === SellRent) {
            propertiesArray.push((data as Property[])[<any>id]);
          }
        } else {
          propertiesArray.push((data as Property[])[<any>id]);
        }
      }
      return propertiesArray;
      })
    );
    return this.http.get<Property[]>('data/properties.json');
  }

  addProperty(property: Property){
    let newProp = [property];

    // Add new property in array if newProp already exists in local storage
    if(localStorage.getItem('newProp')){
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp') as string)]
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID(){
    if (localStorage.getItem('PID')){
      localStorage.setItem('PID', String(+(localStorage.getItem('PID') as string) + 1));
      return +(localStorage.getItem('PID') as string);
    } else{
      localStorage.setItem('PID', '101');
      return 101;
    }
  }

  getProperty(id: number){
    return this.getAllProperties().pipe(
      map(propertiesArray => {
         return propertiesArray.find(p => p.Id === id)
      })
    );
  }
}
