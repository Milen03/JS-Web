import Course from "../models/Course.js";

export default{
    create(courseData, creatorId) {
        const result = Course.create({
            ...courseData,
            price:Number(courseData.price),
            owner: creatorId
        })
        return result
    },
    getLatest() {
        return Course.find({}).sort({ _id: 'desc' }).limit(3)
    },
    getAll(){
        return Course.find({})
    },
    getOne(courseId) {
        return Course.findById(courseId);
    },

    getOneWithPreferredList(courseId) {
        return this.getOne(courseId).populate('signUpList').populate('owner');;
    },
    async delete(courseId, userId) {
        const course = await this.getOne(courseId)
        if (!course.owner.equals(userId)) {
            throw new Error('Only owner can delete this offer')
        }
        return Course.findByIdAndDelete(courseId)
    },
    async update(courseId, userId, courseData) {
        const course = await this.getOne(courseId)
        if (!course.owner.equals(userId)) {
            throw new Error('Only owner can edit this offer')
        }
        return Course.findByIdAndUpdate(courseId, courseData, { runValidators: true })
    },

}