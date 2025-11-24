<script setup>
import { useAuthStore } from "~/stores/auth";

// Set the page title
useSeoMeta({
  title: "Import Events",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const authStore = useAuthStore();

const isLoading = ref(false);
const isDragOver = ref(false);
const selectedFile = ref(null);
const importResults = ref(null);
const alert = ref({
  show: false,
  status: "",
  message: "",
});

// File input reference
const fileInputRef = ref(null);

// Handle file drop
function handleDrop(event) {
  event.preventDefault();
  isDragOver.value = false;

  const files = event.dataTransfer.files;
  if (files.length > 0) {
    handleFileSelect(files[0]);
  }
}

// Handle drag over
function handleDragOver(event) {
  event.preventDefault();
  isDragOver.value = true;
}

// Handle drag leave
function handleDragLeave(event) {
  event.preventDefault();
  isDragOver.value = false;
}

// Handle file input change
function handleFileInputChange(event) {
  const file = event.target.files?.[0];
  if (file) {
    handleFileSelect(file);
  }
}

// Handle file selection (from drop or input)
function handleFileSelect(file) {
  // Validate file type
  if (!file.name.toLowerCase().endsWith(".csv")) {
    alert.value = {
      show: true,
      status: "danger",
      message: "Please select a CSV file.",
    };
    return;
  }

  selectedFile.value = file;
  alert.value.show = false;
  importResults.value = null;
}

// Trigger file input click
function selectFile() {
  fileInputRef.value?.click();
}

// Remove selected file
function removeFile() {
  selectedFile.value = null;
  importResults.value = null;
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
}

// Upload and import file
async function importFile() {
  if (!selectedFile.value) {
    alert.value = {
      show: true,
      status: "danger",
      message: "Please select a file to import.",
    };
    return;
  }

  isLoading.value = true;
  alert.value.show = false;

  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("file", selectedFile.value);

    // Upload file
    const response = await $fetch("/api/events/import", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    importResults.value = response;

    alert.value = {
      show: true,
      status: "success",
      message: response.message,
    };

    // Clear the selected file after successful import
    removeFile();
  } catch (error) {
    console.error("Import error:", error);
    alert.value = {
      show: true,
      status: "danger",
      message:
        error?.data?.message ||
        "Failed to import events. Please check your CSV format and try again.",
    };
  } finally {
    isLoading.value = false;
  }
}

// Format file size for display
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Download sample CSV with dates within 15 days of today
function downloadSample() {
  const today = new Date();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Create dates within 15 days of today (past and future)
  const pastDate1 = new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
  pastDate1.setHours(18, 0, 0);
  const pastEndDate1 = new Date(pastDate1.getTime() + 4 * 60 * 60 * 1000); // 4 hours later

  const pastDate2 = new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000); // 5 days ago
  pastDate2.setHours(9, 0, 0);
  const pastEndDate2 = new Date(pastDate2.getTime() + 8 * 60 * 60 * 1000); // 8 hours later

  const futureDate1 = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
  futureDate1.setHours(19, 0, 0);
  const futureEndDate1 = new Date(futureDate1.getTime() + 4 * 60 * 60 * 1000); // 4 hours later

  const futureDate2 = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  futureDate2.setHours(0, 0, 0);
  const futureEndDate2 = new Date(futureDate2);
  futureEndDate2.setHours(23, 59, 0);

  const allDayDate = new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000); // 12 days from now
  allDayDate.setHours(0, 0, 0);
  const allDayEndDate = new Date(allDayDate);
  allDayEndDate.setHours(23, 59, 0);

  const sampleData = [
    "name,slug,starts_at,ends_at,description,is_featured,is_has_ends_at,is_all_day,is_active,haunted_by",
    `Halloween Spooktacular,halloween-spooktacular,${formatDate(
      pastDate1
    )},${formatDate(
      pastEndDate1
    )},Join us for a night of frightful fun with haunted attractions and spooky activities,1,1,0,1,The Headless Horseman`,
    `Pumpkin Patch Adventure,pumpkin-patch-adventure,${formatDate(
      pastDate2
    )},${formatDate(
      pastEndDate2
    )},Pick your perfect pumpkin from our sprawling patch,0,1,0,1,`,
    `Upcoming Horror Night,upcoming-horror-night,${formatDate(
      futureDate1
    )},${formatDate(
      futureEndDate1
    )},Get ready for our scariest night yet,1,1,0,1,Ghostly Apparition`,
    `Weekend Corn Maze,weekend-corn-maze,${formatDate(
      futureDate2
    )},${formatDate(
      futureEndDate2
    )},Navigate through our challenging corn maze,0,1,0,1,Lost Farmer Joe`,
    `Fall Festival Day,fall-festival-day,${formatDate(allDayDate)},${formatDate(
      allDayEndDate
    )},A full day of autumn festivities for the whole family,1,0,1,1,`,
  ].join("\n");

  const blob = new Blob([sampleData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sample-events.csv";
  link.click();
  window.URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="container-fluid">
    <header class="page-header">
      <h1>Import Events</h1>
      <div class="header-actions">
        <button
          type="button"
          class="btn btn-outline-primary me-2"
          @click="downloadSample"
        >
          Download Sample CSV
        </button>
        <RouterLink class="btn btn-primary" to="/admin/events">
          Back to Events
        </RouterLink>
      </div>
    </header>

    <!-- Alert Messages -->
    <div
      v-if="alert.show"
      class="alert"
      role="alert"
      :class="'alert-' + alert.status"
    >
      {{ alert.message }}
    </div>

    <div class="row">
      <!-- Upload Section -->
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Upload CSV File</h5>
          </div>
          <div class="card-body">
            <!-- File Drop Zone -->
            <div
              class="drop-zone"
              :class="{
                'drag-over': isDragOver,
                'has-file': selectedFile,
              }"
              @drop="handleDrop"
              @dragover="handleDragOver"
              @dragleave="handleDragLeave"
              @click="selectFile"
            >
              <div v-if="!selectedFile" class="drop-zone-content">
                <div class="drop-zone-icon">
                  <IconDocumentText />
                </div>
                <h6>Drop your CSV file here</h6>
                <p class="text-muted">or click to browse files</p>
                <small class="text-muted">Accepts .csv files only</small>
              </div>

              <div v-else class="selected-file">
                <div class="file-info">
                  <div class="file-icon">
                    <IconDocument />
                  </div>
                  <div class="file-details">
                    <div class="file-name">{{ selectedFile.name }}</div>
                    <div class="file-size text-muted">
                      {{ formatFileSize(selectedFile.size) }}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-sm btn-danger"
                  @click.stop="removeFile"
                >
                  Remove
                </button>
              </div>
            </div>

            <!-- Hidden file input -->
            <input
              ref="fileInputRef"
              type="file"
              accept=".csv"
              style="display: none !important"
              @change="handleFileInputChange"
            />

            <!-- Import Button -->
            <div class="mt-3 d-flex justify-content-end">
              <button
                class="btn btn-primary"
                :disabled="!selectedFile || isLoading"
                @click="importFile"
              >
                <span v-if="isLoading">Importing...</span>
                <span v-else>Import Events</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Import Results -->
        <div v-if="importResults" class="card mt-4">
          <div class="card-header">
            <h5 class="card-title mb-0">Import Results</h5>
          </div>
          <div class="card-body">
            <div class="import-summary mb-3">
              <h6>{{ importResults.message }}</h6>
              <p class="text-muted mb-0">
                Imported by: {{ importResults.importedBy }}
              </p>
            </div>

            <div
              v-if="importResults.results && importResults.results.length > 0"
              class="results-list"
            >
              <h6>Details:</h6>
              <ul class="list-group list-group-flush">
                <li
                  v-for="(result, index) in importResults.results"
                  :key="index"
                  class="list-group-item px-0"
                >
                  {{ result }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: rem(32);

  .header-actions {
    display: flex;
    gap: rem(8);
  }
}

.drop-zone {
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  padding: rem(40);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
  margin-bottom: rem(32);

  &:hover {
    border-color: var(--primary);
    background-color: rgba(var(--primary-rgb), 0.05);
  }

  &.drag-over {
    border-color: var(--primary);
    background-color: rgba(var(--primary-rgb), 0.1);
  }

  &.has-file {
    border-color: var(--success);
    background-color: rgba(var(--success-rgb), 0.05);
  }
}

.drop-zone-content {
  .drop-zone-icon {
    color: #6c757d;
    margin-bottom: rem(16);
    width: 48px;
    height: 48px;
    margin-left: auto;
    margin-right: auto;
  }

  h6 {
    margin-bottom: rem(8);
    color: #495057;
  }

  p {
    margin-bottom: rem(4);
  }
}

.selected-file {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;

  .file-info {
    display: flex;
    align-items: center;
    gap: rem(12);

    .file-icon {
      color: var(--success);
      width: 32px;
      height: 32px;
    }

    .file-details {
      .file-name {
        font-weight: 500;
        margin-bottom: rem(2);
      }

      .file-size {
        font-size: 0.875rem;
      }
    }
  }
}

.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
}

.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.import-summary {
  h6 {
    color: var(--success);
    margin-bottom: rem(8);
  }
}

.results-list {
  .list-group-item {
    font-size: 0.875rem;
    border-bottom: 1px solid #dee2e6;

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
