var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    image: String,
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
});

UserSchema.virtual('initials').get(function() {
    var names = this.name.split(" ");
    
    if(names.length > 0){
        var firstNameLetter = names[0].substring(0,1);
        var lastNameLetter = (names.length > 1) ? names[names.length-1].substring(0,1) : '';
        
        return firstNameLetter + lastNameLetter;
    }else{
        return '';
    }
});

UserSchema.set('toObject', {
    getters: true
});

module.exports = mongoose.model('User', UserSchema);