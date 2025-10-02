import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "../../utils/api";
import ProfileCard from "../../components/ProfileCard";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState("");
  const router = useRouter();

  // Fetch user & tasks
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

       const fetchData = async () => {
      try {
        const userRes = await API.get("/profile");
        setUser(userRes.data);

        const tasksRes = await API.get("/tasks");
        setTasks(tasksRes.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    fetchData();
  }, [router]); 


  // Add new task
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await API.post("/tasks", { title: newTask });
      setTasks([res.data, ...tasks]);
      setNewTask("");
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle task status
  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === "pending" ? "completed" : "pending";
      const res = await API.put(`/tasks/${task._id}`, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  // Filter tasks separately
  const filteredPendingTasks = tasks.filter(
    (t) =>
      t.status === "pending" &&
      t.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  const filteredCompletedTasks = tasks.filter(
    (t) =>
      t.status === "completed" &&
      t.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  if (!user) return <p className="p-6 text-white">Loading...</p>;

  return (
  <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-6 font-sans text-gray-900">
    
    <header className="flex flex-col md:flex-row justify-between items-center mb-8">
      <h1 className="text-4xl font-extrabold mb-4 md:mb-0">My Tasks</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-xl shadow transition transform hover:scale-105"
      >
        Logout
      </button>
    </header>

    
    <ProfileCard user={user} darkMode={false} />

    <div className="flex flex-col md:flex-row gap-2 mb-6">
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition placeholder-gray-400"
      />
      <button
        onClick={handleAddTask}
        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md transition transform hover:scale-105"
      >
        Add
      </button>
    </div>

    
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition placeholder-gray-400"
      />
    </div>

    
    <div className="grid md:grid-cols-2 gap-6">
      {/* Pending Tasks */}
      <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-2xl">
        <h3 className="text-xl font-semibold mb-4 text-blue-600">Pending Tasks</h3>
        {filteredPendingTasks.length === 0 ? (
          <p className="text-gray-500">No pending tasks</p>
        ) : (
          filteredPendingTasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center p-4 mb-3 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <span className="font-medium">{task.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(task)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 rounded-full shadow transition"
                >
                  Complete
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-full shadow transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Completed Tasks */}
      <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-2xl">
        <h3 className="text-xl font-semibold mb-4 text-green-600">Completed Tasks</h3>
        {filteredCompletedTasks.length === 0 ? (
          <p className="text-gray-500">No completed tasks</p>
        ) : (
          filteredCompletedTasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center p-4 mb-3 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <span className="font-medium line-through text-gray-400">{task.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(task)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full shadow transition"
                >
                  Pending
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-full shadow transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);

}