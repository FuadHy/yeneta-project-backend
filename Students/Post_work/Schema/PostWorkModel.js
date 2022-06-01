const mongoose = require('mongoose');
const PostWorkSchema = new mongoose.Schema({
    Title:{
        type: String,
        required:[true,'A Student must have a FirstName'],
        maxlength:[40,'A Student FirstName must have less than or equal then 40 characters'],
      //  minlength:[10,'A Student LastName must have more than or equal than 10 characters']
    },
    // Student_Last_Name:{
    //     type: String,
    //     required:[true,'A Student must have a LastName'],
    //     maxlength:[40,'A Student LastName must have less than or equal then 40 characters '],
    //  //   minlength:[10,'A Student LastName must have more than or equal than 10 characters']
        
    // },
   Grade_level:{
        type:Number,
        required:[true,'Student must submit Grade Level']
    },
  Minimum_Price:{
      type:Number,
      required:[true,'Minimum Price is Mandatory']
  },
  Maximum_Price:{
      type:Number,
      required:[true,'Maximum Price is Mandatory']
  },
  Subjects:{
      type:String,
      required:[true,'Define the subjects you want to study']
  },
  Available_Time:{
      type:Number,
      required:[true,'Select the time you are available']
  },
  Experiance:{
    type:String,
    required:[true,'Enter the Experiance level you want']
  },
  Location:{
      type:String,
      required:[true,'You have to enter your location'],

  }
})
const PostWork = mongoose.model('PostWork',PostWorkSchema)
module.exports = PostWork;