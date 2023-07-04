const reportsReducer = require('./reports.reducer')

describe("Testing the reports reducer", () => {
  test('should have the correct initial state of no reports', () => {
    let action = {};
    let returnedState = reportsReducer(undefined, action);
    expect(returnedState).toEqual([]);
  });

  test('should have the correct state of showing all of the reports', () => {
    let action = { type: "SET_REPORTS" };
    let returnedState = reportsReducer(undefined, action);
    expect(returnedState).toEqual(action.payload);
  });
});
