"use strict";

const mongoose = require("mongoose");

const ProfileTypesSchema = new mongoose.Schema({
  _id: String,
  type_name: String
});

module.exports = mongoose.model("profile_type", ProfileTypesSchema);