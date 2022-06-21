const mongoose = require('mongoose');
/*const Employee = mongoose.model('Employee', {
    title: { type: String },
    description: { type: String },
    published: { type: Boolean }
});
*/
var schema = mongoose.Schema(
    {
        title: String,
        description: String,
        published: Boolean
    },
    { timestamps: true }
);
schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const Employee = mongoose.model("Employee", schema);
module.exports = Employee;