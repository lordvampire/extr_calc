"use strict";

const mongoose = require("mongoose");

const TableAlloysSchema = new mongoose.Schema({
  _id: String,
  name: String,
  extru: Number,
  length: Number,
  Rho: String
});

module.exports = mongoose.model("table_alloy", TableAlloysSchema);