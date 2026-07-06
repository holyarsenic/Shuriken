import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    userName:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
     email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
     fullName:{
      type: String,
      required: true,
      trim: true,
      index: true
    },
    bio:{
      type: String
    },
     avatar:{
      type: String,
      default: "https://i.pinimg.com/736x/cd/63/af/cd63afd8681787eef6a56fb0e929996d.jpg"
    },
    watchHistory:[{
      type:Schema.Types.ObjectId,
      ref:"Post"
    }],
    password:{
      type:String,
      required:[true, "Password is required"]
    },
    refreshToken:{
      type: String
    }
},{timestamps:true}
);

userSchema.pre("save", async function(){

  if(!this.isModified("password")) return;

 this.password = await bcrypt.hash(this.password, 10) //round
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)    //true or false
}

//Tokens 

userSchema.methods.generateAccessToken = function (params) {
   return jwt.sign({
    _id: this._id,
    email: this.email,
    fullName: this.fullName,
    userName: this.userName
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
)
}

userSchema.methods.generateRefreshToken = function (params) {
  return jwt.sign({
    _id: this._id
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  }
)
}

export const User = mongoose.model("User", userSchema);