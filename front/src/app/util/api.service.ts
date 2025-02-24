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
    await new Promise<void>((res) => {
      a.subscribe(async (data: any) => {
        await this.savePeople(this.transformSheetsData(data.values))
        res()
      })
    })
  }

  async savePeople(people: any){
    return new Promise<void>((res, rej) => {
      try{
        this.http.post("api/people", people).subscribe(data => {
          res()
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
    let people:any = []
    for(let l=4; l<sheetsData.length; l++){
      let person: any = {}
      if(l == 4) continue;
      for(let c=0; c<sheetsData[l].length; c++){
        person[sheetsData[4][c]] = sheetsData[l][c]
      }
      people.push(person)
    }
    return people
  }
}
