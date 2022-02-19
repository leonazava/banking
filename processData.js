const { DateTime } = require("luxon");
const ceil = require("./ceil");

function processData(input) {
  let users = [];
  let rates = { cash_in: 0.03, cash_out: 0.3 };
  // the calculated fee without conditions applied
  let initialEstimate = 0;
  // the final fee with all the required filters passed
  let comission = 0;

  input.forEach((el) => {
    let {
      operation: { amount },
      user_id,
      user_type,
    } = el;

    // parse the transaction's date
    let date = DateTime.fromISO(el.date);

    // special conditions for the users of type natural
    if (user_type == "natural") {
      // create a new buffer+date pool for each new encountered uid of type natural
      // reset the buffer on a new week
      // reset the week number on a new year
      if (
        !users[user_id] ||
        date.weekNumber > users[user_id].date.weekNumber ||
        date.weekYear !== users[user_id].date.weekYear
      ) {
        users[user_id] = { buffer: 1000, date: date };
      }
    }

    // process the operation
    switch (el.type) {
      case "cash_in":
        initialEstimate = amount * (rates[el.type] / 100);
        comission = initialEstimate > 5 ? 5 : initialEstimate;
        break;
      case "cash_out":
        switch (el.user_type) {
          case "natural":
            initialEstimate =
              (amount - users[user_id].buffer) * (rates[el.type] / 100);
            users[user_id].buffer =
              users[user_id].buffer - amount < 0
                ? 0
                : users[user_id].buffer - amount;
            comission = initialEstimate < 0 ? 0 : initialEstimate;
            break;
          case "juridical":
            initialEstimate = amount * (rates[el.type] / 100);
            comission = initialEstimate < 0.5 ? 0.5 : initialEstimate;
            break;
        }
    }
    // output the ceiled result to console
    console.log(ceil(comission));
  });
}

module.exports = processData;
