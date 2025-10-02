export default function ProfileCard({
  user,
  darkMode = false,
  editing,
  setEditing,
  form,
  handleChange,
  handleSave,
  handleCancel,
}) {
  return (
    <div
      className={`p-6 mb-6 flex flex-col md:flex-row justify-between items-center rounded-2xl shadow-2xl transition 
                  ${darkMode ? "bg-gray-900 text-white" : "bg-white/80 backdrop-blur-md border border-white/30 text-gray-800"}`}
    >
      {editing ? (
        <div className="flex flex-col gap-3 w-full md:w-2/3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-700">{user.email}</p>
        </div>
      )}

      <div className="mt-4 md:mt-0 flex gap-2">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-full shadow transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
