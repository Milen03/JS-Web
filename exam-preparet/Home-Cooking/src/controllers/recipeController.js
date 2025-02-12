import { Router } from "express";
import { isAuth } from "../middlewares/authMiddlewares.js"
import recipeService from "../services/recipeService.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const recipeController = Router()

recipeController.get('/create', isAuth, (req, res) => {
    res.render('create')
})

recipeController.post('/create', isAuth, async (req, res) => {
    const recipeData = req.body
    const userId = req.user?.id

    try {
        await recipeService.create(recipeData, userId)
        res.redirect('/recipes/catalog')  //varni se na cataloga
    } catch (err) {
        res.render('create', {
            error: getErrorMessage(err),
            recipe: recipeData
        })
    }
})

recipeController.get('/catalog', async (req, res) => {
    const recipes = await recipeService.getAll()

    res.render('catalog', { recipes })
})

recipeController.get('/:recipeId/details', async (req, res) => {
    const recipeId = req.params.recipeId
    const recipe = await recipeService.getOneWithPreferredList(recipeId)
    const isCreator = recipe.owner?.equals(req.user?.id)

    const hasPreferred = req.user && recipe.recommendList.some(userId => userId.equals(req.user.id))

    res.render('recipe/details', { recipe, isCreator, hasPreferred })
})

recipeController.get('/:recipeId/delete', isAuth, async (req, res) => {
    const recipeId = req.params.recipeId
    const userId = req.user.id
    try {
        await recipeService.delete(recipeId, userId)

        res.redirect('/recipes/catalog')
    } catch (err) {
        res.setError(getErrorMessage(err))

        req.redirect(`/recipe/${recipeId}/details`)
    }
})

recipeController.get('/:recipeId/edit', isAuth, async (req, res) => {
    const recipeId = req.params.recipeId
    const recipe = await recipeService.getOne(recipeId)

    res.render('recipe/edit', { recipe })
})

recipeController.post('/:recipeId/edit', isAuth, async (req, res) => {
    const recipeData = req.body
    const userId = req.user.id
    const recipeId = req.params.recipeId

    try {
        await recipeService.updata(recipeId, userId, recipeData)

        res.redirect(`/recipes/${recipeId}/details`)
    } catch (err) {
        res.render('recipe/edit',{
            recipe: recipeData,
            error: getErrorMessage(err)
        })

    }
})

recipeController.get('/:recipeId/recommend',isAuth, async (req,res)=>{
    const recipeId = req.params.recipeId
    const userId = req.user.id

    const recipe = await recipeService.getOne(recipeId)
    if(!recipe){
        throw new Error('Recipe not found');
    }

    if(recipe.owner.equals(userId)){
        throw new Error('You cannot prefer your own recipe')
    }  

    if(recipe.recommendList.some(id=> id.equals(userId))){
        throw new Error('You have already preferred this recipe');
    }

    recipe.recommendList.push(userId)
    await recipe.save()

    res.redirect(`/recipes/${recipeId}/details`)
})

recipeController.get('/search',isAuth ,async(req,res)=>{
const filter = req.query
const recipes = await recipeService.getAllForSearch(filter)
res.render('search',{recipes,filter})
})
export default recipeController