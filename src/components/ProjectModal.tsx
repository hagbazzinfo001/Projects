import React from "react";
import {
  X,
  Calendar,
  Clock,
  Tag,
  Code,
  Target,
  Trophy,
  ExternalLink,
  Github,
} from "lucide-react";
import { Project } from "../types/Project";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="relative">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            {project.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                  Featured Project
                </span>
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-full">
                {project.category}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {project.title}
            </h2>

            {(project.liveUrl || project.githubUrl) && (
              <div className="flex gap-3 mb-6">
                {project.liveUrl && (
                  <button
                    onClick={() => handleLinkClick(project.liveUrl!)}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    View Live Project
                  </button>
                )}
                {project.githubUrl && (
                  <button
                    onClick={() => handleLinkClick(project.githubUrl!)}
                    className="flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View Source Code
                  </button>
                )}
              </div>
            )}

            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                <div>
                  <div className="font-semibold">Completed</div>
                  <div className="text-sm">
                    {new Date(project.completedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-3 text-blue-600" />
                <div>
                  <div className="font-semibold">Duration</div>
                  <div className="text-sm">{project.duration}</div>
                </div>
              </div>
            </div>

            {project.technologies && (
              <div className="mb-8">
                <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                  <Code className="w-5 h-5 mr-2 text-blue-600" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium border border-blue-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.challenges && (
              <div className="mb-8">
                <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                  <Target className="w-5 h-5 mr-2 text-orange-600" />
                  Key Challenges
                </h3>
                <p className="text-gray-700 leading-relaxed bg-orange-50 p-4 rounded-lg border border-orange-100">
                  {project.challenges}
                </p>
              </div>
            )}

            {project.outcome && (
              <div className="mb-8">
                <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                  <Trophy className="w-5 h-5 mr-2 text-green-600" />
                  Results & Impact
                </h3>
                <p className="text-gray-700 leading-relaxed bg-green-50 p-4 rounded-lg border border-green-100">
                  {project.outcome}
                </p>
              </div>
            )}

            <div>
              <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                <Tag className="w-5 h-5 mr-2 text-purple-600" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-sm border border-purple-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
