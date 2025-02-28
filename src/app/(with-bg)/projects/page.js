"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import "../../components/Background/bg_style.css"
import "../../globals.css"

// Mock data for projects - replace with your actual data fetching logic
const projectsData = [
  {
    id: 1,
    title: "Cloud Migration Platform",
    description:
      "Enterprise-grade solution for seamless migration of on-premise infrastructure to cloud environments with automated resource optimization.",
    image: "/placeholder.svg?height=400&width=600&text=Cloud+Migration",
    tags: ["AWS", "Terraform", "React", "Node.js"],
    links: {
      github: "https://github.com/username/project1",
      demo: "https://demo-project1.com",
      case: "/projects/cloud-migration",
    },
  },
  {
    id: 2,
    title: "Financial Analytics Dashboard",
    description:
      "Real-time financial data visualization platform with predictive analytics and customizable reporting features.",
    image: "/placeholder.svg?height=400&width=600&text=Financial+Analytics",
    tags: ["Data Visualization", "Python", "D3.js", "ML"],
    links: {
      github: "https://github.com/username/project2",
      demo: "https://demo-project2.com",
      case: "/projects/financial-analytics",
    },
  },
  {
    id: 3,
    title: "E-commerce Microservices",
    description:
      "Scalable microservices architecture for e-commerce platforms with event-driven communication and distributed transaction management.",
    image: "/placeholder.svg?height=400&width=600&text=E-commerce",
    tags: ["Microservices", "Kubernetes", "Java", "Spring"],
    links: {
      github: "https://github.com/username/project3",
      demo: "https://demo-project3.com",
      case: "/projects/ecommerce-microservices",
    },
  },
  {
    id: 4,
    title: "Mobile Health Tracker",
    description:
      "Cross-platform mobile application for health monitoring with wearable device integration and personalized health insights.",
    image: "/placeholder.svg?height=400&width=600&text=Health+Tracker",
    tags: ["React Native", "Firebase", "Health API", "Redux"],
    links: {
      github: "https://github.com/username/project4",
      demo: "https://demo-project4.com",
      case: "/projects/health-tracker",
    },
  },
]

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [visibleProjects, setVisibleProjects] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const observer = useRef()
  const projectsPerPage = 4

  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      offset: 50,
    })

    // Check for user's preferred color scheme
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true)
    }

    // Listen for changes in color scheme preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      setIsDarkMode(event.matches)
    })

    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", () => {})
    }
  }, [])

  // Fetch projects data (simulated)
  useEffect(() => {
    setProjects(projectsData)
    setVisibleProjects(projectsData.slice(0, projectsPerPage))
    setHasMore(projectsData.length > projectsPerPage)
  }, [])

  // Load more projects for infinite scroll
  const loadMoreProjects = useCallback(() => {
    if (!hasMore) return

    const nextPage = page + 1
    const startIndex = (nextPage - 1) * projectsPerPage
    const endIndex = startIndex + projectsPerPage
    const nextProjects = projects.slice(startIndex, endIndex)

    if (nextProjects.length > 0) {
      setVisibleProjects((prev) => [...prev, ...nextProjects])
      setPage(nextPage)
      setHasMore(endIndex < projects.length)
    } else {
      setHasMore(false)
    }
  }, [projects, page, hasMore])

  // Set up intersection observer for infinite scroll
  const lastProjectElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProjects()
        }
      })
      if (node) observer.current.observe(node)
    },
    [loadMoreProjects, hasMore],
  )

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  return (
    <section className={`projects-area ${isDarkMode ? "dark" : ""}`}>
      <div className="container">
        {/* Hero Section */}
        <div className="hero-wrapper mb-5">
          <div className="row">
            <div className="col-12" data-aos="fade-down">
              <div className="hero-content text-center">
                <div className="hero-icon-wrapper" data-aos="zoom-in" data-aos-delay="200">
                  <div className="hero-icon">
                    <i className="iconoir-code-brackets"></i>
                  </div>
                </div>
                <h1 className="hero-title" data-aos="fade-up" data-aos-delay="300">
                  <img src="/images/star-2.png" alt="Star" className="star-icon" />
                  My Projects
                  <img src="/images/star-2.png" alt="Star" className="star-icon" />
                </h1>
                <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="400">
                  A collection of my work spanning software engineering and product management
                </p>
                <div className="hero-decoration" data-aos="width" data-aos-delay="500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="position-fixed top-0 end-0 p-4 z-3">
          <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {isDarkMode ? <i className="iconoir-sun"></i> : <i className="iconoir-moon"></i>}
          </button>
        </div>

        {/* Projects Grid */}
        <div className="row g-4">
          {visibleProjects.map((project, index) => {
            const isLastElement = index === visibleProjects.length - 1

            return (
              <div
                key={project.id}
                className="col-md-6"
                ref={isLastElement ? lastProjectElementRef : null}
                data-aos="fade-up"
                data-aos-delay={(index % 2) * 100}
              >
                <div className="project-card">
                  {/* Project Image */}
                  <div className="project-image">
                    <img src={project.image || "/placeholder.svg"} alt={project.title} className="img-fluid" />
                    <div className="project-overlay">
                      <span className="view-project">View Project</span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="project-content">
                    <h3 className="project-title">
                      <Link href={project.links.case}>{project.title}</Link>
                    </h3>

                    <p className="project-description">{project.description}</p>

                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="project-actions">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-action btn-github"
                        >
                          <i className="iconoir-github"></i>
                          <span>GitHub Repo</span>
                        </a>
                      )}
                      <Link href={project.links.case} className="btn-action btn-learn">
                        <i className="iconoir-arrow-right"></i>
                        <span>Learn More</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Loading Indicator */}
        {hasMore && (
          <div className="text-center mt-5" data-aos="fade-up">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
          </div>
        )}

        {/* Back to Top Button */}
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <i className="iconoir-arrow-up"></i>
        </button>
      </div>

      {/* CSS for the Projects Page */}
      <style jsx>{`
        .projects-area {
          padding: 80px 0;
          min-height: 100vh;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background-color: #f8f9fa;
          color: #212529;
        }

        .dark {
          background-color: #121212;
          color: #f5f5f5;
        }

        .container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        /* Hero Section */
        .hero-wrapper {
          padding: 2rem 0 4rem;
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-icon-wrapper {
          margin-bottom: 2rem;
        }

        .hero-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          background: linear-gradient(135deg, rgba(0, 112, 243, 0.1) 0%, rgba(0, 200, 255, 0.1) 100%);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: #0070f3;
          transform-origin: center;
          animation: iconFloat 3s ease-in-out infinite;
        }

        .dark .hero-icon {
          background: linear-gradient(135deg, rgba(0, 200, 255, 0.1) 0%, rgba(0, 112, 243, 0.1) 100%);
          color: #00c8ff;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .star-icon {
          width: 32px;
          height: 32px;
          animation: starPulse 2s ease-in-out infinite;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #666;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .dark .hero-subtitle {
          color: #adb5bd;
        }

        .hero-decoration {
          width: 100px;
          height: 4px;
          background: linear-gradient(135deg, #0070f3 0%, #00c8ff 100%);
          margin: 0 auto;
          border-radius: 2px;
          position: relative;
        }

        .hero-decoration::before,
        .hero-decoration::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #0070f3;
          transform: translateY(-50%);
        }

        .hero-decoration::before {
          left: -4px;
          animation: dotPulse 2s ease-in-out infinite;
        }

        .hero-decoration::after {
          right: -4px;
          animation: dotPulse 2s ease-in-out infinite 1s;
        }

        /* Project Card */
        .project-card {
          background-color: #fff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .dark .project-card {
          background-color: #1e1e1e;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .project-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 20px 40px rgba(0, 112, 243, 0.1);
        }

        .dark .project-card:hover {
          box-shadow: 0 20px 40px rgba(0, 200, 255, 0.1);
        }

        /* Project Image */
        .project-image {
          position: relative;
          padding-top: 56.25%;
          overflow: hidden;
        }

        .project-image img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover .project-image img {
          transform: scale(1.05);
        }

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .view-project {
          color: white;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 12px 28px;
          border: 2px solid white;
          border-radius: 30px;
          transform: translateY(20px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(4px);
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .project-card:hover .view-project {
          transform: translateY(0);
        }

        /* Project Content */
        .project-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .project-title a {
          background: linear-gradient(135deg, #0070f3 0%, #00c8ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .project-title a:hover {
          opacity: 0.8;
        }

        .project-description {
          font-size: 1rem;
          color: #666;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          flex: 1;
        }

        .dark .project-description {
          color: #adb5bd;
        }

        /* Tags */
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .project-tag {
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(0, 112, 243, 0.1) 0%, rgba(0, 200, 255, 0.1) 100%);
          color: #0070f3;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dark .project-tag {
          background: linear-gradient(135deg, rgba(0, 200, 255, 0.1) 0%, rgba(0, 112, 243, 0.1) 100%);
          color: #00c8ff;
        }

        .project-tag:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, rgba(0, 112, 243, 0.2) 0%, rgba(0, 200, 255, 0.2) 100%);
        }

        /* Action Buttons */
        .project-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: auto;
        }

        .btn-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          border: none;
          cursor: pointer;
        }

        .btn-github {
          background: #24292e;
          color: white;
        }

        .dark .btn-github {
          background: #333;
        }

        .btn-learn {
          background: linear-gradient(135deg, #0070f3 0%, #00c8ff 100%);
          color: white;
        }

        .btn-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .btn-github:hover {
          background: #2f363d;
        }

        .dark .btn-github:hover {
          background: #444;
        }

        .btn-learn:hover {
          background: linear-gradient(135deg, #0061d3 0%, #00b8ef 100%);
        }

        /* Theme Toggle */
        .theme-toggle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: white;
          color: #333;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .dark .theme-toggle {
          background: #333;
          color: white;
        }

        .theme-toggle:hover {
          transform: rotate(180deg);
        }

        /* Loading Spinner */
        .loading-spinner {
          position: relative;
          width: 40px;
          height: 40px;
          margin: 0 auto;
        }

        .spinner-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 3px solid transparent;
          border-top-color: #0070f3;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .spinner-ring:nth-child(2) {
          border-top-color: #00c8ff;
          animation-delay: 0.2s;
        }

        .spinner-ring:nth-child(3) {
          border-top-color: #0070f3;
          animation-delay: 0.4s;
        }

        /* Back to Top Button */
        .back-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0070f3 0%, #00c8ff 100%);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0, 112, 243, 0.2);
        }

        .back-to-top:hover {
          transform: translateY(-4px) scale(1.1);
          box-shadow: 0 6px 16px rgba(0, 112, 243, 0.3);
        }

        /* Animations */
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        @keyframes starPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        @keyframes dotPulse {
          0%, 100% { transform: translateY(-50%) scale(1); opacity: 1; }
          50% { transform: translateY(-50%) scale(1.5); opacity: 0.6; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        [data-aos="width"] {
          width: 0;
          transition-property: width;
        }

        [data-aos="width"].aos-animate {
          width: 100px;
        }

        /* Responsive Design */
        @media (max-width: 767px) {
          .container {
            padding: 0 1.5rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .project-content {
            padding: 1.5rem;
          }

          .project-title {
            font-size: 1.25rem;
          }

          .project-description {
            font-size: 0.9rem;
          }

          .project-actions {
            grid-template-columns: 1fr;
          }

          .btn-action {
            padding: 0.6rem 1rem;
          }
        }

        /* Print Styles */
        @media print {
          .projects-area {
            padding: 0;
          }

          .hero-wrapper,
          .theme-toggle,
          .back-to-top,
          .project-overlay {
            display: none;
          }

          .project-card {
            break-inside: avoid;
            box-shadow: none;
          }
        }
      `}</style>
    </section>
  )
}

export default ProjectsPage

