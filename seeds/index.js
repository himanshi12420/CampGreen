const mongoose = require('mongoose');
const Campground = require('../models/campgrounds');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

//const app = express();

mongoose.connect('mongodb://localhost:27017/yelpCamp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connection on!")
    })
    .catch(e => {
        console.log('Oh no error!');
        console.log(e);
    });

mongoose.set('useFindAndModify', false);

const sample = (arr => {
    return arr[Math.floor(Math.random() * arr.length)];
})

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 5;
        const camp = new Campground({
            author: '607ad1348991db0c946f667f',
            location: `${cities[rand1000].city}, ${cities[rand1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [cities[rand1000].longitude, cities[rand1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvuts8e73/image/upload/v1618817151/YelpCamp/a8blgtpwk5evowljhj7l.jpg',
                    filename: 'YelpCamp/a8blgtpwk5evowljhj7l'
                },
                {
                    url: 'https://res.cloudinary.com/dvuts8e73/image/upload/v1618817154/YelpCamp/kmz4phvocviwq2h5gc7k.jpg',
                    filename: 'YelpCamp/kmz4phvocviwq2h5gc7k'
                }
            ]
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})