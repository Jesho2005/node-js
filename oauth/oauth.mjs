import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import mongoose from "mongoose";
import User from "./db/db.mjs"; // Your Mongoose User model

const app = express();

/* =========================
   DATABASE
========================= */
mongoose
  .connect("mongodb://localhost:27017/oauth")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

/* =========================
   SESSION
========================= */
app.use(
  session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false,
  })
);

/* =========================
   PASSPORT
========================= */
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id); // store only ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

/* =========================
   GOOGLE STRATEGY
========================= */
passport.use(
  new GoogleStrategy(
    {
      clientID: "506070874588-6di79et081ub51irbjg9ijql1s5rg0b1.apps.googleusercontent.com",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            username: profile.displayName,
            googleId: profile.id,
            email: profile.emails?.[0]?.value || null,
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

/* =========================
   ROUTES
========================= */

// Home
app.get("/", (req, res) => {
  res.send(`<a href="/auth/google">Login with Google</a>`);
});

// Google login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Save session before redirecting
    req.session.save(() => {
      res.redirect("/profile");
    });
  }
);

// Profile (protected)
app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/");

  res.send(`
    <h1>Profile</h1>
    <p>Name: ${req.user.username}</p>
    <p>Email: ${req.user.email}</p>
    <a href="/logout">Logout</a>
  `);
});

// Logout
app.get("/logout", (req, res) => {
  req.logout(err => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

/* =========================
   START SERVER
========================= */
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
