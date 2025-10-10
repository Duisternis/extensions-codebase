export function executeSingleAction(action) {
  function waitForElement(selector, timeout = 3000) {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        const element = document.querySelector(selector);
        if (element) {
          clearInterval(checkInterval);
          clearTimeout(timeoutId);
          resolve(true);
        }
      }, 100);

      const timeoutId = setTimeout(() => {
        clearInterval(checkInterval);
        resolve(false);
      }, timeout);
    });
  }

  function normalize(str) {
    return str.replace(/\s+/g, " ").trim();
  }

  function waitForShadowElement(hostSelector, shadowSelector, timeout = 3000) {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        const host = document.querySelector(hostSelector);
        const shadowElement = host?.shadowRoot?.querySelector(shadowSelector);

        if (shadowElement) {
          clearInterval(checkInterval);
          clearTimeout(timeoutId);
          resolve(true);
        }
      }, 100);

      const timeoutId = setTimeout(() => {
        clearInterval(checkInterval);
        resolve(false);
      }, timeout);
    });
  }

  function listTableRows() {
    const rows = [...document.querySelectorAll("tr")];
    const data = rows.map((row) => {
      return [...row.querySelectorAll("td, th")].map((cell) =>
        cell.innerText.trim()
      );
    });
    console.log("Table rows:", data);
    return data;
  }

  function simulateFileDrop(files) {
    if (!Array.isArray(files)) files = [files];
    const dt = new DataTransfer();
    files.forEach((file) => dt.items.add(file));

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const target = document.elementFromPoint(centerX, centerY);
    if (!target) {
      console.error("No drop target found at center of screen.");
      return;
    }
    console.log(
      `Uploading to: ${target.tagName}${target.id ? "#" + target.id : ""}${
        target.className ? "." + target.className.split(" ")[0] : ""
      }`
    );
    ["dragenter", "dragover", "drop"].forEach((eventType) => {
      const event = new DragEvent(eventType, {
        bubbles: true,
        cancelable: true,
        clientX: centerX,
        clientY: centerY,
        dataTransfer: dt,
      });
      target.dispatchEvent(event);
    });
  }

  function generateHash(length = 8) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  return new Promise(async (resolve) => {
    const actionResult = { action: action.action, success: false };

    window.focus();

    switch (action.action) {
      case "click":
        const clickElement = document.querySelector(action.selector);
        if (clickElement.target) clickElement.target = "_self";
        if (clickElement) {
          if (action.preventDefault) {
            const clickHandler = (e) => e.preventDefault();
            clickElement.addEventListener("click", clickHandler, {
              once: true,
            });
          }
          clickElement.click();
          actionResult.success = true;
        } else {
          actionResult.error = `Element not found: ${action.selector}`;
        }
        break;

      case "type":
        const typeElement = document.querySelector(action.selector);
        if (typeElement) {
          typeElement.focus();
          typeElement.value = action.value || "";
          typeElement.dispatchEvent(new Event("input", { bubbles: true }));
          typeElement.dispatchEvent(new Event("change", { bubbles: true }));
          actionResult.success = true;
        } else {
          actionResult.error = `Element not found: ${action.selector}`;
        }
        break;

      case "check_clipboard":
        try {
          const clipboardText = await navigator.clipboard.readText();

          if (normalize(clipboardText) === normalize(action.value)) {
            actionResult.success = true;
          } else {
            actionResult.success = false;
            actionResult.error = `Clipboard value mismatch. Expected: "${action.value}", Got: "${clipboardText}"`;
          }
        } catch (err) {
          actionResult.success = false;
          actionResult.error = `Failed to read clipboard: ${err.message}`;
        }
        break;

      case "wait_for_element":
        actionResult.success = await waitForElement(
          action.selector,
          action.timeout || 3000,
          action.success_result ?? true
        );
        if (!actionResult.success) {
          actionResult.error = `Element not found within timeout: ${action.selector}`;
        }
        break;

      case "wait_for_shadow":
        actionResult.success = await waitForShadowElement(
          action.host_selector,
          action.shadow_selector,
          action.timeout || 3000
        );
        if (!actionResult.success) {
          actionResult.error = `Shadow element not found within timeout`;
        }
        break;

      case "check":
        const checkElement = document.querySelector(action.selector);
        if (checkElement) {
          const rawText =
            "value" in checkElement
              ? checkElement.value
              : checkElement.textContent;
          const text = normalize(rawText.trim());

          if (!action.expected || text === action.expected) {
            actionResult.success = true;
          } else {
            actionResult.error = `Expected "${action.expected}", got "${text}"`;
          }
        } else {
          actionResult.error = `Element not found: ${action.selector}`;
        }
        break;

      case "paste":
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));

          const pasteElement = document.querySelector(action.selector);

          if (!pasteElement) {
            actionResult.success = false;
            actionResult.error = `Element not found: ${action.selector}`;
            break;
          }

          pasteElement.focus();

          const clipboardText = action.data || await navigator.clipboard.readText();

          const pasteEvent = new ClipboardEvent("paste", {
            bubbles: true,
            cancelable: true,
            clipboardData: new DataTransfer(),
          });
          pasteEvent.clipboardData.setData("text/plain", clipboardText);
          pasteElement.dispatchEvent(pasteEvent);

          await new Promise((resolve) => setTimeout(resolve, 500));

          if (!pasteElement.value) {
            pasteElement.value = clipboardText;
            pasteElement.dispatchEvent(new Event("input", { bubbles: true }));
            pasteElement.dispatchEvent(new Event("change", { bubbles: true }));
          }

          actionResult.success = true;
        } catch (err) {
          actionResult.success = false;
          actionResult.error = `Failed to paste: ${err.message}`;
        }
        break;

      case "wait":
        await new Promise((resolve) =>
          setTimeout(resolve, action.duration || 1000)
        );
        actionResult.success = true;
        break;

      case "check_redirect":
        const originalUrl = document.referrer || "unknown";
        const currentUrl = window.location.href;

        if (originalUrl && originalUrl !== currentUrl) {
          try {
            const urlRegex = new RegExp(action.expectedUrl);
            if (urlRegex.test(currentUrl)) {
              actionResult.success = true;
            } else {
              actionResult.error = `Redirect mismatch. Current URL: ${currentUrl}`;
            }
          } catch (e) {
            actionResult.error = `Invalid regex pattern: ${e.message}`;
          }
        } else {
          actionResult.error = `No redirect detected (referrer: ${originalUrl}, current: ${currentUrl})`;
        }
        break;

      case "check_print_block":
        try {
          const legitimateHiddenElements = [
            "docos-pane",
            "docs-editor-container",
            "apps-shortcutshelppopup",
            "CSS_SHORTCUTS_HELP_POPUP",
            "docs-link-smartinsertlinkbubble",
            "docstext-unprintable",
            "docs-calloutbubble-anchor",
            "docsLinkSmartinsertlinkBubble",
          ];

          const allStyles = document.querySelectorAll(
            'style, link[rel="stylesheet"]'
          );
          const resultsObj = {
            printBlocked: false,
            suspiciousRules: [],
            legitimateRules: [],
          };

          allStyles.forEach((element) => {
            try {
              if (element.sheet) {
                const rules = element.sheet.cssRules || element.sheet.rules;
                for (let rule of rules) {
                  if (rule.media && rule.media.mediaText.includes("print")) {
                    const cssText = rule.cssText;

                    if (
                      /display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0/.test(
                        cssText
                      )
                    ) {
                      const isLegit = legitimateHiddenElements.some((e) =>
                        cssText.includes(e)
                      );

                      if (isLegit) {
                        resultsObj.legitimateRules.push(cssText);
                      } else {
                        resultsObj.suspiciousRules.push(cssText);

                        if (
                          /html, body, \*|\* \{ display: none|body \{ display: none|\.kix-page|#contents/.test(
                            cssText
                          )
                        ) {
                          resultsObj.printBlocked = true;
                        }
                      }
                    }
                  }
                }
              }
            } catch (e) {
              /* ignore cross-origin */
            }
          });

          actionResult.success = resultsObj.printBlocked;
          actionResult.data = resultsObj;
          if (resultsObj.printBlocked) {
            actionResult.error = "Print blocking detected!";
          }
        } catch (err) {
          actionResult.success = false;
          actionResult.error = `Failed to check print blocking: ${err.message}`;
        }
        break;

      case "check_upload":
        try {
          const hash = generateHash();
          const filename = `sim_${hash}.txt`;

          console.log(`Generated filename: ${filename}`);

          const testFile = new File(
            [action.content || "Hello World!"],
            filename,
            { type: "text/plain" }
          );

          simulateFileDrop(testFile);

          console.log(`Uploading file: ${filename}`);

          await new Promise((resolve) => setTimeout(resolve, 7000));

          const tableData = listTableRows();
          let fileFound = false;

          for (const row of tableData) {
            for (const cell of row) {
              if (cell.includes(filename) || cell.includes(`sim_${hash}`)) {
                fileFound = true;
                console.log(`File found in table: ${filename}`);
                break;
              }
            }
            if (fileFound) break;
          }

          if (fileFound) {
            actionResult.success = true;
            actionResult.data = { filename, hash, tableData };
          } else {
            actionResult.success = false;
            actionResult.error = `File ${filename} not found in table after upload`;
            actionResult.data = { filename, hash, tableData };
          }
        } catch (err) {
          actionResult.success = false;
          actionResult.error = `Failed to check upload: ${err.message}`;
        }
        break;

      case "upload_file":
        try {
          const input = document.querySelector(
            action.selector || 'input[type="file"]'
          );

          if (!input) {
            actionResult.success = false;
            actionResult.error = `File input not found: ${
              action.selector || 'input[type="file"]'
            }`;
            break;
          }

          const file = new File(
            [action.filecontent || ""],
            action.filename || "dummy.png",
            {
              type: action.filetype || "image/png",
            }
          );

          const dt = new DataTransfer();
          dt.items.add(file);
          input.files = dt.files;
          input.dispatchEvent(new Event("change", { bubbles: true }));

          actionResult.success = true;
        } catch (err) {
          actionResult.success = false;
          actionResult.error = `Failed to upload dummy file: ${err.message}`;
        }
        break;

      default:
        actionResult.error = `Unknown action: ${action.action}`;
    }

    if (action.success_result === false)
      actionResult.success = !actionResult.success;

    resolve({
      success: actionResult.success,
      result: actionResult,
    });
  });
}
