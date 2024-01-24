import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ageForm: UntypedFormGroup;
  age: any = {};

  constructor(private fb: UntypedFormBuilder) {
    this.ageForm = this.fb.group({
      day: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      month: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      year: ['', [Validators.required, Validators.min(1900)]]
    });
  }

  calculateAge() {
    const day = parseInt(this.ageForm.value.day, 10);
    const month = this.ageForm.value.month;
    const year = this.ageForm.value.year;
  
    if (month < 1 || month > 12) {
      this.ageForm.get('month')?.setErrors({ 'incorrect': true });
    }
  
    if (day < 1 || day > 31) {
      this.ageForm.get('day')?.setErrors({ 'incorrect': true });
    }
  
    if (year < 1900 || year > new Date().getFullYear()) {
      this.ageForm.get('year')?.setErrors({ 'incorrect': true });
    }
  
    if (month === 4 || month === 6 || month === 9 || month === 11 && day > 30) {
      this.ageForm.get('month')?.setErrors({ 'incorrect': true });
    } else if (month === 2) {
      if (day > 29 || (day > 28 && !this.isLeapYear(year))) {
        this.ageForm.get('day')?.setErrors({ 'incorrect': true });
      }
    }
  
    const today = new Date();
    const birthdate = new Date(year, month - 1, day);
  
    let ageYears = today.getFullYear() - year;
    let ageMonths = today.getMonth() - month;
    let ageDays = today.getDate() - day;
  
    // Adjust negative months and days
    if (ageDays < 0) {
      ageMonths--;
      ageDays += this.daysInMonth(today.getMonth(), today.getFullYear());
    }
  
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }
  
    this.age = {
      years: ageYears,
      months: ageMonths,
      days: ageDays
    };
  }
  
  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
  
  daysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }
  
}
