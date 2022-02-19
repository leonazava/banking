const { exec } = require("child_process");

describe("operations processing", () => {
  // test("ceil", async () => {
  // exec("node index.js tests/testData/ceil.json", function (err, stdout) {
  //   if (err) {
  //     return err;
  //   }
  //   expect(stdout).toBe("0.04\n0.01\n0.02\n");

  test("cash in, 0.03 per operation, no more than 5", (done) => {
    exec("node index.js tests/testData/cashIn.json", function (err, stdout) {
      if (err) {
        return err;
      }
      try {
        expect(stdout).toBe("0.06\n3.00\n5.00\n");
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test("cash out juridical, 0.3 per operation, no less than 0.5", (done) => {
    exec("node index.js tests/testData/cashOut.json", function (err, stdout) {
      if (err) {
        done(err);
      }
      try {
        expect(stdout).toBe("0.50\n0.50\n0.50\n1.20\n0.75\n0.50\n2.71\n");
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test("cash out natural, 0.3 per operation, free 1000 per week - new week buffer reset", (done) => {
    exec(
      "node index.js tests/testData/cashOutNatural.json",
      function (err, stdout) {
        if (err) {
          done(err);
        }
        try {
          expect(stdout).toBe("0.00\n0.60\n0.00\n0.00\n1.65\n");
          done();
        } catch (error) {
          done(error);
        }
      }
    );
  });

  test("cash out natural, 0.3 per operation, free 1000 per week - new year", (done) => {
    exec(
      "node index.js tests/testData/cashOutNewYear.json",
      function (err, stdout) {
        if (err) {
          done(err);
        }
        try {
          expect(stdout).toBe("0.00\n0.60\n0.00\n0.00\n");
          done();
        } catch (error) {
          done(error);
        }
      }
    );
  });

  test("cash out natural - multiple users", (done) => {
    exec(
      "node index.js tests/testData/cashOutNaturalMultipleUsers.json",
      function (err, stdout) {
        if (err) {
          done(err);
        }
        try {
          expect(stdout).toBe("0.60\n0.00\n0.00\n12.00\n30.00\n0.01\n");
          done();
        } catch (error) {
          done(error);
        }
      }
    );
  });
});
