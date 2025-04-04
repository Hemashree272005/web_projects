// Show alert function
function showAlert(message, type = 'info') {
    const alert = document.getElementById('alert');
    const alertIcon = alert.querySelector('.alert-icon');
    const alertMessage = alert.querySelector('.alert-message');
    
    // Set message
    alertMessage.textContent = message;
    
    // Remove previous classes
    alert.classList.remove('alert-success', 'alert-info', 'alert-warning');
    
    // Set icon and class based on type
    if (type === 'success') {
        alertIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        alert.classList.add('alert-success');
    } else if (type === 'warning') {
        alertIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        alert.classList.add('alert-warning');
    } else {
        alertIcon.innerHTML = '<i class="fas fa-info-circle"></i>';
        alert.classList.add('alert-info');
    }
    
    // Show the alert
    alert.classList.add('show');
    
    // Hide alert after 3 seconds
    setTimeout(() => {
        alert.classList.remove('show');
    }, 3000);
}

// Welcome message when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        showAlert('Welcome to my portfolio website!', 'success');
    }, 1000);
});
// Form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    showAlert('Thank you for your message! I\'ll get back to you soon.', 'success');
    this.reset();
});

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a, .hero-buttons a, .footer-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Show project code function
function showProjectCode(projectId) {
    // You would typically fetch this from an API or have it pre-loaded
    const projectCodes = {
        1: "// E-Commerce Platform Code\n\nconst express = require('express');\nconst app = express();\nconst mongoose = require('mongoose');\n\n// Product Model\nconst Product = mongoose.model('Product', {\n  name: String,\n  price: Number,\n  description: String,\n  image: String\n});\n\n// Routes\napp.get('/api/products', async (req, res) => {\n  const products = await Product.find();\n  res.json(products);\n});\n\napp.listen(3000, () => console.log('Server running on port 3000'));",
        2: "// Weather Dashboard Code\n\nconst API_KEY = 'your_api_key';\n\nasync function getWeather(city) {\n  const response = await fetch(\n    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`\n  );\n  const data = await response.json();\n  \n  updateUI(data);\n}\n\nfunction updateUI(data) {\n  document.querySelector('.city-name').textContent = data.name;\n  document.querySelector('.temperature').textContent = `${Math.round(data.main.temp)}°C`;\n  document.querySelector('.weather-description').textContent = data.weather[0].description;\n}",
        3: "// Task Management App Code\n\nimport React, { useState, useEffect } from 'react';\nimport { db } from './firebase';\n\nfunction TaskApp() {\n  const [tasks, setTasks] = useState([]);\n  const [newTask, setNewTask] = useState('');\n  \n  useEffect(() => {\n    db.collection('tasks').onSnapshot(snapshot => {\n      setTasks(snapshot.docs.map(doc => ({\n        id: doc.id,\n        task: doc.data().task,\n        completed: doc.data().completed\n      })));\n    });\n  }, []);\n  \n  const addTask = e => {\n    e.preventDefault();\n    \n    db.collection('tasks').add({\n      task: newTask,\n      completed: false,\n      timestamp: new Date()\n    });\n    \n    setNewTask('');\n  };\n  \n  return (\n    <div className=\"app\">\n      <h1>Task Manager</h1>\n      <form onSubmit={addTask}>\n        <input \n          value={newTask} \n          onChange={e => setNewTask(e.target.value)} \n          placeholder=\"Add a task\"\n        />\n        <button type=\"submit\">Add</button>\n      </form>\n      <ul>\n        {tasks.map(task => (\n          <li key={task.id} className={task.completed ? 'completed' : ''}>\n            {task.task}\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}",
        4: "// Portfolio Website Code\n\n// Navigation toggle for mobile\nconst navToggle = document.querySelector('.nav-toggle');\nconst navLinks = document.querySelector('.nav-links');\n\nnavToggle.addEventListener('click', () => {\n  navLinks.classList.toggle('show');\n});\n\n// Project filter\nconst filterButtons = document.querySelectorAll('.filter-btn');\nconst projects = document.querySelectorAll('.project');\n\nfilterButtons.forEach(button => {\n  button.addEventListener('click', () => {\n    // Remove active class from all buttons\n    filterButtons.forEach(btn => btn.classList.remove('active'));\n    \n    // Add active class to clicked button\n    button.classList.add('active');\n    \n    const filter = button.dataset.filter;\n    \n    projects.forEach(project => {\n      if (filter === 'all' || project.dataset.category === filter) {\n        project.style.display = 'block';\n      } else {\n        project.style.display = 'none';\n      }\n    });\n  });\n});",
        5: "// Blog Platform Code\n\nconst express = require('express');\nconst mongoose = require('mongoose');\nconst app = express();\n\n// Blog post model\nconst Post = mongoose.model('Post', {\n  title: String,\n  content: String,\n  author: String,\n  date: { type: Date, default: Date.now },\n  comments: [{ \n    user: String, \n    text: String, \n    date: { type: Date, default: Date.now } \n  }]\n});\n\n// Get all posts\napp.get('/api/posts', async (req, res) => {\n  try {\n    const posts = await Post.find().sort({ date: -1 });\n    res.json(posts);\n  } catch (err) {\n    res.status(500).json({ message: err.message });\n  }\n});\n\n// Add a new post\napp.post('/api/posts', async (req, res) => {\n  const post = new Post({\n    title: req.body.title,\n    content: req.body.content,\n    author: req.body.author\n  });\n  \n  try {\n    const newPost = await post.save();\n    res.status(201).json(newPost);\n  } catch (err) {\n    res.status(400).json({ message: err.message });\n  }\n});"
    };

    if (projectCodes[projectId]) {
        // Create modal for code display
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        modal.style.zIndex = '1000';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.padding = '20px';

        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = '#fff';
        modalContent.style.borderRadius = '10px';
        modalContent.style.width = '80%';
        modalContent.style.maxWidth = '800px';
        modalContent.style.maxHeight = '80%';
        modalContent.style.overflow = 'auto';
        modalContent.style.position = 'relative';
        modalContent.style.padding = '20px';

        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.border = 'none';
        closeButton.style.background = 'none';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = '#333';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        const pre = document.createElement('pre');
        pre.style.backgroundColor = '#f7f7f7';
        pre.style.padding = '15px';
        pre.style.borderRadius = '5px';
        pre.style.overflow = 'auto';
        pre.style.fontFamily = 'monospace';
        pre.textContent = projectCodes[projectId];

        modalContent.appendChild(closeButton);
        modalContent.appendChild(pre);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Show alert
        showAlert('Project code loaded successfully!', 'info');
    } else {
        showAlert('Project code not available', 'warning');
    }
}

