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
     avatar:{
      type: String,
      required: true
    },
    coverImage:{
      type: String
    },
    watchHistory:[{
      type:Schema.Types.ObjectId,
      ref:"Picture"
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