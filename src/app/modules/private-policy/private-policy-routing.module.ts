import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivatePolicyComponent } from './private-policy.component';

const routes: Routes = [{ path: '', component: PrivatePolicyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivatePolicyRoutingModule {}
