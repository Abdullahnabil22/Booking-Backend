const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

let users = mongoose.Schema({
    userName: {
        en: {
            type: String,
            required: [true, "userName is required"],
            unique: true,
        },
        ar: {
            type: String,
            required: [true, "name is required"],
            unique: true,
        }
    },
    firstName: {  
        en: {
            type: String,
            required: [true, "firstName is required"],
        },
        ar: {
            type: String,
            required: [true, "firstName is required"],
        }
    },
    lastName: {
        en: {
            type: String,
            required: [true, "lastName is required"],
        },
        ar: {
            type: String,
            required: [true, "lastName is required"],
        }
    },
    email: {
        en: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        },
        ar: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email'],
        }
    },
    nationality: {
        en: {
            type: String,
            required: [true, "nationality is required"],
        },
        ar: {
            type: String,
            required: [true, "nationality is required"],
        }
    },
    members: {
        en: {
            type: [String], 
            required: [true, "members are required"],
        },
        ar: {
            type: [String],
            required: [true, "members are required"],
        }
    },
    phoneNumber: { 
        en: {
            type: String,
        },
        ar: {
            type: String,
        }
    },
    password: {
        en: {
            type: String,
            required: [true, "password is required"],
            match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characters long and contain at least one letter and one number."],
        },
        ar: {
            type: String,
            required: [true, "password is required"],
            match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characters long and contain at least one letter and one number."],
        }
    },
    role: {
        en: {
            type: String,
            required: [true, "role is required"],
            enum: ['admin', 'user', 'owner']
        },
        ar: {
            type: String,
            required: [true, "role is required"],
            enum: ['admin', 'user', 'owner']
        },
    },
    active: {  
        en: {
            type: Boolean,
        },
        ar: {
            type: Boolean,
        },
    }
 
}, { timestamps: true });

users.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hashSync(this.password, salt);
        this.password = hashedPassword;
    }
    next();
});

const userModel = mongoose.model('User', users);
module.exports = userModel;
