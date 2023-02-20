<template>
  <main class="main-wrapper">
    <div class="new-task-wrapper">
      <input
        type="text"
        placeholder="Type a new todo item"
        class="new-task-input"
        v-model="newTaskInput"
        @keyup.enter="addTask"
      />
      <button class="new-task-button" @click="addTask">+ Add</button>
    </div>
    <TabNav
      :currentView="currentView"
      :taskListOverview="taskListOverview"
      @update-current-view="setView"
    />
    <ul class="task-list">
      <li
        v-for="taskItem in tasksInView"
        :key="taskItem.id"
        class="task-list-item"
      >
        <div class="task-list-checkbox-wrapper">
          <IconCheckCircle v-show="taskItem.complete" />
          <IconCircle v-show="!taskItem.complete" />
          <input
            type="checkbox"
            v-model="taskItem.complete"
            :checked="taskItem.complete"
            class="task-list-checkbox"
            @click="changeComplete(taskItem.id, taskItem.complete)"
          />
        </div>

        <input
          v-if="taskItem.edit"
          class="task-list-edit-input"
          type="text"
          v-model="taskItem.label"
        />
        <p
          v-else
          class="task-list-text"
          :class="taskItem.complete ? 'is-complete' : ''"
        >
          {{ taskItem.label }}
        </p>

        <div class="task-list-cta">
          <p>
            <IconEdit
              class="task-list-cta-icon"
              @click="toggleEdit(taskItem.id)"
            />
          </p>
          <p class="sr-only sr-only-edit">
            <span @click="editLabelTask(taskItem.id, taskItem.label)"
              >Edit</span
            >
          </p>
          <p class="sr-only sr-only-delete" @click="deleteTask(taskItem.id)">
            <span>Delete</span>
          </p>
        </div>
      </li>
    </ul>
  </main>
</template>

<script>
import { ref, computed, reactive, toRefs } from "vue";
import IconCheckCircle from "../components/icons/IconCheckCircle.vue";
import IconCircle from "../components/icons/IconCircle.vue";
import IconEdit from "../components/icons/IconEdit.vue";
import TabNav from "../components/TabNav.vue";

export default {
  name: "App",
  components: {
    IconCheckCircle,
    IconCircle,
    IconEdit,
    TabNav,
  },
  setup() {
    const baseURL = "http://venn.com/api/tasks";

    const state = reactive({
      currentView: "All",
      newTaskInput: "",
      taskList: [],
    });

    const error = ref(null);

    const fetchAllTask = async () => {
      try {
        const response = await fetch(`${baseURL}/`);

        if (!response.ok) throw new Error("Some thing went wrong");

        const listTaskFetch = await response.json();

        listTaskFetch.forEach((item, index) => {
          listTaskFetch[index].edit = false;

          if (listTaskFetch[index].complete == 0) {
            listTaskFetch[index].complete = false;
          }

          if (listTaskFetch[index].complete == 1) {
            listTaskFetch[index].complete = true;
          }
        });

        state.taskList = listTaskFetch;
      } catch (err) {
        error.value = err;
      }
    };

    fetchAllTask();

    const taskLists = reactive({
      all: computed(() => state.taskList),
      current: computed(() =>
        state.taskList.filter((item) => item.complete === false)
      ),
      completed: computed(() =>
        state.taskList.filter((item) => item.complete === true)
      ),
    });

    const taskListOverview = reactive([
      { name: "All", length: computed(() => taskLists.all.length) },
      { name: "Current", length: computed(() => taskLists.current.length) },
      { name: "Completed", length: computed(() => taskLists.completed.length) },
    ]);

    const tasksInView = computed(() => {
      if (state.currentView === "Current") {
        return state.taskList.filter((item) => item.complete === false);
      } else if (state.currentView === "Completed") {
        return state.taskList.filter((item) => item.complete === true);
      } else {
        return state.taskList;
      }
    });

    const addTaskFetch = async () => {
      const dataTask = {
        complete: false,
        label: state.newTaskInput,
      };

      try {
        const response = await fetch(`${baseURL}/create`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify(dataTask),
        });
        if (!response.ok) throw new Error("Some thing went wrong");
      } catch (err) {
        error.value = err;
      }
    };

    const addTask = () => {
      if (!state.newTaskInput.trim() == "") {
        addTaskFetch();

        state.taskList.push({
          complete: false,
          edit: false,
          label: state.newTaskInput,
        });

        state.newTaskInput = "";
      }
    };

    const changeComplete = async (taskId, completeStatus) => {
      const dataTask = {
        complete: !completeStatus,
      };

      try {
        const response = await fetch(`${baseURL}/update/${taskId}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify(dataTask),
        });
        if (!response.ok) throw new Error("Some thing went wrong");
      } catch (err) {
        error.value = err;
      }
    };

    const toggleEdit = (taskId) => {
      const taskIndex = state.taskList.findIndex((task) => task.id === taskId);
      state.taskList[taskIndex].edit = !state.taskList[taskIndex].edit;
    };

    const editLabelTask = async (taskId, labelValue) => {
      const dataTask = {
        label: labelValue,
      };

      try {
        const response = await fetch(`${baseURL}/update/${taskId}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify(dataTask),
        });
        if (!response.ok) throw new Error("Some thing went wrong");
      } catch (err) {
        error.value = err;
      }
    };

    const deleteTaskFetch = async (idPost) => {
      try {
        const response = await fetch(`${baseURL}/${idPost}`, {
          method: "delete",
        });
        if (!response.ok) throw new Error("Some thing went wrong");
      } catch (err) {
        error.value = err;
      }
    };

    const deleteTask = (taskId) => {
      deleteTaskFetch(taskId);
      const taskIndex = state.taskList.findIndex((task) => task.id === taskId);
      state.taskList.splice(taskIndex, 1);
    };

    const setView = (viewLabel) => {
      state.currentView = viewLabel;
    };

    console.log(state.currentView);

    return {
      ...toRefs(state),
      addTask,
      deleteTask,
      setView,
      tasksInView,
      changeComplete,
      toggleEdit,
      editLabelTask,
      taskListOverview,
    };
  },
};
</script>

