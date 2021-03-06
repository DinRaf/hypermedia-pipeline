/*
  * Copyright 2018 Adobe. All rights reserved.
  * This file is licensed to you under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License. You may obtain a copy
  * of the License at http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software distributed under
  * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  * OF ANY KIND, either express or implied. See the License for the specific language
  * governing permissions and limitations under the License.
  */

/**
 * The Request Object used for Invoking OpenWhisk
 */
export type RawRequest = {
  params?: {
    /**
     * Owner of the GitHub repository. This is the name of a user or organization.
     */
    owner?: string;
    /**
     * Repository where content originates
     */
    repo?: string;
    /**
     * Name of the branch or tag or the SHA of the commit
     */
    ref?: string;
    /**
     * Path to the requested (Markdown) file
     */
    path?: string;
    /**
     * Deprecated: The original OpenWhisk request headers
     */
    __ow_headers?: {
      [k: string]: any;
    };
    [k: string]: string;
  };
};

/**
 * Tracks the OpenWhisk action invocation
 */
export interface Action {
  request?: RawRequest;
  /**
   * A [Winston](https://github.com/winstonjs/winston) logger instance.
   */
  logger?: {
    [k: string]: any;
  };
  secrets?: Secrets;
}
/**
 * Secrets passed into the pipeline such as API Keys or configuration settings.
 */
export interface Secrets {
  /**
   * The Base URL for retrieving raw text files from GitHub
   */
  REPO_RAW_ROOT?: string;
  /**
   * This interface was referenced by `Secrets`'s JSON-Schema definition
   * via the `patternProperty` "[A-Z0-9_]+".
   */
  [k: string]: string;
}
