import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent},
      {
        path: 'tasks',
        loadChildren: () =>
          import('./tasks/task.module').then((m) => m.TasksModule),
      },
    ],
  },
];

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, RouterModule.forChild(routes), AppMaterialModule],
})
export class MainModule {}
