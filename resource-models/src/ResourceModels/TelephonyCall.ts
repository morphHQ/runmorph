import { ResourceModel } from "..";

const TelephonyCall = new ResourceModel({
  id: "telephonyCall",
  schema: (z) => ({
    direction: z
      .enum(["inbound", "outbound"])
      .describe("Direction of the call (inbound, outbound)"),
    status: z
      .enum(["planned", "inProgress", "completed", "missed", "voicemail"])
      .describe("Call status (inProgress, completed, missed, voicemail)"),
    // Later add "state" as telephonyCallState reference – unique by connectors
    startedAt: z.string().datetime().describe("Call start time"),
    answeredAt: z
      .string()
      .datetime()
      .optional()
      .describe("Time when call was answered (if applicable)"),
    endedAt: z.string().datetime().optional().describe("Call end time"),
    duration: z
      .number()
      .int()
      .min(0)
      .optional()
      .describe("Duration of the call in seconds"),
    recordingUrl: z
      .string()
      .optional()
      .describe("URL to call recording or voicemail if available"),
    users: z
      .array(z.morph.resource("genericUser"))
      .optional()
      .describe("Internal participants in the call"),
    contacts: z
      .array(z.morph.resource("genericContact"))
      .optional()
      .describe("External participants in the call"),
    externalNumber: z
      .string()
      .optional()
      .describe("External number involved in the call (if applicable)"),
    internalNumber: z
      .string()
      .optional()
      .describe("Internal number involved in the call (if applicable)"),
    transcript: z.morph
      .resource("telephonyCallTranscript")
      .optional()
      .describe("Transcript of the call if available"),
  }),
});

export type TelephonyCall = typeof TelephonyCall;
export default TelephonyCall;
