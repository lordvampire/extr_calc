"use strict";

const mongoose = require("mongoose");

const TablePressesSchema = new mongoose.Schema({
  name: String,
  inch: Number,
  billet_dia: Number,
  container_dia: Number,
  billet_length_max: Number,
  table_length_max: Number,
  ram_speed_max: Number,
  max_profile_width: Number,
  billet_sprung: Number,
  speedIST: Number,
  dead_cycle: Number,
  max_puller: Number,
  max_strangzahl: Number,
  rampernverlust: Number,
  log_billet: String,
  value_spreading: Number,
});

module.exports = mongoose.model("table_press", TablePressesSchema);