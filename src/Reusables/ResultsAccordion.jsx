import React from 'react';
import ReactMarkdown from 'react-markdown';

const colorMap = {
    'Weaknesses and Optimization Ideas': 'red',
    'Optimized Profile Overview': 'green',
    'Suggested Project Titles and Layouts': 'yellow',
    'Recommended Visuals/Layout Hierarchies': 'blue',
    'Before and After Comparison': 'purple',
};

const ResultsAccordion = ({ sections }) => {
    return (
        <div className="mt-10 p-6 bg-white rounded-xl border border-gray-200 card">
            <h2 className="text-3xl font-bold mb-6 text-center">📑 Optimization Results</h2>

            {sections.map(({ title, content }, idx) => {
                const color = colorMap[title] || 'gray';

                return (
                    <details
                        key={idx}
                        open={idx === 0}
                        className={`mb-6 border rounded-lg overflow-hidden group transition-all
              ${color === 'red' && 'border-red-200 bg-red-50'}
              ${color === 'green' && 'border-green-200 bg-green-50'}
              ${color === 'yellow' && 'border-yellow-200 bg-yellow-50'}
              ${color === 'blue' && 'border-blue-200 bg-blue-50'}
              ${color === 'purple' && 'border-purple-200 bg-purple-50'}
            `}
                    >
                        <summary className={`flex justify-between items-center cursor-pointer px-5 py-4 bg-${color}`}>
                            <p
                                className={`text-lg font-medium
                  ${color === 'red' && 'text-red-800'}
                  ${color === 'green' && 'text-green-800'}
                  ${color === 'yellow' && 'text-yellow-800'}
                  ${color === 'blue' && 'text-blue-800'}
                  ${color === 'purple' && 'text-purple-800'}
                `}
                            >
                                {title}
                            </p>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigator.clipboard.writeText(content);
                                    const original = e.target.innerText;
                                    e.target.innerText = 'Copied!';
                                    setTimeout(() => {
                                        e.target.innerText = original;
                                    }, 1200);
                                }}
                                className={`text-xs border text-${color} px-2 py-1 rounded transition`}
                            >
                                Copy
                            </button>
                        </summary>
                        <div className="px-5 py-4 text-sm text-gray-800 prose prose-sm max-w-none">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    </details>
                );
            })}
        </div>
    );
};

export default ResultsAccordion;