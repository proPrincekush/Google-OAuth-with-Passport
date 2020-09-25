exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if(err) { return next(err); }
  
      if(user) {
        User.find({
          where: {
            email: user.email
          }
        })
        .then(function(currentUser) {
          if(currentUser) {
            currentUser.updateAttributes({
              last_login: new Date()
            })
          }
        });
        user.email = crypto.decrypt(user.email);
        user.first_name = crypto.decrypt(user.first_name);
        user.last_name = crypto.decrypt(user.last_name);
        req.login(user, function(err) { // I added req.login() here and now deserializeUser is being called and req.user is being set correctly.
          if(err) {
            return res.status(401).json(err);
          } else {
            return res.json({ token: user.generateJWT(secret) });
          }
        });
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);  
  }