/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
const { exec } = require('child_process');
const ceil = require('../ceil');

describe('operations processing', () => {
  test('ceil', () => {
    expect(ceil(0.0100001)).toBe('0.02');
    expect(ceil(1.005)).toBe('1.01');
    expect(ceil(0.999999)).toBe('1.00');
  });

  test('cash in, 0.03 per operation, no more than 5', (done) => {
    exec('node index.js tests/testData/cashIn.json', (err, stdout) => {
      if (err) {
        return done(err);
      }
      try {
        expect(stdout).toBe('0.06\n3.00\n5.00\n');
        return done();
      } catch (error) {
        return done(error);
      }
    });
  });

  test('cash out juridical, 0.3 per operation, no less than 0.5', (done) => {
    exec('node index.js tests/testData/cashOut.json', (err, stdout) => {
      if (err) {
        return done(err);
      }
      try {
        expect(stdout).toBe('0.50\n0.50\n0.50\n1.20\n0.75\n0.50\n2.71\n');
        return done();
      } catch (error) {
        return done(error);
      }
    });
  });

  test('cash out natural, 0.3 per operation, free 1000 per week - new week buffer reset', (done) => {
    exec(
      'node index.js tests/testData/cashOutNatural.json',
      (err, stdout) => {
        if (err) {
          return done(err);
        }
        try {
          expect(stdout).toBe('0.00\n0.60\n0.00\n0.00\n1.65\n');
          return done();
        } catch (error) {
          return done(error);
        }
      }
    );
  });

  test('cash out natural, 0.3 per operation, free 1000 per week - new year', (done) => {
    exec(
      'node index.js tests/testData/cashOutNewYear.json',
      (err, stdout) => {
        if (err) {
          return done(err);
        }
        try {
          expect(stdout).toBe('0.00\n0.60\n0.00\n0.00\n');
          return done();
        } catch (error) {
          return done(error);
        }
      }
    );
  });

  test('cash out natural - multiple users', (done) => {
    exec(
      'node index.js tests/testData/cashOutNaturalMultipleUsers.json',
      (err, stdout) => {
        if (err) {
          return done(err);
        }
        try {
          expect(stdout).toBe('0.60\n0.00\n0.00\n12.00\n30.00\n0.01\n');
          return done();
        } catch (error) {
          return done(error);
        }
      }
    );
  });
});
