const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema(
    {
//Required Fields

        email:{
            type:String,
            required: [true, "Please, add an email"],
            validate: {
                message: "This email already has an account",
                validator: async (email) => {
                    const items = await mongoose.model('User').count({email});
                    return items < 1
                },
            }
        },
        password:{
            type:String,
            required: [true, "You must provide a password"]
        },
        name: {
            type:String,
            required: [true,"A name is needed to create an account"]
        },

        last_name: {
            type:String,
            required: [true, "A last name is required to proceed"]
        },

//Not required Fields

        role: {
            type:String,
            enum: ["TRAINER","TRAINEE"]
        },
        profile_picture:{
            type:String,
            default:"https://www.centraltrials.com/wp-content/uploads/2016/11/User-Default.jpg"
        },
        
    },
    {timestamps:true}
)



//Adding the validators



//  Email Validations

// Exporting the information

module.exports = mongoose.model("User", userSchema);