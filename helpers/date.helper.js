var DateHelper = function(){

    function pad(s) { 
        return (s < 10) ? '0' + s : s; 
    }

    function _convertDate(inputFormat) {
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    }

    return{
        convertDate: _convertDate
    }

}();

module.exports = DateHelper;