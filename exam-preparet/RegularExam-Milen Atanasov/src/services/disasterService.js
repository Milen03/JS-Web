import Disaster from "../models/Disaster.js";

export default{
    create(disasterData, creatorId) {
        const result = Disaster.create({
            ...disasterData,
            year:Number(disasterData.year),
            owner: creatorId
        })
        return result
    },
    getAll(){
        return Disaster.find({})
    },
    getOne(disasterId) {
        return Disaster.findById(disasterId);
    },

    getOneWithPreferredList(disasterId) {
        return this.getOne(disasterId).populate('interestedList');
    },
    async delete(disasterId, userId) {
        const disaste = await this.getOne(disasterId)
        if (!disaste.owner.equals(userId)) {
            throw new Error('Only owner can delete this offer')
        }
        return Disaster.findByIdAndDelete(disasterId)
    },

    async update(disasterId, userId, disasterData) {
        const disaster = await Disaster.findById(disasterId)
        
        if (!disaster) {
            throw new Error('Disaster not found')
        }
        
        if (!disaster.owner.equals(userId)) {
            throw new Error('Only owner can edit this Disaster')
        }
        
        return Disaster.findByIdAndUpdate(
            disasterId,
            disasterData,
            { 
                runValidators: true,
                new: true 
            }
        )
    },
    getAllForSearch(filter = {}) {
        let query = Disaster.find({});
        if (filter.search) {
           
            query = query.where({ name: new RegExp(filter.search, 'i') });
        }
        if (filter.type && filter.type !== '') {
            query = query.where({ type: filter.type });
        }
       
        return query.exec();
    },
}