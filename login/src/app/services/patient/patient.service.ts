import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private url ='https://localhost:7067/api/Patient';  
  private CountryUrl = 'https://localhost:7067/api/Countries';
  private StateUrl = 'https://localhost:7067/api/State';


  constructor(private http : HttpClient ) { }

  getcountry(): Observable<any[]>{
    return this.http.get<any[]>(this.CountryUrl);  
  }


  getcities(countryId : number): Observable<any[]>{
    return this.http.get<any[]>(`${this.StateUrl}/${countryId}`);
  }

  addPatient(patient: any): Observable<any> {
    return this.http.post<any>(this.url, patient, { responseType: 'text' as 'json'});
  }

  getpatients(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  updatePatient(id: number, patient: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, patient);
  }

}
