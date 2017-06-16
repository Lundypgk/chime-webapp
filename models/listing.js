'use strict';
class Listing {

  constructor(description, budget, perks, requirements, brandId) {
    this.description = description;
    this.budget = budget;
    this.perks = perks;
    this.requirements = requirements;
    this.brandId = brandId;
  }
}
module.exports = Listing;

// let mongoose = require('mongoose');
// let Schema = mongoose.Schema;

// let Listing = new Schema({
//     description: String,
//     budget: String,
//     perks: String,
//     requirements: String,
// }, { collection: 'Listing' });

// module.exports = mongoose.model('Listing', Listing);
