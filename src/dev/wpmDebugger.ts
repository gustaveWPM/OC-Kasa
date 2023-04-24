const LABEL_PREFIX = 'Kasa App: ';
const IGNORE_ERRORS = false;
const IGNORE_WARNINGS = true;
const IGNORE_INFOS = false;

enum ErrorCode {
  IS_ERROR = 2,
  IS_WARNING = 1,
  IS_INFO = 0
}

export type ErrorCodeKey = keyof typeof ErrorCode;

export interface WpmDebuggerOptions {
  debugMode?: boolean;
  errorCodeKey: ErrorCodeKey;
}

export const DEV_CTX: boolean = import.meta.env.DEV;

export function wpmDebugger(label: string, msg: string | any[], options: WpmDebuggerOptions = { debugMode: DEV_CTX, errorCodeKey: 'IS_INFO' }) {
  function skipCurrentDebuggerCall(): boolean {
    // if (import.meta.env.PROD || options.debugMode === false) {
    //   return true;
    // }
    if (options.errorCodeKey === 'IS_INFO' && IGNORE_INFOS) {
      return true;
    } else if (options.errorCodeKey === 'IS_WARNING' && IGNORE_WARNINGS) {
      return true;
    } else if (options.errorCodeKey === 'IS_ERROR' && IGNORE_ERRORS) {
      return true;
    }
    return false;
  }

  if (skipCurrentDebuggerCall()) {
    return;
  }

  function getCtx(dumpCtx: boolean = false) {
    let ctx: string = '';
    if (options.errorCodeKey === 'IS_INFO') {
      ctx = 'DEBUG_INFO';
    } else if (options.errorCodeKey === 'IS_WARNING') {
      ctx = 'DEBUG_WARNING';
    } else if (options.errorCodeKey === 'IS_ERROR') {
      ctx = 'DEBUG_ERROR';
    }
    if (dumpCtx) {
      ctx = `${ctx}_WITH_DUMP`;
    }
    return ctx;
  }

  const processLog = (generatedLogMsg: string, errorCodeKey: ErrorCodeKey) =>
    ErrorCode[errorCodeKey] ? console.error(generatedLogMsg) : console.log(generatedLogMsg);
  const prefixedLabel = LABEL_PREFIX + label;
  if (Array.isArray(msg)) {
    const processDump = (msg: any[], errorCodeKey: ErrorCodeKey) => msg.forEach((objDump) => processLog(objDump, errorCodeKey));
    const ctx = getCtx(true);
    const generatedLogMsg = `<${ctx} label="${prefixedLabel}">`;
    processLog(generatedLogMsg, options.errorCodeKey);
    processDump(msg, options.errorCodeKey);
    const endOfDumpLogMsg = `</${ctx}>`;
    processLog(endOfDumpLogMsg, options.errorCodeKey);
  } else {
    const ctx = getCtx();
    const generatedLogMsg = `<${ctx}\n\tlabel="${prefixedLabel}"\n\tmsg="${msg}"\n/>`;
    processLog(generatedLogMsg, options.errorCodeKey);
  }
}

export default wpmDebugger;
