const Cart = require("../models/cart.module.js");


//ADD ITEM TO CART 
exports.addToCart = (req, res) => {
    Cart.findOne({ userId: req.user.id }, (err, cart) => {
        if (err) { res.status(400).send(err) }
        if (cart) {
            const item = cart.items.find(elem => elem.productId == req.body.items.productId)
            if (item) {
                Cart.findOneAndUpdate({ "userId": req.user.id, "items.productId": req.body.items.productId }, {
                    "$set": {
                        "items.$": {
                            ...req.body.items,
                            quantity: item.quantity + 1
                        },
                        totalCount: req.body.totalCount,
                        totalPrice: req.body.totalPrice
                    }
                }, (err, _cart) => {
                    if (err) { res.status(400).send(err) };
                    if (_cart) { res.status(200).send(_cart) }
                })
            } else {
                Cart.findOneAndUpdate({ userId: req.user.id }, {
                    "$push": {
                        "items": [req.body.items]
                    }
                }, (err, _cart) => {
                    if (err) { res.status(400).send(err) };
                    if (_cart) { res.status(200).send(_cart) }
                })
            }
        } else {
            const cart = new Cart({
                items: [req.body.items],
                userId: req.user.id,
                // totalCount: req.body.totalCount,
                // totalPrice: req.body.totalPrice
            })
            cart.save().then((cart) => {
                res.status(200).send(cart);
            }).catch((err) => {
                res.status(400).send(err)
            })
        }
    }
    )
}


//Change QUANTITY OF PRODUCT IN CART
//check stock..
exports.increaseQuantity = (req, res) => {
    Cart.findOneAndUpdate({ "_id": req.params.cartId }, {
        $inc: { "items.$[element].quantity": 1 }
    },
        {
            arrayFilters: [{ "element.productId": req.params.productId }],
            new: true
        }, (err, cart) => {
            if (err) res.status(403).send(err);
            res.send(cart);
        })
}

exports.decreaseQuantity = (req, res) => {
    Cart.findOneAndUpdate({ "_id": req.params.cartId }, {
        $inc: { "items.$[element].quantity": -1 }
    },
        {
            arrayFilters: [{ "element.productId": req.params.productId }],
            new: true
        }, (err, cart) => {
            if (err) res.status(403).send(err);
            res.send(cart);
        })
}


//GET CART ITEMS FOR USER
exports.getCartItems = (req, res) => {
    Cart.find({ userId: req.user.id }, function (err, cart) {
        if (err) res.status(400).send(err);
        res.status(200).send(cart);
    });

};


//REMOVE ITEM FORM CART
exports.deleteItemFromCart = (req, res) => {
    // console.log(req.user.id, req.params.productId)
    Cart.find({ userId: req.user.id }, (err, cart) => {
        if (err) { res.status(400).send(err) }
        if (cart) {
            // console.log(cart)
            const item = cart[0].items.find(elem => elem.productId == req.params.productId)
            if (item) {
                console.log(item, req.params.cartId, req.params.productId)
                Cart.updateMany({ _id: req.params.cartId }, {
                    $pull:
                        { items: { productId: req.params.productId } }
                }, (err, _cart) => {
                    if (_cart) { res.status(200).send(_cart) }
                    if (err) { res.status(400).send(err) };
                })

            } else {
                res.status(401).send("you don't have this product")
            }
        } else {
            res.status(402).send("you don't have Cart")
        }
    })
}


//DELETE CARTS
exports.removeCart = (req, res) => {
    Cart.findByIdAndDelete(req.params.cartId, (err, cart) => {
        if (err) { res.status(400).send(err) }
        if (cart) { res.status(200).send([cart, "cart is deleted successfully..."]) }
    })
}


//GET CART BY USER ID
exports.getCart = (req, res) => {
    Cart.find({ userId: req.user.id }, function (err, cart) {
        if (err) res.status(400).send(err);
        res.status(200).send(cart);
    }).populate("items.productId");
    // Cart.findOne({ userId: req.user.id }, (err, cart) => {
    //     if (err) { res.status(400).send(err) }
    //     if (cart) { res.status(200).send(cart) }
    // })
}







