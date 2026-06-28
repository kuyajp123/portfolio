import type { ReactNode } from 'react';
import { Card } from './Card';

interface BackendDataViewProps {
  sectionTitle: string;
  objectName: string;
  data: unknown;
}

interface CodeToken {
  className?: string;
  text: string;
}

const indent = '  ';
const identifierPattern = /^[A-Za-z_$][\w$]*$/u;

const createToken = (text: string, className?: string): CodeToken => ({ text, className });

const escapeString = (value: string) => value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const isPrimitive = (value: unknown) => value === null || ['boolean', 'number', 'string'].includes(typeof value);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const renderPropertyName = (key: string) =>
  identifierPattern.test(key) ? createToken(key, 'backend-code__key') : createToken(`'${escapeString(key)}'`, 'backend-code__string');

const renderPrimitive = (value: unknown): CodeToken[] => {
  if (typeof value === 'string') {
    return [createToken(`'${escapeString(value)}'`, 'backend-code__string')];
  }

  if (typeof value === 'number') {
    return [createToken(String(value), 'backend-code__number')];
  }

  if (typeof value === 'boolean') {
    return [createToken(String(value), 'backend-code__boolean')];
  }

  return [createToken('null', 'backend-code__null')];
};

const shouldRenderInlineArray = (value: unknown[]) =>
  value.every(isPrimitive) && value.reduce<number>((total, item) => total + String(item).length, 0) <= 80;

const renderValue = (value: unknown, depth: number): CodeToken[] => {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return [createToken('[', 'backend-code__punctuation'), createToken(']', 'backend-code__punctuation')];
    }

    if (shouldRenderInlineArray(value)) {
      return [
        createToken('[', 'backend-code__punctuation'),
        ...value.flatMap((item, index) => [
          ...renderValue(item, depth),
          ...(index < value.length - 1 ? [createToken(', ', 'backend-code__punctuation')] : []),
        ]),
        createToken(']', 'backend-code__punctuation'),
      ];
    }

    return [
      createToken('[', 'backend-code__punctuation'),
      createToken('\n'),
      ...value.flatMap((item, index) => [
        createToken(indent.repeat(depth + 1)),
        ...renderValue(item, depth + 1),
        ...(index < value.length - 1 ? [createToken(',', 'backend-code__punctuation')] : []),
        createToken('\n'),
      ]),
      createToken(indent.repeat(depth)),
      createToken(']', 'backend-code__punctuation'),
    ];
  }

  if (isRecord(value)) {
    const entries = Object.entries(value);

    if (entries.length === 0) {
      return [createToken('{', 'backend-code__punctuation'), createToken('}', 'backend-code__punctuation')];
    }

    return [
      createToken('{', 'backend-code__punctuation'),
      createToken('\n'),
      ...entries.flatMap(([key, entryValue], index) => [
        createToken(indent.repeat(depth + 1)),
        renderPropertyName(key),
        createToken(': ', 'backend-code__punctuation'),
        ...renderValue(entryValue, depth + 1),
        ...(index < entries.length - 1 ? [createToken(',', 'backend-code__punctuation')] : []),
        createToken('\n'),
      ]),
      createToken(indent.repeat(depth)),
      createToken('}', 'backend-code__punctuation'),
    ];
  }

  return renderPrimitive(value);
};

const renderCodeTokens = (objectName: string, data: unknown) => [
  createToken('const', 'backend-code__keyword'),
  createToken(' '),
  createToken(objectName, 'backend-code__variable'),
  createToken(' = ', 'backend-code__operator'),
  ...renderValue(data, 0),
  createToken(';', 'backend-code__punctuation'),
];

export const BackendDataView = ({ sectionTitle, objectName, data }: BackendDataViewProps) => {
  const tokens = renderCodeTokens(objectName, data);

  return (
    <Card>
      <h1 className="mb-2">{sectionTitle}</h1>
      <pre className="backend-code overflow-x-auto whitespace-pre-wrap break-words rounded-sm p-3 text-xs font-semibold">
        <code>
          {tokens.map((token, index): ReactNode => (
            <span className={token.className} key={index}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
    </Card>
  );
};
