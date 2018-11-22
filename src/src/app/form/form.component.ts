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
  errorMessage: string = "Invalid search terms. Please ensure all required fields are populated."
  searchArray: string[][] = [];
  returnedArray: string[][] = [];

  searchCriteriaClass: searchCriteria = new searchCriteria();

  submitted: boolean = false;
  errorMessageBool: boolean = false;
  noResultsFound: boolean = false;
  message: boolean;

  searchResultOptions: number[] = [1,10,50,100,200,500,1000,2000,5000,10000,50000];
  searchResults: number = 100;
  returnedResults: number = 0;

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

      //chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
      this.httpClient.post(`http://localhost:57756/api/scrape`, this.searchCriteriaClass) //works
      .subscribe(
        (data:any) => {
          if (data.ErrorReason == null) {
            
            this.returnedResults = data.ListOfURLs.length;
            this.returnedArray = data.ListOfURLs;
            this.message =true;
          } else if (data.ErrorReason == "No results found") {
            this.noResultsFound = !this.noResultsFound;
          } else {
            this.errorMessageBool = !this.errorMessageBool;
          }
        }
      )
    }
  }

  populateArray() {
    this.searchArray = [];
    this.searchArray.push(this.searchKeywordOne);
    
    if (this.searchKeywordTwo.length > 0)
      this.searchArray.push(this.searchKeywordTwo);

    if (this.searchKeywordTwo.length > 0)
      this.searchArray.push(this.searchKeywordThree);

    this.searchCriteriaClass.SearchCriteriaArray = this.searchArray;
  }
}
