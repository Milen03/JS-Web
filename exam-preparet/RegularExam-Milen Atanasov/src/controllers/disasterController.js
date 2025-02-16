import { Router } from "express";
import { isAuth } from "../middlewares/authMiddlewares.js";
import disasterService from "../services/disasterService.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const disasterController = Router()

disasterController.get('/create', isAuth, (req, res) => {
    res.render('create')
})

disasterController.post('/create', isAuth, async (req, res) => {
    const disasterData = req.body
    const userId = req.user?.id

    try {
        await disasterService.create(disasterData, userId)
        res.redirect('/disasters/catalog')
    } catch (err) {
        res.render('create', {
            error: getErrorMessage(err),
            disaster: disasterData

        })
    }

})

disasterController.get('/catalog', async (req, res) => {
    const disasters = await disasterService.getAll()

res.render('catalog', {disasters})
})

disasterController.get('/:disasterId/details',async(req,res)=>{
    const disasterId = req.params.disasterId
    const disaster = await disasterService.getOneWithPreferredList(disasterId)
    const isCreator = disaster.owner?.equals(req.user?.id)

    const hasPreferred = req.user && disaster.interestedList.some(userId => userId.equals(req.user.id))

    res.render('disaster/details',{disaster,isCreator,hasPreferred})
})

disasterController.get('/:disasterId/delete', isAuth, async (req, res) => {
    const disasterId = req.params.disasterId
    const userId = req.user.id
    try {
        await disasterService.delete(disasterId, userId)

        res.redirect('/disasters/catalog')
    } catch (err) {
        res.setError(getErrorMessage(err))

        req.redirect(`/disasters/${disasterId}/details`)
    }
})

disasterController.get('/:disasterId/edit',isAuth,async (req,res)=>{
    try{
        const disasterId = req.params.disasterId
        const disaster = await disasterService.getOne(disasterId)

        const disasterTypes =[
            'Wildfire',
            'Flood',
            'Earthquake',
            'Hurricane',
            'Drought',
            'Tsunami',
            'Other'
        ]

        res.render('disaster/edit',{
            disaster,
            disasterTypes,
            selectedType: disaster.type
        })

    }catch(err){
        res.redirect('/404')
    }
}) 

disasterController.post('/:disasterId/edit',isAuth ,async (req,res)=>{
    const disasterId = req.params.disasterId
    const userId = req.user.id
    const disasterData = req.body

    try{
        await disasterService.update(disasterId,userId,disasterData)

        res.redirect(`/disasters/${disasterId}/details`)
    }catch(err){
        res.render('disaster/edit',{
            disaster: {...disasterData,_id:disasterId},
            error: getErrorMessage(err)
        })

    }
})


disasterController.get('/:disasterId/interested',isAuth, async (req,res)=>{
    const disasterId = req.params.disasterId
    const userId = req.user.id

    const disaster = await disasterService.getOne(disasterId)
    if(!disaster){
        throw new Error('Disaster not found');
    }

    if(disaster.owner.equals(userId)){
        throw new Error('You cannot prefer your own disaster')
    }  

    if(disaster.interestedList.some(id=> id.equals(userId))){
        throw new Error('You have already preferred this disaster');
    }

    disaster.interestedList.push(userId)
    await disaster.save()

    res.redirect(`/disasters/${disasterId}/details`)
})

disasterController.get('/search' ,async(req,res)=>{
    const filter = req.query
    const disaster = await disasterService.getAllForSearch(filter)
    res.render('search',{disaster,filter})
    })

export default disasterController