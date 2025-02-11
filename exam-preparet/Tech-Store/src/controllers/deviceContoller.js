import { Router } from "express";
import { isAuth } from "../middlewares/authMiddlewares.js";
import deviceService from "../services/deviceService.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const deviceController = Router()

deviceController.get('/create', isAuth,(req,res)=>{
    res.render('create')
})


deviceController.post('/create', isAuth,async (req, res) => {
    const deviceData = req.body;
    const userId = req.user?.id;
try{
    await deviceService.create(deviceData, userId);
    res.redirect('/');
}catch(err){
res.render('create',{
    error: getErrorMessage(err),
    device: deviceData
})
}
    

    
});

deviceController.get('/catalog',async (req,res)=>{
    const devices = await deviceService.getAll()

    res.render('catalog',{ devices })
})

deviceController.get('/:deviceId/details',async (req,res)=>{
    const deviceId = req.params.deviceId
    const device = await deviceService.getOneWithPreferredList(deviceId)
    const isCreator = device.creator?.equals(req.user?.id);

    const hasPreferred = req.user && device.preferredList.some(userId => userId.equals(req.user.id));

    res.render('device/details',{device,isCreator,hasPreferred})
})

deviceController.get('/:deviceId/delete', isAuth,async (req, res) => {
    const deviceId = req.params.deviceId

    
try{
    await deviceService.delete(deviceId , req.user.id)

    res.redirect('/devices/catalog')
}catch(err){
res.setError(getErrorMessage(err))

req.redirect(`/device/${deviceId}/details`)
}
    
})

deviceController.get('/:deviceId/edit', isAuth,async(req,res)=>{
    const deviceId = req.params.deviceId
    const device = await deviceService.getOne(deviceId)

    res.render('device/edit', { device })
})

deviceController.post('/:deviceId/edit',isAuth,async(req,res)=>{
    const deviceData = req.body
    const userId = req.user.id
    const deviceId = req.params.deviceId
try{
    await deviceService.updata(deviceId,userId,deviceData)

    res.redirect(`/devices/${deviceId}/details`)
}catch(err){

res.redirect('device/edit',{
    device: deviceData,
    error:getErrorMessage(err)})

}
    

})

deviceController.get('/:deviceId/prefer', isAuth, async (req, res) => {
    const deviceId = req.params.deviceId;
    const userId = req.user.id;

    const device = await deviceService.getOne(deviceId);
    if (!device) {
        throw new Error('Device not found');
    }

    if (device.creator.equals(userId)) {
        throw new Error('You cannot prefer your own device');
    }

    if (device.preferredList.some(id => id.equals(userId))) {
        throw new Error('You have already preferred this device');
    }

    device.preferredList.push(userId);
    await device.save();

    res.redirect(`/devices/${deviceId}/details`);
});


export default deviceController