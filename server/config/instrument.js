// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://9458b06847df47327817facb602f43f1@o4510053492719616.ingest.us.sentry.io/4510053530468352",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  initialScope: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
  //Tracing
  //tracesSampleRate: 1.0, // Capture 100% of the transactions
  sendDefaultPii: true,
});
//Manually call startProfiler and StopProfiler
//toprofile the code in between
Sentry.profiler.startProfiler();

//Start a transaction that will also be profiled
Sentry.startSpan({
    name: "My First Transaction",
}, () => {
    //the code executed in side the transaction will be wrapped in a span and profiled
    });

    //Calls to stopProfiling are optional- if you don't stop the profiler , it will keep profiling
    //your application until the process exists or stopProfiling is called.
    Sentry.profiler.stopProfiler();
