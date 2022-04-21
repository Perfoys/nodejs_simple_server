const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const aboutRoutes = require('./routes/about');
const cartRoutes = require('./routes/cart');
const User = require('./models/user');

const app = express();

app.engine('hbs', exphbs({
  handlebars: allowInsecurePrototypeAccess(handlebars),
  defaultLayout: 'main',
  extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use((req, res, next) => {
  try {
    const user = await User.findById('');
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/about', aboutRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    const password = "SADlkJa7vrDTUQfD";
    const url = `mongodb+srv://admin1ilay:${password}@cluster0.y7p0i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    await mongoose.connect(url, {
      useNewUrlParser: true, 
      //useFindAndModify: false
    });
    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: 'defaultemail@email.com',
        name: 'Default name',
        cart: { items: [] }
      });
      await user.save();
    }
    app.listen(3000, () => {
      console.log(`Server is running on port ${PORT}`)
    });
  } catch (error) {
    console.log(error);
  }
};

start();

