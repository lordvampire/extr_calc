"use strict";

const mongoose = require("mongoose");

const TableUsagesSchema = new mongoose.Schema({
  name: String,
  logrec_calc: Number
});

module.exports = mongoose.model("table_usage", TableUsagesSchema);