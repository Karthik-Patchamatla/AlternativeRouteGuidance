const express = require('express');
const app = express();
const mongoose = require('mongoose');

main().then(() => {
    console.log('Connection to MongoDB successful');
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/RegisterDetails');
}

app.listen(8080, () => {
    console.log("The server is running on port 8080");
});

const trainSchema = new mongoose.Schema({
    trainnumber: {
      type: Number,
      required: true,
      unique: true
    },
    trainname: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    arrival: {
      type: String,
      required: true
    },
    departure: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    sleeper: {
      type: Number,
      required: true
    },
    firstclass: {
      type: Number,
      required: true
    },
    secondclass: {
      type: Number,
      required: true
    },
    thirdclass: {
      type: Number,
      required: true
    }
  });

  const Train = mongoose.model('Train', trainSchema);

//   Train.insertMany([
//     {
//       trainnumber: 17013,
//       trainname: "Hyderabad Express",
//       from: "Secunderabad",
//       to: "Pune Junction",
//       arrival: "8:30",
//       departure: "22:45",
//       duration: "9h 45m",
//       sleeper: 1200,
//       firstclass: 1050,
//       secondclass: 920,
//       thirdclass: 500
//     },
//     {
//       trainnumber: 12703,
//       trainname: "Falaknuma Express",
//       from: "Secunderabad",
//       to: "Pune Junction",
//       arrival: "6:15",
//       departure: "20:30",
//       duration: "9h 45m",
//       sleeper: 1250,
//       firstclass: 1100,
//       secondclass: 950,
//       thirdclass: 520
//     },
//     {
//       trainnumber: 17032,
//       trainname: "Mumbai Express",
//       from: "Secunderabad",
//       to: "Pune Junction",
//       arrival: "7:10",
//       departure: "21:00",
//       duration: "10h 10m",
//       sleeper: 1180,
//       firstclass: 1020,
//       secondclass: 890,
//       thirdclass: 480
//     },
//     {
//       trainnumber: 12702,
//       trainname: "Hussain Sagar Express",
//       from: "Secunderabad",
//       to: "Pune Junction",
//       arrival: "5:50",
//       departure: "20:00",
//       duration: "9h 50m",
//       sleeper: 1220,
//       firstclass: 1080,
//       secondclass: 920,
//       thirdclass: 510
//     },
//     {
//       trainnumber: 17614,
//       trainname: "Purna Pune Express",
//       from: "Secunderabad",
//       to: "Pune Junction",
//       arrival: "4:30",
//       departure: "18:20",
//       duration: "10h 10m",
//       sleeper: 1190,
//       firstclass: 1040,
//       secondclass: 900,
//       thirdclass: 490
//     },
//     {
//       trainnumber: 11020,
//       trainname: "Konark Express",
//       from: "Secunderabad",
//       to: "Pune Junction",
//       arrival: "9:00",
//       departure: "23:15",
//       duration: "9h 45m",
//       sleeper: 1240,
//       firstclass: 1090,
//       secondclass: 940,
//       thirdclass: 530
//     },
//     {
//       trainnumber: 12710,
//       trainname: "Ajanta Express",
//       from: "Secunderabad",
//       to: "Pune Junction",
//       arrival: "6:45",
//       departure: "21:05",
//       duration: "9h 40m",
//       sleeper: 1210,
//       firstclass: 1060,
//       secondclass: 910,
//       thirdclass: 505
//     },
//     {
//       trainnumber: 17017,
//       trainname: "Rajkot Express",
//       from: "Secunderabad",
//       to: "Pune Junction",
//       arrival: "8:50",
//       departure: "22:50",
//       duration: "10h 00m",
//       sleeper: 1230,
//       firstclass: 1075,
//       secondclass: 930,
//       thirdclass: 515
//     },
//     {
//       trainnumber: 12730,
//       trainname: "Pune Express",
//       from: "Secunderabad",
//       to: "Pune Junction",
//       arrival: "7:30",
//       departure: "22:00",
//       duration: "9h 30m",
//       sleeper: 1225,
//       firstclass: 1085,
//       secondclass: 925,
//       thirdclass: 510
//     },
//     {
//       trainnumber: 11304,
//       trainname: "Pragati Express",
//       from: "Secunderabad",
//       to: "Pune Junction",
//       arrival: "5:00",
//       departure: "18:30",
//       duration: "10h 30m",
//       sleeper: 1205,
//       firstclass: 1055,
//       secondclass: 915,
//       thirdclass: 495
//     }
//   ]);
  
// Train.insertMany([
//     {
//       trainnumber: 12603,
//       trainname: "Kacheguda Express",
//       from: "Bangalore City Junction",
//       to: "Secunderabad",
//       arrival: "8:20",
//       departure: "21:30",
//       duration: "10h 50m",
//       sleeper: 1350,
//       firstclass: 1200,
//       secondclass: 1050,
//       thirdclass: 600
//     },
//     {
//       trainnumber: 16571,
//       trainname: "Rajkot Express",
//       from: "Bangalore City Junction",
//       to: "Secunderabad",
//       arrival: "10:00",
//       departure: "22:30",
//       duration: "11h 30m",
//       sleeper: 1380,
//       firstclass: 1230,
//       secondclass: 1075,
//       thirdclass: 620
//     },
//     {
//       trainnumber: 12649,
//       trainname: "Sampark Kranti Express",
//       from: "Bangalore City Junction",
//       to: "Secunderabad",
//       arrival: "9:30",
//       departure: "20:15",
//       duration: "11h 15m",
//       sleeper: 1320,
//       firstclass: 1180,
//       secondclass: 1020,
//       thirdclass: 590
//     },
//     {
//       trainnumber: 17603,
//       trainname: "Kacheguda Express",
//       from: "Bangalore City Junction",
//       to: "Secunderabad",
//       arrival: "11:15",
//       departure: "23:00",
//       duration: "11h 45m",
//       sleeper: 1370,
//       firstclass: 1225,
//       secondclass: 1065,
//       thirdclass: 615
//     },
//     {
//       trainnumber: 12786,
//       trainname: "Karnataka Sampark Kranti",
//       from: "Bangalore City Junction",
//       to: "Secunderabad",
//       arrival: "6:40",
//       departure: "18:30",
//       duration: "11h 10m",
//       sleeper: 1300,
//       firstclass: 1170,
//       secondclass: 1010,
//       thirdclass: 580
//     },
//     {
//       trainnumber: 11301,
//       trainname: "Udyan Express",
//       from: "Bangalore City Junction",
//       to: "Secunderabad",
//       arrival: "12:30",
//       departure: "1:15",
//       duration: "12h 45m",
//       sleeper: 1400,
//       firstclass: 1250,
//       secondclass: 1090,
//       thirdclass: 640
//     },
//     {
//       trainnumber: 11006,
//       trainname: "Chalukya Express",
//       from: "Bangalore City Junction",
//       to: "Secunderabad",
//       arrival: "13:00",
//       departure: "2:30",
//       duration: "13h 30m",
//       sleeper: 1420,
//       firstclass: 1270,
//       secondclass: 1110,
//       thirdclass: 660
//     },
//     {
//       trainnumber: 12678,
//       trainname: "Bangalore Express",
//       from: "Bangalore City Junction",
//       to: "Secunderabad",
//       arrival: "7:15",
//       departure: "18:45",
//       duration: "11h 30m",
//       sleeper: 1360,
//       firstclass: 1210,
//       secondclass: 1050,
//       thirdclass: 610
//     },
//     {
//       trainnumber: 17652,
//       trainname: "Kacheguda SF Express",
//       from: "Bangalore City Junction",
//       to: "Secunderabad",
//       arrival: "5:20",
//       departure: "17:45",
//       duration: "12h 25m",
//       sleeper: 1330,
//       firstclass: 1190,
//       secondclass: 1035,
//       thirdclass: 600
//     },
//     {
//       trainnumber: 12785,
//       trainname: "Swarna Jayanti Express",
//       from: "Bangalore City Junction",
//       to: "Secunderabad",
//       arrival: "14:45",
//       departure: "3:15",
//       duration: "12h 30m",
//       sleeper: 1390,
//       firstclass: 1240,
//       secondclass: 1085,
//       thirdclass: 630
//     }
//   ]);


// Train.insertMany([
//     {
//       trainnumber: 12951,
//       trainname: "Golden Temple Mail",
//       from: "Mumbai Central",
//       to: "New Delhi",
//       arrival: "6:00",
//       departure: "22:30",
//       duration: "16h 30m",
//       sleeper: 1500,
//       firstclass: 3100,
//       secondclass: 2300,
//       thirdclass: 1400
//     },
//     {
//       trainnumber: 12009,
//       trainname: "Shatabdi Express",
//       from: "Mumbai Central",
//       to: "New Delhi",
//       arrival: "12:30",
//       departure: "17:05",
//       duration: "16h 25m",
//       sleeper: 1600,
//       firstclass: 3200,
//       secondclass: 2350,
//       thirdclass: 1450
//     },
//     {
//       trainnumber: 12953,
//       trainname: "Maharashtra Express",
//       from: "Mumbai Central",
//       to: "New Delhi",
//       arrival: "7:15",
//       departure: "17:30",
//       duration: "18h 45m",
//       sleeper: 1450,
//       firstclass: 3000,
//       secondclass: 2200,
//       thirdclass: 1300
//     },
//     {
//       trainnumber: 12617,
//       trainname: "Rajdhani Express",
//       from: "Mumbai Central",
//       to: "New Delhi",
//       arrival: "6:00",
//       departure: "16:15",
//       duration: "17h 45m",
//       sleeper: 0,
//       firstclass: 4000,
//       secondclass: 2500,
//       thirdclass: 1700
//     },
//     {
//       trainnumber: 12019,
//       trainname: "Mumbai - New Delhi Rajdhani Express",
//       from: "Mumbai Central",
//       to: "New Delhi",
//       arrival: "5:45",
//       departure: "16:15",
//       duration: "17h 30m",
//       sleeper: 0,
//       firstclass: 4500,
//       secondclass: 3000,
//       thirdclass: 1800
//     },
//     {
//       trainnumber: 12629,
//       trainname: "Deccan Queen Express",
//       from: "Mumbai Central",
//       to: "New Delhi",
//       arrival: "8:45",
//       departure: "19:00",
//       duration: "20h 15m",
//       sleeper: 1550,
//       firstclass: 3200,
//       secondclass: 2400,
//       thirdclass: 1500
//     }
//   ]);
  
// Train.insertMany([
//     {
//       trainnumber: 12229,
//       trainname: "Lucknow - Howrah Express",
//       from: "Lucknow",
//       to: "Kolkata Howrah Junction",
//       arrival: "5:15",
//       departure: "22:30",
//       duration: "16h 45m",
//       sleeper: 1450,
//       firstclass: 3100,
//       secondclass: 2200,
//       thirdclass: 1350
//     },
//     {
//       trainnumber: 15003,
//       trainname: "Madhya Pradesh Sampark Kranti Express",
//       from: "Lucknow",
//       to: "Kolkata Howrah Junction",
//       arrival: "10:15",
//       departure: "18:00",
//       duration: "18h 15m",
//       sleeper: 1400,
//       firstclass: 3000,
//       secondclass: 2150,
//       thirdclass: 1300
//     },
//     {
//       trainnumber: 13151,
//       trainname: "Howrah - Lucknow Mail",
//       from: "Lucknow",
//       to: "Kolkata Howrah Junction",
//       arrival: "9:30",
//       departure: "20:15",
//       duration: "18h 15m",
//       sleeper: 1500,
//       firstclass: 3200,
//       secondclass: 2250,
//       thirdclass: 1400
//     },
//     {
//       trainnumber: 12305,
//       trainname: "Purushottam Express",
//       from: "Lucknow",
//       to: "Kolkata Howrah Junction",
//       arrival: "8:45",
//       departure: "21:30",
//       duration: "17h 15m",
//       sleeper: 1500,
//       firstclass: 3250,
//       secondclass: 2300,
//       thirdclass: 1450
//     },
//     {
//       trainnumber: 12241,
//       trainname: "Maha Kumbh Express",
//       from: "Lucknow",
//       to: "Kolkata Howrah Junction",
//       arrival: "7:50",
//       departure: "22:10",
//       duration: "16h 40m",
//       sleeper: 1400,
//       firstclass: 3000,
//       secondclass: 2200,
//       thirdclass: 1300
//     }
//   ]);

// Train.insertMany([
//     {
//       trainnumber: 12901,
//       trainname: "Swarna Shatabdi Express",
//       from: "New Delhi",
//       to: "Ahmedabad Junction",
//       arrival: "17:40",
//       departure: "6:05",
//       duration: "15h 35m",
//       sleeper: 1600,
//       firstclass: 3300,
//       secondclass: 2400,
//       thirdclass: 1400
//     },
//     {
//       trainnumber: 12909,
//       trainname: "Gandhi Nagar - New Delhi Superfast Express",
//       from: "New Delhi",
//       to: "Ahmedabad Junction",
//       arrival: "22:20",
//       departure: "8:00",
//       duration: "16h 20m",
//       sleeper: 1700,
//       firstclass: 3200,
//       secondclass: 2300,
//       thirdclass: 1450
//     },
//     {
//       trainnumber: 12923,
//       trainname: "Ahmedabad - New Delhi Rajdhani Express",
//       from: "New Delhi",
//       to: "Ahmedabad Junction",
//       arrival: "5:15",
//       departure: "20:00",
//       duration: "17h 15m",
//       sleeper: 1800,
//       firstclass: 3500,
//       secondclass: 2600,
//       thirdclass: 1500
//     },
//     {
//       trainnumber: 12915,
//       trainname: "Saurashtra Express",
//       from: "New Delhi",
//       to: "Ahmedabad Junction",
//       arrival: "15:00",
//       departure: "6:30",
//       duration: "16h 30m",
//       sleeper: 1650,
//       firstclass: 3100,
//       secondclass: 2200,
//       thirdclass: 1400
//     },
//     {
//       trainnumber: 12917,
//       trainname: "Ashram Express",
//       from: "New Delhi",
//       to: "Ahmedabad Junction",
//       arrival: "13:30",
//       departure: "5:40",
//       duration: "15h 50m",
//       sleeper: 1600,
//       firstclass: 3000,
//       secondclass: 2200,
//       thirdclass: 1350
//     }
//   ]);

// Train.insertMany([
//     {
//       trainnumber: 13025,
//       trainname: "Howrah - Dehradun Express",
//       from: "Kolkata Howrah Junction",
//       to: "Uttarkathani",
//       arrival: "6:45",
//       departure: "22:00",
//       duration: "24h 45m",
//       sleeper: 1600,
//       firstclass: 3100,
//       secondclass: 2250,
//       thirdclass: 1400
//     },
//     {
//       trainnumber: 13043,
//       trainname: "Howrah - Haridwar Express",
//       from: "Kolkata Howrah Junction",
//       to: "Uttarkathani",
//       arrival: "7:00",
//       departure: "20:45",
//       duration: "24h 15m",
//       sleeper: 1700,
//       firstclass: 3200,
//       secondclass: 2350,
//       thirdclass: 1450
//     },
//     {
//       trainnumber: 13019,
//       trainname: "Howrah - Rishikesh Express",
//       from: "Kolkata Howrah Junction",
//       to: "Uttarkathani",
//       arrival: "5:30",
//       departure: "21:15",
//       duration: "24h 15m",
//       sleeper: 1550,
//       firstclass: 3000,
//       secondclass: 2250,
//       thirdclass: 1350
//     },
//     {
//       trainnumber: 13021,
//       trainname: "Howrah - Dehradun AC Express",
//       from: "Kolkata Howrah Junction",
//       to: "Uttarkathani",
//       arrival: "6:10",
//       departure: "22:10",
//       duration: "24h",
//       sleeper: 1800,
//       firstclass: 3300,
//       secondclass: 2400,
//       thirdclass: 1500
//     }
//   ]);

// Train.insertMany([
//     {
//       trainnumber: 12055,
//       trainname: "Haridwar - New Delhi AC Express",
//       from: "Uttarkathani",
//       to: "New Delhi",
//       arrival: "10:00",
//       departure: "6:10",
//       duration: "6h 50m",
//       sleeper: 1800,
//       firstclass: 3400,
//       secondclass: 2500,
//       thirdclass: 1450
//     },
//     {
//       trainnumber: 12041,
//       trainname: "Dehradun - New Delhi Shatabdi Express",
//       from: "Uttarkathani",
//       to: "New Delhi",
//       arrival: "12:15",
//       departure: "6:30",
//       duration: "6h 45m",
//       sleeper: 1500,
//       firstclass: 3200,
//       secondclass: 2300,
//       thirdclass: 1400
//     },
//     {
//       trainnumber: 12439,
//       trainname: "Uttarakhand Express",
//       from: "Uttarkathani",
//       to: "New Delhi",
//       arrival: "15:00",
//       departure: "7:30",
//       duration: "7h 30m",
//       sleeper: 1700,
//       firstclass: 3400,
//       secondclass: 2300,
//       thirdclass: 1500
//     }
//   ]);

// Train.insertMany([
//     {
//       trainnumber: 12964,
//       trainname: "Ajmer - New Delhi Shatabdi Express",
//       from: "Jaipur Junction",
//       to: "New Delhi",
//       arrival: "14:00",
//       departure: "6:00",
//       duration: "5h 30m",
//       sleeper: 1500,
//       firstclass: 3000,
//       secondclass: 2200,
//       thirdclass: 1350
//     },
//     {
//       trainnumber: 12459,
//       trainname: "Jaipur - New Delhi Double Decker Express",
//       from: "Jaipur Junction",
//       to: "New Delhi",
//       arrival: "11:00",
//       departure: "6:50",
//       duration: "5h 10m",
//       sleeper: 1300,
//       firstclass: 2800,
//       secondclass: 2100,
//       thirdclass: 1250
//     },
//     {
//       trainnumber: 12057,
//       trainname: "Jaipur - New Delhi Shatabdi Express",
//       from: "Jaipur Junction",
//       to: "New Delhi",
//       arrival: "10:55",
//       departure: "6:00",
//       duration: "5h 50m",
//       sleeper: 1600,
//       firstclass: 3200,
//       secondclass: 2300,
//       thirdclass: 1400
//     },
//     {
//       trainnumber: 12455,
//       trainname: "Shatabdi Express (Jaipur - New Delhi)",
//       from: "Jaipur Junction",
//       to: "New Delhi",
//       arrival: "17:40",
//       departure: "7:00",
//       duration: "6h 10m",
//       sleeper: 1500,
//       firstclass: 3100,
//       secondclass: 2200,
//       thirdclass: 1300
//     }
//   ]);

// Train.insertMany([
//     {
//       trainnumber: 12463,
//       trainname: "Jammu Tawi - Jodhpur Express",
//       from: "Jodhpur Junction",
//       to: "Jammu Tawi",
//       arrival: "9:30",
//       departure: "8:00",
//       duration: "23h 30m",
//       sleeper: 1500,
//       firstclass: 3200,
//       secondclass: 2400,
//       thirdclass: 1400
//     },
//     {
//       trainnumber: 12465,
//       trainname: "Jodhpur - Jammu Tawi Express",
//       from: "Jodhpur Junction",
//       to: "Jammu Tawi",
//       arrival: "7:40",
//       departure: "18:10",
//       duration: "23h 30m",
//       sleeper: 1600,
//       firstclass: 3300,
//       secondclass: 2500,
//       thirdclass: 1500
//     },
//     {
//       trainnumber: 14889,
//       trainname: "Jammu Tawi - Jodhpur Express",
//       from: "Jodhpur Junction",
//       to: "Jammu Tawi",
//       arrival: "8:50",
//       departure: "9:20",
//       duration: "22h 30m",
//       sleeper: 1700,
//       firstclass: 3400,
//       secondclass: 2600,
//       thirdclass: 1600
//     },
//     {
//       trainnumber: 14893,
//       trainname: "Jodhpur - Jammu Tawi Superfast Express",
//       from: "Jodhpur Junction",
//       to: "Jammu Tawi",
//       arrival: "7:20",
//       departure: "7:30",
//       duration: "24h 10m",
//       sleeper: 1800,
//       firstclass: 3500,
//       secondclass: 2700,
//       thirdclass: 1700
//     }
//   ]);
