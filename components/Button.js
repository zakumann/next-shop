export default function Button({ type, children }) {
  return (
    <button type={type}
        className="bg-green-800 text-gray-100 rounded px-4 py-2 my-2
            hover:bg-green-700">
        {children}
    </button>
  );
}
