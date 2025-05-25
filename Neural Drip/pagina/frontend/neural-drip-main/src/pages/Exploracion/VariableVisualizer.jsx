import Plot from 'react-plotly.js';

export default function VariableVisualizer({ data, variable, type }) {
  if (type === 'numeric') {
    const numericData = data.map(d => Number(d[variable])).filter(v => !isNaN(v));

    return (
      <div className="space-y-6 flex gap-4 items-center justify-around">
        {/* Histogram */}
        <div className="bg-[#1f2937] rounded p- w-1/3">
          <h3 className="text-white font-bold mb-2">Histograma</h3>
          <Plot
            data={[{
              type: 'histogram',
              x: numericData,
              marker: { color: '#3b82f6' },
            }]}
            layout={{
              autosize: true,
              height: 300,
              margin: { t: 30, l: 40, r: 10, b: 40 },
              paper_bgcolor: '#1f2937',
              plot_bgcolor: '#1f2937',
              font: { color: '#ffffff' },
              xaxis: { title: variable },
              yaxis: { title: 'Frecuencia' },
            }}
            style={{ width: '100%' }}
            config={{ responsive: true }}
          />
        </div>

        {/* Box Plot */}
        <div className="bg-[#1f2937] rounded p-4 w-1/3">
          <h3 className="text-white font-bold mb-2">Box Plot</h3>
          <Plot
            data={[{
              type: 'box',
              y: numericData,
              name: variable,
              marker: { color: '#facc15' },
              boxpoints: 'outliers',
            }]}
            layout={{
              autosize: true,
              height: 300,
              margin: { t: 30, l: 40, r: 10, b: 40 },
              paper_bgcolor: '#1f2937',
              plot_bgcolor: '#1f2937',
              font: { color: '#ffffff' },
              yaxis: { title: variable },
            }}
            style={{ width: '100%' }}
            config={{ responsive: true }}
          />
        </div>
      </div>
    );
  }

  // Categorical case (histogram-like bar chart)
  const counts = {};
  data.forEach(d => {
    const key = d[variable] ?? 'N/A';
    counts[key] = (counts[key] || 0) + 1;
  });

  return (
    <div className="bg-[#1f2937] rounded p-4">
      <h3 className="text-white font-bold mb-2">Distribución</h3>
      <Plot
        data={[{
          type: 'bar',
          x: Object.keys(counts),
          y: Object.values(counts),
          marker: { color: '#3b82f6' },
        }]}
        layout={{
          autosize: true,
          height: 300,
          margin: { t: 30, l: 40, r: 10, b: 40 },
          paper_bgcolor: '#1f2937',
          plot_bgcolor: '#1f2937',
          font: { color: '#ffffff' },
          xaxis: { title: variable },
          yaxis: { title: 'Frecuencia' },
        }}
        style={{ width: '100%' }}
        config={{ responsive: true }}
      />
    </div>
  );
}
