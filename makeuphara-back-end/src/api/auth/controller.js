import passport from 'koa-passport';

export const authGoogle = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

export const authGoogleCallback = passport.authenticate('google', {
  successRedirect: '/api/test',
  failureRedirect: '/api/auth/failure',
});

export const logout = ctx => {
  ctx.logout();
  ctx.redirect('/api/test');
};
