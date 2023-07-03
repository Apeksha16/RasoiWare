import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const routeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userSession = localStorage.getItem('accessToken') || '';
  if (userSession === '') {
    router.navigate(['/']);
    return false;
  }
  else {
    return true;
  }
};