<style>
html {
  background-color: #fbfbfb;
}

.task-list-checkbox-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-list-checkbox {
  position: absolute;
  left: -3px;
  bottom: 2px;
  opacity: 0;
}

.task-list {
  padding: 0;
}

.task-list-cta-icon {
  opacity: 0;
  transition: 0.2s opacity ease-in;
  margin: 5px;
}

.task-list-cta-icon .icon-object {
  fill: #2d2d2d;
}

.task-list-cta-icon:hover .icon-object {
  fill: #0728bf;
}

.task-list-item {
  border: 1px solid #f6f6f6;
  box-shadow: 2px 2px 8px 0 #cfcfcf;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 20px;
}

.task-list-item:hover {
  border: 1px solid #0631f8;
}

.task-list-item:hover .task-list-cta-icon,
.task-list-item:focus .task-list-cta-icon {
  opacity: 1;
}

.task-list-cta {
  display: flex;
  column-gap: 16px;
}

.task-list-cta .sr-only-delete {
  border: 1px solid #ee4035;
  padding: 3px 10px;
  border-radius: 5px;
  color: var(--text-color);
  background: #fff;
  cursor: pointer;
}

.task-list-cta .sr-only-delete:hover {
  background: #ee4035;
  color: #fff;
}

.task-list-cta .sr-only-edit {
  border: 1px solid #0392cf;
  padding: 3px 10px;
  border-radius: 5px;
  color: var(--text-color);
  background: #fff;
  cursor: pointer;
}

.task-list-cta .sr-only-edit:hover {
  background: #0392cf;
  color: #fff;
}

.task-list-edit-input,
.task-list-text {
  margin-left: 12px;
  font-weight: bold;
  flex: 1;
  border: 0;
  font-size: 16px;
}

.task-list-text.is-complete {
  color: #6b6b6b;
  text-decoration: line-through;
}

.new-task-wrapper {
  display: flex;
}

.new-task-input {
  padding: 16px;
  font-weight: 600;
  color: #2d2d2d;
  flex: 1;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: 1px solid #f6f6f6;
  box-shadow: 2px 2px 8px 0 #c0c0c0;
  letter-spacing: 1px;
  font-size: 1rem;
}

.new-task-input:hover {
  border: 1px solid #008744;
}

.new-task-input::placeholder {
  color: #959595;
}

.new-task-button {
  background-color: #008744;
  color: #fff;
  padding: 18px 24px;
  font-weight: 900;
  border: 0;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  transition: 0.2s background ease-in;
  font-size: 1rem;
}

.new-task-button:hover {
  background-color: #008744;
}

.main-wrapper {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 100px;
  border: 1px solid #ccc;
  padding: 20px 20px;
  border-radius: 15px;
}
</style>
