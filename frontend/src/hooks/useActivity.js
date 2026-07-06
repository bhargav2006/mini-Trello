import { useState, useEffect } from "react";
import { useSocket } from "../contexts/SocketContext";

export default function useActivity() {
  const { socket } = useSocket();
  const [activities, setActivities] = useState(() => {
    const stored = localStorage.getItem("mini_trello_activities");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [];
      }
    }
    // Default initial seed activities for professional aesthetics
    return [
      {
        id: "1",
        text: "Task board environment initialized",
        time: new Date(Date.now() - 3600000 * 2).toISOString(),
        type: "system",
      },
      {
        id: "2",
        text: "System audit logs verified",
        time: new Date(Date.now() - 3600000 * 1.5).toISOString(),
        type: "system",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("mini_trello_activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    if (!socket) return;

    const addActivity = (text, type = "info") => {
      const newAct = {
        id: Math.random().toString(36).substr(2, 9),
        text,
        time: new Date().toISOString(),
        type,
      };
      setActivities((prev) => [newAct, ...prev.slice(0, 19)]); // Limit to 20 logs
    };

    const handleCreated = (task) => {
      addActivity(`Task "${task.title}" was created`, "create");
    };

    const handleUpdated = (task) => {
      addActivity(`Task "${task.title}" was updated`, "update");
    };

    const handleDeleted = (task) => {
      const title = task?.title || "A task";
      addActivity(`Task "${title}" was deleted`, "delete");
    };

    socket.on("taskCreated", handleCreated);
    socket.on("taskUpdated", handleUpdated);
    socket.on("taskDeleted", handleDeleted);

    return () => {
      socket.off("taskCreated", handleCreated);
      socket.off("taskUpdated", handleUpdated);
      socket.off("taskDeleted", handleDeleted);
    };
  }, [socket]);

  const clearActivities = () => {
    setActivities([]);
  };

  return {
    activities,
    clearActivities,
  };
}
