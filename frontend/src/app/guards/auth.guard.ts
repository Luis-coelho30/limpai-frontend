import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data['roles'] as string[];

  return authService.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        const userRole = authService.getRole();
        if (expectedRoles && expectedRoles.length > 0 && (!userRole || !expectedRoles.includes(userRole))) {
          return router.createUrlTree(['/']); 
        }
        return true; 
      }
      return router.createUrlTree(['/login']);
    })
  );
};
