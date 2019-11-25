"use strict";

const mongoose = require("mongoose");

const TableComplexitiesSchema = new mongoose.Schema({
  name: String,
  extru: Number
});

module.exports = mongoose.model("table_complexity", TableComplexitiesSchema);