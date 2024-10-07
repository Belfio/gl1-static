/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "gl1-static",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    new sst.aws.StaticSite("GL1StaticR", {
      build: {
        command: "npm run build",
        output: "build/client",
      },
    });
  },
});
