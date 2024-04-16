import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = new AuthService()

  if (authService.isLoggedIn()) {
    return true; // Permitir acesso à rota
  } else {
    // Redirecionar para a página de login e retornar false para bloquear o acesso à rota
    window.alert('Você não tem permissão para acessar esta página. Faça login.');
    return false;
  }
};
