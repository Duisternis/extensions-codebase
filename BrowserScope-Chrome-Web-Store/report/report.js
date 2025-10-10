async function getTestResultsFromStorage() {
  if (!(chrome.storage && chrome.storage.local)) {
    console.warn("Chrome storage not available");
    return [];
  }

  try {
    const data = await new Promise((resolve) =>
      chrome.storage.local.get(["currentTestResults"], resolve)
    );

    const results = data.currentTestResults
      ? JSON.parse(data.currentTestResults)
      : [];

    return results;
  } catch (error) {
    console.error("Error retrieving/parsing test results:", error);
    return [];
  }
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function analyzeTestResults(validResults) {
  const total = validResults.length;
  const passed = validResults.filter((r) => r.status === true).length;
  const failed = total - passed;
  const downloadsCount = validResults.filter((r) => r.download === true).length;
  const blockedDownloads = validResults.filter(
    (r) => r.download === true && r.downloadInfo?.blocked === true
  ).length;

  const categories = {};
  validResults.forEach((t) => {
    const cat = t.category || "Uncategorized";
    if (!categories[cat]) {
      categories[cat] = { passed: 0, failed: 0, total: 0, tests: [] };
    }
    categories[cat].total++;
    if (t.status === true) {
      categories[cat].passed++;
    } else {
      categories[cat].failed++;
    }
    categories[cat].tests.push(t);
  });

  return {
    results: validResults,
    total,
    passed,
    failed,
    downloadsCount,
    blockedDownloads,
    categories,
  };
}

function updateSummary(a) {
  document.getElementById("totalTests").textContent = a.total;
  document.getElementById("testsPassed").textContent = a.passed;
  document.getElementById("testsFailed").textContent = a.failed;
  document.getElementById("downloadsCount").textContent = a.downloadsCount;
  document.getElementById("blockedDownloads").textContent = a.blockedDownloads;
  document.getElementById("reportDate").textContent =
    new Date().toLocaleString();
}

function populateCategorySelectors(categories) {
  const sel = document.getElementById("categorySelect");
  sel.innerHTML = '<option value="all">All categories</option>';

  Object.keys(categories).forEach((cat) => {
    const total = categories[cat].total;
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = `${cat} (${total})`;
    sel.appendChild(opt);
  });
}

function renderTable(analysis, filters = {}) {
  const tbody = document.querySelector("#resultsTable tbody");
  tbody.innerHTML = "";
  const rows = [];

  analysis.results.forEach((t) => {
    if (filters.query) {
      const txt = (
        t.name +
        " " +
        (t.description || "") +
        " " +
        (t.category || "")
      ).toLowerCase();
      if (!txt.includes(filters.query.toLowerCase())) return;
    }
    if (
      filters.category &&
      filters.category !== "all" &&
      t.category !== filters.category
    )
      return;
    if (filters.status && filters.status !== "all") {
      if (filters.status === "pass" && t.status !== true) return;
      if (filters.status === "fail" && t.status !== false) return;
    }
    rows.push(t);
  });

  rows.sort((a, b) => {
    if (a.status === b.status) return a.name.localeCompare(b.name);
    return a.status ? 1 : -1;
  });

  rows.forEach((t, index) => {
    const tr = document.createElement("tr");

    const testNameHtml = t.download
      ? `<div class="test-name"><div class="download-icon"></div>${t.name}</div>`
      : `<div class="test-name">${t.name}</div>`;

    const statusIcon = t.status
      ? '<div class="status-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#dcfce7"/><path d="M5 8l2 2 4-4" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
      : '<div class="status-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#fef2f2"/><path d="M6 6l4 4M10 6l-4 4" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';

    tr.innerHTML = `
            <td>${testNameHtml}</td>
            <td class='muted'>${t.category || "Uncategorized"}</td>
            <td>${statusIcon}</td>
          `;

    tr.addEventListener("click", () => openTestModal(t));

    tbody.appendChild(tr);
  });

  if (rows.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML =
      '<td colspan="4" class="muted">No results match the current filters.</td>';
    tbody.appendChild(tr);
  }
}

function drawChart(categories) {
  const ctx = document.getElementById("categoryChart").getContext("2d");

  if (window.catChart) {
    window.catChart.destroy();
  }

  const labels = Object.keys(categories);
  const totalData = labels.map((cat) => categories[cat].total);
  const passedData = labels.map((cat) => categories[cat].passed);

  window.catChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total Tests",
          data: totalData,
          borderColor: "rgba(107, 114, 128, 0.8)",
          backgroundColor: "rgba(107, 114, 128, 0.1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(107, 114, 128, 0.8)",
          pointBorderColor: "rgba(107, 114, 128, 1)",
          pointRadius: 4,
        },
        {
          label: "Passed Tests",
          data: passedData,
          borderColor: "rgba(21, 128, 61, 0.8)",
          backgroundColor: "rgba(21, 128, 61, 0.1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(21, 128, 61, 0.8)",
          pointBorderColor: "rgba(21, 128, 61, 1)",
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 15,
            usePointStyle: true,
            font: {
              family: "Inter",
              size: 11,
            },
          },
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          grid: {
            color: "rgba(11, 18, 32, 0.08)",
          },
          pointLabels: {
            font: {
              family: "Inter",
              size: 10,
            },
            color: "var(--muted)",
          },
          ticks: {
            display: false,
          },
        },
      },
    },
  });
}

