import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {
public isSubmitted: boolean = false;
setValue(value: boolean){
  this.isSubmitted=value;
}
getValue(){
  return this.setValue;
}
  constructor() { }
}