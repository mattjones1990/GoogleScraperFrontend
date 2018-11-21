import { Component, OnInit } from '@angular/core';
import { searchCriteria } from 'src/searchCriteria.model';
import { PageBoolService } from '../page-bool.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  url: string = "www.infotrack.co.uk";
  searchKeywordOne: string = "Land";
  searchKeywordTwo: string = "Registry";
  searchKeywordThree: string = "Search";
  searchArray: string[][] = [];
  errorMessage = "Invalid search terms. Please ensure all required fields are populated."

  searchCriteriaClass: searchCriteria = new searchCriteria();
  submitted = false;
  errorMessageBool = false;
  message: boolean;
  searchResults = 100;


  constructor(private data: PageBoolService, private httpClient: HttpClient) { }
  
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  getData() {
    if (this.searchKeywordOne.length < 1 || this.url.length < 1) {
      this.errorMessageBool=true;
    } else {
      this.submitted = true;
      this.errorMessageBool=false;

      //populate object
      this.populateArray();
      this.searchCriteriaClass.ResultNumber = this.searchResults;
      this.searchCriteriaClass.UrlSearchString = this.url;

      //Post
      // let urlSearchParams = new URLSearchParams();
      // urlSearchParams.append('ResultNumber', this.searchCriteriaClass.ResultNumber.toString());
      // urlSearchParams.append('UrlSearchString', this.searchCriteriaClass.UrlSearchString);

      // this.searchCriteriaClass.SearchCriteriaArray.forEach(s => {
      //   urlSearchParams.append('SearchCriteriaArray', s.toString());
      // });

      this.httpClient.post(`http://localhost:57756/api/scrape`, this.searchCriteriaClass)
      .subscribe(
        (data:any) => {
          console.log(data);
        }
      )

    }



  }

  populateArray() {
    this.searchArray.push(this.searchKeywordOne);
    
    if (this.searchKeywordTwo.length > 0)
      this.searchArray.push(this.searchKeywordTwo);

    if (this.searchKeywordTwo.length > 0)
      this.searchArray.push(this.searchKeywordThree);

    this.searchCriteriaClass.SearchCriteriaArray = this.searchArray;
  }
}
