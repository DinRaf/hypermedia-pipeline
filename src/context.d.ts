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
 * A section in a markdown document
 */
export type Section = {
  /**
   * The inferred class names for the section
   */
  types?: string[];
  /**
   * The MDAST node type. Each section can be treated as a standalone document.
   */
  type?: {
    [k: string]: any;
  };
  position?: Position;
  /**
   * The AST nodes making up the section. Section dividers are not included.
   */
  children?: MDAST[];
  /**
   * Extracted metadata fron the frontmatter of the document
   */
  meta?: {
    [k: string]: any;
  };
  /**
   * Extracted title of the document
   */
  title?: string;
  /**
   * Extracted first paragraph of the document
   */
  intro?: string;
  /**
   * Path (can be relative) to the first image in the document
   */
  image?: string;
} & {
  /**
   * Extracted metadata fron the frontmatter of the document
   */
  meta?: {
    [k: string]: any;
  };
  /**
   * Extracted title of the document
   */
  title?: string;
  /**
   * Extracted first paragraph of the document
   */
  intro?: string;
  /**
   * Path (can be relative) to the first image in the document
   */
  image?: string;
  [k: string]: any;
};

/**
 * The context thingie.
 */
export interface Context {
  /**
   * An error message that has been generated during pipeline processing.
   * When this property is present, all other values can be ignored.
   */
  error?: string;
  request?: Request;
  content?: Content;
  response?: Response;
}
/**
 * The HTTP Request
 */
export interface Request {
  /**
   * The passed through (and filtered) URL parameters of the request
   */
  params?: {
    [k: string]: string | string[];
  };
}
/**
 * The `content` object represents the content that is being processed in the pipeline.
 *
 * With each step of the pipeline, the `content` will be enriched and gain additional properties.
 *
 * In a typical processing, `content` will start empty, and then gain a [`body`](#body) as the resource is fetched from the content repository.
 *
 * In the second step, the `body` will be parsed using a Markdown parser, resulting in the populated [`mdast`](#mdast) property, which is a representation of the Markdown.
 *
 * After that, the Markdown AST is processed furthermore to extract [`sections`](#meta), [`title`](#title), [`intro`](#intro), and [`meta`](#meta).
 */
export interface Content {
  /**
   * List of URIs that have been retrieved for this piece of content
   */
  sources?: string[];
  /**
   * The content body of the retrieved source document
   */
  body?: string;
  mdast?: MDAST;
  /**
   * The extracted sections of the document
   */
  sections?: Section[];
  /**
   * The DOM-compatible representation of the document's inner HTML
   */
  document?: {
    [k: string]: any;
  };
  /**
   * Deprecated: the Hypermedia (HAST) AST
   */
  htast?: {
    [k: string]: any;
  };
  /**
   * Deprecated: the main HTML elements of the document. `document.children[].innerHTML` instead.
   */
  children?: string[];
  /**
   * Deprecated: the main HTML of the document. Use `document.innerHTML` instead.
   */
  html?: string;
  /**
   * Extracted metadata fron the frontmatter of the document
   */
  meta?: {
    [k: string]: any;
  };
  /**
   * Extracted title of the document
   */
  title?: string;
  /**
   * Extracted first paragraph of the document
   */
  intro?: string;
  /**
   * Path (can be relative) to the first image in the document
   */
  image?: string;
}
/**
 * The Markdown AST is 100% API compatible with the [UnifiedJS MDAST](https://github.com/syntax-tree/mdast) data structure.
 *
 * All [MDAST Utilities](https://github.com/syntax-tree/mdast#list-of-utilities) are compatible and can be used for easy processing of MDAST trees.
 */
export interface MDAST {
  /**
   * The node type of the MDAST node
   */
  type?:
    | "root"
    | "paragraph"
    | "text"
    | "heading"
    | "thematicBreak"
    | "blockquote"
    | "list"
    | "table"
    | "tableRow"
    | "tableCell"
    | "html"
    | "code"
    | "yaml"
    | "definition"
    | "footnoteDefinition"
    | "emphasis"
    | "strong"
    | "delete"
    | "inlineCode"
    | "break"
    | "link"
    | "image"
    | "linkReference"
    | "imageReference"
    | "footnote"
    | "footnoteReference";
  children?: {
    [k: string]: any;
  }[];
  position?: Position;
  /**
   * The string value of the node, if it is a terminal node.
   */
  value?: string;
  /**
   * The heading level
   */
  depth?: number;
  /**
   * Is the list ordered
   */
  ordered?: boolean;
  /**
   * Starting item of the list
   */
  start?: number;
  /**
   * A loose field can be present. It represents that any of its items is separated by a blank line from its siblings or contains two or more children (when true), or not (when false or not present).
   */
  loose?: boolean;
  /**
   * A checked field can be present. It represents whether the item is done (when true), not done (when false), or indeterminate or not applicable (when null or not present).
   */
  checked?: boolean;
  /**
   * For tables, an align field can be present. If present, it must be a list of alignTypes. It represents how cells in columns are aligned.
   */
  align?: ("left" | "right" | "center" | null)[];
  /**
   * For code, a lang field can be present. It represents the language of computer code being marked up.
   */
  lang?: string;
  /**
   * For code, if lang is present, a meta field can be present. It represents custom information relating to the node.
   */
  meta?: string;
  /**
   * For associations, an identifier field must be present. It can match an identifier field on another node.
   */
  identifier?: string;
  /**
   * For associations, a label field can be present. It represents the original value of the normalised identifier field.
   */
  label?: string;
  /**
   * For resources, an url field must be present. It represents a URL to the referenced resource.
   */
  url?: string;
  /**
   * For resources, a title field can be present. It represents advisory information for the resource, such as would be appropriate for a tooltip.
   */
  title?: string | null;
  /**
   * An alt field should be present. It represents equivalent content for environments that cannot represent the node as intended.
   */
  alt?: string | null;
}
/**
 * Marks the position of an AST node in the original text flow
 */
export interface Position {
  start?: TextCoordinates;
  end?: TextCoordinates;
  indent?: any[];
}
/**
 * A position in a text document
 */
export interface TextCoordinates {
  /**
   * Line number
   */
  line?: number;
  /**
   * Column number
   */
  column?: number;
  /**
   * Character in the entire document
   */
  offset?: number;
}
/**
 * The HTTP response object
 */
export interface Response {
  /**
   * The HTTP status code
   */
  status?: number;
  body?: {
    [k: string]: any;
  };
  /**
   * The HTTP headers of the response
   */
  headers?: {
    [k: string]: string;
  };
}
