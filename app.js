const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user.js');

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	User.findById('6602bfd45fd4bf6e08f6bc8e')
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => console.log(err));
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.MONGO_URI)
	.then(result => {
		console.log('MongooDB connected Successfully!');
		User.findOne().then(user => {
			if (!user) {
				const user = new User({
					name: 'sam',
					email: 'sam31@xyz.com',
					cart: {
						items: []
					}
				});
				user.save();
			}
		})
		app.listen(3000);
	}).catch(err => console.log(err));