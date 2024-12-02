import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NoDataComponent } from './no-data/no-data.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatSelectModule} from '@angular/material/select';
import {NgIf, NgFor} from '@angular/common';
import { SeparatorPipe } from './pipes/separator.pipe';
import { ImageCropperComponent} from 'ngx-image-cropper';
import { CurrentUserComponent } from './current-user/current-user.component';

@NgModule({
  declarations: [
    SharedComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    NoDataComponent,
    PageNotFoundComponent,
    SeparatorPipe,
    CurrentUserComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgIf,
    NgFor,
    ImageCropperComponent
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent,
    NoDataComponent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgIf,
    NgFor,
    SeparatorPipe,
    ImageCropperComponent
  ],
})
export class SharedModule {}
