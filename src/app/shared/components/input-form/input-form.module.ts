import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AutoFocusModule } from '../../directives/auto-focus/auto-focus.module';
import { MatButtonModule } from '@angular/material/button';
import { InputFormComponent } from './input-form.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    AutoFocusModule
  ],
  declarations: [InputFormComponent],
  exports: [InputFormComponent],
})
export class InputFormModule { }
