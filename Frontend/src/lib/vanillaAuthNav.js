document.addEventListener("DOMContentLoaded", async () => {
  const signInButton = document.getElementById("sign-in-button");
  const navContainer = document.getElementById("nav-container");

  // Function to show temporary success banner
  const showSuccessBanner = (message) => {
    const banner = document.createElement("div");
    banner.textContent = message;
    banner.className = "success-banner";
    banner.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #10b981;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 1000;
      font-weight: 500;
    `;
    document.body.appendChild(banner);

    // Remove banner after 3 seconds
    setTimeout(() => {
      if (banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    }, 3000);
  };

  // Function to check user session
  const checkUserSession = async () => {
    try {
      const response = await fetch("/api/user/me", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const user = await response.json();

        // Hide Sign In button
        if (signInButton) {
          signInButton.style.display = "none";
        }

        // Create profile dropdown
        const dropdown = document.createElement("div");
        dropdown.setAttribute("tabindex", "0");
        dropdown.setAttribute("role", "menu");
        dropdown.setAttribute("aria-label", "User menu");
        dropdown.className = "profile-dropdown";
        dropdown.style.cssText = `
          position: relative;
          display: inline-block;
        `;

        // Avatar button
        const avatarButton = document.createElement("button");
        avatarButton.setAttribute("aria-haspopup", "true");
        avatarButton.setAttribute("aria-expanded", "false");
        avatarButton.className = "avatar-button";
        avatarButton.style.cssText = `
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #3b82f6;
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        `;
        avatarButton.textContent = `${user.firstName.charAt(
          0
        )}${user.lastName.charAt(0)}`;

        // Dropdown menu
        const menu = document.createElement("div");
        menu.className = "dropdown-menu";
        menu.style.cssText = `
          position: absolute;
          right: 0;
          top: 48px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          padding: 8px 0;
          min-width: 200px;
          z-index: 100;
          display: none;
        `;

        // User info section
        const userInfo = document.createElement("div");
        userInfo.style.cssText = `
          padding: 12px 16px;
          border-bottom: 1px solid #e5e7eb;
        `;

        const fullName = document.createElement("p");
        fullName.textContent = `${user.firstName} ${user.lastName}`;
        fullName.style.cssText = `
          font-weight: 600;
          color: #111827;
          margin: 0 0 4px 0;
          font-size: 14px;
        `;

        const email = document.createElement("p");
        email.textContent = user.email;
        email.style.cssText = `
          color: #6b7280;
          margin: 0;
          font-size: 14px;
        `;

        // Logout button
        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Logout";
        logoutButton.className = "logout-button";
        logoutButton.style.cssText = `
          width: 100%;
          padding: 8px 16px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          color: #374151;
          font-size: 14px;
          transition: background-color 0.15s;
        `;
        logoutButton.addEventListener("mouseenter", () => {
          logoutButton.style.backgroundColor = "#f9fafb";
        });
        logoutButton.addEventListener("mouseleave", () => {
          logoutButton.style.backgroundColor = "transparent";
        });
        logoutButton.addEventListener("click", async () => {
          try {
            await fetch("/api/user/logout", {
              method: "POST",
              credentials: "include",
            });
            location.reload();
          } catch (error) {
            console.error("Logout failed:", error);
          }
        });

        // Assemble dropdown
        userInfo.appendChild(fullName);
        userInfo.appendChild(email);
        menu.appendChild(userInfo);
        menu.appendChild(logoutButton);
        dropdown.appendChild(avatarButton);
        dropdown.appendChild(menu);

        // Toggle dropdown
        let isOpen = false;
        avatarButton.addEventListener("click", () => {
          isOpen = !isOpen;
          menu.style.display = isOpen ? "block" : "none";
          avatarButton.setAttribute("aria-expanded", isOpen.toString());
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
          if (!dropdown.contains(e.target)) {
            isOpen = false;
            menu.style.display = "none";
            avatarButton.setAttribute("aria-expanded", "false");
          }
        });

        // Keyboard navigation
        avatarButton.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            avatarButton.click();
          }
        });

        dropdown.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            isOpen = false;
            menu.style.display = "none";
            avatarButton.setAttribute("aria-expanded", "false");
            avatarButton.focus();
          }
        });

        if (navContainer) {
          navContainer.appendChild(dropdown);
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Check user session on page load
  checkUserSession();

  // Handle sign-in form submission (if exists)
  const signInForm = document.getElementById("signin-form");
  if (signInForm) {
    signInForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(signInForm);
      const email = formData.get("email");
      const password = formData.get("password");

      try {
        const response = await fetch("/api/user/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          showSuccessBanner("Login successful");
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Network error. Please try again.");
      }
    });
  }
});
