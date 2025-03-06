import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) {}

  async getPeopleFromSheets(accessToken: string){
    let spreadsheetId = environment.sheetsId
    let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/People`
    let a = this.http.get(encodeURI(url), {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    await new Promise<void>((resolve) => {
      a.subscribe(async (data: any) => {
        await this.savePeople(this.transformSheetsData(data.values))
        resolve()
      })
    })
  }

  async savePicture(email: string, picture: string){
    return new Promise<void>((resolve, rej) => {
      try{
        this.http.post("api/save-picture", { email, picture }).subscribe(data => {
          resolve()
        })
      }catch(e){
        console.error(`saving picture error: ${e}`)
        rej()
      }
    })
  }

  async getPerson(email: string){
    return new Promise<any>((resolve, rej) => {
      try{
        this.http.get(`api/person/${email}`).subscribe(data => {
          resolve(data)
        })
      }catch(e){
        console.error(`saving people error: ${e}`)
        rej(e)
      }
    })
  }

  async savePeople(people: any){
    return new Promise<void>((resolve, rej) => {
      try{
        this.http.post("api/people", people).subscribe(data => {
          resolve()
        })
      }catch(e){
        console.error(`saving people error: ${e}`)
        rej()
      }
    })
  }

  async getPeople(){
    return new Promise<any>( (res, rej) => {
      try{
        this.http.get("api/people").subscribe(data =>{
          res(data)
        })
      }catch(e){
        console.error(e)
        rej()
      }
    })
  }

  private transformSheetsData(sheetsData: any){
    let allowedFields: string[] = ['Name', 'Start Date', 'Engagement', 
      'Team', 'Email CI&T', 'Login', 'Primary Skills', 'First Name']
    let people:any = []
    for(let l=4; l<sheetsData.length; l++){
      let person: any = {}
      if(l == 4) continue;
      for(let c=0; c<sheetsData[l].length; c++){
        if(allowedFields.includes(sheetsData[4][c]))
          person[sheetsData[4][c]] = sheetsData[l][c]
      }
      people.push(person)
    }
    return people
  }
}
