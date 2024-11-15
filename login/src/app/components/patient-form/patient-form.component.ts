import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient/patient.service';
import { AuthService } from '../../services/auth.service';
import { Router,RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink ],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css'
})

export class PatientFormComponent implements OnInit {
  loggedInUser: any;
  patient: any[] = [];
  currentpatientId: number | null = null;
  isEditMode = false;
  isViewMode = false;
  country: any[] = [];
  state: any[] = [];
  // minDate = "2020-10-1";
  maxDate = "";

  TodayDate: any;
  date1 = new Date();
  currentYear = this.date1.getUTCFullYear();
  currentMonth = this.date1.getUTCMonth() + 1;
  currentDay = this.date1.getUTCDate();

  FinalMonth : any;
  FinalDay : any;


  constructor(private patientService: PatientService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getUserDetails();
    this.getAllpatients();
    this.getAllCountries();
    this.setAgentId();

    if(this.currentMonth < 10){
      this.FinalMonth = "0" + this.currentMonth;
    }else{
      this.FinalMonth = this.currentMonth
    }

    if(this.currentDay < 10){
      this.FinalDay = "0" + this.currentDay;
    }else{
      this.FinalDay = this.currentDay;
    }

    this.TodayDate = this.currentYear+ "-"+this.FinalMonth+ "-"+this.FinalDay
    console.log(this.TodayDate);
    this.maxDate = this.TodayDate;
  }

  patientForm = new FormGroup({
    id: new FormControl(null),
    firstname: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    phonenumber: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    bloodgroup: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    medicalhistory: new FormControl("", [Validators.required]),
    termsandcondition: new FormControl(false),
    agentId: new FormControl(`{{this.loggedInUser.AgentId}}`, [Validators.required]),
    patientId: new FormControl("")
  });


  getAllCountries() {
    this.patientService.getcountry().subscribe((data) => {
      this.country = data;
    })
  }

  onCountrySelected(countryId: number) {
    this.patientService.getcities(countryId).subscribe(data => {
      this.state = data;
    });
  }

  setAgentId() {
    if (this.loggedInUser && this.loggedInUser.agentId) {
      this.patientForm.get('agentId')?.setValue(this.loggedInUser.agentId);
    }
  }


  savePatient(): void {
    if (this.isEditMode && this.currentpatientId) {
      this.patientService.updatePatient(this.currentpatientId, this.patientForm.value).subscribe(() => {
        this.getAllpatients();
        this.resetForm();
      });
    } else {
      const newPatientData = { ...this.patientForm.value };
      delete newPatientData.id;
      console.log(newPatientData);
      this.patientService.addPatient(newPatientData).subscribe(() => {
        this.getAllpatients();
        this.resetForm();
      });
    }
  }

  getAllpatients() {
    this.patientService.getpatients().subscribe((data) => {
      this.patient = data;
    });
  }

  deletePatient(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.patientService.deletePatient(id).subscribe(() => {
        this.getAllpatients();
      });
    }
  }


  editpatient(patients: any): void {
    this.isEditMode = true;
    this.isViewMode = false;
    console.log(this.patientForm.value);
    this.currentpatientId = patients.id;
    this.patientForm.get('id')?.setValue(patients.id);
    this.patientForm.get('firstname')?.setValue(patients.firstname);
    this.patientForm.get('lastname')?.setValue(patients.lastname);
    this.patientForm.get('email')?.setValue(patients.email);
    this.patientForm.get('gender')?.setValue(patients.gender);
    this.patientForm.get('dob')?.setValue(formatDate(patients.dob, 'yyyy-MM-dd', 'en'));
    this.patientForm.get('email')?.setValue(patients.email);
    this.patientForm.get('phonenumber')?.setValue(patients.phonenumber);
    this.patientForm.get('bloodgroup')?.setValue(patients.bloodgroup);
    this.patientForm.get('address')?.setValue(patients.address);
    this.patientForm.get('medicalhistory')?.setValue(patients.medicalhistory);
    this.patientForm.get('termsandcondition')?.setValue(patients.termsandcondition);
    this.patientForm.get('city')?.setValue(patients.city);
    this.patientForm.get('state')?.setValue(patients.state);
    this.patientForm.get('country')?.setValue(patients.country);
  }

  resetForm(): void {
    this.patientForm.reset();
    this.currentpatientId = null;
  }

}
