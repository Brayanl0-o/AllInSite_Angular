import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth/auth.guard';
import { SafeUrlPipe } from './pipes/safe-url.pipe';


@NgModule({
  declarations: [
    SafeUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SafeUrlPipe
  ],
  providers: [AuthGuard]
})
export class CoreModule { }
