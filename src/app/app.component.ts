import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { ApiService } from './services/api.service';

export function AgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value < 18) {
    return { 'minage': true };
  }
  return null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'machinetest';
  form: FormGroup;
  loading = false;
  submitted = false;
  regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  minAge: number = 18;
  region: string;
  regionList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      age: ['', [Validators.required, AgeValidator]],
      email: ['', [Validators.required, Validators.email]],
      Region: ['', Validators.required],
      dob: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  get f() { return this.form.controls; }

  async onSubmit() {
    this.submitted = true;
 
    if (this.form.invalid) {
      return;
    }
    this.loading=true
    this.region = this.form.get('Region').value;
    await this.getRegionData();
    this.loading=false;
  }

  async getRegionData() {
    this.apiService.getRegionData(this.region).subscribe(response => {
      if (response.status === 200) {
        this.regionList = [];
        var data = response.body;
        if (data.length > 0) {
          data.forEach(element => {
            this.regionList.push({
              name:element.name,
              capital:element.capital,
              area:element.area,
              flag:element.flag,
              languages:element.languages,
            })
          });
        }
      }
    });
  }

  onResetForm() {
    this.submitted = false;
    this.regionList = [];
    this.form.reset();
  }
}
