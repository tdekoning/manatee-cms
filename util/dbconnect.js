var   mongoose = require('mongoose')
    , db = mongoose.connect('mongodb://localhost/manatee')
    , Schema = mongoose.Schema
    , pageDbService = require('../util/pageDbService')

module.exports.page = pageDbService;

