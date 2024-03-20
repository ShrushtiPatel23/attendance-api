const mongoose = require('mongoose')
const { Schema } = mongoose;

const RecordSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    

},
    {
        freezeTableName: true,
        timestamps: true

    });

const Record = mongoose.model('records', RecordSchema)
module.exports = Record;    