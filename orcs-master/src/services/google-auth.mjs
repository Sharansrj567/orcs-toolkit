import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/GoogleUser.mjs';

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			callbackURL: '/auth/google/callback',
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const existingUser = await User.findOne({ googleId: profile.id });
				if (existingUser) {
					return done(null, existingUser);
				}

				let emailId = profile.emails[0].value;
				const user = await new User({
					googleId: profile.id,
					name: profile.displayName,
					email: emailId,
				}).save();
				done(null, user);
			} catch (err) {
				done(err, null);
			}
		}
	)
);
