"use strict";

const mongoose = require("mongoose");

const TableComplexitiesSchema = new mongoose.Schema({
  _id: String,
  name: String,
  extru: Number
});

module.exports = mongoose.model("table_complexity", TableComplexitiesSchema);