import { useState, useEffect } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("https://www.pornhub.com/webmasters/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []));
  }, []);

  const handleSearch = async () => {
    if (query.length < 3 && !selectedCategory) return;
    const url = `https://www.pornhub.com/webmasters/search?search=${encodeURIComponent(
      query
    )}&category=${encodeURIComponent(selectedCategory)}&page=${page}`;

    const res = await fetch(url);
    const data = await res.json();
    setResults(data.videos);
  };

  useEffect(() => {
    handleSearch();
  }, [query, selectedCategory, page]);

  return (
    <div className="bg-black min-h-screen text-white p-4 font-sans">
      <h1 className="text-2xl mb-4">Поиск видео (18+)</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите запрос..."
        className="w-full p-2 text-black rounded mb-4"
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full p-2 text-black rounded mb-4"
      >
        <option value="">Все категории</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div className="grid gap-4">
        {results.map((video) => (
          <div key={video.video_id} className="bg-gray-800 rounded p-4">
            <img
              src={video.thumb}
              alt={video.title}
              className="w-full rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{video.title}</h3>
            <p className="text-sm text-gray-300">
              Длительность: {video.duration} | Просмотров: {video.views.toLocaleString()}
            </p>
            <a
              href={`https://www.pornhub.com/embed/${video.video_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 mt-2 inline-block hover:underline"
            >
              Смотреть видео
            </a>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
        >
          Назад
        </button>
        <span className="px-4 py-2">Страница {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
        >
          Вперёд
        </button>
      </div>
    </div>
  );
}
