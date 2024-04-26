import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable, inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(AuthService);
  const router = inject(Router);

  if (!userService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};



// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard {

//   constructor(private authService: AuthService, private route: Router) {

//   }

//     canActivate() {
//       console.log(this.authService.isLoggedIn())
//       if (this.authService.isLoggedIn()) {

//         return true; // Permitir acesso à rota
//       } else {
//         // Redirecionar para a página de login e retornar false para bloquear o acesso à rota
//         window.alert('Você não tem permissão para acessar esta página. Faça login.');
//         this.route.navigate(['/login'])
//         return false;
//       }
//     }

//   }

//   export const authGuard: CanActivateFn = (route, state) => {
//     return inject(AuthGuard).canActivate();
// };
