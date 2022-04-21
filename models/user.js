const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        courseId: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (course) {
  const currentItems = [...this.cart.items];
  const index = currentItems.findIndex((item) => {
    return item.courseId.toString() === course._id.toString();
  });
  if (index >= 0) {
    currentItems[index].count = currentItems[index].count + 1;
  } else {
    currentItems.push({
      courseId: course._id,
      count: 1,
    });
  }
  this.cart = { items: currentItems };
  return this.save();
};

module.exports = model("User", userSchema);
