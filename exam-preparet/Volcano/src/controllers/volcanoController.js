import { Router } from "express";
import { isAuth } from "../middlewares/authMiddlewares.js";
import volcanoService from "../services/volcanoService.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const volcanoController = Router()


volcanoController.get('/create', isAuth, (req, res) => {
    res.render('create')
})

volcanoController.post('/create', isAuth, async (req, res) => {
    const volcanoData = req.body
    const userId = req.user?.id

    try {
        await volcanoService.create(volcanoData, userId)
        res.redirect('/volcanos/catalog')
    } catch (err) {
        res.render('create', {
            error: getErrorMessage(err),
            volcano: volcanoData
        })

    }
})

volcanoController.get('/catalog', async (req, res) => {
    const volcanos = await volcanoService.getAll()

    res.render('catalog', { volcanos })
})

volcanoController.get('/:volcanoId/details', async (req, res) => {
    const volcanoId = req.params.volcanoId
    const volcano = await volcanoService.getOneWithPreferredList(volcanoId)
    const isCreator = volcano.owner?.equals(req.user?.id)

    const hasPreferred = req.user && volcano.voteList.some(userId => userId.equals(req.user.id))

    res.render('volcano/details', { volcano, isCreator, hasPreferred })
})

volcanoController.get('/:volcanoId/delete', isAuth, async (req, res) => {
    const volcanoId = req.params.volcanoId
    const userId = req.user.id
    try {
        await volcanoService.delete(volcanoId, userId)

        res.redirect('/volcanos/catalog')
    } catch (err) {
        res.setError(getErrorMessage(err))
        req.redirect(`/volcano/${volcanoId}/details`)
    }
})

// GET Edit
volcanoController.get('/:volcanoId/edit', isAuth, async (req, res) => {
    try {
        const volcanoId = req.params.volcanoId
        const volcano = await volcanoService.getOne(volcanoId)
        
        // Добавяне на опции за селекта
        const volcanoTypes = [
            "Supervolcanoes",
            "Submarine",
            "Subglacial",
            "Mud",
            "Stratovolcanoes",
            "Shield"
        ]
        
        res.render('volcano/edit', { 
            volcano,
            volcanoTypes,
            selectedType: volcano.typeVolcano 
        })
    } catch (error) {
        res.redirect('/404')
    }
})

// POST Edit
volcanoController.post('/:volcanoId/edit', isAuth, async (req, res) => {
    const volcanoData = req.body
    const userId = req.user.id
    const volcanoId = req.params.volcanoId

    try {
        await volcanoService.update(volcanoId, userId, volcanoData)
        res.redirect(`/volcanos/${volcanoId}/details`)
    } catch (err) {
        res.render('volcano/edit', {
            volcano: {...volcanoData, _id: volcanoId},
            error: getErrorMessage(err)
        })
    }
})

// function getCategoriesViewData(typeVolcano) {
//     const categoriesMap = {
//         'Supervolcanoes': 'Supervolcanoes',
//         'Submarine': 'Submarine',
//         'Subglacial': 'Subglacial',
//         'Mud': 'Mud',
//         'Stratovolcanoes': 'Stratovolcanoes',
//         'Shield': 'Shield'
//     };
//     const categories = Object.keys(categoriesMap).map(value => ({
//         value,
//         label: categoriesMap[value],
//         isSelected: value === typeVolcano // булева стойност
//     }));
//     return categories;
// }

volcanoController.get('/:volcanoId/vote',isAuth, async (req,res)=>{
    const volcanoId = req.params.volcanoId
    const userId = req.user.id

    const volcano = await volcanoService.getOne(volcanoId)
    if(!volcano){
        throw new Error('Volcano not found');
    }

    if(volcano.owner.equals(userId)){
        throw new Error('You cannot prefer your own volcano')
    }  

    if(volcano.voteList.some(id=> id.equals(userId))){
        throw new Error('You have already preferred this volcano');
    }

    volcano.voteList.push(userId)
    await volcano.save()

    res.redirect(`/volcanos/${volcanoId}/details`)
})


export default volcanoController