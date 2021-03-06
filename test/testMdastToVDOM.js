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
/* eslint-env mocha */

const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const h = require('hyperscript');
const VDOM = require('../').utils.vdom;

describe('Test MDAST to VDOM Transformation', () => {
  it('Simple MDAST Conversion', () => {
    const mdast = fs.readJSONSync(path.resolve(__dirname, 'fixtures', 'simple.json'));
    const transformer = new VDOM(mdast);
    const node = transformer.process();
    assert.equal(node.outerHTML, '<h1>Hello World</h1>');
  });

  it('Custom Text Matcher Conversion', () => {
    const mdast = fs.readJSONSync(path.resolve(__dirname, 'fixtures', 'simple.json'));
    const transformer = new VDOM(mdast);
    transformer.match('heading', () => '<h1>All Headings are the same to me</h1>');
    const node = transformer.process();
    assert.equal(node.outerHTML, '<h1>All Headings are the same to me</h1>');
  });

  it('Programmatic Matcher Function', () => {
    const mdast = fs.readJSONSync(path.resolve(__dirname, 'fixtures', 'simple.json'));
    const transformer = new VDOM(mdast);
    transformer.match(({ type }) => type === 'heading', () => '<h1>All Headings are the same to me</h1>');
    const node = transformer.process();
    assert.equal(node.outerHTML, '<h1>All Headings are the same to me</h1>');
  });

  it('Custom Text Matcher with Multiple Elements', () => {
    const mdast = fs.readJSONSync(path.resolve(__dirname, 'fixtures', 'simple.json'));
    const transformer = new VDOM(mdast);
    transformer.match('heading', () => '<a name="h1"></a><h1>All Headings are the same to me</h1>');
    const node = transformer.process();
    assert.equal(node.outerHTML, '<div><a name="h1"></a><h1>All Headings are the same to me</h1></div>');
  });

  it('Custom Text Matcher with VDOM Nodes', () => {
    const mdast = fs.readJSONSync(path.resolve(__dirname, 'fixtures', 'links.json'));
    const transformer = new VDOM(mdast);
    transformer.match('link', (_, node) => {
      const res = h(
        'a',
        { href: node.url, rel: 'nofollow' },
        node.children.map(({ value }) => value),
      );
      return res;
    });
    const node = transformer.process();
    assert.equal(node.outerHTML, `<ul>
<li><code>body</code>: the unparsed content body as a <code>string</code></li>
<li><code>mdast</code>: the parsed <a href="https://github.com/syntax-tree/mdast" rel="nofollow">Markdown AST</a></li>
<li>
<p><code>meta</code>: a map metadata properties, including</p>
<ul>
<li><code>title</code>: title of the document</li>
<li><code>intro</code>: a plain-text introduction or description</li>
<li><code>type</code>: the content type of the document</li>
</ul>
</li>
<li><code>htast</code>: the HTML AST</li>
<li><code>html</code>: a string of the content rendered as HTML</li>
<li><code>children</code>: an array of top-level elements of the HTML-rendered content</li>
</ul>`);
  });
});
