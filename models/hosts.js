const mongoose = require("mongoose");

let HostSchema = mongoose.Schema({
  hostname: {
    type: String,
    required: [true, "user name is required"],
    unique: [true, "user name must be unique"],
    minLength: 3,
    maxLength: 16,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email must be unique"],
  },
  password: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  type: {
    type: String,
    // enum:['Hotel','Resort','Apartment','Cottage','Villa'],
  },
  location: {
    Address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  photos:{
    type:Array,

  },
  details: {
    type: String,
  },
  rating: {
    type: Number,
  },
  notes: {
    type: String,
  },
  description:{
    type: String,

  },
  subDescription:{
    type: String,

  },

HouseRules:{
  type: String,
},

Availablity:{
  type:Boolean,

} ,
PricingPerGuest:{
  type:Number,
},
CheckInTime :{
  type:Boolean,

},
CheckOutTime :{
  type:Boolean,

},
OwnerId :{
  type:Number,

},
Approved:{
  type:Boolean,

} ,
 Facilities:{
  Satellite :{
    type:Boolean,

  },
  Wifi:{
    type:Boolean,

  },
  Pool:{
    type:Boolean,

  },
  Breakfast :{
    type:Boolean,

  },
  Beach:{
    type:Boolean,

  },
  RoomService :{
    type:Boolean,

  },
  Spa:{
    type:Boolean,

  },
  FreeDrinks:{
    type:Boolean,

  },
  SeaView:{
    type:Boolean,

  },
  Parking:{
    type:Boolean,

  },
  Activities:{
    type:Boolean,

  },
  Safety:{
    type:Boolean,

  },
  Cleaning :{
    type:Boolean,

  },
  Child:{
    type:Boolean,

  },
  Smoking:{
    type:Boolean,

  },
  Pet:{
    type:Boolean,

  },
  dinner:{
    type:Boolean,

  },
  lunch:{
    type:Boolean,

  },

 },
 cancellation:{
  freeCancellation:{
    type:Boolean,
  },
  CancellationFee:{
    type:Boolean,
  },
  CancellationDeadine:{
    type:String,
  },

 }


});

module.exports = mongoose.model("host", HostSchema)