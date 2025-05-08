import React, { useRef, useState, useEffect } from 'react';
import { Highlight, themes } from "prism-react-renderer";

export default function Prism({ data: exampleCode, type }) {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const copyCodeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(exampleCode);
      setCopied(true);
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
      setCopied(false);
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 3000); // Reset "Copied" text after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="w-full bg-black rounded-md mb-4">
      <div className="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md">
        <span>{type}</span>
        <button className="btn-copy flex ml-auto gap-2 items-center" onClick={copyCodeToClipboard}>
          {copied ? (
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
          )}
          {copied ? "Copied" : "Copy code"}
        </button>
      </div>
      <div className="px-4 overflow-y-auto">
        <Highlight theme={themes.oneDark} code={exampleCode.trim()} language="jsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} !bg-black max-h-[400px] overflow-auto scrollbars`} style={style} ref={codeRef}>
              {tokens.map((line, i) => {
                const { key, ...lineProps } = getLineProps({ line, key: i });
                return (
                  <div key={key} {...lineProps}>
                    {line.map((token, key) => {
                      const { key: tokenKey, ...tokenProps } = getTokenProps({ token, key });
                      return <span key={tokenKey} {...tokenProps} />;
                    })}
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
