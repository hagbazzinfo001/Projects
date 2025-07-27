import React, { useState, useMemo } from "react";
import { Folder, User, Mail, Github, Linkedin } from "lucide-react";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectModal } from "./components/ProjectModal";
import { FilterBar } from "./components/FilterBar";
import { Stats } from "./components/Stats";
import { projects } from "./data/projects";
import { Project } from "./types/Project";

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categories = useMemo(
    () => [...new Set(projects.map((project) => project.category))].sort(),
    []
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        !selectedCategory || project.category === selectedCategory;
      const matchesFeatured = !showFeaturedOnly || project.featured;

      return matchesSearch && matchesCategory && matchesFeatured;
    });
  }, [searchTerm, selectedCategory, showFeaturedOnly]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mr-4">
                <Folder className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Project Catalog
                </h1>
                <p className="text-gray-600 mt-1">
                  A collection of my finished projects and achievements
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">Hammed Agbabiaka</span>
              </div>
              <div className="flex space-x-3">
                <a
                  href="mailto:agbabiakahammed003@gmail.com"
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/hagbazzinfo001"
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/owolabi-agbabiaka/"
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Stats projects={projects} />

        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          showFeaturedOnly={showFeaturedOnly}
          onFeaturedToggle={() => setShowFeaturedOnly(!showFeaturedOnly)}
          categories={categories}
          onDownload={() => {
            // Example logic for download: export filtered projects as JSON file
            const resumeLink = document.createElement("a");
            resumeLink.href = "/src/CV-Agbabiaka Hammed.pdf"; // served from public folder
            resumeLink.setAttribute("download", "Hammed_Agbabiaka_Resume.pdf");
            resumeLink.click();
          }}
        />

        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Folder className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search terms or filters to find what you're
              looking for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
