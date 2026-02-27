document.addEventListener("DOMContentLoaded", () => {
  // Form elements
  const form = document.getElementById("analysis-form");
  const captionInput = document.getElementById("caption");
  const charCount = document.getElementById("char-count");
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");
  const statusMessage = document.getElementById("status-message");

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      themeToggle.textContent = '🌙';
    } else {
      themeToggle.textContent = '🌞';
    }
  }

  // Initialize theme
  (function() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved) {
      setTheme(saved);
    } else if (prefersDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  })();

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Display elements
  const placeholder = document.getElementById("placeholder");
  const resultsBlock = document.getElementById("results");

  // Media preview elements
  const mediaInput = document.getElementById("media");
  const useDemoBtn = document.getElementById("use-demo-btn");
  const mediaPreview = document.getElementById("media-preview");
  const previewVideo = document.getElementById("preview-video");
  const previewImage = document.getElementById("preview-image");

  // Score elements
  const deceptionScoreEl = document.getElementById("deception-score");
  const deceptionBarEl = document.getElementById("deception-bar");
  const deceptionLabelEl = document.getElementById("deception-label");

  const consistencyScoreEl = document.getElementById("consistency-score");
  const consistencyBarEl = document.getElementById("consistency-bar");
  const consistencyLabelEl = document.getElementById("consistency-label");

  // Other result elements
  const explanationsList = document.getElementById("explanations-list");
  const mediaSummaryText = document.getElementById("media-summary-text");
  const linkSummary = document.getElementById("link-summary");

  /**
   * Update character counter for caption textarea
   */
  captionInput.addEventListener("input", () => {
    charCount.textContent = captionInput.value.length;
  });

  /**
   * Set status message with appropriate styling
   */
  function setStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.classList.remove("error", "success");
    if (type === "error") {
      statusMessage.classList.add("error");
    } else if (type === "success") {
      statusMessage.classList.add("success");
    }
  }

  /**
   * Get human-readable description for deception score
   */
  function describeDeception(score) {
    if (score <= 30) return "⚠️ Low suspicion of deception.";
    if (score <= 70) return "⚠️ Moderate risk – review the post carefully.";
    return "🚨 High risk – caption may misrepresent the image.";
  }

  /**
   * Get human-readable description for consistency score
   */
  function describeConsistency(score) {
    if (score >= 70) return "✓ Caption appears broadly consistent with the image.";
    if (score >= 40) return "⚠️ Some inconsistencies may be present.";
    return "⚠️ Low consistency – caption may not match the image well.";
  }

  /**
   * Reset form and results
   */
  function resetForm() {
    form.reset();
    charCount.textContent = "0";
    placeholder.classList.remove("hidden");
    resultsBlock.classList.add("hidden");
    statusMessage.textContent = "";
    statusMessage.classList.remove("error", "success");
    submitBtn.disabled = false;
    submitBtn.querySelector(".button-text").textContent = "Analyze Post";
    submitBtn.querySelector(".spinner").classList.add("hidden");
  }

  /**
   * Show loading state on button
   */
  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    const buttonText = submitBtn.querySelector(".button-text");
    const spinner = submitBtn.querySelector(".spinner");
    if (isLoading) {
      buttonText.textContent = "Analyzing...";
      spinner.classList.remove("hidden");
    } else {
      buttonText.textContent = "Analyze Post";
      spinner.classList.add("hidden");
    }
  }

  /**
   * Update score bars and labels with animation
   */
  function updateScoreDisplay(deceptionScore, consistencyScore) {
    // Deception score
    deceptionScoreEl.textContent = deceptionScore;
    deceptionBarEl.setAttribute("aria-valuenow", deceptionScore);
    deceptionBarEl.style.width = `${deceptionScore}%`;
    deceptionLabelEl.textContent = describeDeception(deceptionScore);

    // Consistency score
    consistencyScoreEl.textContent = consistencyScore;
    consistencyBarEl.setAttribute("aria-valuenow", consistencyScore);
    consistencyBarEl.style.width = `${consistencyScore}%`;
    consistencyLabelEl.textContent = describeConsistency(consistencyScore);
  }

  /**
   * Click handler for reset button
   */
  resetBtn.addEventListener("click", resetForm);

  /**
   * Form submission handler
   */
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get form inputs
    const linkInput = document.getElementById("link_url");

    // Client-side validation
    if (!mediaInput.files || mediaInput.files.length === 0) {
      setStatus("Please select a photo or video file.", "error");
      mediaInput.focus();
      return;
    }

    if (!captionInput.value.trim()) {
      setStatus("Please enter a caption for the post.", "error");
      captionInput.focus();
      return;
    }

    // Check file size (50MB limit)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (mediaInput.files[0].size > MAX_SIZE) {
      setStatus("File is too large (maximum 50MB).", "error");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("media", mediaInput.files[0]);
    formData.append("caption", captionInput.value.trim());
    if (linkInput && linkInput.value.trim()) {
      formData.append("link_url", linkInput.value.trim());
    }

    // Show loading state
    setLoading(true);
    setStatus("Analyzing post…", "success");

    try {
      // Send request to server
      const response = await fetch("/analyze", {
        method: "POST",
        body: formData,
      });

      // Handle server error response
      if (!response.ok) {
        let errorMsg = "Something went wrong while analyzing the post.";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch (e) {
          // JSON parse failed, use default message
        }
        setStatus(errorMsg, "error");
        setLoading(false);
        return;
      }

      // Parse and display results
      const data = await response.json();

      const deceptionScore = Math.round(data.deception_score ?? 0);
      const consistencyScore = Math.round(data.consistency_score ?? 0);

      const mediaType = data.media_type || "unknown";
      const mediaFilename = data.media_filename || "(unknown file)";
      const linkUrl = data.link_url || "";

      // Update score displays
      updateScoreDisplay(deceptionScore, consistencyScore);

      // Update media summary
      let mediaLabel = "📎 Media type: " + mediaType;
      mediaLabel += " • File: " + mediaFilename;
      mediaSummaryText.textContent = mediaLabel;

      // Update external link if present
      if (linkUrl) {
        try {
          const url = new URL(linkUrl);
          linkSummary.textContent = url.hostname;
        } catch (e) {
          linkSummary.textContent = linkUrl;
        }
        linkSummary.href = linkUrl;
        linkSummary.classList.remove("hidden");
      } else {
        linkSummary.textContent = "";
        linkSummary.href = "#";
        linkSummary.classList.add("hidden");
      }

      // Update explanations
      explanationsList.innerHTML = "";
      if (Array.isArray(data.explanations)) {
        data.explanations.forEach((text) => {
          const li = document.createElement("li");
          li.textContent = text;
          li.role = "listitem";
          explanationsList.appendChild(li);
        });
      }

      // Show results section
      placeholder.classList.add("hidden");
      resultsBlock.classList.remove("hidden");

      // Success message
      setStatus("✓ Analysis complete.", "success");
    } catch (error) {
      console.error("Error:", error);
      setStatus("Unable to reach the server. Make sure the Flask app is running.", "error");
    } finally {
      setLoading(false);
    }
  });

  /**
   * Show preview for selected file (image or video)
   */
  function showPreviewFile(file) {
    mediaPreview.setAttribute('aria-hidden', 'false');
    previewVideo.classList.add('hidden');
    previewImage.classList.add('hidden');

    if (!file) return;

    const type = file.type || '';
    const url = URL.createObjectURL(file);

    if (type.startsWith('video/')) {
      previewVideo.src = url;
      previewVideo.classList.remove('hidden');
      previewVideo.load();
    } else if (type.startsWith('image/')) {
      previewImage.src = url;
      previewImage.classList.remove('hidden');
    }
  }

  // Update preview when user picks a file
  mediaInput.addEventListener('change', () => {
    const f = mediaInput.files && mediaInput.files[0];
    showPreviewFile(f);
  });

  // Use demo video: fetch from static/uploads/whatsapp_demo.mp4 and attach to file input
  useDemoBtn.addEventListener('click', async () => {
    const demoPath = '/static/uploads/whatsapp_demo.mp4';
    setStatus('Loading demo video…', 'success');
    try {
      const resp = await fetch(demoPath);
      if (!resp.ok) {
        throw new Error('Demo file not found. Please copy your WhatsApp video to static/uploads/whatsapp_demo.mp4');
      }
      const blob = await resp.blob();
      const filename = 'whatsapp_demo.mp4';
      const demoFile = new File([blob], filename, { type: blob.type });

      // Create a DataTransfer and set the file input's files
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(demoFile);
      mediaInput.files = dataTransfer.files;

      // Show preview and clear previous status
      showPreviewFile(demoFile);
      setStatus('Demo video loaded. Ready to analyze.', 'success');
    } catch (err) {
      console.error(err);
      setStatus(err.message || 'Failed to load demo video.', 'error');
    }
  });
});

