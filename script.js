document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
  
    loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const nim = document.getElementById("nim").value;
      const role = document.getElementById("role").value;
  
      // Simulate login validation
      fetch("data/database.json")
        .then((response) => response.json())
        .then((data) => {
          const user = data.users.find((u) => u.nim === nim && u.role === role);
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "dashboard.html";
          } else {
            alert("Invalid credentials!");
          }
        });
    });
  
    if (window.location.pathname.includes("dashboard.html")) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        document.getElementById("username").textContent = user.name;
      } else {
        window.location.href = "login.html";
      }
    }
  });
  
  function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  }
  function showPage(page) {
    const content = document.getElementById("content");
    content.innerHTML = ""; // Reset content area
  
    switch (page) {
      case "kenalan":
        fetch("data/database.json")
          .then((response) => response.json())
          .then((data) => {
            const members = data.class_structure;
            const html = members
              .map(
                (member) => `
              <div class="member">
                <img src="${member.photo}" alt="${member.name}" class="member-photo">
                <h3>${member.name}</h3>
                <p>Asal: ${member.origin}</p>
                <p>Jabatan: ${member.position}</p>
                <p>Telepon: ${member.phone}</p>
              </div>
            `
              )
              .join("");
            content.innerHTML = `<h2>Struktur Kelas</h2>${html}`;
          });
        break;
  
      case "moment":
        content.innerHTML = `
          <h2>Moment</h2>
          <p>Klik link di bawah untuk melihat dokumentasi kelas:</p>
          <a href="https://drive.google.com/drive/folders/1-2lYqFhY7MKGZ32hZBX56HZPhn6ruvAS" target="_blank" class="moment-link">Google Drive</a>
        `;
        break;
  
      case "kuliah":
        fetch("data/database.json")
          .then((response) => response.json())
          .then((data) => {
            const schedule = data.schedule;
            const html = schedule
              .map((day) => {
                const subjectsHtml = day.subjects
                  .map(
                    (subject) => `
                  <div class="subject">
                    <h4>${subject.name} (${subject.time})</h4>
                    <p>Tugas: ${
                      subject.tasks
                        ? `<a href="https://drive.google.com/drive/folders/1u0RLHVbKSh254aLleZHW_3cl-r-idKk3?usp=sharing${subject.drive_link}" target="_blank">Ada tugas, klik untuk pengumpulan</a> (Deadline: ${subject.deadline})`
                        : "Tidak ada tugas"
                    }</p>
                  </div>
                `
                  )
                  .join("");
                return `
                <div class="day">
                  <h3>${day.day}</h3>
                  ${subjectsHtml}
                </div>
              `;
              })
              .join("");
            content.innerHTML = `<h2>Jadwal Kuliah</h2>${html}`;
          });
        break;
  
      default:
        content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
    }
  }
  function showPage(page) {
    const content = document.getElementById("content");
    content.scrollIntoView({ behavior: "smooth" }); // Scroll ke atas setiap kali menu diklik
    content.innerHTML = ""; // Reset konten
  
    switch (page) {
      case "kenalan":
        fetch("data/database.json")
          .then((response) => response.json())
          .then((data) => {
            const members = data.class_structure;
            const html = members
              .map(
                (member) => `
              <div class="member">
                <img src="${member.photo}" alt="${member.name}" class="member-photo">
                <div>
                  <h3>${member.name}</h3>
                  <p><strong>Asal:</strong> ${member.origin}</p>
                  <p><strong>Jabatan:</strong> ${member.position}</p>
                  <p><strong>Telepon:</strong> ${member.phone}</p>
                </div>
              </div>
            `
              )
              .join("");
            content.innerHTML = `<h2>Struktur Kelas</h2>${html}`;
          });
        break;
  
      case "moment":
        content.innerHTML = `
          <h2>Moment</h2>
          <p>Klik link di bawah untuk melihat dokumentasi kelas:</p>
          <a href="https://drive.google.com/drive/folders/1-2lYqFhY7MKGZ32hZBX56HZPhn6ruvAS" target="_blank" class="moment-link">Google Drive</a>
        `;
        break;
  
      case "kuliah":
        fetch("data/database.json")
          .then((response) => response.json())
          .then((data) => {
            const schedule = data.schedule;
            const html = schedule
              .map((day) => {
                const subjectsHtml = day.subjects
                  .map(
                    (subject) => `
                  <div class="subject">
                    <h4>${subject.name} (${subject.time})</h4>
                    <p><strong>Tugas:</strong> ${
                      subject.tasks
                        ? `<a href="${subject.drive_link}" target="_blank">Ada tugas, klik untuk pengumpulan</a> (Deadline: ${subject.deadline})`
                        : "Tidak ada tugas"
                    }</p>
                  </div>
                `
                  )
                  .join("");
                return `
                <div class="day">
                  <h3>${day.day}</h3>
                  ${subjectsHtml}
                </div>
              `;
              })
              .join("");
            content.innerHTML = `<h2>Jadwal Kuliah</h2>${html}`;
          });
        break;
  
      default:
        content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
    }
  }
