const mongoose = require("mongoose");

let HostSchema = mongoose.Schema({
  name: {
    en:{
      type: String,
      required: [true, "user name is required"],
      unique: [true, "user name must be unique"],
      minLength: 3,
      maxLength: 16,
    },
    ar:{
      type: String,
      required: [true, "user name is required"],
      unique: [true, "user name must be unique"],
      minLength: 3,
      maxLength: 16,
    }
   
  },
  email: {
    en:{
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
    },
    ar:{
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
    }

  },
  password: {
    en:{
      type: Number,
    },
    ar:{
      type: Number,
    }
   
  },
  phone: {
    en:{
      type: Number,
    },
    ar:{
      type: Number,
    }
   
  },
  type: {
    en:{
      type: String,
    },
    ar:{
      type: String,
    }
   
    // enum:['Hotel','Resort','Apartment','Cottage','Villa'],
  },
  location: {
    en:{
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
    ar:{
      Address: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
    }

  },
  photos:{
    en:{
      type:Array,
    },
    ar:{
      type:Array,
    }


  },
  details: {
    en:{
      type: String,
    },
    ar:{
      type: String,
    }

 
  },
  rating: {
    en:{
      type: Number,
    },
    ar:{
      type: Number,
    }
  },
  notes: {
    en:{
      type: String,
    },
    ar:{
      type: String,
    }

  },
  description:{
    en:{
      type: String,
    },
    ar:{
      type: String,
    }
 

  },
  subDescription:{
    en:{
      type: String,
    },
    ar:{
      type: String,
    }
  },

HouseRules:{
  en:{
    type: String,
  },
  ar:{
    type: String,
  }

},

Availablity:{
  en:{
    type:Boolean,
  },
  ar:{
    type:Boolean,
  }
 
} ,
PricingPerGuest:{
  en:{
    type:Number,
  },
  ar:{
    type:Number,
  }

},
CheckInTime :{
  en:{
    type:Boolean,
  },
  ar:{
    type:Boolean,
  }
 

},
CheckOutTime :{
  en:{
    type:Boolean,
  },
  ar:{
    type:Boolean,
  }
  

},
OwnerId :{
  en:{
  
    type:Number,
  },
  ar:{
     
  type:Number,
  }


},
Approved:{
  en:{
  
    type:Boolean,
  },
  ar:{
    type:Boolean,
  }


} ,
 Facilities:{
  en:{
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
  ar:{
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
  }


 },
 cancellation:{
  en:{
    freeCancellation:{
      type:Boolean,
    },
    CancellationFee:{
      type:Boolean,
    },
    CancellationDeadine:{
      type:String,
    },
  },
  ar:{
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

 }


});

module.exports = mongoose.model("host", HostSchema)