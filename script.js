const nameInput = document.getElementById('nameInput');
const aboutInput = document.getElementById('aboutInput');
const projectsInput = document.getElementById('projectsInput');
const contactInput = document.getElementById('contactInput');

const previewName = document.getElementById('previewName');
const previewAbout = document.getElementById('previewAbout');
const previewProjects = document.getElementById('previewProjects');
const previewContact = document.getElementById('previewContact');

const themeSelector = document.getElementById('theme-selector');
const previewBox = document.getElementById('portfolio-preview');

const downloadBtn = document.getElementById('download-btn');

// Live Preview
nameInput.addEventListener('input', () => previewName.textContent = nameInput.value || "Your Name");
aboutInput.addEventListener('input', () => previewAbout.textContent = aboutInput.value || "Write something about yourself");

projectsInput.addEventListener('input', () => {
  const projects = projectsInput.value.split(',').map(p => p.trim()).filter(p => p);
  if (!projects.length) return previewProjects.innerHTML = "Your projects will appear here";
  previewProjects.innerHTML = projects.map(p => `<div class="project-card">${p}</div>`).join('');
});

contactInput.addEventListener('input', () => previewContact.textContent = contactInput.value || "Your contact info");

themeSelector.addEventListener('change', () => previewBox.className = 'portfolio-preview ' + themeSelector.value);

// Download Portfolio
downloadBtn.addEventListener('click', () => {
  const zip = new JSZip();

  const projectsHTML = projectsInput.value.split(',').map(p => `<div class="project-card">${p.trim()}</div>`).join('');

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${nameInput.value || "Portfolio"}</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<nav>
  <a href="#home">Home</a>
  <a href="#about">Credit</a>
  <a href="#contact">Contact</a>
</nav>

<section id="home" class="portfolio-preview ${themeSelector.value}">
  <div class="box-section">
    <h3>${nameInput.value}</h3>
    <p>${aboutInput.value}</p>
  </div>
  <div class="box-section">
    <h3>Projects</h3>
    <div class="projects-container">
      ${projectsHTML}
    </div>
  </div>
  <div class="box-section">
    <h3>Contact</h3>
    <p>${contactInput.value}</p>
  </div>
</section>

<section id="about">
  <h2 style="color: rgb(0, 0, 0); font-size: large;">About This Generator</h2>
  <p style="color: rgb(0, 0, 0); font-size: large;">This Portfolio Generator lets you create a complete portfolio website quickly. Fill in your details, preview your portfolio, and download it!
The Personal Portfolio Website Generator is a simple and easy-to-use tool that helps students and professionals create a personal portfolio website without writing code.
Users can enter their personal and professional details, choose a theme, preview the site live, and download ready-to-use HTML, CSS, and JS files.
This project is perfect for beginners, students, or anyone who wants a professional online presence quickly.</p></section>


<section id="contact">
  <h2>Contact</h2>
  <p>Email: ${contactInput.value}</p>
</section>
</body>
</html>
  `;

  const cssContent = `
body { font-family: Arial, sans-serif; margin:0; padding:0; scroll-behavior:smooth; }
nav { background:#333; color:#fff; display:flex; justify-content:center; padding:10px 0; position:sticky; top:0; }
nav a { color:#fff; text-decoration:none; margin:0 20px; font-weight:bold; }
nav a:hover { text-decoration:underline; }
section { padding:40px 20px; }
h1,h2,h3 { margin:0 0 10px 0; text-align:center; }
.portfolio-preview { text-align:center; }
.box-section { border:1px solid #ccc; padding:15px; border-radius:8px; margin:15px 0; }
.projects-container { display:flex; gap:15px; overflow-x:auto; padding:10px 0; }
.project-card { min-width:200px; border:1px solid #aaa; border-radius:8px; padding:10px; background-color:#fff; flex-shrink:0; box-shadow:0 2px 5px rgba(0,0,0,0.1); }
${themeSelector.value === 'modern-dark' ? `.box-section { background-color:#1e1e1e; color:#f0f0f0; }` :
themeSelector.value === 'classic-light' ? `.box-section { background-color:#fff; color:#333; }` :
`.box-section { background:linear-gradient(135deg, #ff6b6b, #f7d794); color:#1a1a1a; }`}
`;

  zip.file("index.html", htmlContent);
  zip.file("style.css", cssContent);

  zip.generateAsync({ type: "blob" }).then(content => saveAs(content, "portfolio.zip"));
});
