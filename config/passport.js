const LocalStrategy = require("passport-local").Strategy;

const Register = require("../models/register");
const bycrpt = require("bcrypt");

function init(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      async (username, password, done) => {
        //* Login
        //* check if username exits??
        const user = await Register.findOne({ username: username });

        if (!user) {
          return done(null, false, { message: "No user with this Username" });
        }

        bycrpt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              //   console.log(user);
              return done(null, user, { message: "Logged in Sucessfully" });
            }
            return done(null, false, { message: "Worng username or password" });
          })
          .catch((err) => {
            return done(null, false, { message: "Something went wrong!!" });
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    Register.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = init;
