import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userSession = localStorage.getItem('accessToken') || '';
  if (userSession === '') {
        return true;
      }
  else {
        router.navigate(['/dashboard']);
        return false;
      }
};
