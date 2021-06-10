const __internalLogger = window[Symbol.for(__main_logger_private_access_key)];

const err = function (e) {
  const message = e && e.message;
  const name = e && e.name;
  const additionalInfo = Array.from(arguments).slice(1);

  let data = [];
  if(__internalLogger.level === 4) {
    additionalInfo.length && additionalInfo.push('\n\n')
    data = additionalInfo.concat(e.stack);
  } else {
    data = Array.prototype.concat.apply([name + ':', message + '.', '\n'], additionalInfo);
  }

  __internalLogger.__INTERNAL_LOGGER({
    data,
    type: 'error',
    forceLog: false
  });
};

export function GetStyleString(/* styles */) {
  let result = '';
  
  switch (arguments.length) {
    case 0: throw SyntaxError("An argument for 'styles' was not providad");

    case 1:
      const styles = arguments[0];

      if(styles.length) {
        result += GetStyleString.apply(null, styles);
      }
    break;

    default:
      const styleList = Array.from(arguments);
      console.log(styleList)
      
      for (const style of styleList) {
        try {
          result += GetStyleString(style);
        } catch (e) {
          err(e);
        }
      }
    break;
  }

  return result;
}