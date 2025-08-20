import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {pool} from "./db/connect.db.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const fullName = profile.displayName;

      try {
        const existingUser = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );

        if (existingUser.rows.length > 0) {
          return done(null, existingUser.rows[0]);
        } else {
          const newUser = await pool.query(
            `INSERT INTO users (full_name, email, role)
             VALUES ($1, $2, $3) RETURNING *`,
            [fullName, email, "candidate"]
          );

          return done(null, newUser.rows[0]);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // store user ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err, null);
  }
});
