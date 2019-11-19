"use strict";

const mongoose = require("mongoose");

const TableAlloysSchema = new mongoose.Schema({
  name: String,
  extru: Number,
  length: Number,
  Rho: Number
});

module.exports = mongoose.model("table_alloy", TableAlloysSchema);