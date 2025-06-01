import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userName: {type: String, unique: true },
    email: { type: String, unique: true},
    password: { type: String}
});

// Password hash middleware.
 
 UserSchema.pre('save', function save(next) {
  const user = this;
  console.log('here the password is ', user.password);
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      console.log('after the hash, the password is', user.password);
      next()
    })
  })
})


// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

const User = mongoose.model('User', UserSchema);

export default User;