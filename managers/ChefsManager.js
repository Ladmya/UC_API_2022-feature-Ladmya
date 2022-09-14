// ODM : DB structure
// Model : creates JSON

const Database = require('../database');

// Data template
const SCHEMA = {
    firstname: String,
    lastname: String,
    description: String,
    image: String
}
// PrivateChefsModel : this.model is the access to Mongoose
class PrivateChefsModel {
    constructor() {
        // Creates DB : following SCHEMA template
        const schema = Database.getInstance().mongoose.Schema(SCHEMA);
        // Creates connexion between Chef collection & schema
        this.model = Database.getInstance().mongoose.model('Chef', schema);
    }
}

/**
 * Chef model Singleton
 * Unique instantiation => PrivateChefsModel
 */
class MongooseModel {
    constructor() {
        throw new Error('Use Database.getInstance()');
        // Ex: connexion & Auth problems
    }
    static getInstance() {
        if (!MongooseModel.chefsModel) {
            MongooseModel.chefsModel = new PrivateChefsModel();
            // Creates new object (SCHEMA)
        }
        return MongooseModel.chefsModel;
    }
}

/**
 * Class chef
 * describe chef method with mongoose
 * way to access the data
 */
class ChefsManager {
    /**
     * @constructor Chef
     * @param {Object} chef
     * @param {string} chef.firstname
     * @param {string} chef.lastname
     * @param {string} chef.description
     * @param {string} chef.image
     */
    constructor(chef = {}) {
        this.model = MongooseModel.getInstance().model;
        // chef?
        this.chef = new this.model(chef);
    }

    // Mongoose methods in function
    // Isolated from index.js
    async save() {
        return this.chef.save();
    }

    async getChefs() {
        return this.model.find();
    }
    // Get one chef by ID
    async getChefById(id) {
        return this.model.findById(id);
    }
    // Delete one chef by ID
    async deleteChefById(id) {
        return this.model.findByIdAndDelete(id)
    }
    // Update one chef by ID
    async updateChefById(id,body){
        return this.model.findByIdAndUpdate(id,body);
    }
    // Sort lastnames by ascending order
    // Tested in index.js 
    async getAscendingChefsByLastnames(){
        return this.model.find({},{lastname:1}).sort({"lastname":1})
    }
    // Sort firstnames by ascending order
    async getAscendingChefsByFirstnames(){
        return this.model.find({},{firstname:1}).sort({"firstname":1})
    }

}

module.exports.ChefsManager = ChefsManager;