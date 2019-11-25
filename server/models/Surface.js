"use strict";

const mongoose = require("mongoose");

const TableSufacesSchema = new mongoose.Schema({
  name: String,
  extru: Number
});

module.exports = mongoose.model("table_suface", TableSufacesSchema);