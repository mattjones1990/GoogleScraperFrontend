import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageBoolService {

  private messageSource = new BehaviorSubject<boolean>(true);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeBool(message : boolean) {
    this.messageSource.next(message)
  }

}
