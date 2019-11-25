"use strict";

const mongoose = require("mongoose");

const TableResultsSchema = new mongoose.Schema({
    press: String,
    profile_weight: Number,
    number_cavity: Number,
    profile_length: Number,
    billet_length: Number,
    buttend_length: Number,
    scrap_length: Number,
    num_costumer_length: Number,
    extrusion_length: Number,
    puller_speed: Number,
    gros_productivity: Number,
    net_productivity: Number,
    recovery: Number,
    logend_recovery: Number,
    area_cost: Number,
    plant_cost: Number,
    bu_sga: Number,
    packing_cost: Number,
    freight_cost: Number,
    die_cost: Number,
    recovery_loss: Number,
    extrusion_margin: Number,
    timestamp: String
});

module.exports = mongoose.model("table_result", TableResultsSchema);