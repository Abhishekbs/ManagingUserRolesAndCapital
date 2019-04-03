
var db = require('../dbCreator')

exports.addUser = () => {
    var collection = db.get().collection('User');
    collection.insertOne({ name: 'taco', tasty: true }, function (err, result) {

        collection.find({ name: 'taco' }).toArray(function (err, docs) {
            console.log(docs[0])
            return docs;
            // db.close()
        })

    })
}