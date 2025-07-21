import React from "react";
import { Calendar, Clock, Tag, ExternalLink, Github } from "lucide-react";
import { Project } from "../types/Project";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
}) => {
  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-gray-200"
    >
      {project.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}

      <div className="relative overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
            {project.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(project.completedDate).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {project.duration}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>

        {(project.liveUrl || project.githubUrl) && (
          <div className="flex gap-2 pt-4 border-t border-gray-100">
            {project.liveUrl && (
              <button
                onClick={(e) => handleLinkClick(e, project.liveUrl!)}
                className="flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </button>
            )}
            {project.githubUrl && (
              <button
                onClick={(e) => handleLinkClick(e, project.githubUrl!)}
                className="flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