function makeUrlsClickable(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    '<a href="$1" target="_blank" rel="noopener" style="color: var(--accent); text-decoration: underline;">$1</a>'
  );
}

function renderActionResults(results) {
  if (!results || !Array.isArray(results) || results.length === 0) {
    return '<div style="color: var(--muted); font-style: italic;">No action results available</div>';
  }

  return `
    <div style="display: grid; gap: 16px;">
      ${results
        .map((result, index) => {
          if (!result)
            return '<div style="color: var(--muted); font-style: italic;">Empty result</div>';

          const actionName = result.action || "Unknown Action";
          const success = result.success;

          const statusIcon = success
            ? `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;"><circle cx="8" cy="8" r="8" fill="#dcfce7"/><path d="M5 8l2 2 4-4" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
            : `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;"><circle cx="8" cy="8" r="8" fill="#fef2f2"/><path d="M6 6l4 4M10 6l-4 4" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

          let details = [];

          if (result.error) {
            details.push({
              icon: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#fef3cd"/><path d="M8 4v4M8 12h.01" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
              text: result.error,
              type: "error",
            });
          }
          if (result.navigationDetected !== undefined) {
            details.push({
              icon: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="var(--muted)" stroke-width="1.5" stroke-linecap="round"/>><circle cx="8" cy="8" r="6" stroke="var(--muted)" stroke-width="1.5" fill="none"/></svg>`,
              text: `Navigation: ${
                result.navigationDetected ? "Detected" : "Not detected"
              }`,
              type: "info",
            });
          }
          if (result.actualWaitTime) {
            details.push({
              icon: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="var(--muted)" stroke-width="1.5" fill="none"/><path d="M8 4v4l2 2" stroke="var(--muted)" stroke-width="1.5" stroke-linecap="round"/></svg>`,
              text: `Wait time: ${result.actualWaitTime}ms`,
              type: "info",
            });
          }
          if (result.step !== undefined) {
            details.push({
              icon: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="var(--muted)" stroke-width="1.5" fill="none"/><path d="M6 8l2 2 4-4" stroke="var(--muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
              text: `Step: ${result.step}`,
              type: "info",
            });
          }

          return `
            <div style="display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: start; padding: 12px; background: var(--bg); border: 1px solid var(--line); border-radius: 6px;">
              <div style="margin-top: 1px;">${statusIcon}</div>
              <div>
                <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: var(--ink);">${actionName}</div>
                ${
                  details.length > 0
                    ? `
                  <div style="display: grid; gap: 6px;">
                    ${details
                      .map(
                        (detail) => `
                      <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; color: ${
                        detail.type === "error"
                          ? "var(--danger)"
                          : "var(--muted)"
                      };">
                        ${detail.icon}
                        <span>${escapeHTML(detail.text)}</span>
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                `
                    : ""
                }
              </div>
              <div style="font-size: 11px; color: var(--muted); text-align: right;">Action ${
                index + 1
              }</div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function openTestModal(test) {
  const modal = document.getElementById("testModal");
  const modalContent = document.getElementById("modalContent");

  let stepsHtml = "";
  if (test.steps && test.steps.length > 0) {
    stepsHtml = `
      <div>
        <h3 style="margin: 0 0 20px 0; color: var(--ink); font-size: 16px; font-weight: 600;">Execution Details</h3>
        ${test.steps
          .map(
            (step, i) => `
            <div style="margin-bottom: 24px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                <div style="font-weight: 600; font-size: 15px; color: var(--ink);">Step ${
                  i + 1
                }: ${step.step.toUpperCase()}</div>
              </div>
              
              ${
                step.url
                  ? `
                <div style="margin-bottom: 16px; display: flex; align-items: center; gap: 8px; font-size: 13px;">
                  <span style="font-weight: 500; color: var(--muted);">URL:</span>
                  <span style="font-family: monospace; font-size: 12px; color: var(--ink); word-break: break-all;">${makeUrlsClickable(
                    step.url
                  )}</span>
                </div>
              `
                  : ""
              }
              
              <div style="margin-bottom: 16px;">
                <div style="font-weight: 500; color: var(--muted); font-size: 13px; margin-bottom: 12px;">Test Results:</div>
                <div>
                  ${
                    step.result && step.result.results
                      ? renderActionResults(step.result.results)
                      : '<div style="color: var(--muted); font-style: italic; padding: 12px; background: var(--bg); border: 1px solid var(--line); border-radius: 6px;">No detailed results available</div>'
                  }
                </div>
              </div>
              
              ${
                step.result
                  ? `
                <div style="display: flex; gap: 24px; font-size: 12px; color: var(--muted); margin-top: 12px;">
                  <span>Completed: <strong style="color: var(--ink);">${
                    step.result.completed_steps || 0
                  }/${step.result.total_steps || 0}</strong></span>
                  <span>Overall: <strong style="color: ${
                    step.result.success ? "#16a34a" : "#dc2626"
                  }">${
                      step.result.success ? "Success" : "Failed"
                    }</strong></span>
                </div>
              `
                  : ""
              }
            </div>
          `
          )
          .join("")}
      </div>
    `;
  }

  modalContent.innerHTML = `
    <div style="margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
        ${test.download ? '<div class="download-icon"></div>' : ""}
        <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: var(--ink); flex: 1;">${
          test.name
        }</h2>
      </div>
      <div style="color: var(--muted); font-size: 14px;">${
        test.category || "Uncategorized"
      }</div>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px;">
      <div>
        <div style="font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Status</div>
        <div style="display: flex; align-items: center; gap: 8px;">
          ${
            test.status
              ? `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#dcfce7"/><path d="M5 8l2 2 4-4" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
              : `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#fef2f2"/><path d="M6 6l4 4M10 6l-4 4" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
          }
          <span style="font-size: 13px; font-weight: 600; color: var(--ink);">${
            test.status ? "PASSED" : "FAILED"
          }</span>
        </div>
      </div>
      <div>
        <div style="font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Completed At</div>
        <div style="font-size: 13px; color: var(--ink);">${
          test.completedAt ? new Date(test.completedAt).toLocaleString() : "N/A"
        }</div>
      </div>
      ${
        test.downloadInfo
          ? `
        <div>
          <div style="font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Download Status</div>
          <div style="font-size: 13px; color: var(--ink); margin-bottom: 2px;">${
            test.downloadInfo.filename
          }</div>
          <div style="display: flex; align-items: center; gap: 6px;">
            ${
              test.downloadInfo.blocked
                ? `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#dcfce7"/><path d="M5 8l2 2 4-4" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
                : `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#fef2f2"/><path d="M6 6l4 4M10 6l-4 4" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
            }
            <span style="font-size: 11px; color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
              ${test.downloadInfo.blocked ? "Blocked" : "Allowed"}
            </span>
          </div>
        </div>
      `
          : ""
      }
    </div>
    
    ${
      test.description
        ? `
      <div style="margin-bottom: 32px;">
        <h3 style="margin: 0 0 12px 0; color: var(--ink); font-size: 14px; font-weight: 600;">Description</h3>
        <div style="line-height: 1.6; font-size: 14px; color: var(--muted);">${makeUrlsClickable(
          test.description
        )}</div>
      </div>
    `
        : ""
    }
    
    ${stepsHtml}
  `;

  modal.style.display = "block";
}

const STATE = {
  analysis: null,
  filters: { query: "", category: "all", status: "all" },
  showDetails: false,
};

function applyFilters({ query, category, status } = {}) {
  if (query !== undefined) STATE.filters.query = query;
  if (category !== undefined) STATE.filters.category = category;
  if (status !== undefined) STATE.filters.status = status;
  renderTable(STATE.analysis, STATE.filters);
}

document.getElementById("exportJson").addEventListener("click", () => {
  if (!STATE.analysis) return alert("No data to export");
  const blob = new Blob([JSON.stringify(STATE.analysis.results, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "squarex-security-tests.json";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("search").addEventListener("input", (e) => {
  applyFilters({ query: e.target.value });
});

document.getElementById("categorySelect").addEventListener("change", (e) => {
  applyFilters({ category: e.target.value });
});

document.getElementById("statusSelect").addEventListener("change", (e) => {
  applyFilters({ status: e.target.value });
});

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("testModal").style.display = "none";
});

window.addEventListener("click", (e) => {
  const modal = document.getElementById("testModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

async function initializeReport() {
  const data = await getTestResultsFromStorage();
  const analysis = analyzeTestResults(data);
  STATE.analysis = analysis;
  updateSummary(analysis);
  populateCategorySelectors(analysis.categories);
  drawChart(analysis.categories);
  renderTable(analysis);
}

initializeReport();

if (typeof initBrowserInfo === 'function') {
  initBrowserInfo();
}

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.catChart) {
      window.catChart.resize();
    }
  }, 200);
});
