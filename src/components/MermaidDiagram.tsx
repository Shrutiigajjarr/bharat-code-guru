import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

let mermaidInitialized = false;

function initMermaid(isDark: boolean) {
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'default',
    securityLevel: 'loose',
    fontFamily: 'inherit',
  });
  mermaidInitialized = true;
}

let renderCounter = 0;

export default function MermaidDiagram({ chart, className }: { chart: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    initMermaid(isDark);

    const id = `mermaid-${++renderCounter}`;

    (async () => {
      try {
        const { svg: rendered } = await mermaid.render(id, chart);
        setSvg(rendered);
        setError('');
      } catch (e) {
        setError('Failed to render diagram');
        console.error('Mermaid render error:', e);
        // Clean up any leftover element mermaid may have created
        const el = document.getElementById('d' + id);
        if (el) el.remove();
      }
    })();
  }, [chart]);

  if (error) {
    return <div className="text-sm text-destructive p-4 text-center">{error}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{ display: 'flex', justifyContent: 'center', overflow: 'auto' }}
    />
  );
}
