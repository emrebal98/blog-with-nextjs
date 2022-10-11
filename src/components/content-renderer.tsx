import parse, {
  domToReact,
  Element,
  Text,
  HTMLReactParserOptions,
} from 'html-react-parser';
import Link from 'next/link';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import type { FunctionComponent } from 'react';

interface ContentRendererProps {
  content: string;
}

const renderOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (!(domNode instanceof Element)) {
      return;
    }

    const { name, children, attribs, next } = domNode;

    let marginBottom = 0;

    //If next element is a \n set margin
    if (next && (next as Text).data) {
      const _next = next as Text;
      if (_next.data.includes('\n')) {
        const count = _next.data.length;
        marginBottom = count;
      }
    }

    const marginStyles = (count: number, divider = 1) =>
      ` mb-${(count * 2) / divider}`;

    // Paragraph
    if (name === 'p') {
      const selectedTextStyle = attribs.style
        ?.split(':')[1]
        ?.replace(';', '') as string;

      const textStyles: { [name: string]: string } = {
        right: ' text-right',
        center: ' text-center',
        left: ' text-left',
        justify: ' text-justify',
      };

      return (
        <p
          className={`leading-relaxed text-gray-600 dark:text-gray-400${
            textStyles[selectedTextStyle] ?? ''
          }${marginBottom > 0 ? marginStyles(marginBottom) : ''}`}
        >
          {domToReact(children, renderOptions)}
        </p>
      );
    }

    // Heading 1
    if (name === 'h1') {
      return (
        <h1
          className={`mt-4 text-3xl font-semibold leading-relaxed text-gray-800 dark:text-gray-200${
            marginBottom > 0 ? marginStyles(marginBottom) : ''
          }`}
        >
          {domToReact(children, renderOptions)}
        </h1>
      );
    }

    // Heading 2
    if (name === 'h2') {
      return (
        <h2
          className={`mt-4 text-2xl font-semibold leading-relaxed text-gray-800 dark:text-gray-200${
            marginBottom > 0 ? marginStyles(marginBottom) : ''
          }`}
        >
          {domToReact(children, renderOptions)}
        </h2>
      );
    }

    // Heading 3
    if (name === 'h3') {
      return (
        <h3
          className={`mt-4 text-xl font-semibold leading-relaxed text-gray-800 dark:text-gray-200${
            marginBottom > 0 ? marginStyles(marginBottom) : ''
          }`}
        >
          {domToReact(children, renderOptions)}
        </h3>
      );
    }

    // Unordered List
    if (name === 'ul') {
      const selectedListStyle = attribs.style
        ?.split(':')[1]
        ?.replace(';', '') as string;

      const listStyles: { [name: string]: string } = {
        disc: ' list-disc',
        circle: ' list-circle',
        square: ' list-square',
      };

      return (
        <ul
          className={`ml-10 leading-relaxed text-gray-600 dark:text-gray-400${
            listStyles[selectedListStyle] ?? ' list-disc'
          }`}
        >
          {domToReact(children, renderOptions)}
        </ul>
      );
    }

    // Ordered List
    if (name === 'ol') {
      const selectedListStyle = attribs.style
        ?.split(':')[1]
        ?.replace(';', '') as string;

      const listStyles: { [name: string]: string } = {
        decimal: ' list-decimal',
        'decimal-leading-zero': ' list-decimal-leading-zero',
        'lower-roman': ' list-lower-roman',
        'upper-roman': ' list-upper-roman',
        'lower-latin': ' list-lower-latin',
        'upper-latin': ' list-upper-latin',
      };

      return (
        <ol
          className={`ml-10 leading-relaxed text-gray-600 dark:text-gray-400${
            listStyles[selectedListStyle] ?? ' list-decimal'
          }`}
        >
          {domToReact(children, renderOptions)}
        </ol>
      );
    }

    // Divider
    if (name === 'hr') {
      return <hr className="my-4 rounded" />;
    }

    // Blockquote
    if (name === 'blockquote') {
      return (
        <blockquote
          className={`shadow-quote pl-8${
            marginBottom > 0 ? marginStyles(marginBottom) : ''
          }`}
        >
          {domToReact(children, renderOptions)}
        </blockquote>
      );
    }

    // Link
    if (name === 'a') {
      if (!attribs.href) return;
      return (
        <Link href={`${attribs.href}`} prefetch={false}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <a className="underline" name={attribs.name}>
            {domToReact(children, renderOptions)}
          </a>
        </Link>
      );
    }

    // Div
    if (name === 'div') {
      // To remove
      if (attribs.class === 'highlight__panel js-actions-panel') {
        return <></>;
      }
      // To remove and preserve white space
      if (attribs.class === 'highlight js-code-highlight') {
        return (
          <div
            className={`overflow-hidden rounded ${
              marginBottom > 0 ? marginStyles(marginBottom, 2) : ''
            }`}
          >
            {domToReact(children, renderOptions)}
          </div>
        );
      }
    }

    // Pre
    if (name === 'pre') {
      const result: Text[] = [];
      //To combine code lines as one string
      RecursiveGetText(children, result);
      const codeText = result.map((r) => r.data).join('');
      const language = attribs.class?.split(' ')[1];

      return (
        <SyntaxHighlighter language={language} style={atomOneDark}>
          {codeText}
        </SyntaxHighlighter>
      );
    }

    // Code
    if (name === 'code') {
      return (
        <code className="rounded bg-gray-200 py-0.5 px-1 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          {domToReact(children, renderOptions)}
        </code>
      );
    }

    // Br
    if (name === 'br') {
      return <p>&nbsp;</p>;
    }
  },
};

const ContentRenderer: FunctionComponent<ContentRendererProps> = ({
  content,
}) => {
  return <>{parse(content, renderOptions)}</>;
};

export { ContentRenderer };

const RecursiveGetText = (children: Element['children'], result: Text[]) => {
  for (let i = 0; i < children.length; i++) {
    const element = children[i];
    if (element instanceof Element) {
      RecursiveGetText(element.children, result);
    } else {
      result.push(element as Text);
    }
  }
};
