export default function FilterBar({ onFilter, activeFilter }) {
  const filters = ['All', 'Remote', 'Full-time', 'Part-time', 'Contractor'];

  return (
    <div className="flex gap-2 flex-wrap mt-4">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onFilter(filter)}
          className={`px-4 py-2 rounded-full text-sm font-bold transition ${
            activeFilter === filter
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
