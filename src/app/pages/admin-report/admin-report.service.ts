import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class AdminReportService {

  constructor() { }
  
  downloadFile(response:string) {
    var blob = new Blob([response], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "tolala.json");
  }
}
