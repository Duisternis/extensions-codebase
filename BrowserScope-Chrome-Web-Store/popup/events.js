import { config } from "./api.js";
import { getAllSystemInfo } from "../background/postureInfo.js";

export function addEventListenersToSelectionPage() {
  const selectAllCheckbox = document.getElementById("selectAllCheckbox");
  const testCheckboxes = document.querySelectorAll(".test-checkbox");

  selectAllCheckbox.addEventListener("change", () => {
    const isChecked = selectAllCheckbox.checked;
    testCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  });

  testCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const allChecked = Array.from(testCheckboxes).every((cb) => cb.checked);
      selectAllCheckbox.checked = allChecked;
    });
  });

  const runTestsButton = document.querySelector(".run-tests-button-simple");
  const alertMessage = document.querySelector("#alert-message");

  runTestsButton.addEventListener("click", async () => {
    const selectedCategories = Array.from(testCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.dataset.testValue);

    if (selectedCategories.length === 0) {
      alert("Please select at least one test to run");
      return;
    }

    runTestsButton.innerHTML = `<div class="spinner-small" style="width: 19px; height: 19px; margin: auto;"></div>`;
    alertMessage.style.display = "block";

    const selectedTests = config
      .filter((test) =>
        selectedCategories.includes(test.category || "Uncategorized")
      )
      .map((test) => test.name.toLowerCase().replace(/\s+/g, "_"));

    console.log("Running tests from categories:", selectedCategories);
    console.log("Selected tests:", selectedTests);

    const a = await getAllSystemInfo();
    console.log(a);
    chrome.storage.local.set({ postureResults: a });

    chrome.runtime.sendMessage(
      {
        action: "startTests",
        selectedTests: selectedTests,
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.log(response);
          console.error("Error starting tests:", chrome.runtime.lastError);
          alert("Failed to start tests. Please try again.");
          return;
        }
      }
    );
  });
}
