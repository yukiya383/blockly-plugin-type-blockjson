## What's this?
[Blockly official guide](https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#json_format_versus_javascript_api) says:
> The JSON format is the preferred method of defining blocks.

This plugin provides type declaration for below kind of JSON data defined in .ts file:
- Block definition

## Installation
<!--
1. Make sure you've installed typescript.
2. `npm install blockly-plugin-type-blockJSON`.
-->
Please wait for a while, I'm working to upload it to npm.
## Usage
```typescript
import {BlockJson} from 'blockly-plugin-type-blockJSON';

const sampleBlock:BlockJson = {
    type:"SampleBlock",...
}
```
