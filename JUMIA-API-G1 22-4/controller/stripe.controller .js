
const stripe= require ('stripe')
('sk_test_51MwpKwL91jneEfqmk6R2IeUS8KGS2G2MionnP7aU8R5Ld4UjRmt6ZA1UdsUurl7Rem00zg10wwxe7ciUxLSX3y9v00dXSIpYcD')


exports.createPayment = async(req, res)=>{
    
    // console.log(req.body.token)
    // console.log(req.body.amount)
    // billingDetails=req.body.billing_details.address;
    // console.log(req.body.source.address_city);
try{
token=req.body.token;
amount=req.body.amount;

const customer= stripe.customers.create({
    email:token.email
    ,source:token.id
})
.then((customer)=>{
    console.log('customer');
    // console.log(customer);
    return stripe.charges.create({
        amount:amount,
        description:'prd descirption', 
        currency:"USD",
        customer:customer.id,
        

    });
}).then((charge)=>{
        console.log(charge);
        res.json({
            data:'success'
        });
    }).catch((err)=>{
        console.log('fail');

        res.json({
            data:'failure'
        })
    })
    return true;
}catch (eror){

    return false
}

}    





// exports.createPayment = async(req, res)=>{
//     // console.log(req.body.items)
//     try {
//         const session = await stripe.checkout.session.create({
//             line_items: req.body.items.map((item)=>({
//                 price_data:{
//                     currency:'usd',
//                     product_data:{
//                         name:item.name,
//                         images:[item.product]
//                     },
//                     unit_amount:item.price*100,
                    
//                 },
//                 quantity:item.quantity
//             })),
            
//             mode :"payment",
//             // success_url:`http://localhost:${process.env.PORT}/success.html`,
//             success_url:`http://localhost:3030/success.html`,
//             cancel_url:`http://localhost:${process.env.PORT}/cancel.html`,
            
//         });
//         return res.status(200).json(session);
//         // console.log('succes');
//     }catch(error){
//        return(error);
//     }

// }


// const calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };
// exports.createPayment = async(req, res)=>{  



// app.post("/create-payment-intent", async (req, res) => {
// exports.createPayment = async(req, res)=>{  
// const { items } = req.body;


  // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "usd",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// };








// exports.createPayment = async(req, res)=>{
//     console.log(req.body.token)
//     try {
//         const session = await stripe.checkout.session.create({
//             line_items: req.body.items.map((item)=>({
//                 price_data:{
//                     currency:'EGP',
//                     product_data:{
//                         name:item.name,
//                         images:[item.product]
//                     },
//                     unit_amount:item.price*100,
                    
//                 },
//                 quantity:item.quantity
//             })),
//             mode :"payment",
//             success_url:`http://localhost:${process.env.PORT}/success.html`,
//             cancel_url:`http://localhost:${process.env.PORT}/cancel.html`,
            
//         });
//         res.status(200).JSON(session);
//     }catch(error){
//        return false
//     }

// }




// exports.createPayment = async(req, res)=>{
//     console.log(req.body.token)
//     try {
//         const session = await stripe.checkout.session.create({
//             line_items: req.body.items.map((item)=>({
//                 price_data:{
//                     currency:'EGP',
//                     product_data:{
//                         name:item.name,
//                         images:[item.product]
//                     },
//                     unit_amount:item.price*100,
                    
//                 },
//                 quantity:item.quantity
//             })),
//             mode :"payment",
//             success_url:`http://localhost:${process.env.PORT}/success.html`,
//             cancel_url:`http://localhost:${process.env.PORT}/cancel.html`,
            
//         });
//         res.status(200).JSON(session);
//     }catch(error){
//        return false
//     }

// }











// const paypalService = require('../services/paypal.service.js');
// const paypal = require('paypal-rest-sdk');




// exports.createPayment = (req, res) => {
//     console.log(req.body)
//     const products = JSON.parse(req.body.orderItems);
//     // currency = req.body.currency;
//     total = req.body.totalPrice;
//     // subtotal = req.body.subtotal;
//     shipping = req.body.shippingPrice;
//     tax = req.body.taxPrice;
//     //create payment object
//     const payment = {
//         "intent": "Sale",
//         "payer": {
//             "payment_method": "paypal"
//         },
//         "redirect_urls": {
//             "return_url": "http://localhost:3000/success",
//             "cancel_url": "http://localhost:3000/cancel"
//         },
//         "transactions": [{
//             "item_list": {
//                 "items": products.map((product) => {
//                     return {
//                         sku: product.prodId,
//                         currency: "USD",
//                         quantity: product.coountorder
//                     }
//                 }),
//             },
//             "amount": {
//                 "currency": "USD",
//                 "total": total,
//                 "details": {
//                 "tax": tax,
//                 "shipping": shipping
//             },},
//             "description": "This is the payment description."
//         }]
//     }
//     paypalService.createPaypalPayment(payment).then((transaction) => {
//         console.log("Create Payment Response", payment)
//         // console.log("Create Payment Response");
//         // console.log("transaction: "+ JSON.stringify(transaction));
//         // var transactionId = transaction.Id;
//         // console.log("id : " + transactionId);
//         // //NEED TO LOG ALL TRANSACTION FOR EACH REQUEST AND RESPONSE
//         // //GENERATE TRANSACTION REFERENCE NUMBER
//         // //TRANSCTION STATUS (SUCCESS, CANCELLED, FAILED, PENDING)
//         // res.redirect("/success")
//         for (let i = 0; i < transaction.links.length; i++) {
//             if (transaction.links[i].rel === 'approval_url') {
//                 // res.redirect(transaction.links[i].href)
//                 res.json({ forwardLink: transaction.links[i].href });
//                 // res.send(transaction.links[i].href)
//             }
//         }
//     }).catch((err) => {
//         console.log(JSON.stringify(error));
//         // res.redirect("/cancel");
//         // throw error;
//     })
// }



// exports.success = (req, res) => {
//     console.log(req.query.PayerID)
//     console.log(req.query.paymentId)
//     const payerId = req.query.PayerID;
//     const paymentId = req.query.paymentId
//     const executed_payment_json = {
//         "payer_id": payerId,
//         "transactions": [{
//             "amount": {
//                 "currency": "USD",
//                 "total": "10.00"
//             }
//         }]
//     }
//     paypal.payment.execute(paymentId, executed_payment_json, function (err, payment) {
//         if (err) {
//             console.log(err.response);
//         } else {
//             console.log(JSON.stringify(payment))
//             res.send(payment)
//         }
//     })

// }



// exports.cancel = (req, res) => {
//     res.send('cancelled')
// }
