const express = require('express')
const router = express.Router();
const {addPage}= require('../views');
const {Page} = require('../models')

router.get("/",(req,res)=>{

  res.send('got to GET /wiki')
})

router.post('/',async (req,res,next)=>{
  const {title, content, status,email, author}=req.body
  try {
    const page = await Page.create({
      title,
      content,
      status,
      email,
      author
    })


  } catch (error) {
 next(error)
  }
  res.redirect('/')
})



router.get("/add",(req,res)=>{
res.send(addPage())
})

router.get('/:slug', async (req, res, next) => {

  try {
    const page = await Page.findOne({
      where:{
        slug:req.params.slug
      }
    });
    res.json(page);
  } catch (error) {
    next(error)
  }

});
module.exports=router
