const Record = require('../models/record')

module.exports = {

    createRecord: async (req, res) => {
        
        try {
            const { date, status } = req.body;

            const record = await Record.create({
                date: date,
                status: status,
                userId: req.admin.id
            });

            return res.status(200).json({
                message: "Attendance Mark Successfully",
                data: record
            });

        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                message: error.message
            });
        }


    },

    // Retrieve attendance records
    getRecord: async (req, res) => {
        const userId = req.admin.id

        console.log(req.admin.id)
        try {
            const result = await Record.find({ userId: userId });
            
            const formattedData = {};
            result.forEach(record => {
                var date = new Date(record.date).toLocaleDateString('en-US', { 
                    timeZone: 'UTC',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                formattedData[new Date(date).toDateString()] = record.status;
            });

            const newdata = [];
            result.forEach(record => {
                newdata.push({
                    _id: record._id,
                    _userId: record.userId,
                    date: new Date(record.date).toLocaleDateString('en-US', { 
                        timeZone: 'UTC',
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    }),
                    status: record.status
            })
            })

            return res.status(200).json({
                data: newdata,
                formatDate: formattedData,
            });

        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({
                message: error.message
            });
        }

    },

    deleteRecord: async (req, res) => {

        const id = req.params.id

        try {
            const result = await Record.findByIdAndDelete(id);
            return res.status(200).json({
                data: result,
                message: "Deleted data Succesfully"
            });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({
                message: error.message
            });
        }

    },

    updateRecord: async (req, res) => {

        const id = req.params.id
        const { date, status } = req.body;
        try {
            const result = await Record.findByIdAndUpdate(id, {
                $set:
                {
                    date: date, status: status, userId: req.admin.id
                },

            },
                { new: true }
            );
            return res.status(200).json({
                data: result,
                message: "Updated data Succesfully"
            });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({
                message: error.message
            });
        }

    }
}
