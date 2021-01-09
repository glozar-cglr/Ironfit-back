const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema(
    {
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
        role: {
            type:String,
            enum: [,"TRAINER","TRAINEE"]
        },
        profile_picture:{
            url: {
                type:String,
                default: "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-12.jpg"
            },
            public_id: {
                type:String,
                default: "Default"
            }
        },
        
    },
    {timestamps:true}
)



//Adding the validators



//  Email Validations

// Exporting the information

module.exports = mongoose.model("User", userSchema);