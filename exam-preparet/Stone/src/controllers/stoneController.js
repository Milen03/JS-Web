import { Router } from "express";
import { isAuth } from "../middlewares/authMiddlewares.js";
import stoneService from "../services/stoneService.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const stoneController = Router()

stoneController.get('/create',isAuth,(req,res)=>{
    res.render('create')
})

stoneController.post('/create',isAuth,async (req,res)=>{
    const stoneData = req.body
    const userId = req.user?.id

    try{
        await stoneService.create(stoneData,userId)
        res.redirect('/stones/dashboard')
    }catch(err){
        res.render('create',{
            error:getErrorMessage(err),
            stone:stoneData
        })
    }
})

stoneController.get('/dashboard', async (req, res) => {
    const stones = await stoneService.getAll()

    res.render('dashboard', { stones })
})

stoneController.get('/:stoneId/details',async (req,res)=>{
    const stoneId = req.params.stoneId
    const stone = await stoneService.getOneWithPreferredList(stoneId)
    const isCreator = stone.owner?.equals(req.user?.id)

    const hasPreferred = req.user && stone.likedList.some(userId => userId.equals(req.user.id))

    res.render('stone/details',{stone,isCreator,hasPreferred})
    
})
stoneController.get('/:stoneId/delete', isAuth, async (req, res) => {
    const stoneId = req.params.stoneId
    const userId = req.user.id
    try {
        await stoneService.delete(stoneId, userId)

        res.redirect('/stones/dashboard')
    } catch (err) {
        res.setError(getErrorMessage(err))

        req.redirect(`/stones/${stoneId}/details`)
    }
})

stoneController.get('/:stoneId/edit', isAuth, async (req, res) => {
    const stoneId = req.params.stoneId
    const stone = await stoneService.getOne(stoneId)

    res.render('stone/edit', { stone })
})

stoneController.post('/:stoneId/edit', isAuth, async (req, res) => {
    const stoneData = req.body
    const userId = req.user.id
    const stoneId = req.params.stoneId

    try {
        await stoneService.updata(stoneId, userId, stoneData)

        res.redirect(`/stones/${stoneId}/details`)
    } catch (err) {
        res.render('stone/edit',{
            stone: stoneData,
            error: getErrorMessage(err)
        })

    }
})
stoneController.get('/:stoneId/like',isAuth, async (req,res)=>{
    const stoneId = req.params.stoneId
    const userId = req.user.id

    const stone = await stoneService.getOne(stoneId)
    if(!stone){
        throw new Error('Stone not found');
    }

    if(stone.owner.equals(userId)){
        throw new Error('You cannot prefer your own Stone')
    }  

    if(stone.likedList.some(id=> id.equals(userId))){
        throw new Error('You have already preferred this Stone');
    }

    stone.likedList.push(userId)
    await stone.save()

    res.redirect(`/stones/${stoneId}/details`)
})

stoneController.get('/search',isAuth ,async(req,res)=>{
    const filter = req.query
    const stones = await stoneService.getAllForSearch(filter)
    res.render('search',{stones,filter})
    })



export default stoneController