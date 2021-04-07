/**
 * @license
 * Copyright 2021 yukiya383
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The type representing the value used for typechecking in Blockly.
 */
export type Types = string|readonly string[]|null;

type ArgFieldCommon = {
  name: string
  colour?: string
};

/**
 * Type for checkbox field added to args property.
 */
export type ArgFieldCheckbox = ArgFieldCommon & {
  type: "field_checkbox"
  checked?: boolean
};
/**
 * Type for dropdown field added to args property.
 */
export type ArgFieldDropdown = ArgFieldCommon & {
  type: "field_dropdown"
  options: Array<[string,string]>
};
/**
 * Type for number field added to args property.
 */
export type ArgFieldNumber = ArgFieldCommon & {
  type: "field_number";
  value?: number;
  min?: number;
  max?: number;
  precision?: number;
}
/**
 * Type for text input field added to args property.
 */
export type ArgFieldInput = ArgFieldCommon & {
  type: "field_input"
  text: string
};
/**
 * Type for variable field added to args property.
 */
export type ArgFieldVariable = ArgFieldCommon & {
  "type": "field_variable"
  "name": string
  "variable": string
  "variableTypes": Types
  "defaultType": string
};
/**
 * Type for any field added to args property.
 * Fields below does not have proper type yet:
 * - "field_angle"
 * - "field_colour"
 * - "field_date"
 * - "field_image"
 * - "field_label"
 */
export type ArgField = ArgFieldCheckbox| ArgFieldDropdown | ArgFieldNumber | ArgFieldInput | ArgFieldVariable | (ArgFieldCommon&{
  type:  "field_colour" | "field_angle" | "field_date" | "field_label" | "field_image"
});

/**
 * Type for any input added to args property.
 */
export type ArgInput = {
  type: "input_value"|"input_statement"|"input_dummy"
  name: string
  check?: string|readonly string[]
};

/**
 * Type for value input added to args property.
 */
export type ArgInputField = ArgInput & { type:"input_value" };
/**
 * Type for statement input added to args property.
 */
export type ArgInputStatement = ArgInput & { type:"input_statement" };
/**
 * Type for dummy input added to args property.
 */
export type ArgInputDummy = ArgInput & {type:"input_dummy"}

/**
 * Type for any argument added to args property.
 */
export type ArgType = ArgField | ArgInput;

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

/**
 * The type of JSON object to define a new block with output.
 */
export type BlockJsonValue = {
  output: Types;
} & BlockJsonBase;

/**
 * The type of JSON object to define a new block without output.
 */
export type BlockJsonStatement = {
  nextStatement?: Types;
  previousStatement?: Types;
} & BlockJsonBase;

/**
 * The type of JSON object to define a new block.
 * You cannot add both output and previousStatement.
 */
export type BlockJson = BlockJsonValue | BlockJsonStatement;

import Blockly, { WorkspaceSvg } from "blockly";

/**
 * The type of code generator function for a new block with output.
 */
export type BlockWithOutputCodeGen = (block: Blockly.Block) => [string,number];
/**
 * The type of code generator function for a new block without output.
 */
export type BlockWithoutOutputCodeGen = (block: Blockly.Block) => string;
/**
 * The type of code generator function for any new block.
 */
export type BlockCodeGen = BlockWithOutputCodeGen | BlockWithoutOutputCodeGen;

/**
 * Type for mixin object for mutators.
 */
export type MutatorMixinObject = {
  mutationToDom: ()=>Element;
  domToMutation: (xmlElement:Element)=>void;
  decompose?: (workspace:WorkspaceSvg)=>Blockly.Block;
  compose?: (topBlock:Blockly.Block)=>void;
  saveConnections?: (containerBlock:Blockly.Block)=>void;
};
