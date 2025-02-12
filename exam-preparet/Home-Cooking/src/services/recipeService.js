import Recipe from '../models/Recipe.js'

export default {
    create(recipeData, creatorId) {
        const result = Recipe.create({
            ...recipeData,
            owner: creatorId
        })
        return result
    },
    getLatest() {
        return Recipe.find({}).sort({ _id: 'desc' }).limit(3)
    },
    getAllForSearch(filter = {}) {
        let query = Recipe.find({});
        if (filter.search) {
            // Търси по заглавие с частично съвпадение, без значение от главни или малки букви
            query = query.where({ title: new RegExp(filter.search, 'i') });
        }
        // Изпълнява заявката и връща Promise
        return query.exec();
    },
    
    getAll(){
        return Recipe.find({})
    },
    getOne(recipeId) {
        return Recipe.findById(recipeId);
    },

    getOneWithPreferredList(recipeId) {
        return this.getOne(recipeId).populate('recommendList');
    },
    async delete(recipeId, userId) {
        const recipe = await this.getOne(recipeId)
        if (!recipe.owner.equals(userId)) {
            throw new Error('Only owner can delete this offer')
        }
        return Recipe.findByIdAndDelete(recipeId)
    },

    async updata(recipeId, userId, recipeData) {
        const recipe = await this.getOne(recipeId)
        if (!recipe.owner.equals(userId)) {
            throw new Error('Only owner can edit this offer')
        }
        return Recipe.findByIdAndUpdate(recipeId, recipeData, { runValidators: true })
    },

   
}