import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  { path:'', redirectTo: '/inicio', pathMatch: 'full' },
  { path:'inicio', component: InicioComponent },
  { path:'board/:id', component: BoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
