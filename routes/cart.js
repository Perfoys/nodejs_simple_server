const { Router } = require("express");
const Course = require("../models/course");
const router = Router();

router.post("/add", async (req, res) => {
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course);
  res.redirect("/cart");
});

router.get("/", async (req, res) => {
  const cart = await Cart.fetch();
  res.render("cart", {
    isCart: true,
    title: "Cart",
    courses: cart.courses,
    price: cart.price,
  });
});

router.delete("/remove/:id", async (req, res) => {
  const cart = await Cart.delete(req.params.id);
  res.status(200).json(cart);
});

module.exports = router;
