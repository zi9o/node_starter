const okObject = {
  message: () => "Ok",
  pass: true,
};

expect.extend({
  toBeTypeOrNull(received, argument) {
    if (received === null) {
      return okObject;
    } else {
      try {
        expect(received).toEqual(expect.any(argument));
        return okObject;
      } catch (e) {
        return {
          message: () => `Expected ${received} to be ${argument} type or null`,
          pass: false,
        };
      }
    }
  },
  toBeObjectContainingOrNull(received, argument) {
    if (received === null) {
      return okObject;
    } else {
      try {
        expect(received).toEqual(expect.objectContaining(argument));
        return okObject;
      } catch (e) {
        return {
          message: () => `Expected ${received} to be ${argument} type or null`,
          pass: false,
        };
      }
    }
  },
});
