import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { StoreModule } from '@ngrx/store';
import { personFeatureKey, reducer } from 'src/app/core/store/reducer/person.reducer';
import { InputFormModule } from 'src/app/shared/components/input-form/input-form.module';
import { PersonsModule } from 'src/app/shared/components/persons/persons.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    InputFormModule,
    PersonsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forFeature(personFeatureKey, reducer),
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
