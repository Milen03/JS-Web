import { Router } from "express";
import { isAuth } from "../middlewares/authMiddlewares.js";
import courseService from "../services/courseService.js";



const courseController = Router()

courseController.get('/create',isAuth,(req,res)=>{
    res.render('create')
})

courseController.post('/create', isAuth, async (req, res) => {
    const courseData = req.body
    const userId = req.user?.id

    try {
        await courseService.create(courseData, userId)
        res.redirect('/courses/catalog')  //varni se na cataloga
    } catch (err) {
        res.render('create', {
            error: getErrorMessage(err),
            course: courseData
        })
    }
})

courseController.get('/catalog', async (req, res) => {
    const courses = await courseService.getAll()

    res.render('catalog', { courses })
})

courseController.get('/:courseId/details', async (req, res) => {
    const courseId = req.params.courseId
    const course = await courseService.getOneWithPreferredList(courseId)
    const isCreator = course.owner?.equals(req.user?.id)

    const hasPreferred = req.user && course.signUpList.some(userId => userId.equals(req.user.id))

    res.render('course/details', { course, isCreator, hasPreferred })
})

courseController.get('/:courseId/delete', isAuth, async (req, res) => {
    const courseId = req.params.courseId
    const userId = req.user.id
    try {
        await courseService.delete(courseId, userId)

        res.redirect('/courses/catalog')
    } catch (err) {
        res.setError(getErrorMessage(err))

        req.redirect(`/course/${courseId}/details`)
    }
})

courseController.get('/:courseId/edit', isAuth, async (req, res) => {
    const courseId = req.params.courseId
    const course = await courseService.getOne(courseId)

    res.render('course/edit', { course })
})

courseController.post('/:courseId/edit', isAuth, async (req, res) => {
    const coursData = req.body
    const userId = req.user.id
    const courseId = req.params.courseId

    try {
        await courseService.update(courseId, userId, coursData)

        res.redirect(`/courses/${courseId}/details`)
    } catch (err) {
        res.render('course/edit',{
            course: coursData,
            error: getErrorMessage(err)
        })

    }
})

courseController.get('/:courseId/signUp',isAuth, async (req,res)=>{
    const courseId = req.params.courseId
    const userId = req.user.id

    const course = await courseService.getOne(courseId)
    if(!course){
        throw new Error('course not found');
    }

    if(course.owner.equals(userId)){
        throw new Error('You cannot prefer your own Course')
    }  

    if(course.signUpList.some(id=> id.equals(userId))){
        throw new Error('You have already preferred this Course');
    }

    course.signUpList.push(userId)
    await course.save()

    res.redirect(`/courses/${courseId}/details`)
})


export default courseController
