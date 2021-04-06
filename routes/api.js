const router=require('express').Router();
const Folder = require('../model/folder');

const getData=(data,ob)=>{
    console.log(ob);
    Folder.findOne({_id : data._id}).populate('content').then(data=>{
        if(!data.content) return false;
        data.content.forEach(ll=>{
            let ob={ };
            ob['_id'] = ll._id;
            ob['name']=ll.name;
        })
    })
}

// -----------getting all folder api-------------------

router.get('/folder/all',async (req,res)=>{
    const arr=[];
    const data= await Folder.find({parent : null}).populate('content');
        data.forEach(async (lol)=>{
            let ob={ };
            ob['_id'] = lol._id;
            ob['name']=lol.name;
            if(lol.cat==='file'){
                arr.push(ob);
                return ;
            }
            if(lol.content.length){
                const arr1=[];
                lol.content.forEach(gg=>{
                    let ob1={}
                    ob1['_id'] = gg._id;
                    ob1['name']=gg.name;
                    arr1.push(ob1);
                })
                ob['content']=arr1;
            }
            arr.push(ob);
            console.log(lol);
        })
        console.log(arr);
        return res.send(arr);
    // Folder.findOne({_id : "606bfe900283814320f77a76"}).populate('content').then(data=>{
    //     console.log(data);
    // })
})

// ------- moving folder api--------------
router.post('/folder/move',(req,res)=>{
    const {name,to} = req.body;
    Folder.findOne({name : name}).then(async data=>{
        if(!data) return res.send(404).status("No Source file Found");
        if(to==='root'){
            data.parent=null;
            const gg=await data.save();
                return res.status(200).send({msg:"Moved Successfully !!"});
        }
        Folder.findOne({name : to}).then(gg=>{
            if(!gg) return res.send(404).status("No destination file Found");
            data.parent=gg._id;
            data.save().then(ff=>{
                return res.send("Moved Successfully !!");
            })
        })
    })
})

// ------------ moving file api ---------------
router.post('/file/move',(req,res)=>{
    const {name,to} = req.body;
    Folder.findOne({name : name}).then(async data=>{
        if(!data) return res.status(400).send("No Source file Found");
        if(to==='root'){
            data.parent=null;
            const gg=await data.save();
                return res.status(200).send({msg:"Moved Successfully !!"});
        }
        Folder.findOne({name : to}).then(gg=>{
            if(!gg) return res.status(400).send("No destination file Found");
            data.parent=gg._id;
            data.save().then(ff=>{
                return res.status(200).send("Moved Successfully !!");
            })
        })
    })
})

//------get data for specific folder API --------------

router.get('/folder/info/:name',async (req,res)=>{
    const {name} = req.params;
    const arr=[];
    if(name==='root'){
        const data = await Folder.find({parent:null});
            data.forEach(async ff=>{
                await arr.push({
                    _id : ff._id,
                    name : ff.name,
                    cat : ff.cat
                })
                return await res.status(200).send(arr);   
        })
    }
    Folder.findOne({name : name}).populate('content').then(data=>{
        if(!data) return res.send('No Folder found with this name');
        if(!data.content.length) return res.send(200).status('No files in this folder');
        data.content.forEach(gg=>{
            arr.push({
                _id : gg._id,
                name : gg.name,
                cat: gg.cat
            });
        })
        return res.status(200).send(arr);
    })
})

// --------del folder -----api

router.post('/folder/del',(req,res)=>{
    const {name}=req.body;
    Folder.findOne({name : name}).then(data=>{
        if(!data) return res.send('No Folder found with this name');
        Folder.find({parent : data._id}).then(dd=>{
            dd.forEach(gg=>{
                gg.remove();
            })
            data.remove().then(gg=>{
                res.send('deleted successfully');
            })
        })
    })
})
//  ---------del-file api----------
router.post('/file/del',(req,res)=>{
    const {name}=req.body;
    Folder.findOne({name : name}).then(data=>{
        if(!data) return res.send('No file found with this name');
            data.remove().then(gg=>{
                res.send('deleted successfully');
            })
    })
})

// ----------adding new folder api---------------

router.post('/folder/new',async (req,res)=>{
    const {name , parent }=req.body;
    console.log(req.body,parent);
    if(parent===undefined){
        console.log(1)
        const folder=new Folder({
            name :name 
        })
        await folder.save().catch(err=>{
            console.log(err);
        })
        return res.send(200).status('Data Added');
    }
    console.log(2)
    const folder=new Folder({
        name :name,
        parent : parent 
    })
   
    Folder.findOne({_id : parent}).then(data=>{
        if(data.cat==='file') {
            console.log(1);
            return res.send('U cant insert file in file');
         }
         folder.save().then(lol=>{
             data.content.push(lol._id);
             data.save().then(ff=>{
                return res.send("data added !!");
             })
         })
        })
})

// ----------------------------adding new file api-------------------

router.post('/file/new',async (req,res)=>{
    const {name , parent }=req.body;
    if(parent===undefined){
        console.log(1)
        const folder=new Folder({
            name :name ,
            cat : 'file'
        })
        await folder.save().catch(err=>{
            console.log(err);
        })
        return res.send(200).status('Data Added');
    }
    const folder=new Folder({
        name :name,
        parent : parent ,
        cat : 'file'
    })
    
    Folder.findOne({_id : parent}).then(data=>{
    if(data.cat==='file') {
        console.log(1);
        return res.send('U cant insert file in file');
     }
     folder.save().then(lol=>{
         data.content.push(lol._id);
         data.save().then(ff=>{
            return res.send("data added !!");
         })
     })
    })
})


module.exports=router;