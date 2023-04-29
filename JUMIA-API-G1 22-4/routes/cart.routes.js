const cart = require("../controller/cart.controller.js");
const verify =require("../controller/verifyTokenapi.controller.js");
const router = require("express").Router();


//with verify
router.post("/addToCart", verify.verifyToken, cart.addToCart);
router.get("/", verify.verifyToken, cart.getCartItems);
router.get("/userCart", verify.verifyToken, cart.getCart);
router.put("/increaseQuantity/:cartId/:productId", verify.verifyToken, cart.increaseQuantity);
router.put("/decreaseQuantity/:cartId/:productId", verify.verifyToken, cart.decreaseQuantity);
router.delete("/:cartId/:productId", verify.verifyToken, cart.deleteItemFromCart);
router.delete("/deleteCart/:cartId", cart.removeCart);

//without verify
// router.post("/addToCart", cart.addToCart);
// router.get("/all", cart.getCartItems);
// router.get("/:id", cart.getCart);
// router.put("/changeQuantity/:cartId/:productId", cart.changeQuantity);
// router.delete("/:productId", cart.deleteItemFromCart);
// router.delete("/deleteCart/:cartId", cart.removeCart);




module.exports = router; 