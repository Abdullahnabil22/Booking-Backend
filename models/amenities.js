const mongoose = require("mongoose");

let AmenitiesSchema = mongoose.Schema(
  {
    room: {
      ClothesRack: {
        type: Boolean,
        default: false,
      },
      DryingRack: {
        type: Boolean,
        default: false,
      },
      Dryer: {
        type: Boolean,
        default: false,
      },
      Fan: {
        type: Boolean,
        default: false,
      },
      Heating: {
        type: Boolean,
        default: false,
      },
      AirConditioning: {
        type: Boolean,
        default: false,
      },
      Wardrobe: {
        type: Boolean,
        default: false,
      },
      Soundproofing: {
        type: Boolean,
        default: false,
      },
      CarpetedFloors: {
        type: Boolean,
        default: false,
      },
      Fireplace: {
        type: Boolean,
        default: false,
      },
      MosquitoNet: {
        type: Boolean,
        default: false,
      },
      SittingArea: {
        type: Boolean,
        default: false,
      },
      ElectricBlanket: {
        type: Boolean,
        default: false,
      },
      TileFloors: {
        type: Boolean,
        default: false,
      },
      ParquetFloors: {
        type: Boolean,
        default: false,
      },
      HardwoodFloors: {
        type: Boolean,
        default: false,
      },
      IroningBoard: {
        type: Boolean,
        default: false,
      },
    },
    bathroom: {
      HotWater: {
        type: Boolean,
        default: false,
      },
      Shower: {
        type: Boolean,
        default: false,
      },
      Bathtub: {
        type: Boolean,
        default: false,
      },
      Hairdryer: {
        type: Boolean,
        default: false,
      },
      ToiletPaper: {
        type: Boolean,
        default: false,
      },
      Bathrobes: {
        type: Boolean,
        default: false,
      },
      Slippers: {
        type: Boolean,
        default: false,
      },
      SpaTub: {
        type: Boolean,
        default: false,
      },
      Toilet: {
        type: Boolean,
        default: false,
      },
      FreeToiletries: {
        type: Boolean,
        default: false,
      },
      ToiletSoap: {
        type: Boolean,
        default: false,
      },
      PrivateBathroom: {
        type: Boolean,
        default: false,
      },
      SharedBathroom: {
        type: Boolean,
        default: false,
      },
      Towels: {
        type: Boolean,
        default: false,
      },
    },
    mediaAndTechnology: {
      TV: {
        type: Boolean,
        default: false,
      },
      CableTV: {
        type: Boolean,
        default: false,
      },
      SatelliteTV: {
        type: Boolean,
        default: false,
      },
      FlatScreenTV: {
        type: Boolean,
        default: false,
      },
      Radio: {
        type: Boolean,
        default: false,
      },
      CDPlayer: {
        type: Boolean,
        default: false,
      },
      DVDPlayer: {
        type: Boolean,
        default: false,
      },
      iPodDockingStation: {
        type: Boolean,
        default: false,
      },
      MP3Player: {
        type: Boolean,
        default: false,
      },
      Telephone: {
        type: Boolean,
        default: false,
      },
      WiFi: {
        type: Boolean,
        default: false,
      },
      Computer: {
        type: Boolean,
        default: false,
      },
      GameConsole: {
        type: Boolean,
        default: false,
      },
      VideoGame: {
        type: Boolean,
        default: false,
      },
    },
    foodAndDrink: {
      DiningTable: {
        type: Boolean,
        default: false,
      },
      DiningChairs: {
        type: Boolean,
        default: false,
      },
      DiningArea: {
        type: Boolean,
        default: false,
      },
      Stovetop: {
        type: Boolean,
        default: false,
      },
      Oven: {
        type: Boolean,
        default: false,
      },
      Toaster: {
        type: Boolean,
        default: false,
      },
      Refrigerator: {
        type: Boolean,
        default: false,
      },
      Microwave: {
        type: Boolean,
        default: false,
      },
      Dishwasher: {
        type: Boolean,
        default: false,
      },
      EspressoMachine: {
        type: Boolean,
        default: false,
      },
      CoffeeMaker: {
        type: Boolean,
        default: false,
      },
      TeaMaker: {
        type: Boolean,
        default: false,
      },
      Kettle: {
        type: Boolean,
        default: false,
      },
      BarbecueGrill: {
        type: Boolean,
        default: false,
      },
      OutdoorDiningArea: {
        type: Boolean,
        default: false,
      },
      OutdoorSeating: {
        type: Boolean,
        default: false,
      },
      OutdoorFireplace: {
        type: Boolean,
        default: false,
      },
      OutdoorTable: {
        type: Boolean,
        default: false,
      },
      OutdoorChairs: {
        type: Boolean,
        default: false,
      },
    },
    servicesAndExtras: {
      ExecutiveLoungeAccess: {
        type: Boolean,
        default: false,
      },
      BusinessCenter: {
        type: Boolean,
        default: false,
      },
      LaundryService: {
        type: Boolean,
        default: false,
      },
      DryCleaningService: {
        type: Boolean,
        default: false,
      },
      AlarmClock: {
        type: Boolean,
        default: false,
      },
      WakeUpCall: {
        type: Boolean,
        default: false,
      },
      ToiletriesDelivery: {
        type: Boolean,
        default: false,
      },
      RoomService: {
        type: Boolean,
        default: false,
      },
      BreakfastInRoom: {
        type: Boolean,
        default: false,
      },
      IroningService: {
        type: Boolean,
        default: false,
      },
    },
    outdoorAndView: {
      Balcony: {
        type: Boolean,
        default: false,
      },
      Terrace: {
        type: Boolean,
        default: false,
      },
      Patio: {
        type: Boolean,
        default: false,
      },
      View: {
        type: Boolean,
        default: false,
      },
      GardenView: {
        type: Boolean,
        default: false,
      },
      PoolView: {
        type: Boolean,
        default: false,
      },
      SeaView: {
        type: Boolean,
        default: false,
      },
      MountainView: {
        type: Boolean,
        default: false,
      },
      ForestView: {
        type: Boolean,
        default: false,
      },
      LakeView: {
        type: Boolean,
        default: false,
      },
      RiverView: {
        type: Boolean,
        default: false,
      },
      BeachView: {
        type: Boolean,
        default: false,
      },
      CityView: {
        type: Boolean,
        default: false,
      },
      ParkView: {
        type: Boolean,
        default: false,
      },
      LandmarkView: {
        type: Boolean,
        default: false,
      },
      QuietStreetView: {
        type: Boolean,
        default: false,
      },
    },
    accessibility: {
      RoomIsLocatedOnTheGroundFloor: {
        type: Boolean,
        default: false,
      },
      RoomIsCompletelyWheelchairAccessible: {
        type: Boolean,
        default: false,
      },
      RoomIsAccessibleByElevator: {
        type: Boolean,
        default: false,
      },
      RoomIsAccessibleByStairs: {
        type: Boolean,
        default: false,
      },
      ToiletIsWheelchairAccessible: {
        type: Boolean,
        default: false,
      },
    },
    entertainmentAndFamilyServices: {
      BabySafetyGate: {
        type: Boolean,
        default: false,
      },
      BoardGames: {
        type: Boolean,
        default: false,
      },
      ChildrensClub: {
        type: Boolean,
        default: false,
      },
      ChildrensMenu: {
        type: Boolean,
        default: false,
      },
      ChildrensPlayArea: {
        type: Boolean,
        default: false,
      },
      ChildrensPlayground: {
        type: Boolean,
        default: false,
      },
      BooksForChildren: {
        type: Boolean,
        default: false,
      },
      BabySittingService: {
        type: Boolean,
        default: false,
      },
      ChildSafetySocketCover: {
        type: Boolean,
        default: false,
      },
      ChildSafetyLock: {
        type: Boolean,
        default: false,
      },
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hosts",
    },
    facilities: {
      WiFi: {
        type: Boolean,
        default: false,
      },
      AirConditioning: {
        type: Boolean,
        default: false,
      },
      Parking: {
        type: Boolean,
        default: false,
      },
      SwimmingPool: {
        type: Boolean,
        default: false,
      },
      Gym: {
        type: Boolean,
        default: false,
      },
      Breakfast: {
        type: Boolean,
        default: false,
      },
      Dinner: {
        type: Boolean,
        default: false,
      },
      Lunch: {
        type: Boolean,
        default: false,
      },
      RoomService: {
        type: Boolean,
        default: false,
      },
      AirportShuttle: {
        type: Boolean,
        default: false,
      },
      Babysitting: {
        type: Boolean,
        default: false,
      },
      Laundry: {
        type: Boolean,
        default: false,
      },
      DryCleaning: {
        type: Boolean,
        default: false,
      },
      Ironing: {
        type: Boolean,
        default: false,
      },
      Beachfront: {
        type: Boolean,
        default: false,
      },
      FreeParking: {
        type: Boolean,
        default: false,
      },
      Spa: {
        type: Boolean,
        default: false,
      },
      Sauna: {
        type: Boolean,
        default: false,
      },
      SteamRoom: {
        type: Boolean,
        default: false,
      },
      HotTub: {
        type: Boolean,
        default: false,
      },
      FitnessCenter: {
        type: Boolean,
        default: false,
      },
      Yoga: {
        type: Boolean,
        default: false,
      },
      Massage: {
        type: Boolean,
        default: false,
      },
      Pool: {
        type: Boolean,
        default: false,
      },
      Garden: {
        type: Boolean,
        default: false,
      },
      Terrace: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true },
  { collection: "amenities" }
);

let Amenities = mongoose.model("amenities", AmenitiesSchema);

module.exports = Amenities;
