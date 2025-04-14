/**
 * This file is auto-generated by the command "morph build" at 2025-04-14T11:33:21.222Z
 * Please do not modify it manually.
 */
import { ConnectorBundle } from "@runmorph/cdk";

import connector from "./connector";
import CrmEngagementMapper from "./resources/crmEngagement/mapper";
import CrmEngagementOperationRetrieve from "./resources/crmEngagement/retrieve";
import CrmOpportunityMapper from "./resources/crmOpportunity/mapper";
import CrmOpportunityOperationCreate from "./resources/crmOpportunity/create";
import CrmOpportunityOperationList from "./resources/crmOpportunity/list";
import CrmOpportunityOperationRetrieve from "./resources/crmOpportunity/retrieve";
import CrmOpportunityOperationUpdate from "./resources/crmOpportunity/update";
import CrmPipelineMapper from "./resources/crmPipeline/mapper";
import CrmPipelineOperationList from "./resources/crmPipeline/list";
import CrmPipelineOperationRetrieve from "./resources/crmPipeline/retrieve";
import CrmStageMapper from "./resources/crmStage/mapper";
import CrmStageOperationRetrieve from "./resources/crmStage/retrieve";
import GenericCompanyMapper from "./resources/genericCompany/mapper";
import GenericCompanyOperationList from "./resources/genericCompany/list";
import GenericCompanyOperationRetrieve from "./resources/genericCompany/retrieve";
import GenericContactMapper from "./resources/genericContact/mapper";
import GenericContactOperationCreate from "./resources/genericContact/create";
import GenericContactOperationList from "./resources/genericContact/list";
import GenericContactOperationRetrieve from "./resources/genericContact/retrieve";
import GenericContactOperationUpdate from "./resources/genericContact/update";
import GenericUserMapper from "./resources/genericUser/mapper";
import GenericUserOperationList from "./resources/genericUser/list";
import GenericUserOperationRetrieve from "./resources/genericUser/retrieve";
import GenericWorkspaceMapper from "./resources/genericWorkspace/mapper";
import GenericWorkspaceOperationRetrieve from "./resources/genericWorkspace/retrieve";
import WebhookGlobalMapper from "./webhooks/global/mapper";
import WebhookGlobalSubscribe from "./webhooks/global/subscribe";
import WebhookGlobalUnsubscribe from "./webhooks/global/unsubscribe";
import WidgetCardViewMapper from "./resources/widgetCardView/mapper";
import fieldList from "./fields/list";
import fieldMapper from "./fields/mapper";

const resourceModelOperations = {
  crmEngagement: {
  mapper: CrmEngagementMapper,
  retrieve: CrmEngagementOperationRetrieve,
},
  crmOpportunity: {
  create: CrmOpportunityOperationCreate,
  list: CrmOpportunityOperationList,
  mapper: CrmOpportunityMapper,
  retrieve: CrmOpportunityOperationRetrieve,
  update: CrmOpportunityOperationUpdate,
},
  crmPipeline: {
  list: CrmPipelineOperationList,
  mapper: CrmPipelineMapper,
  retrieve: CrmPipelineOperationRetrieve,
},
  crmStage: {
  mapper: CrmStageMapper,
  retrieve: CrmStageOperationRetrieve,
},
  genericCompany: {
  list: GenericCompanyOperationList,
  mapper: GenericCompanyMapper,
  retrieve: GenericCompanyOperationRetrieve,
},
  genericContact: {
  create: GenericContactOperationCreate,
  list: GenericContactOperationList,
  mapper: GenericContactMapper,
  retrieve: GenericContactOperationRetrieve,
  update: GenericContactOperationUpdate,
},
  genericUser: {
  list: GenericUserOperationList,
  mapper: GenericUserMapper,
  retrieve: GenericUserOperationRetrieve,
},
  genericWorkspace: {
  mapper: GenericWorkspaceMapper,
  retrieve: GenericWorkspaceOperationRetrieve,
},
  widgetCardView: {
  mapper: WidgetCardViewMapper,
},
};


const webhookOperations = {
  global: {// eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapper: WebhookGlobalMapper as any, // CLI to refactor
  subscribe: WebhookGlobalSubscribe,
  unsubscribe: WebhookGlobalUnsubscribe,
},
};


const fieldOperations = {
  mapper: fieldMapper,
  list: fieldList,
};

const connectorBundle = new ConnectorBundle({
  connector,
  resourceModelOperations,
  webhookOperations,
  fieldOperations,
}).init;

export default connectorBundle;
