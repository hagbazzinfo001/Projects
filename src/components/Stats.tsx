import React from "react";
import { Briefcase, Award, Calendar, TrendingUp } from "lucide-react";
import { Project } from "../types/Project";

interface StatsProps {
  projects: Project[];
}

export const Stats: React.FC<StatsProps> = ({ projects }) => {
  const totalProjects = projects.length;
  const featuredProjects = projects.filter((p) => p.featured).length;
  const categories = [...new Set(projects.map((p) => p.category))].length;
  // const completedThisYear = projects.filter(
  //   (p) => new Date(p.completedDate).getFullYear() === 2024
  // ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-600 rounded-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-blue-900">
              {totalProjects}
            </h3>
            <p className="text-blue-700 text-sm font-medium">Total Projects</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
        <div className="flex items-center">
          <div className="p-3 bg-purple-600 rounded-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-purple-900">
              {featuredProjects}
            </h3>
            <p className="text-purple-700 text-sm font-medium">
              Featured Projects
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
        <div className="flex items-center">
          <div className="p-3 bg-green-600 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-green-900">{categories}</h3>
            <p className="text-green-700 text-sm font-medium">Categories</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6">
        <div className="flex items-center">
          <div className="p-3 bg-orange-600 rounded-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-orange-900">2+</h3>
            <p className="text-orange-700 text-sm font-medium">
              Years of Experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
