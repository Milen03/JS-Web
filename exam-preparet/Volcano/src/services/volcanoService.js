import Volcano from "../models/Volcano.js";

export default{
    create(volcanoData,creatorId){
        const result = Volcano.create({
            ...volcanoData,
            elevation:Number(volcanoData.elevation),
            lastEruption:Number(volcanoData.lastEruption),
            owner:creatorId
        })
        return result
    },
    getAll(){
        return Volcano.find({})
    },
    getOne(volcanoId) {
        return Volcano.findById(volcanoId);
    },

    getOneWithPreferredList(volcanoId) {
        return this.getOne(volcanoId).populate('voteList');
    },
    async delete(volcanoId, userId) {
        const volcano = await this.getOne(volcanoId)
        if (!volcano.owner.equals(userId)) {
            throw new Error('Only owner can delete this offer')
        }
        return Volcano.findByIdAndDelete(volcanoId)
    },
    async update(volcanoId, userId, volcanoData) {
        const volcano = await Volcano.findById(volcanoId)
        
        if (!volcano) {
            throw new Error('Volcano not found')
        }
        
        if (!volcano.owner.equals(userId)) {
            throw new Error('Only owner can edit this volcano')
        }
        
        return Volcano.findByIdAndUpdate(
            volcanoId,
            volcanoData,
            { 
                runValidators: true,
                new: true 
            }
        )
    }
}