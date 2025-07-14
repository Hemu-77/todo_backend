import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  completed: {
    type: Boolean,
    default: false,
    enum : [true,false]
  },
  taskTime : {
     type: String,
     required : true
  },
  reminderTime: {
    type: String, // you can store "14:30" or "08:00 PM"
    required: true,
    validate: {
        validator: function (v) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // 24-hour format
        },
        message: props => `${props.value} is not a valid time! Format must be HH:MM`
      }
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // link to user
    required: true,
  }
}, { timestamps: true });

export const TodoModel = mongoose.model("Todo", todoSchema);