// Section visibility animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section > .container > *:not(.section-title)').forEach(section => {
    observer.observe(section);
});

// Easter egg - type "hemashree" anywhere to show a special message
let keys = [];
const secretCode = "hemashree";

window.addEventListener('keyup', e => {
    keys.push(e.key.toLowerCase());
    keys = keys.slice(-secretCode.length);
    
    if (keys.join('') === secretCode) {
        showAlert('You found the secret! Thanks for visiting my portfolio!', 'success');
        
        // Add confetti effect (simple version)
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.borderRadius = '50%';
            confetti.style.top = '-10px';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            document.body.appendChild(confetti);
            
            // Animate falling
            const animation = confetti.animate(
                [
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                ],
                {
                    duration: 1000 + Math.random() * 3000,
                    easing: 'cubic-bezier(0.1, 0.25, 1, 1)'
                }
            );
            
            animation.onfinish = () => {
                document.body.removeChild(confetti);
            };
        }
    }
});

// Display different alerts based on sections scrolled to
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    const sections = {
        projects: document.getElementById('projects'),
        skills: document.getElementById('skills'),
        contact: document.getElementById('contact')
    };
    
    if (sections.projects && scrollPosition > sections.projects.offsetTop && scrollPosition < (sections.projects.offsetTop + sections.projects.offsetHeight)) {
        if (!sections.projects.getAttribute('data-alert-shown')) {
            showAlert('Check out my projects! Click on "View Code" to see the implementation details.', 'info');
            sections.projects.setAttribute('data-alert-shown', 'true');
        }
    }
    
    if (sections.contact && scrollPosition > sections.contact.offsetTop) {
        if (!sections.contact.getAttribute('data-alert-shown')) {
            showAlert('Feel free to reach out! I\'d love to hear from you.', 'info');
            sections.contact.setAttribute('data-alert-shown', 'true');
        }
    }
});

// Reset alert flags when page reloads
window.addEventListener('beforeunload', () => {
    document.querySelectorAll('[data-alert-shown]').forEach(el => {
        el.removeAttribute('data-alert-shown');
    });
});