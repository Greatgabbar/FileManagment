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
        return res.send(200).status('all folder');
    // Folder.findOne({_id : "606bfe900283814320f77a76"}).populate('content').then(data=>{
    //     console.log(data);
    // })
})

// ------- moving folder api--------------
router.post('/folder/move',(req,res)=>{
    const {from,to} = req.body;
    Folder.findOne({name : from}).then(data=>{
        if(!data) return res.send(404).status("No Source file Found");
        if(to==null){
            data.parent=null;
            data.save().then(gg=>{
                return res.send(200).status("Moved Successfully !!");
            })
        }
        Folder.findOne({name : to}).then(gg=>{
            if(!gg) return res.send(404).status("No destination file Found");
            data.parent=gg._id;
            data.save().then(ff=>{
                res.send(200).status("Moved Successfully !!");
            })
        })
    })
})

// ------------ moving file api ---------------
router.post('/file/move',(req,res)=>{
    const {from,to} = req.body;
    Folder.findOne({name : from}).then(data=>{
        if(!data) return res.send(404).status("No Source file Found");
        if(to==null){
            data.parent=null;
            data.save().then(gg=>{
                return res.send(200).status("Moved Successfully !!");
            })
        }
        Folder.findOne({name : to}).then(gg=>{
            if(!gg) return res.send(404).status("No destination file Found");
            data.parent=gg._id;
            data.save().then(ff=>{
                res.send(200).status("Moved Successfully !!");
            })
        })
    })
})

//------get data for specific folder API --------------

router.post('/folder/info',(req,res)=>{
    const {name} = req.body;
    const arr=[];
    Folder.findOne({name : name}).populate('content').then(data=>{
        if(!data.content.length) return res.send(200).status('No files in this folder');
        data.content.forEach(gg=>{
            arr.push(gg.name);
        })
        return res.send(200).status(arr);
    })
})

// --------del folder -----api

router.post('/folder/del/:id',(req,res)=>{
    const {id}=req.params;
    Folder.findById(id).then(data=>{
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
router.post('/file/del/:id',(req,res)=>{
    const {id}=req.params;
    Folder.findById(id).then(data=>{
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
    folder.save().then(data=>{
        console.log(data);
        Folder.findOne({_id : parent}).then(async (lol)=>{
            if(lol.cat==='file') return res.send(400).status('U cant insert file in file');
            console.log(lol);
            lol.content.push(data._id);
            await lol.save();
            return res.send("data added !!");
        })
    })
})

// ----------------------------adding new file api-------------------

router.post('/file/new',async (req,res)=>{
    const {name , parent }=req.body;
    console.log(req.body,parent);
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
    console.log(2)
    const folder=new Folder({
        name :name,
        parent : parent ,
        cat : 'file'
    })
    folder.save().then(data=>{
        console.log(data);
        Folder.findOne({_id : parent}).then(async (lol)=>{
            if(lol.cat==='file') return res.send(400).status('U cant insert file in file');
            console.log(lol);
            lol.content.push(data._id);
            await lol.save();
            return res.send("data added !!");
        })
    })
})


module.exports=router;