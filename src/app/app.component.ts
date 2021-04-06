import { Component, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  genders = ['Male', 'Female','Other'];
  signupForm: FormGroup;
  forbiddenUsernames = ['John','Wick'];
  submitted=false;
  states=[];
  url:any;
  msg='';
  user = {
    fname: '',
    lname:'',
    url:'',
    dob:'',
    email: '',
    gender: '',
    pan:'',
    aadhar:'',
    phone:'',
    phone2:'',
    city:'',
    address1:'',  
    address2:'',
    state:'',
    country:'',
    pin:'' ,
  };
  constructor() {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'fname': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'lname': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
        'dob': new FormControl(null, [Validators.required, this.dobValidation.bind(this)]),
        'gender': new FormControl(null),
        'pan':new FormControl(null),
        'url': new FormControl(null, Validators.required),
        'aadhar': new FormControl(null, [Validators.required, this.aadharValidation.bind(this)]),
        'city': new FormControl(null),
        'address1': new FormControl(null, Validators.required),
        'phone':new FormControl(null, [Validators.required, this.phoneValidation.bind(this)]),
        'phone2':new FormControl(null, [this.phoneValidation.bind(this)]),
        'copy': new FormControl(true),
        'country':new FormControl(null,Validators.required),
        'state':new FormControl(null, Validators.required),
        'address2': new FormControl(null),
        'pin':new FormControl(null, this.pinValidation.bind(this)),
      }),
    });
    
    this.signupForm.patchValue({
      'userData': {
        'email':'johnny@gmail.com',
        'state':'',
        'country':'',
      }
    });
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'johnny@gmail.com') {
          resolve({'emailIsForbidden': true});
        } 
        else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  aadharValidation(control: FormControl): {[s: string]: boolean} {
    var strval=String(control.value);
    if (strval.length != 12 && strval!="null") {
      return {'invalidAadhar': true};
    }
    return null;
  }

  dobValidation(control:FormControl):{[s: string]: boolean} {
    var curr=new Date();
    if (new Date(control.value)>curr) {
      return {'invalidDate': true};
    }
    return null;
  }
  
  phoneValidation(control: FormControl): {[s: string]: boolean} {
    var strval=String(control.value); 
    if(!(strval.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)) && !(strval==""||strval=="null")){
      return {'invalidPhone': true};
    }
    return null;
  }

  copyAddress(){
    if(this.signupForm.get('userData.copy').value)
    {
      this.signupForm.patchValue({
        'userData':{'address2':this.signupForm.get('userData.address1').value}
      })
    }
  }
  
  selectFile(event: any) 
  { 
		var size =event.target.files[0].size/1024 ;
    size = Math.ceil(size);
    if(size>1024)
    {
      this.msg="Image should be less than 1 MB"
    }
    else{
     
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.msg = "";
        this.url = reader.result; 
        this.signupForm.value.userData.url=this.url;
      }
    }
	}

  pinValidation(control: FormControl): {[s: string]: boolean} {
    var strval=String(control.value);
    if (strval.length != 6 && strval!="null") {
      return {'invalidPin': true};
    }
    return null;
  }

  onSubmit() {
    this.signupForm.markAllAsTouched();
    console.log(this.signupForm);
    if(this.signupForm.valid)
    {
      var date=new Date(this.signupForm.value.userData.dob).toLocaleDateString('en-GB');
      this.user.fname = this.signupForm.value.userData.fname;
      this.user.lname = this.signupForm.value.userData.lname;
      this.user.url=this.signupForm.value.userData.url;
      this.user.dob= date;
      this.user.email = this.signupForm.value.userData.email;
      this.user.gender = this.signupForm.value.userData.gender;
      this.user.pan = this.signupForm.value.userData.pan;
      this.user.aadhar = this.signupForm.value.userData.aadhar;
      this.user.phone = this.signupForm.value.userData.phone;
      this.user.phone2 = this.signupForm.value.userData.phone2;
      this.user.city = this.signupForm.value.userData.city;
      this.user.address1 = this.signupForm.value.userData.address1;
      this.user.address2 = this.signupForm.value.userData.address2;
      this.user.state = this.signupForm.value.userData.state;
      this.user.country = this.signupForm.value.userData.country;
      this.user.pin= this.signupForm.value.userData.pin;
      this.submitted=true;
      this.signupForm.reset();}
  }
  
  openStates(){
    var selected=this.signupForm.value.userData.country;
    this.signupForm.patchValue({
      'userData':{'state':'',}
    })
    if(selected=="India"){
      this.states=["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh",
		"Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
		"Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttarakhand","Uttar Pradesh","West Bengal"];
    }
    else if(selected=="USA")
    {
      this.states=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii",
      "Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota",
      "Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina",
      "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee",
      "Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
    }
    else if(selected=="UK")
		{
			this.states=["Scotland","Northern Ireland","Wales","North East","North West","Yorkshire and the Humber","West Midlands","East Midlands",
				"South West","South East","East of England","Greater London"];
		}
		else if(selected=="Japan")
		{
			this.states=["Hokkaido","Tohoku","Kanto","Chubu","Kinki/Kansai","Chugoku","Shikoku","Kyushu"];
		}
		else if(selected=="France")
		{
			this.states=["Grand-Est","Nouvelle-Aquitaine","Auvergne-Rhône-Alpes","Bourgogne-Franche-Comté","Occitanie","Hauts-de-France","Normandie",
				"Bretagne","Corse","Centre","Île-de-France","Pays de la Loire","Provence-Alpes-Côte d’Azur"];
		}
		else if(selected=="Russia")
		{
			this.states=["Adygey", "Altai", "Bashkortostan", "Buryat", "Chechnya", "Chuvash", "Dagestan", "Ingushetia", "Kabardino-Balkar","Sakha", 
		"Kalmykia","Karachay-Cherkess","Karelia","Khakass","Komi","Mari El","Mordovia","North Ossetia-Alania", "Tatarstan","Tuva","Udmurt"];
		}
  }
  
}
