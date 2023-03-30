import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { BoardComponent } from './components/board/board.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './components/task/task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog'
import { NewBoardDialogComponent } from './components/inicio/new.board.dialog/new.board.dialog.component';
import { ConfirmationDeleteDialogComponent } from './components/inicio/confirmation.delete.dialog/confirmation.delete.dialog.component';
import { ConfirmationDeleteTaskDialogComponent } from './components/task/confirmation.delete-task.dialog/confirmation.delete-task.dialog.component';
import { RemoveListDialogComponent } from './components/board/remove-list.dialog/remove-list.dialog.component';
import { EditTaskDialogComponent } from './components/task/edit.task.dialog/edit.task.dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BoardComponent,
    InicioComponent,
    TaskComponent,
    TaskListComponent,
    NewBoardDialogComponent,
    RemoveListDialogComponent,
    ConfirmationDeleteDialogComponent,
    ConfirmationDeleteTaskDialogComponent,
    EditTaskDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    DragDropModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
