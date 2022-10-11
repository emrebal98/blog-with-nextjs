import parse, {
  domToReact,
  Element,
  Text,
  HTMLReactParserOptions,
} from 'html-react-parser';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

interface ContentRendererProps {
  content: string;
}

// TODO: implement render properly
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

    const marginStyles = (count: number) => ` mb-${count * 2}`;

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
        <blockquote className="shadow-quote pl-8">
          {domToReact(children, renderOptions)}
        </blockquote>
      );
    }

    // Link
    if (name === 'a') {
      return (
        <Link href={`${attribs.href}`}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <a className="underline" name={attribs.name}>
            {domToReact(children, renderOptions)}
          </a>
        </Link>
      );
    }
  },
};

const ContentRenderer: FunctionComponent<ContentRendererProps> = ({
  content,
}) => {
  return <>{parse(content, renderOptions)}</>;
};

export { ContentRenderer };
