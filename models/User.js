'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// creo el esquema
const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  rol: String,
})

// método estático
userSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7);
}

// método de instancia
userSchema.methods.comparePassword = function(passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password);
}

// creo el modelo
const User = mongoose.model('User', userSchema);

// exporto el modelo
module.exports = User;