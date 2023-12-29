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
      day: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
      month: [null, [Validators.required, Validators.min(1), Validators.max(12)]],
      year: [null, [Validators.required, Validators.min(1900)]]
    });
  }

  calculateAge() {
    const birthdate = new Date(
      this.ageForm.value.year,
      this.ageForm.value.month - 1,
      this.ageForm.value.day
    );

    const today = new Date();

    let ageYears = today.getFullYear() - birthdate.getFullYear();
    let ageMonths = today.getMonth() - birthdate.getMonth();
    let ageDays = today.getDate() - birthdate.getDate();

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

  // Helper function to get the number of days in a month
  daysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }
}
