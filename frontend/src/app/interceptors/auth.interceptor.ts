import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJpc3NhY0B0ZXN0LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NjkzNTQ1OSwiZXhwIjoxNzY3MDIxODU5fQ.Wnm1VuoOBitsaWcHfO3mW4dr6frusIKH6_63DM8WcoE'}`
      }
    });
  }

  return next(req);
};
