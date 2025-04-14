/**
 * This file is auto-generated by the command "morph build" at 2025-04-14T11:33:21.861Z
 * Please do not modify it manually.
 */
import { ConnectorBundle } from "@runmorph/cdk";

import connector from "./connector";
import GenericUserMapper from "./resources/genericUser/mapper";
import GenericUserOperationList from "./resources/genericUser/list";
import GenericUserOperationRetrieve from "./resources/genericUser/retrieve";
import TelephonyCallMapper from "./resources/telephonyCall/mapper";
import TelephonyCallOperationList from "./resources/telephonyCall/list";
import TelephonyCallOperationRetrieve from "./resources/telephonyCall/retrieve";
import TelephonyCallTranscriptMapper from "./resources/telephonyCallTranscript/mapper";
import TelephonyCallTranscriptOperationRetrieve from "./resources/telephonyCallTranscript/retrieve";
import WebhookGlobalMapper from "./webhooks/global/mapper";
import WebhookGlobalSubscribe from "./webhooks/global/subscribe";
import WebhookGlobalUnsubscribe from "./webhooks/global/unsubscribe";

const resourceModelOperations = {
  genericUser: {
  list: GenericUserOperationList,
  mapper: GenericUserMapper,
  retrieve: GenericUserOperationRetrieve,
},
  telephonyCall: {
  list: TelephonyCallOperationList,
  mapper: TelephonyCallMapper,
  retrieve: TelephonyCallOperationRetrieve,
},
  telephonyCallTranscript: {
  mapper: TelephonyCallTranscriptMapper,
  retrieve: TelephonyCallTranscriptOperationRetrieve,
},
};


const webhookOperations = {
  global: {// eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapper: WebhookGlobalMapper as any, // CLI to refactor
  subscribe: WebhookGlobalSubscribe,
  unsubscribe: WebhookGlobalUnsubscribe,
},
};



const connectorBundle = new ConnectorBundle({
  connector,
  resourceModelOperations,
  webhookOperations,
}).init;

export default connectorBundle;
