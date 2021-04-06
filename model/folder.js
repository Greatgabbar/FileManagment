const mongoose = require('mongoose');
const Schema=  mongoose.Schema;

const folderSchema=new Schema({
    name : {
        type : Schema.Types.String
    },
    parent : {
        type : Schema.Types.ObjectId,
        default : null,
        ref : 'Folder'
    },
    content : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Folder'
        }
    ],
    cat : {
        type : String,
        enum : ['file','folder'],
        default : 'folder'
    }
});

const Folder= mongoose.model('Folder',folderSchema);
module.exports = Folder;