export type Types = string|readonly string[]|null;

export type ArgFieldCommon = {
  name: string
  colour?: string
};

export type ArgFieldCheckbox = ArgFieldCommon & {
  type: "field_checkbox"
  checked?: boolean
};
export type ArgFieldDropdown = ArgFieldCommon & {
  type: "field_dropdown"
  options: Array<[string,string]>
};
export type ArgFieldNumber = ArgFieldCommon & {
  type: "field_number";
  value?: number;
  min?: number;
  max?: number;
  precision?: number;
}
export type ArgFieldInput = ArgFieldCommon & {
  type: "field_input"
  text: string
};
export type ArgFieldVariable = ArgFieldCommon & {
  "type": "field_variable"
  "name": string
  "variable": string
  "variableTypes": Types
  "defaultType": string
};
export type ArgField = ArgFieldCheckbox| ArgFieldDropdown | ArgFieldNumber | ArgFieldInput | ArgFieldVariable | (ArgFieldCommon&{
  type:  "field_colour" | "field_angle" | "field_date" | "field_label" | "field_image"
});

export type ArgInput = {
  type: "input_value"|"input_statement"|"input_dummy"
  name: string
  check?: string|readonly string[]
};

export type ArgInputField = ArgInput & { type:"input_value" };
export type ArgInputStatement = ArgInput & { type:"input_statement" };
export type ArgInputDummy = ArgInput & {type:"input_dummy"}

export type ArgType = ArgField | ArgInput;

import Blockly, { WorkspaceSvg } from "blockly";

type Index = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Message = `message${Index}`;
type Args = `args${Index}`;
type LastDummyAlign = `lastDummyAlign${Index}`;
type LastDummyAlignValue = "LEFT"|"CENTER"|"RIGHT";

type BlockJsonMessage = {
  [message in Message]?: string;
}
type BlockJsonArgs = {
  [args in Args]?: ArgType[];
}
type BlockJsonLastDummyAlign = {
  [args in LastDummyAlign]?: LastDummyAlignValue;
}

type BlockJsonBase = {
  type: string;
  inputsInline?: boolean;
  helpUrl?: string;
  style?: string;
  colour?: string;
  tooltip?: string;
  extensions?: string[];
  mutator?: string;
} & BlockJsonMessage & BlockJsonArgs & BlockJsonLastDummyAlign;

export type BlockJsonValue = BlockJsonBase & {
  output: Types;
};

export type BlockJsonStatement = BlockJsonBase & {
  nextStatement?: Types;
  previousStatement?: Types;
};

export type BlockJson = BlockJsonValue | BlockJsonStatement;

export type BlockWithOutputCodeGen = (block: Blockly.Block) => [string,number];
export type BlockWithoutOutputCodeGen = (block: Blockly.Block) => string;
export type BlockCodeGen = BlockWithOutputCodeGen | BlockWithoutOutputCodeGen;

export type Mutator = {
  mutationToDom: ()=>Element;
  domToMutation: (xmlElement:Element)=>void;
  decompose?: (workspace:WorkspaceSvg)=>Blockly.Block;
  compose?: (topBlock:Blockly.Block)=>void;
  saveConnections?: (containerBlock:Blockly.Block)=>void;
};
