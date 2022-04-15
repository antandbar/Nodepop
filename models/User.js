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
userSchema.statics.hashPassword = async function(passwordClear) {
  return await bcrypt.hash(passwordClear, 10);
}

// método de instancia
userSchema.methods.comparePassword = async function(passwordClear) {
  return await bcrypt.compare(passwordClear, this.password);
}

// creo el modelo
const User = mongoose.model('User', userSchema);

// exporto el modelo
module.exports = User;