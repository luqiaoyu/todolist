const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const knex = require('./db/connection');

const options = {};

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
  return knex('users').where({id}).first()
  .then((user) => { done(null, user); })
  .catch((err) => { done(err,null); });
});

// passport.deserializeUser(async (id,done) => {
//   try{
//     const user = await knex('users').where({id}).first();
//     return done(null, user);
//   } catch (err){
//     return done(err, null);
//   }
// });

passport.use(new LocalStrategy(options, (username, password, done) => {
  knex('users').where({ username }).first()
  .then((user) => {
    if (!user) return done(null, false);
    if (password === user.password) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
  .catch((err) => { return done(err); });
}));

passport.use(new LocalStrategy(options, async (email, password, done) => {
  try {
    const user = await knex('users').where({ email }).first();
    if (!user) return done(null, false);
    if(password === user.password) {
      return done(null,user);
    } else {
      return done(null, false);
    }
  } catch(err){
    return done(err);
  }
}));