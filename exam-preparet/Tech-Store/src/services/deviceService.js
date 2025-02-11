import Device from '../models/Device.js'

export default {
    getAll() {
        return Device.find({})
    },

    getOne(deviceId) {
        return Device.findById(deviceId);
    },

    getOneWithPreferredList(deviceId) {
        return this.getOne(deviceId).populate('preferredList');
    },
     getLatest() {
       return Device.find({}).sort({ _id: 'desc'}).limit(3)
    },

    create(deviceData, creatorId) {
        const result = Device.create({
            ...deviceData,
            price: Number(deviceData.price),
            creator: creatorId
        })

        return result
    },
    async delete(deviceId,userId) {
        const device = await this.getOne(deviceId)
        if(!device.creator.equals(userId)){
            throw new Error('Only owner can delete this offer')
        }
        return Device.findByIdAndDelete(deviceId)
    },
    async updata(deviceId,userId, deviceData) {
        const device = await this.getOne(deviceId)
        if(!device.creator.equals(userId)){
            throw new Error('Only owner can edit this offer')
        }
        return Device.findByIdAndUpdate(deviceId, deviceData, {runValidators: true})
    }
}