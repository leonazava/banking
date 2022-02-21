/* eslint-disable no-console */
/* eslint-disable default-case */
/* eslint-disable camelcase */
const { DateTime } = require('luxon');
const ceil = require('./ceil');

function processData(input) {
  const users = {};
  const rates = { cash_in: 0.03, cash_out: 0.3 };
  const weeklyBuffer = 1000;

  // the calculated fee without conditions applied
  let initialEstimate = 0;
  // the final fee with all the required filters passed
  let comission = 0;

  input.forEach((el) => {
    const {
      operation: { amount },
      user_id,
      user_type,
      type,
    } = el;

    // parse the transaction's date to an operable forma
    const date = DateTime.fromISO(el.date);

    // process the operation
    switch (type) {
      case 'cash_in':
        initialEstimate = amount * (rates[type] / 100);
        comission = initialEstimate > 5 ? 5 : initialEstimate;
        break;
      case 'cash_out':
        switch (user_type) {
          case 'natural':
            // check if the transaction happens on a week different that the previous transaction. if it does, reset the buffer
            // and create a user registry if it doesn't exist yet
            date.weekNumber !== users[user_id]?.date.weekNumber  
            && (users[user_id] = { date, weeklyBuffer });
            // apply yhe buffer and calculate the fee
            initialEstimate = (amount - users[user_id].weeklyBuffer) * (rates[type] / 100);
            // update the buffer value based on how much of it was exhausted
            users[user_id].weeklyBuffer = users[user_id].weeklyBuffer - amount < 0
              ? 0
              : users[user_id].weeklyBuffer - amount;
            comission = initialEstimate < 0 ? 0 : initialEstimate;
            break;
          case 'juridical':
            initialEstimate = amount * (rates[type] / 100);
            comission = initialEstimate < 0.5 ? 0.5 : initialEstimate;
            break;
        }
    }
    // output the ceiled result to console
    console.log(ceil(comission));
  });
}

module.exports = processData;
