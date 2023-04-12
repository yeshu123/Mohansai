import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { companymodel } from '../Model/companymodel';
import { techtracks } from '../Model/techtracks';
import { userInfo } from '../Model/userInfomodel';
import { User } from '../Model/User';
import { programstracker } from '../Model/programstracker';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getEndDateApi(startDate: Date) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}
  apiurl = 'https://localhost:7260/api/Assign';

  Getallcomapny(): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(
      'https://localhost:7260/api/Assign'
    );
  }


  GetAllHistoryRecordsById(id: number): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(
      'https://localhost:7260/api/Assign/GetResourceHistoryById' +
        '/' +
        id
    );
  }

  GetUserByEmail(email: string): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(
      'https://localhost:7260/api/Assign/GetResourceByEmail' +
        '/' +
        email
    );
  }

  GetCompanybycode(id: number): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(
      'https://localhost:7260/api/Assign/GetResourceHistorySingleById' +
        '/' +
        id
    );
  }

  GetCompanybyId(id: number): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(
      'https://localhost:7260/api/Assign' + '/' + id
    );
  }
  //id: number;
  GetUserData(id: number): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(
      'https://localhost:7260/api/Assign/GetResourceHistoryById' +
        '/' +
        id

      //return this.http.get<companymodel[]>(this.apiurl+'/GetResourceHistoryById'+'/'+id);
      // 'https://localhost:7260/api/Assign'
    );
    //return this.http.get<companymodel[]>('https://localhost:7260/api/Assign/GetResourceHistoryById/'+id);
  }

  RemoveCompanybycode(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  CreateComapny(companyform: any) {
    return this.http.post(
      'https://localhost:7260/api/Assign',
      companyform
    );
  }

  UpdateComapny(id: any, companydata: any) {
    let data = companydata;

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.put(
      'https://localhost:7260/api/Assign/UpdateResourceHistory' +
        '/' +
        id,
      companydata,
      { headers: headers }
    );
  }

  UpdateProgramCode(id: any, code: any) {
    let data = code;

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.put(
      'https://localhost:7260/api/Assign/UpdateResourceHistoryCode' +
        '/' +
        id,
      code,
      { headers: headers }
    );
  }
  GetProgramCode(id: any) {
    return this.http.get(
      'https://localhost:7260/api/Assign/GetResourceHistorySingleById' +
        '/' +
        id
    );
  }
  UpdateComments(id: any, comments: any) {
    let data = comments;

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.put(
      'https://localhost:7260/api/Assign/UpdateResourceHistoryCode' +
        '/' +
        id,
      comments,
      { headers: headers }
    );
  }

  getProgramDropDown(): Observable<any> {
    return this.http.get<techtracks[]>(
      'https://localhost:7260/api/ProgramTracker/GetTechTracks'
    );
  }
  getUserInfo(vamid: any): Observable<any> {
    return this.http.get<userInfo[]>(
      'https://localhost:7260/api/UserInfo/' +
        vamid
    );
  }

  getCategory(techTrack:string): Observable<any>{
    return this.http.get<programstracker[]>(
    'https://localhost:7260/api/ProgramTracker/GetCategoriesByTechTrack/'+techTrack
  )
}

 getProgram(techTrack:string,category:string): Observable<any>{
  return this.http.get<programstracker[]>(
  'https://localhost:7260/api/ProgramTracker/GetProgramsByCategory/'+techTrack+'/' + category
)
}

  getendDateApi(startDate: any): Observable<any> {
    return this.http.get<[]>(
      'https://localhost:7260/api/VAMHoliday?startDate=' +
        startDate
    );
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      'https://localhost:7260/api/Employees'
    );
  }
  CreateUser(userModel: any) {
    return this.http.post(
      'https://localhost:7260/api/Employees',
      userModel
    );
  }
}
