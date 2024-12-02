import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _ToastrService = inject(ToastrService)
  if (localStorage.getItem('userToken') !== null && localStorage.getItem('userGroup') === 'SuperAdmin') {
    return true;
  } else {
    _Router.navigate(['/dashboard']);
    _ToastrService.error('you are not authorized')
    return false;
  }
};
