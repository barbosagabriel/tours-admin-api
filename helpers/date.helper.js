var DateHelper = (function() {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }

  function _convertDate(inputFormat, withTime) {
    var d = new Date(inputFormat);
    var date = [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
      "/"
    );

    if (withTime && d.getHours() != 0) {
      date += " " + [pad(d.getHours()), pad(d.getMinutes())].join(":");
    }

    return date;
  }

  return {
    convertDate: _convertDate
  };
})();

module.exports = DateHelper;
