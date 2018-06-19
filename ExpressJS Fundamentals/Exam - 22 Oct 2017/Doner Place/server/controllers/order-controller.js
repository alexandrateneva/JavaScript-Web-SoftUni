const Product = require('../data/Product');
const Order = require('../data/Order');

module.exports = {
    createGet: (req, res) => {
        let id = req.params.id;

        Product.findById(id).then(product => {
            res.render('order/customize-order', product);
        })
    },
    createPost: (req, res) => {
        let productId = req.body.id;
        let toppings = [];
        for (let key in req.body) {
            if (key !== 'id') {
                toppings.push(key);
            }
        }

        let orderObj = {
            toppings: toppings,
            creator: req.user.id,
            product: productId
        }
        Order.create(orderObj).then(order => {
            res.redirect(`/order-details/${order._id}`);
        })
    },
    detailsGet: (req, res) => {
        let isAdmin = req.user && req.user.roles[0] === 'Admin';
        let id = req.params.id;

        Order.findById(id).populate('product').then(order => {
            switch (order.status) {
                case 'Pending': order.isPending = true; break;
                case 'In Progress': order.isInProgress = true; break;
                case 'In Transit': order.isInTransit = true; break;
                case 'Delivered': order.isDelivered = true; break;
            }
            res.render('order/order-details', { order: order, product: order.product, isAdmin: isAdmin });
        })
    },
    statusGet: (req, res) => {
        let userId = req.user.id;

        Order.find({}).populate('product').then(orders => {
            let ordersOfCurrentUser = orders.filter(o => o.creator == req.user.id);
            res.render('order/order-status', { orders: ordersOfCurrentUser });
        })
    },
    allOrdersGetAdmin: (req, res) => {
        let isAdmin = req.user && req.user.roles[0] === 'Admin';

        Order.find({}).populate('product').then(orders => {
            for (let order of orders) {
                switch (order.status) {
                    case 'Pending': order.isPending = true; break;
                    case 'In Progress': order.isInProgress = true; break;
                    case 'In Transit': order.isInTransit = true; break;
                    case 'Delivered': order.isDelivered = true; break;
                }
            }
            res.render('order/all-orders-admin', { orders: orders, isAdmin: isAdmin });
        })
    },
    changeStatusByAdminPost: (req, res) => {
        let orders = req.body;
        for (let orderId in orders) {
            let orderStatus = orders[orderId];

            Order.findByIdAndUpdate(orderId).then(order => {
                if (order.status !== orderStatus) {
                    order.status = orderStatus;
                    order.save();
                }
            })
        }
        res.redirect('/');
    }
}