// Suppress console warnings and errors in Jest
const noop = () => {}; // No-op function

global.console = {
  ...console,
  warn: noop, // Ignore all warnings
  error: noop, // Ignore all errors
};
