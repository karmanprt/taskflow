import { useCallback, useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

function Tasks() {
  // Stores tasks received from the backend
  const [tasks, setTasks] = useState([]);

  // Tracks initial loading state
  const [isLoading, setIsLoading] = useState(true);

  // Stores task-fetching and updating errors
  const [error, setError] = useState("");

  // Controls the create-task form
  const [showForm, setShowForm] = useState(false);

  // Stores new task details
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Tracks task creation request
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stores task creation errors
  const [formError, setFormError] = useState("");

  // Tracks which task is being updated
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  // Stores the task selected for deletion
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Tracks the delete request
  const [isDeleting, setIsDeleting] = useState(false);

  // Stores deletion errors
  const [deleteError, setDeleteError] = useState("");

  // Fetch tasks again when Retry is clicked
  const fetchTasks = useCallback(async () => {
    setError("");
    setIsLoading(true);

    try {
      const data = await getTasks();
      setTasks(data.tasks);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load tasks. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch tasks when the page first loads
  useEffect(() => {
    let isActive = true;

    async function loadTasks() {
      try {
        const data = await getTasks();

        if (isActive) {
          setTasks(data.tasks);
          setError("");
        }
      } catch (err) {
        if (isActive) {
          setError(
            err.response?.data?.message ||
              "Unable to load tasks. Please try again.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadTasks();

    // Prevent state updates after unmount
    return () => {
      isActive = false;
    };
  }, []);

  // Update form values
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormError("");
  }

  // Create a new task
  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title.trim()) {
      setFormError("Please enter a task title.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const data = await createTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
      });

      // Add the new task to the beginning of the list
      setTasks((prevTasks) => [data.task, ...prevTasks]);

      // Reset the form
      setFormData({
        title: "",
        description: "",
      });

      setShowForm(false);
    } catch (err) {
      setFormError(
        err.response?.data?.message ||
          "Unable to create task. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Toggle task completion status
  async function handleToggleCompleted(task) {
    setUpdatingTaskId(task._id);

    try {
      const data = await updateTask(task._id, {
        completed: !task.completed,
      });

      // Replace the updated task in the list
      setTasks((prevTasks) =>
        prevTasks.map((item) => (item._id === task._id ? data.task : item)),
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update task. Please try again.",
      );
    } finally {
      setUpdatingTaskId(null);
    }
  }

  // Open the delete confirmation dialog
  function handleDeleteClick(task) {
    setTaskToDelete(task);
    setDeleteError("");
  }

  // Delete the selected task
  async function handleConfirmDelete() {
    if (!taskToDelete) return;

    setIsDeleting(true);
    setDeleteError("");

    try {
      await deleteTask(taskToDelete._id);

      // Remove the task only after successful deletion
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskToDelete._id),
      );

      setTaskToDelete(null);
    } catch (err) {
      setDeleteError(
        err.response?.data?.message ||
          "Unable to delete task. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  // Close delete confirmation dialog
  function handleCancelDelete() {
    if (isDeleting) return;

    setTaskToDelete(null);
    setDeleteError("");
  }

  // Close form and reset its values
  function handleCancel() {
    setShowForm(false);

    setFormData({
      title: "",
      description: "",
    });

    setFormError("");
  }

  // Calculate task summary
  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.length - completedTasks;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Page heading and Add Task button */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">YOUR WORKSPACE</p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">My Tasks</h1>

            <p className="mt-1 text-sm text-slate-500">
              Stay organized and make progress every day.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
          >
            + Add Task
          </button>
        </div>

        {/* Task summary cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Total tasks</p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Pending</p>

            <p className="mt-2 text-2xl font-bold text-blue-600">
              {pendingTasks}
            </p>
          </div>

          <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-1">
            <p className="text-sm text-slate-500">Completed</p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>
        </div>

        {/* Create Task Form */}
        {showForm && (
          <div
            className="fixed inset-0 z-50 flex items-end bg-slate-950/50 md:relative md:inset-auto md:mt-8 md:block md:bg-transparent"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleCancel();
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="create-task-heading"
              className="max-h-[90svh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-xl md:max-h-none md:rounded-2xl md:border md:border-slate-200 md:shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2
                    id="create-task-heading"
                    className="text-xl font-bold text-slate-900"
                  >
                    Create a task
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Add something you want to accomplish.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCancel}
                  aria-label="Close form"
                  className="rounded-full p-2 text-xl text-slate-500 hover:bg-slate-100"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Task title */}
                <div className="mb-5">
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Task title
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="What needs to be done?"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Task description */}
                <div className="mb-5">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Description
                    <span className="ml-2 font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add some details..."
                    rows={3}
                    className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Reserved error space */}
                <div className="mb-4 min-h-6">
                  {formError && (
                    <p className="text-sm text-red-500" role="alert">
                      {formError}
                    </p>
                  )}
                </div>

                {/* Form buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50 sm:w-auto"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {isSubmitting ? "Creating..." : "Create Task"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}

        {/* Task list */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Your task list
          </h2>

          {/* Loading state */}
          {isLoading ? (
            <p className="py-10 text-center text-slate-500">
              Loading your tasks...
            </p>
          ) : error ? (
            <div className="rounded-xl bg-white p-6 text-center">
              <p className="text-red-500" role="alert">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchTasks}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Try Again
              </button>
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
              <h3 className="text-lg font-semibold text-slate-800">
                No tasks yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Create your first task and get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <article
                  key={task._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  {/* Task details and delete action */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`wrap-break-word font-semibold ${
                          task.completed
                            ? "text-slate-400 line-through"
                            : "text-slate-900"
                        }`}
                      >
                        {task.title}
                      </h3>

                      {task.description && (
                        <p className="mt-2 wrap-break-word text-sm text-slate-600">
                          {task.description}
                        </p>
                      )}
                    </div>

                    {/* Mobile and tablet: Cross icon */}
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(task)}
                      aria-label={`Delete ${task.title}`}
                      title="Delete task"
                      className="shrink-0 rounded-full px-2 text-2xl leading-none text-slate-500 transition hover:bg-red-50 hover:text-red-600 lg:hidden"
                    >
                      ×
                    </button>

                    {/* Desktop: Delete button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(task)}
                      className="hidden shrink-0 items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 lg:inline-flex"
                    >
                      <span aria-hidden="true">♧</span>
                      Delete
                    </button>
                  </div>

                  {/* Task status and completion action */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        task.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleToggleCompleted(task)}
                      disabled={updatingTaskId === task._id}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                        task.completed
                          ? "border border-slate-300 text-slate-600 hover:bg-slate-100"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {updatingTaskId === task._id
                        ? "Updating..."
                        : task.completed
                          ? "Mark as Pending"
                          : "Mark as Completed"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Delete Confirmation Dialog */}
      {taskToDelete && (
        <div
          className="fixed inset-0 z-60 flex items-end justify-center bg-slate-950/60 p-0 sm:items-center sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCancelDelete();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-task-heading"
            className="w-full rounded-t-3xl bg-white p-6 shadow-2xl sm:max-w-md sm:rounded-2xl"
          >
            {/* Dialog heading */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="delete-task-heading"
                  className="text-xl font-bold text-slate-900"
                >
                  Delete this task?
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-slate-700">
                    "{taskToDelete.title}"
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCancelDelete}
                disabled={isDeleting}
                aria-label="Close confirmation"
                className="rounded-full px-2 text-2xl leading-none text-slate-500 hover:bg-slate-100 disabled:opacity-50"
              >
                ×
              </button>
            </div>

            {/* Delete error */}
            {deleteError && (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {deleteError}
              </p>
            )}

            {/* Confirmation buttons */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="w-full rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="w-full rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Tasks;
