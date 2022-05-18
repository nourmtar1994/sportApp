export const getDate = (MyDate) => {
  var theDate = new Date(MyDate);

  var addZero = (item) => (item < 9 ? "0" + item : item);
  var date =
    theDate.getFullYear() +
    "-" +
    addZero(theDate.getMonth() + 1) +
    "-" +
    addZero(theDate.getDate());
  var time =
    theDate.getHours() +
    ":" +
    theDate.getMinutes() +
    ":" +
    theDate.getSeconds();

  return date;
};
