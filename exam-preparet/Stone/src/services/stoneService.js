import Stone from "../models/Stone.js";


export default{
    create(stoneData, creatorId) {
        const result = Stone.create({
            ...stoneData,
            owner: creatorId
        })
        return result
    },
    getLatest() {
        return Stone.find({}).sort({ _id: 'desc' }).limit(3)
    },
    getAll(){
        return Stone.find({})
    },
    getOne(stoneId) {
        return Stone.findById(stoneId);
    },

    getOneWithPreferredList(stoneId) {
        return this.getOne(stoneId).populate('likedList');
    },
    async delete(stoneId, userId) {
        const stone = await this.getOne(stoneId)
        if (!stone.owner.equals(userId)) {
            throw new Error('Only owner can delete this offer')
        }
        return Stone.findByIdAndDelete(stoneId)
    },
    async updata(stoneId, userId, stoneData) {
        const stone = await this.getOne(stoneId)
        if (!stone.owner.equals(userId)) {
            throw new Error('Only owner can edit this offer')
        }
        return Stone.findByIdAndUpdate(stoneId, stoneData, { runValidators: true })
    },
    getAllForSearch(filter = {}) {
        let query = Stone.find({});
        if (filter.search) {
            // Търси по заглавие с частично съвпадение, без значение от главни или малки букви
            query = query.where({ name: new RegExp(filter.search, 'i') });
        }
        // Изпълнява заявката и връща Promise
        return query.exec();
    },
}