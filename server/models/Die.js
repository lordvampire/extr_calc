"use strict";

const mongoose = require("mongoose");

const TableDiesSchema = new mongoose.Schema({
  axdistance: Number,
  die_base_price: Number,
  die_typeA_volume: Number,
  die_typeA_weight: Number,
  upcharge: Number
});

module.exports = mongoose.model("table_die", TableDiesSchema);