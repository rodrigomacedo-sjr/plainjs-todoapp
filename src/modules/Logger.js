const Logger = (function() {
  const error = function(funcName, msg = false) {
    if (!msg) {
      console.log(`ERROR [${funcName}]`);
    } else {
      console.log(`ERROR [${funcName}]: ${msg}`);
    }
  };

  return {
    error,
  };
})();

export default Logger;
