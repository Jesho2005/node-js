import {Router} from 'express';
import users from '../user/users.mjs';
const router=Router();
router.get('/',(req,res)=>{
    res.cookie('name','expressApp',{maxAge:60000*60,signed:true});
    res.send(users);
});
export default router;