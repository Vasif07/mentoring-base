import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const adminAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAdmin = authService.IsAdmin();

  if (isAdmin) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
