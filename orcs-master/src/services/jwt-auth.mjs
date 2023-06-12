import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { User } from '../models/JwtUser.mjs';

var cookieExtractor = function (req) {
	var token = null;
	if (req && req.session) token = req.session['jwt'];
	return token;
};

var opts = {
	jwtFromRequest: cookieExtractor,
	secretOrKey: process.env.SECRET_KEY,
};

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		User.findOne({ id: jwt_payload.id }, function (err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	})
);
