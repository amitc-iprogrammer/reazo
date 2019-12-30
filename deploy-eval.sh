#!/bin/bash

source ./.env.eval

echo $BUILD_BUILDID

docker build \
--build-arg REACT_APP_REAZO_AGENT_REAZO_API_URL=$REACT_APP_REAZO_AGENT_REAZO_API_URL \
--build-arg REACT_APP_REAZO_AGENT_OKTA_ISSUER=$REACT_APP_REAZO_AGENT_OKTA_ISSUER \
--build-arg REACT_APP_REAZO_AGENT_OKTA_URL=$REACT_APP_REAZO_AGENT_OKTA_URL \
--build-arg REACT_APP_REAZO_AGENT_OKTA_BASE_URI=$REACT_APP_REAZO_AGENT_OKTA_BASE_URI \
--build-arg REACT_APP_REAZO_AGENT_OKTA_REDIRECT_URI=$REACT_APP_REAZO_AGENT_OKTA_REDIRECT_URI \
--build-arg REACT_APP_REAZO_AGENT_OKTA_CLIENT_ID=$REACT_APP_REAZO_AGENT_OKTA_CLIENT_ID \
--build-arg REACT_APP_REAZO_AGENT_REAZO_IS_EVAL=$REACT_APP_REAZO_AGENT_REAZO_IS_EVAL \
-t $GCLOUD_PROJECT_NAME/$EVAL_DOCKER_IMAGE_NAME:$BUILD_BUILDID \
.