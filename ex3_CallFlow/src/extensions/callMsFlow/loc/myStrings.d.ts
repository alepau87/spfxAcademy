declare interface ICallMsFlowCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'CallMsFlowCommandSetStrings' {
  const strings: ICallMsFlowCommandSetStrings;
  export = strings;
}
