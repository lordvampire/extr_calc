"use strict";

const mongoose = require("mongoose");

const TableDiesSchema = new mongoose.Schema({
  axdistance: Number
});

module.exports = mongoose.model("table_die", TableDiesSchema);